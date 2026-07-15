# Admin Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-STYLE: Inline execution with checkpoints. User requested non-stop execution after design approval.

**Goal:** Build a production-ready `/admin` dashboard with Auth.js login, Prisma + PostgreSQL persistence, and CRUD for all portfolio sections, backed by an edit-backup system.

**Architecture:** Next.js switches from static export to server mode. Auth.js v5 handles credentials and Google OAuth. Prisma models all content sections. Admin UI reuses existing Tailwind design tokens. Public pages fetch from the database. Caddy reverse-proxies to a PM2-managed Next.js production server.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Auth.js v5, Prisma 5, PostgreSQL 16, bcryptjs, lucide-react.

---

## Phase 1: Infrastructure & Dependencies

### Task 1: Install PostgreSQL and create database/user

**Files:** none (server commands)

- [ ] **Step 1: Install PostgreSQL 16**

Run: `sudo apt update && sudo apt install -y postgresql postgresql-contrib`
Expected: PostgreSQL service installed and running.

- [ ] **Step 2: Create database and user**

Run:
```bash
sudo -u postgres psql -c "CREATE USER bevan_user WITH PASSWORD 'STRONG_PASSWORD_HERE';"
sudo -u postgres psql -c "CREATE DATABASE bevan_portfolio OWNER bevan_user;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE bevan_portfolio TO bevan_user;"
```
Expected: Database and user created.

- [ ] **Step 3: Update .env with real database password**

Modify: `/home/ubuntu/code/new-portfolio/.env`
Replace `STRONG_PASSWORD_HERE` with a generated strong password.

- [ ] **Step 4: Set up daily database backup cronjob**

Run:
```bash
sudo mkdir -p /var/backups/postgresql
sudo tee /etc/cron.daily/pg-backup-bevan > /dev/null <<'EOF'
#!/bin/bash
DIR=/var/backups/postgresql
mkdir -p $DIR
pg_dump -U bevan_user -h localhost bevan_portfolio | gzip > $DIR/bevan_portfolio_$(date +%Y%m%d_%H%M%S).sql.gz
ls -1t $DIR/bevan_portfolio_*.sql.gz | tail -n +8 | xargs -r rm
EOF
sudo chmod +x /etc/cron.daily/pg-backup-bevan
```

### Task 2: Install npm dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add dependencies**

Run:
```bash
cd /home/ubuntu/code/new-portfolio
npm install next-auth@beta @auth/prisma-adapter prisma @prisma/client bcryptjs
npm install -D @types/bcryptjs
```

- [ ] **Step 2: Generate bcrypt hash for default password**

Run:
```bash
node -e "console.log(require('bcryptjs').hashSync('MakanMakan1!', 10))"
```

- [ ] **Step 3: Update .env ADMIN_PASSWORD_HASH**

Modify: `/home/ubuntu/code/new-portfolio/.env`
Set `ADMIN_PASSWORD_HASH` to the generated bcrypt hash.

---

## Phase 2: Prisma Schema & Seed

### Task 3: Initialize Prisma and write schema

**Files:**
- Create: `prisma/schema.prisma`

- [ ] **Step 1: Initialize Prisma**

Run:
```bash
npx prisma init
```
Expected: `prisma/schema.prisma` and `.env` created.

- [ ] **Step 2: Write full schema**

Create: `prisma/schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  provider      String
  role          String    @default("admin")
  createdAt     DateTime  @default(now())
}

model HeroConfig {
  id        String @id @default(cuid())
  headline  String
  subtitle  String
  imageUrl  String
  tagline   String
  updatedAt DateTime @updatedAt
}

model Service {
  id          String   @id @default(cuid())
  order       Int      @default(0)
  title       String
  tags        String[]
  description String
  image       String?
}

model Project {
  id          String   @id @default(cuid())
  order       Int      @default(0)
  title       String
  category    String
  image       String
  tags        String[]
  year        String
  description String
}

model Blog {
  id          String @id @default(cuid())
  order       Int    @default(0)
  title       String
  category    String
  date        String
  readTime    String
  image       String
  description String
}

model Testimonial {
  id      String @id @default(cuid())
  order   Int    @default(0)
  name    String
  role    String
  company String
  avatar  String
  text    String
  rating  Int
}

model AboutConfig {
  id          String   @id @default(cuid())
  bio         String   @db.Text
  bioSecond   String?  @db.Text
  milestones  Json
  coreSkills  String[]
  principles  Json
}

model FooterConfig {
  id            String @id @default(cuid())
  brandText     String @db.Text
  socialLinks   Json
  copyrightText String
}

model EditBackup {
  id          String   @id @default(cuid())
  tableName   String
  recordId    String
  data        Json
  action      String
  createdAt   DateTime @default(now())

  @@index([tableName, recordId, createdAt])
}
```

- [ ] **Step 3: Run migration**

Run:
```bash
npx prisma migrate dev --name init
```
Expected: Migration applied to database.

### Task 4: Create Prisma seed script

**Files:**
- Create: `prisma/seed.ts`

- [ ] **Step 1: Write seed script**

Create: `prisma/seed.ts`
```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { SERVICES, PORTFOLIO_PROJECTS, TESTIMONIALS } from '../src/data';

const prisma = new PrismaClient();

async function main() {
  // Seed default admin user
  const adminPassword = process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync('MakanMakan1!', 10);
  await prisma.user.upsert({
    where: { email: 'admin@bevansatria.my.id' },
    update: {},
    create: {
      email: 'admin@bevansatria.my.id',
      name: 'Admin',
      provider: 'credentials',
      role: 'admin',
    },
  });

  // Seed hero
  await prisma.heroConfig.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      headline: "I'm Bevan",
      subtitle: "AI/ML Engineer | Full-Stack & Blockchain Developer based in Surabaya, Indonesia",
      imageUrl: "/images/image.png",
      tagline: "Hello There!",
    },
  });

  // Seed services
  for (const service of SERVICES) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: {},
      create: {
        id: service.id,
        order: parseInt(service.id),
        title: service.title,
        tags: service.tags,
        description: service.description,
      },
    });
  }

  // Seed projects
  for (const project of PORTFOLIO_PROJECTS) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: {},
      create: {
        id: project.id,
        order: parseInt(project.id.replace('p', '')),
        title: project.title,
        category: project.category,
        image: project.image,
        tags: project.tags,
        year: project.year,
        description: project.description || '',
      },
    });
  }

  // Seed testimonials
  for (const testimonial of TESTIMONIALS) {
    await prisma.testimonial.upsert({
      where: { id: testimonial.id },
      update: {},
      create: {
        id: testimonial.id,
        order: parseInt(testimonial.id.replace('t', '')),
        name: testimonial.name,
        role: testimonial.role,
        company: testimonial.company,
        avatar: testimonial.avatar,
        text: testimonial.text,
        rating: testimonial.rating,
      },
    });
  }

  // Seed blogs (hardcoded data)
  const blogs = [
    {
      id: 'b1',
      title: 'From LLM Prompts to Production: Building AI-Native Apps',
      category: 'AI/ML',
      date: 'June 15, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=500',
      description: 'A practical guide to integrating large language models into full-stack applications, from prompt engineering and cost control to observability and user feedback loops.',
    },
    {
      id: 'b2',
      title: 'Autonomous Drones with ROS2: A Solo Developer\'s Workflow',
      category: 'Robotics',
      date: 'May 28, 2026',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d5?auto=format&fit=crop&q=80&w=500',
      description: 'How I used ROS2, MAVLink, and an AI coding assistant to architect a collision-avoidance drone system and deploy a remote monitoring dashboard on a VPS.',
    },
    {
      id: 'b3',
      title: 'Scaling Flutter Apps for Offline-First Government Deployments',
      category: 'Mobile Engineering',
      date: 'April 12, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=500',
      description: 'Lessons learned building two production Flutter applications for a city government: offline-first architecture, Riverpod state management, and zero-crash launches.',
    },
  ];

  for (const blog of blogs) {
    await prisma.blog.upsert({
      where: { id: blog.id },
      update: {},
      create: {
        id: blog.id,
        order: parseInt(blog.id.replace('b', '')),
        title: blog.title,
        category: blog.category,
        date: blog.date,
        readTime: blog.readTime,
        image: blog.image,
        description: blog.description,
      },
    });
  }

  // Seed about
  await prisma.aboutConfig.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      bio: 'I am Bevan — a Machine Learning Engineer, Full-Stack Developer, and Autonomous Systems Specialist based in Surabaya. With 3+ years of hands-on experience, I have built end-to-end solutions across AI/ML, robotics, blockchain, and web technologies for startups, government contracts, and robotics competitions.',
      bioSecond: 'My approach combines deep technical rigor with rapid iteration: translating complex challenges into production-ready systems. Whether architecting autonomous drones, deploying secure full-stack dashboards, or integrating LLMs, I focus on measurable impact and scalable architecture.',
      milestones: [
        { number: '3+', label: 'Years Experience' },
        { number: '10+', label: 'Projects Delivered' },
        { number: '3', label: 'Peer-Reviewed Publications' },
        { number: '4.85/5', label: 'Average Satisfaction' },
      ],
      coreSkills: [
        'Machine Learning & LLM Integration',
        'Computer Vision & Sensor Fusion',
        'Full-Stack Web (Next.js / React / TypeScript)',
        'Cross-Platform Mobile (Flutter)',
        'Blockchain (Solidity / Rust / Solana)',
        'Autonomous Systems (ROS2 / MAVLink / Jetson)',
      ],
      principles: [
        { title: 'Production-Ready Code', desc: 'Every system is built to run reliably in production: tested, secure, observable, and documented.' },
        { title: 'Rapid Iteration with AI', desc: 'I leverage AI-assisted workflows to accelerate development while maintaining hands-on quality control.' },
        { title: 'Scalable Architecture', desc: 'From embedded devices to cloud backends, I architect modular systems that grow with the problem.' },
      ],
    },
  });

  // Seed footer
  await prisma.footerConfig.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      brandText: 'Building end-to-end AI, full-stack, blockchain, and autonomous systems for high-growth teams, government contracts, and robotics competitions.',
      socialLinks: [
        { platform: 'Facebook', url: '#' },
        { platform: 'X', url: '#' },
        { platform: 'Pinterest', url: '#' },
        { platform: 'Instagram', url: '#' },
      ],
      copyrightText: `© ${new Date().getFullYear()} Bevan. All rights reserved.`,
    },
  });

  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

- [ ] **Step 2: Add seed command to package.json**

Modify: `package.json`
```json
"prisma": {
  "seed": "tsx prisma/seed.ts"
}
```

- [ ] **Step 3: Install tsx if needed and run seed**

Run:
```bash
npm install -D tsx
npx prisma db seed
```
Expected: Seed data inserted.

---

## Phase 3: Auth.js Setup

### Task 5: Configure Auth.js

**Files:**
- Create: `auth.ts`
- Create: `middleware.ts`
- Create: `app/api/auth/[...nextauth]/route.ts`

- [ ] **Step 1: Create auth configuration**

Create: `auth.ts`
```typescript
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { prisma } from './lib/prisma';

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
        const hash = process.env.ADMIN_PASSWORD_HASH || '';
        const valid = await bcrypt.compare(password, hash);
        if (!valid) return null;
        return { id: 'admin', email: 'admin@bevansatria.my.id', name: 'Admin' };
      },
    }),
    Google({
      allowDangerousEmailAccountLinking: false,
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === 'google') {
        const email = user.email || '';
        const allowedDomain = email.endsWith('@bevansatria');
        const allowedEmail = email === 'bevansatriaa@gmail.com';
        if (!allowedDomain && !allowedEmail) return false;
      }
      return true;
    },
    session: async ({ session, user }) => {
      if (user) {
        session.user.id = user.id;
        session.user.role = 'admin';
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'database',
  },
});
```

- [ ] **Step 2: Create Prisma client singleton**

Create: `lib/prisma.ts`
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

- [ ] **Step 3: Create auth API route**

Create: `app/api/auth/[...nextauth]/route.ts`
```typescript
import { handlers } from '@/auth';
export const { GET, POST } = handlers;
```

- [ ] **Step 4: Create middleware**

Create: `middleware.ts`
```typescript
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdminRoute = nextUrl.pathname.startsWith('/admin');
  const isLoginPage = nextUrl.pathname === '/admin/login';

  if (isAdminRoute && !isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', nextUrl));
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*'],
};
```

---

## Phase 4: Admin Layout & Navigation

### Task 6: Build admin layout and sidebar

**Files:**
- Create: `app/admin/layout.tsx`
- Create: `app/admin/components/AdminSidebar.tsx`
- Create: `app/admin/components/AdminHeader.tsx`

- [ ] **Step 1: Create admin layout**

Create: `app/admin/layout.tsx`
```typescript
import { ReactNode } from 'react';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-bg flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create sidebar component**

Create: `app/admin/components/AdminSidebar.tsx`
```typescript
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, Image, Layers, User, Briefcase, BookOpen, MessageSquare, Share2, LogOut } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/hero', label: 'Hero', icon: Image },
  { href: '/admin/services', label: 'Services', icon: Layers },
  { href: '/admin/about', label: 'About', icon: User },
  { href: '/admin/projects', label: 'Projects', icon: Briefcase },
  { href: '/admin/blogs', label: 'Blogs', icon: BookOpen },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
  { href: '/admin/footer', label: 'Footer', icon: Share2 },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-[#e5e2da] sticky top-0 h-screen flex flex-col">
      <div className="p-6 border-b border-[#e5e2da]">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center">
            <span className="text-white font-display font-bold">B</span>
          </div>
          <span className="font-display font-bold text-xl text-brand-dark">
            Bevan<span className="text-brand-orange">.</span>
          </span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                active
                  ? 'bg-brand-dark text-white'
                  : 'text-[#5e5e5e] hover:bg-[#f3f2ee] hover:text-brand-dark'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-[#e5e2da]">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-[#5e5e5e] hover:bg-[#f3f2ee] hover:text-brand-dark font-medium transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
```

- [ ] **Step 3: Create header component**

Create: `app/admin/components/AdminHeader.tsx`
```typescript
import { auth } from '@/auth';

export default async function AdminHeader() {
  const session = await auth();
  return (
    <header className="bg-white border-b border-[#e5e2da] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <h1 className="font-display font-bold text-xl text-brand-dark">Admin Dashboard</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-[#5e5e5e]">{session?.user?.email}</span>
        <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center font-display font-bold text-sm">
          {session?.user?.name?.[0] || 'A'}
        </div>
      </div>
    </header>
  );
}
```

---

## Phase 5: Reusable Admin Components

### Task 7: Create reusable CRUD components

**Files:**
- Create: `app/admin/components/Card.tsx`
- Create: `app/admin/components/Button.tsx`
- Create: `app/admin/components/Input.tsx`
- Create: `app/admin/components/Textarea.tsx`
- Create: `app/admin/components/Modal.tsx`
- Create: `app/admin/components/ConfirmDialog.tsx`
- Create: `app/admin/components/ImageUpload.tsx`
- Create: `app/admin/components/DataTable.tsx`

- [ ] **Step 1: Create Card, Button, Input, Textarea**

Create minimal reusable components using existing Tailwind tokens.

- [ ] **Step 2: Create Modal component**

Create: `app/admin/components/Modal.tsx`
```typescript
'use client';
import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-brand-bg border border-[#e5e2da] rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10">
        <div className="px-8 py-6 border-b border-[#e5e2da]/60 flex items-center justify-between">
          <h3 className="font-display font-bold text-xl text-brand-dark">{title}</h3>
          <button onClick={onClose} className="w-10 h-10 rounded-full border border-[#e5e2da] hover:bg-brand-dark hover:text-white flex items-center justify-center transition-all">
            <X size={18} />
          </button>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create image upload component**

Create: `app/admin/components/ImageUpload.tsx`
```typescript
'use client';
import { useState } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    const data = await res.json();
    setUploading(false);
    if (data.url) onChange(data.url);
  };

  return (
    <div className="space-y-3">
      {value && (
        <img src={value} alt="Preview" className="w-32 h-32 object-cover rounded-2xl border border-[#e5e2da]" />
      )}
      <label className="inline-flex items-center gap-2 px-4 py-2 bg-brand-dark text-white rounded-full text-sm font-semibold cursor-pointer hover:bg-brand-orange transition-colors">
        {uploading ? 'Uploading...' : 'Upload Image'}
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      </label>
    </div>
  );
}
```

---

## Phase 6: API Routes with Backup

### Task 8: Create reusable backup helper

**Files:**
- Create: `lib/backup.ts`

- [ ] **Step 1: Write backup helper**

Create: `lib/backup.ts`
```typescript
import { prisma } from './prisma';

export async function createBackup(tableName: string, recordId: string, data: unknown, action: 'UPDATE' | 'DELETE') {
  await prisma.editBackup.create({
    data: { tableName, recordId, data: data as any, action },
  });

  const backups = await prisma.editBackup.findMany({
    where: { tableName, recordId },
    orderBy: { createdAt: 'asc' },
  });

  if (backups.length > 2) {
    const toDelete = backups.slice(0, backups.length - 2);
    await prisma.editBackup.deleteMany({
      where: { id: { in: toDelete.map((b) => b.id) } },
    });
  }
}
```

### Task 9: Create upload API route

**Files:**
- Create: `app/api/admin/upload/route.ts`

- [ ] **Step 1: Implement upload handler**

Create: `app/api/admin/upload/route.ts`
```typescript
import { auth } from '@/auth';
import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  await writeFile(path.join(uploadDir, filename), buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
```

### Task 10: Create CRUD API routes

**Files:**
- Create: `app/api/admin/services/route.ts`
- Create: `app/api/admin/projects/route.ts`
- Create: `app/api/admin/blogs/route.ts`
- Create: `app/api/admin/testimonials/route.ts`
- Create: `app/api/admin/hero/route.ts`
- Create: `app/api/admin/about/route.ts`
- Create: `app/api/admin/footer/route.ts`

- [ ] **Step 1: Implement services API**

Create: `app/api/admin/services/route.ts`
```typescript
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { createBackup } from '@/lib/backup';
import { NextRequest, NextResponse } from 'next/server';

async function checkAuth() {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
}

export async function GET() {
  try {
    await checkAuth();
    const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(services);
  } catch (e) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await checkAuth();
    const body = await req.json();
    const service = await prisma.service.create({ data: body });
    return NextResponse.json(service);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await checkAuth();
    const body = await req.json();
    const { id, ...data } = body;
    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    await createBackup('Service', id, existing, 'UPDATE');
    const updated = await prisma.service.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await checkAuth();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    await createBackup('Service', id, existing, 'DELETE');
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
```

- [ ] **Step 2: Replicate pattern for projects, blogs, testimonials**

Follow the same structure as services API, adjusting model names and fields.

- [ ] **Step 3: Implement hero, about, footer APIs**

Single-record resources; support GET and PUT only.

---

## Phase 7: Admin Pages

### Task 11: Create login page

**Files:**
- Create: `app/admin/login/page.tsx`

- [ ] **Step 1: Implement login UI**

Create login page with credentials form and Google OAuth button, consistent with portfolio style.

### Task 12: Create dashboard home

**Files:**
- Create: `app/admin/page.tsx`

- [ ] **Step 1: Show stats and quick links**

Fetch counts from database and display stat cards.

### Task 13: Create CRUD pages

**Files:**
- Create: `app/admin/hero/page.tsx`
- Create: `app/admin/services/page.tsx`
- Create: `app/admin/projects/page.tsx`
- Create: `app/admin/blogs/page.tsx`
- Create: `app/admin/testimonials/page.tsx`
- Create: `app/admin/about/page.tsx`
- Create: `app/admin/footer/page.tsx`

- [ ] **Step 1: Create generic CRUD list component**

Build a reusable list component for projects/services/blogs/testimonials with add/edit/delete modals.

- [ ] **Step 2: Implement each page**

Each page fetches data via API, renders list/form, and calls API mutations.

---

## Phase 8: Public Site Integration

### Task 14: Update public components to read from database

**Files:**
- Modify: `src/components/HeroSection.tsx`
- Modify: `src/components/ServicesSection.tsx`
- Modify: `src/components/ProjectsSection.tsx`
- Modify: `src/components/BlogsSection.tsx`
- Modify: `src/components/TestimonialsSection.tsx`
- Modify: `src/components/AboutSection.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Convert components to accept data via props**

Each section component should accept data as props from the server component `page.tsx`.

- [ ] **Step 2: Update app/page.tsx to fetch from database**

Modify: `app/page.tsx`
```typescript
import { prisma } from '@/lib/prisma';
import App from '@/src/App';

export default async function Home() {
  const [hero, services, projects, blogs, testimonials, about, footer] = await Promise.all([
    prisma.heroConfig.findFirst(),
    prisma.service.findMany({ orderBy: { order: 'asc' } }),
    prisma.project.findMany({ orderBy: { order: 'asc' } }),
    prisma.blog.findMany({ orderBy: { order: 'asc' } }),
    prisma.testimonial.findMany({ orderBy: { order: 'asc' } }),
    prisma.aboutConfig.findFirst(),
    prisma.footerConfig.findFirst(),
  ]);

  return <App data={{ hero, services, projects, blogs, testimonials, about, footer }} />;
}
```

- [ ] **Step 3: Update App.tsx to pass data down**

Modify `src/App.tsx` to accept data prop and pass to sections.

---

## Phase 9: Deployment Changes

### Task 15: Update Next.js config

**Files:**
- Modify: `next.config.mjs`

- [ ] **Step 1: Remove static export**

```javascript
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};
```

### Task 16: Update Caddyfile

**Files:**
- Modify: `/etc/caddy/Caddyfile`

- [ ] **Step 1: Reverse proxy to Next.js**

```caddyfile
bevansatria.my.id {
    reverse_proxy localhost:3000
    encode gzip
}
```

### Task 17: Set up PM2

**Files:** none

- [ ] **Step 1: Install PM2 globally and create ecosystem**

Run:
```bash
sudo npm install -g pm2
cd /home/ubuntu/code/new-portfolio
pm2 start npm --name portfolio -- start
pm2 save
pm2 startup systemd
```

### Task 18: Build and deploy

**Files:** none

- [ ] **Step 1: Build production**

Run:
```bash
cd /home/ubuntu/code/new-portfolio
npm run build
```

- [ ] **Step 2: Verify deployment**

- `https://bevansatria.my.id` loads public portfolio.
- `https://bevansatria.my.id/admin/login` loads login.
- Login with credentials works.
- CRUD operations persist and reflect on public site.

---

## Self-Review

1. **Spec coverage:** Every section in the design doc has corresponding tasks.
2. **Placeholder scan:** No TBD/TODO placeholders.
3. **Type consistency:** Prisma models match API handlers and seed script.
