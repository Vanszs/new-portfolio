import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { prisma } from './lib/prisma';

function parseAllowedList(envValue: string | undefined): string[] {
  if (!envValue) return [];
  return envValue
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

const allowedGoogleDomains = parseAllowedList(process.env.AUTH_GOOGLE_ALLOWED_DOMAINS);
const allowedGoogleEmails = parseAllowedList(process.env.AUTH_GOOGLE_ALLOWED_EMAILS);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const username = credentials?.username as string;
        const password = credentials?.password as string;
        if (username !== process.env.ADMIN_USERNAME) return null;
        const hashB64 = process.env.ADMIN_PASSWORD_HASH_B64 || '';
        const hash = hashB64 ? Buffer.from(hashB64, 'base64').toString('utf-8') : '';
        if (!hash) return null;
        const valid = await bcrypt.compare(password, hash);
        if (!valid) return null;
        return { id: 'admin', email: 'admin@bevansatria.my.id', name: 'Admin' };
      },
    }),
    Google,
  ],
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      if (account?.provider === 'google') {
        const profileEmailVerified = (profile as { email_verified?: boolean } | undefined)
          ?.email_verified;
        if (!profileEmailVerified || !user.email) return false;

        const email = user.email.toLowerCase();
        const domainAllowed = allowedGoogleDomains.some((domain) => email.endsWith(`@${domain}`));
        const emailAllowed = allowedGoogleEmails.includes(email);
        if (!domainAllowed && !emailAllowed) return false;
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.sub = user.id;
        token.role = 'admin';
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token?.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 day
  },
});
