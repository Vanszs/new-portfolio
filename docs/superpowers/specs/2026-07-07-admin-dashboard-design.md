# Admin Dashboard Design Document

## Goal
Build a production-ready `/admin` dashboard for `bevansatria.my.id` that allows the site owner to CRUD all portfolio content (Hero, Services, About, Projects, Blogs, Testimonials, Footer) with a modern, clean UI consistent with the existing portfolio design.

## Architecture
- **Next.js server mode** (remove static export) to support API Routes and server-side session validation.
- **Auth.js v5** for authentication: credentials provider (default admin) + Google OAuth with email whitelist.
- **Prisma ORM** with a local **PostgreSQL 16** database on the same VPS.
- **Admin UI** uses existing Tailwind CSS design tokens (`brand-orange`, `brand-dark`, `brand-bg`, rounded cards, Space Grotesk + Inter fonts).
- All content reads from the database. Public pages use server-side Prisma queries directly in Server Components where possible; admin API routes are used where client-side interactivity is required.
- Every edit/delete creates a snapshot backup in an `EditBackup` table; max 2 backups retained per record (FIFO rotation).
- Initial setup seeds the database from the existing `src/data.ts` hardcoded content.

## Tech Stack
- Next.js 15 (App Router, server mode)
- React 19 + TypeScript
- Tailwind CSS 4 (existing)
- Auth.js v5 (`next-auth` v5 beta)
- Prisma 5 + `@auth/prisma-adapter`
- PostgreSQL 16
- bcryptjs (password hashing)
- lucide-react (icons, existing)

## Database Schema (Prisma)

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  provider      String    // "credentials" | "google"
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
  action      String   // "UPDATE" | "DELETE"
  createdAt   DateTime @default(now())
}
```

## Authentication

### Providers
1. **Credentials Provider**
   - Username: `admin`
   - Password: `MakanMakan1!`
   - Password stored as bcrypt hash in `ADMIN_PASSWORD_HASH` env var.

2. **Google OAuth Provider**
   - Client ID and Secret from `.env`.
   - Email whitelist:
     - `*@bevansatria`
     - `bevansatriaa@gmail.com`
   - Redirect URI: `https://bevansatria.my.id/api/auth/callback/google`

### Authorization
- `/app/middleware.ts` protects all `/admin/*` routes except `/admin/login`.
- Only authenticated users can access admin pages and API routes.

### Environment Variables
```env
DATABASE_URL="postgresql://bevan_user:STRONG_PASSWORD@localhost:5432/bevan_portfolio"
AUTH_SECRET="random-32-char-secret"
AUTH_URL="https://bevansatria.my.id"
AUTH_TRUST_HOST=true
AUTH_GOOGLE_ID="YOUR_GOOGLE_OAUTH_CLIENT_ID"
AUTH_GOOGLE_SECRET="YOUR_GOOGLE_OAUTH_CLIENT_SECRET"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH="$2b$10$..."  # bcrypt hash of MakanMakan1!
```

## Admin UI/UX

### Layout
- Sticky left sidebar with logo and navigation.
- Top header with user info and logout.
- Main content area with clean white cards on `brand-bg` background.

### Sidebar Navigation
- Dashboard
- Hero
- Services
- About
- Projects
- Blogs
- Testimonials
- Footer
- Logout

### Dashboard Home
- Stat cards: total projects, services, blogs, testimonials.
- Quick action buttons for each section.
- Last updated timestamps.

### CRUD Pattern
- List view with table/card layout.
- Add button opens modal form.
- Edit button opens modal form pre-filled.
- Delete button shows confirmation dialog.
- Reorder via up/down arrows (order field).
- Image upload uses multipart form data, saves files to `/public/uploads/`, and stores relative paths (e.g., `/uploads/filename.png`) in DB.

### Design Tokens
- Background: `#fcfbf9`
- Cards: white, border `#e5e2da`, `rounded-3xl`
- Primary: `#fd4a24`
- Dark: `#0e0e0e`
- Fonts: Space Grotesk (headings), Inter (body)

## API Routes

All admin API routes require authenticated session.

```
/app/api
  /auth/[...nextauth]/route.ts
  /admin/hero/route.ts          GET, PUT
  /admin/services/route.ts      GET, POST, PUT, DELETE
  /admin/about/route.ts         GET, PUT
  /admin/projects/route.ts      GET, POST, PUT, DELETE
  /admin/blogs/route.ts         GET, POST, PUT, DELETE
  /admin/testimonials/route.ts  GET, POST, PUT, DELETE
  /admin/footer/route.ts        GET, PUT
```

## Backup Strategy

- Before every `PUT` or `DELETE`, the API reads the existing record and inserts a snapshot into `EditBackup` keyed by `tableName` + `recordId`.
- After inserting, count existing backups for the same `tableName` + `recordId`.
- If count > 2 for that specific record, delete the oldest backup (FIFO rotation per record).
- Backups can be reviewed/rolled back via a future "Restore" feature if needed.

## Seeding

- Seed script: `prisma/seed.ts`
- Reads existing `src/data.ts` values:
  - `SERVICES`
  - `PORTFOLIO_PROJECTS`
  - `TESTIMONIALS`
  - Hardcoded blog data from `BlogsSection.tsx`
  - Hero defaults
  - About defaults
  - Footer defaults
- Run once during setup: `npx prisma db seed`
- After seeding, `src/data.ts` is deprecated but kept in source for reference. Public site reads exclusively from the database. A seed admin user is also created from env credentials.

## Deployment

### Next.js Config Changes
- Remove `output: 'export'` and `distDir: 'dist'`.
- Keep `images.unoptimized: true` or configure `remotePatterns` for Unsplash.

### Caddyfile Update
```caddyfile
bevansatria.my.id {
    reverse_proxy localhost:3000
    encode gzip
}
```

### Process Manager
- Run Next.js production with PM2:
  ```bash
  pm2 start npm --name portfolio -- start
  ```

### PostgreSQL Setup
- Install PostgreSQL 16 on the VPS.
- Create database `bevan_portfolio` and user `bevan_user`.
- Run migrations and seed. The seed script also creates the default credentials admin user from `ADMIN_USERNAME` and `ADMIN_PASSWORD_HASH` env vars.

### Automated Database Backup
- Daily full backup with `pg_dump` via cronjob.
- Backup file retention: 7 days.
- Backup stored in `/var/backups/postgresql/`.

## Security

- `.env` is gitignored and never committed.
- Session cookies are HttpOnly, Secure, SameSite=Lax.
- bcrypt for password hashing.
- Strict Google OAuth email whitelist.
- API routes validate session before any mutation.
- Rate limiting on `/api/auth/*` via Auth.js built-in or custom middleware.

## Success Criteria

1. `/admin` accessible only after login.
2. Login works with credentials (`admin` / `MakanMakan1!`) and allowed Google accounts.
3. All sections (Hero, Services, About, Projects, Blogs, Testimonials, Footer) editable from admin dashboard.
4. Changes persist to PostgreSQL and reflect immediately on the public site.
5. Every edit/delete creates a backup, with max 2 backups per record.
6. Database seeded with existing portfolio data on first setup.
7. UI consistent with existing portfolio design (modern, clean, same color palette and typography).
8. Deployment uses HTTPS with Caddy reverse proxy to Next.js production server.
