import { prisma } from '@/lib/prisma';
import App, { type AppData } from '@/src/App';

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const parseMilestones = (value: unknown): NonNullable<AppData['about']>['milestones'] =>
  Array.isArray(value) ? value.filter(isRecord).filter((item): item is { number: string; label: string } => typeof item.number === 'string' && typeof item.label === 'string') : [];

const parsePrinciples = (value: unknown): NonNullable<AppData['about']>['principles'] =>
  Array.isArray(value) ? value.filter(isRecord).filter((item): item is { title: string; desc: string } => typeof item.title === 'string' && typeof item.desc === 'string') : [];

const parsePublications = (value: unknown): NonNullable<AppData['about']>['publications'] =>
  Array.isArray(value) ? value.filter(isRecord).filter((item): item is { title: string; desc?: string } => typeof item.title === 'string' && (item.desc === undefined || typeof item.desc === 'string')) : [];

const parseSocialLinks = (value: unknown): NonNullable<AppData['footer']>['socialLinks'] =>
  Array.isArray(value) ? value.filter(isRecord).filter((item): item is { platform: string; url: string } => typeof item.platform === 'string' && typeof item.url === 'string') : [];

export const revalidate = 0;

export default async function Home() {
  const [hero, services, experiences, projects, blogs, testimonials, about, footer] = await Promise.all([
    prisma.heroConfig.findUnique({ where: { id: 'default' } }),
    prisma.service.findMany({ orderBy: { order: 'asc' } }),
    prisma.experience.findMany({ orderBy: { order: 'asc' } }),
    prisma.project.findMany({ orderBy: { order: 'asc' } }),
    prisma.blog.findMany({ orderBy: { order: 'asc' } }),
    prisma.testimonial.findMany({ orderBy: { order: 'asc' } }),
    prisma.aboutConfig.findUnique({ where: { id: 'default' } }),
    prisma.footerConfig.findUnique({ where: { id: 'default' } }),
  ]);

  const data: AppData = {
    hero,
    services,
    experiences,
    projects,
    blogs,
    testimonials,
    about: about ? {
      ...about,
      milestones: parseMilestones(about.milestones),
      principles: parsePrinciples(about.principles),
      publications: parsePublications(about.publications),
      certifications: Array.isArray(about.certifications) ? about.certifications.filter((item): item is string => typeof item === 'string') : [],
    } : null,
    footer: footer ? {
      ...footer,
      socialLinks: parseSocialLinks(footer.socialLinks),
    } : null,
  };

  return <App data={data} />;
}
