import { prisma } from '@/lib/prisma';
import App from '@/src/App';

export const revalidate = 0;

export default async function Home() {
  const [hero, services, projects, blogs, testimonials, about, footer] = await Promise.all([
    prisma.heroConfig.findUnique({ where: { id: 'default' } }),
    prisma.service.findMany({ orderBy: { order: 'asc' } }),
    prisma.project.findMany({ orderBy: { order: 'asc' } }),
    prisma.blog.findMany({ orderBy: { order: 'asc' } }),
    prisma.testimonial.findMany({ orderBy: { order: 'asc' } }),
    prisma.aboutConfig.findUnique({ where: { id: 'default' } }),
    prisma.footerConfig.findUnique({ where: { id: 'default' } }),
  ]);

  return (
    <App
      data={{
        hero,
        services,
        projects,
        blogs,
        testimonials,
        about,
        footer,
      }}
    />
  );
}
