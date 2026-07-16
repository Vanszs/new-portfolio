import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { SERVICES, PORTFOLIO_PROJECTS, TESTIMONIALS } from '../src/data';

const prisma = new PrismaClient();

async function main() {
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

  await prisma.aboutConfig.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      bio: 'I am Bevantyo Satria Pinandhita (Bevan) - a Machine Learning Engineer, Full-Stack Developer, and Autonomous Systems Specialist based in Surabaya. With 3+ years of hands-on experience, I have built end-to-end solutions across AI/ML, robotics, blockchain, and web technologies for startups, government contracts, and robotics competitions.',
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
