import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { SERVICES, PORTFOLIO_PROJECTS, TESTIMONIALS } from '../src/data';

const prisma = new PrismaClient();

const EXPERIENCES = [
  {
    id: "exp1",
    order: 1,
    role: "Founding Engineer",
    company: "Owie Technologies",
    location: "Surabaya, East Java, Indonesia",
    period: "May 2026 - Present",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    summary: "Developing Owie Motion across frontend, backend, and infrastructure workflows.",
    description: "Contributed to Owie Motion. Integrated Generative AI features into web applications, including AI-powered automation and API integrations. Assisted in backend development, server management, and designed CI/CD pipelines to ensure scalable and reliable system performance.",
    gallery: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"],
    tags: ["Next.js", "Generative AI", "Prisma", "CI/CD"]
  },
  {
    id: "exp2",
    order: 2,
    role: "AI-Augmented Full Stack Developer",
    company: "Partai Nasional Demokrat (NasDem)",
    location: "Surabaya, East Java, Indonesia",
    period: "Aug 2025 - May 2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    summary: "Engineered secure admin panel with election data aggregation, CRUD, and RBAC.",
    description: "Reduced development timeline by 40% by utilizing AI-assisted prototyping tools (Lovable AI) for initial landing page design and rapid iteration. Engineered a custom admin panel with election data aggregation, CRUD operations for program management, and role-based access control. Implemented Redis-based background job processing system, optimizing performance and enabling scalable async operations. Deployed production infrastructure on VPS with Cloudflare integration.",
    gallery: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"],
    tags: ["Next.js", "RBAC", "Redis", "Cloudflare"]
  },
  {
    id: "exp3",
    order: 3,
    role: "Discord Community Lead",
    company: "Venimee Discord Channel",
    location: "Surabaya, Indonesia (Remote)",
    period: "Jun 2024 - May 2026",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600",
    summary: "Scaled a creator community, designed engagement workflows, and managed moderation.",
    description: "Initiated and scaled a Discord-based community from zero, designing engagement workflows and fostering organic growth. Recruited, trained, and managed a team of moderators with clearly defined roles. Directed high-impact partnerships and held full ownership of strategic direction, daily governance, and community culture.",
    gallery: ["https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600"],
    tags: ["Discord", "Community Management", "Event Ops", "Partnerships"]
  },
  {
    id: "exp4",
    order: 4,
    role: "Autonomous Drone Solo Programmer (PIMNAS)",
    company: "Veteran Robotics | UPN Veteran Jawa Timur",
    location: "Surabaya, East Java, Indonesia",
    period: "Jan 2025 - Dec 2025",
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d5?auto=format&fit=crop&q=80&w=600",
    summary: "Engineered complete autonomous drone system and control dashboard.",
    description: "Engineered and configured a complete autonomous drone system, including the setup of the ROS2 development environment. Developed advanced path-planning and collision avoidance algorithms, integrating Particle Swarm Optimization (PSO) and Optimal Reciprocal Collision Avoidance (ORCA) for package delivery. Built and deployed Next.js control & monitoring dashboard on a VPS.",
    gallery: ["https://images.unsplash.com/photo-1507582020474-9a35b7d455d5?auto=format&fit=crop&q=80&w=600"],
    tags: ["ROS2", "MAVLink", "Next.js", "AI Agent"]
  },
  {
    id: "exp5",
    order: 5,
    role: "Autonomous Drone VTOL Solo Programmer (KRTI)",
    company: "Veteran Robotics | UPN Veteran Jawa Timur",
    location: "Surabaya, East Java, Indonesia",
    period: "Jan 2025 - Oct 2025",
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d5?auto=format&fit=crop&q=80&w=600",
    summary: "Managed VTOL drone setup and software development on Jetson Nano.",
    description: "Designed and implemented an end-to-end autonomous VTOL drone system. Developed full software stack using ROS2 Foxy on Ubuntu 20 for real-time drone control. Integrated MAVLink protocols and built a multi-sensor fusion system integrating ultrasonic, magnetometer, and computer vision sensors. Configured VPS with a reverse tunnel for secure remote operations.",
    gallery: ["https://images.unsplash.com/photo-1507582020474-9a35b7d455d5?auto=format&fit=crop&q=80&w=600"],
    tags: ["ROS2", "Jetson Nano", "MAVLink", "Sensor Fusion"]
  },
  {
    id: "exp6",
    order: 6,
    role: "Founder & Community Tech Lead",
    company: "BlockHood",
    location: "Surabaya, East Java, Indonesia",
    period: "Apr 2025 - Oct 2025",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600",
    summary: "Led Web3 community growth, operations, and strategic partnerships.",
    description: "Founded and expanded BlockHood Web3 community. Handled strategic developer operations, fostered partnerships with other Web3 protocols, managed moderators, and aligned community initiatives with tech stack implementation.",
    gallery: ["https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600"],
    tags: ["Web3", "Community Growth", "Leadership", "Vibe Coding"]
  },
  {
    id: "exp7",
    order: 7,
    role: "Solo Flutter Developer",
    company: "Pemerintah Kota Surabaya",
    location: "Surabaya, East Java, Indonesia",
    period: "Jul 2025 - Jul 2025",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600",
    summary: "Delivered two offline-first Flutter apps in a two-week sprint.",
    description: "Built the end-to-end development of two complete Flutter applications (warga & petugas). Architected a robust offline-first system using Riverpod state management. Integrated real-time synchronization via RESTful APIs and Socket.IO, reducing data latency by 60%. Designed a modern UI/UX using Material Design 3 and Lottie animations.",
    gallery: ["https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600"],
    tags: ["Flutter", "Riverpod", "Socket.IO", "Offline-First"]
  },
  {
    id: "exp8",
    order: 8,
    role: "Solo Full-Stack Web Developer",
    company: "Pemerintah Kota Surabaya",
    location: "Surabaya, East Java, Indonesia",
    period: "Jul 2025 - Jul 2025",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=600",
    summary: "Built secure admin dashboard with MySQL and custom RBAC.",
    description: "Developed and deployed a full-stack admin dashboard in 2 weeks using Next.js (App Router), TypeScript, and React. Architected secure backend using Next.js API Routes and MySQL, featuring bcrypt hashing, HMAC-signed sessions, SQL injection/CSRF protection, and rate-limiting. Implemented granular Role-Based Access Control (RBAC) system for 4 distinct user roles.",
    gallery: ["https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=600"],
    tags: ["Next.js", "MySQL", "RBAC", "Next.js API"]
  },
  {
    id: "exp9",
    order: 9,
    role: "Flutter Developer",
    company: "PT. IGS Indonesia Group",
    location: "Surabaya, East Java, Indonesia",
    period: "Jan 2025 - Jul 2025",
    image: "https://images.unsplash.com/photo-1581093588402-485ed6ad48d4?auto=format&fit=crop&q=80&w=600",
    summary: "Built Flutter app for landslide detection with IoT sensor integrations.",
    description: "Developed a responsive and performant Flutter-based mobile application for landslide detection. Focuses on real-time visualization of IoT sensor data, integrating the mobile app with hardware nodes via REST APIs. Managed local state using Provider and BLoC patterns.",
    gallery: ["https://images.unsplash.com/photo-1581093588402-485ed6ad48d4?auto=format&fit=crop&q=80&w=600"],
    tags: ["Flutter", "IoT", "BLoC", "APIs"]
  },
  {
    id: "exp10",
    order: 10,
    role: "Machine Learning & IoT Developer",
    company: "PT. IGS Indonesia Group",
    location: "Surabaya, East Java, Indonesia",
    period: "Jan 2025 - Jul 2025",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600",
    summary: "Designed ML sensor-fusion pipelines for landslide early warning systems.",
    description: "Developed and optimized machine learning models for early landslide potential detection. Integrated real-time data from IoT sensor arrays and applied sensor-fusion algorithms to reduce false alarms by 43% and improve accuracy.",
    gallery: ["https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600"],
    tags: ["Machine Learning", "IoT", "TensorFlow", "Sensor Fusion"]
  },
  {
    id: "exp11",
    order: 11,
    role: "AI Engineer",
    company: "ArcalisAI",
    location: "Surabaya, East Java, Indonesia",
    period: "Jan 2025 - May 2025",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600",
    summary: "Integrated OpenAI/OpenRouter APIs and fine-tuned prompt engineering pipelines.",
    description: "Developed and implemented AI systems, managing API pipelines for large language models including GPT and DeepSeek. Conducted hyperparameter selection, prompt tuning, and model optimization to enhance response quality and cost control.",
    gallery: ["https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600"],
    tags: ["AI Engineer", "OpenAI", "DeepSeek", "API Integration"]
  },
  {
    id: "exp12",
    order: 12,
    role: "Blockchain Developer",
    company: "ArcalisAI",
    location: "Surabaya, East Java, Indonesia",
    period: "Dec 2024 - May 2025",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?auto=format&fit=crop&q=80&w=600",
    summary: "Wrote smart contracts in Solidity and Rust-based Solana migration programs.",
    description: "Developed smart contracts using Solidity for blockchain-based applications. Designed and implemented Rust-based Solana migration contracts to enhance scalability and performance. Led the tech team in end-to-end decentralized deployments.",
    gallery: ["https://images.unsplash.com/photo-1622630998477-20aa696ecb05?auto=format&fit=crop&q=80&w=600"],
    tags: ["Solidity", "Rust", "Solana", "Smart Contracts"]
  },
  {
    id: "exp13",
    order: 13,
    role: "Community Moderator",
    company: "CARV",
    location: "Singapore (Remote)",
    period: "Dec 2023 - May 2025",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600",
    summary: "Managed game night events, ticket support, and community operations.",
    description: "Managed global Web3 gaming community events, resolved support tickets, reported bugs, and facilitated member interactions at CARV. Supported community engagement strategies, ensuring smooth user experiences.",
    gallery: ["https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600"],
    tags: ["Community Management", "Event Ops", "Support", "Web3"]
  },
  {
    id: "exp14",
    order: 14,
    role: "Community Lead & Marketer",
    company: "Seeds",
    location: "Jakarta, Indonesia",
    period: "Dec 2024 - Apr 2025",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600",
    summary: "Managed partnerships with Web3 communities and marketing content.",
    description: "Managed partnerships with Web3 communities on revenue-sharing mechanisms via Discord and Telegram. Coordinated market awareness campaigns and stock recommendations to attract potential clients.",
    gallery: ["https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600"],
    tags: ["Community Lead", "Marketing", "Partnerships", "Web3"]
  },
  {
    id: "exp15",
    order: 15,
    role: "Blockchain Developer",
    company: "Seeds",
    location: "Jakarta, Indonesia",
    period: "Dec 2024 - Feb 2025",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600",
    summary: "Built decentralized marketplace on the Diamante blockchain.",
    description: "Developed and deployed code for a decentralized marketplace on the Diamante blockchain network. Implemented core features such as NFT minting, listing, buying, and selling mechanisms. Conducted testing and contract optimization.",
    gallery: ["https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600"],
    tags: ["Blockchain", "Solidity", "Diamante", "NFTs"]
  },
  {
    id: "exp16",
    order: 16,
    role: "Autonomous Ship Team President",
    company: "Veteran Robotics | UPN Veteran Jawa Timur",
    location: "Surabaya, East Java, Indonesia",
    period: "Nov 2022 - Nov 2024",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600",
    summary: "Led autonomous surface vehicle team to 2nd place in national championships.",
    description: "Led the ASV team division in the robotics community to secure second place in the prestigious KKCTBN 2023 and KKI 2024 maritime robotics championships. Fostered collaborative work with Puspresnas.",
    gallery: ["https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600"],
    tags: ["ASV", "Maritime Robotics", "Team Leadership", "KKCTBN"]
  },
  {
    id: "exp17",
    order: 17,
    role: "R&D Staff & Event Chairman",
    company: "BEM Fasilkom UPN \"Veteran\" Jawa Timur",
    location: "Surabaya, East Java, Indonesia",
    period: "2023 - Apr 2024",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    summary: "Orchestrated AI and Data Science seminars and workshops.",
    description: "Served as Event Organizer Chairman for 'Fasilkom Talk #4', coordinating an offline seminar on AI and Data Science. Managed workshops, logistics, and speaker engagement to advance tech proficiency within the campus.",
    gallery: ["https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600"],
    tags: ["R&D Staff", "Event Operations", "Data Science", "Leadership"]
  },
  {
    id: "exp18",
    order: 18,
    role: "Junior Web Developer",
    company: "PT Imersa Solusi Teknologi",
    location: "Nganjuk, East Java, Indonesia",
    period: "May 2021 - Jul 2021",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600",
    summary: "Developed client landing pages using HTML, CSS, and JavaScript.",
    description: "Built and maintained responsive web applications for small businesses. Optimized visual assets, resolving layout issues to improve overall page loading speed.",
    gallery: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600"],
    tags: ["HTML", "CSS", "JavaScript", "Web Development"]
  }
];

const PUBLICATIONS = [
  { title: "Food Optimizing for Patients with Kidney Failure Using Evolution Strategies Algorithm" },
  { title: "Optimizing Chicken Feed Using Evolution strategies (ES) algorithm" },
  { title: "Exploring the Potential of Hybrid Whale Optimization Algorithm: A Literature Review" }
];

async function main() {
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
    update: {
      publications: PUBLICATIONS,
      certifications: ["IT Specialist Artificial Intelligence"]
    },
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
      publications: PUBLICATIONS,
      certifications: ["IT Specialist Artificial Intelligence"]
    },
  });

  for (const exp of EXPERIENCES) {
    await prisma.experience.upsert({
      where: { id: exp.id },
      update: exp,
      create: exp,
    });
  }

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
