import { Service, Testimonial, Project } from "./types";

export const SERVICES: Service[] = [
  {
    id: "01",
    title: "AI/ML Solutions",
    tags: [
      "LLM Integration",
      "Computer Vision",
      "Model Optimization",
      "TensorFlow & PyTorch"
    ],
    description:
      "End-to-end AI systems: from data preprocessing and model training to deployment. I build production-grade ML pipelines, integrate large language models, and optimize computer vision solutions for real-world impact."
  },
  {
    id: "02",
    title: "Full-Stack Web & Mobile Development",
    tags: [
      "Next.js & React",
      "Flutter",
      "TypeScript",
      "Secure Backend Architecture"
    ],
    description:
      "Building scalable web and mobile applications with modern stacks. I deliver production-ready Next.js / React dashboards, cross-platform Flutter apps, and secure backend systems with robust authentication and RBAC."
  },
  {
    id: "03",
    title: "Blockchain & Smart Contracts",
    tags: [
      "Solidity",
      "Rust / Solana",
      "Diamante Network",
      "NFT Marketplaces"
    ],
    description:
      "Architecting and deploying decentralized applications, smart contracts, and NFT marketplaces. Hands-on experience with Solidity, Rust-based Solana contracts, and the Diamante blockchain network."
  },
  {
    id: "04",
    title: "Autonomous Systems & IoT",
    tags: [
      "ROS2",
      "Drone & ASV Systems",
      "Sensor Fusion",
      "Jetson Nano"
    ],
    description:
      "Engineering autonomous drones and surface vehicles with ROS2, MAVLink, and sensor fusion. From path planning and collision avoidance to real-time monitoring dashboards deployed on VPS infrastructure."
  },
  {
    id: "05",
    title: "Community & Technical Leadership",
    tags: [
      "Web3 Community Growth",
      "Team Leadership",
      "Event Operations",
      "Strategic Partnerships"
    ],
    description:
      "Leading and scaling technical communities, moderator teams, and strategic partnerships. I align community goals with product growth and mentor teams to deliver high-impact initiatives."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Owie Technologies",
    role: "Founding Engineer Engagement",
    company: "Owie Motion",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
    text:
      "Bevan integrated Generative AI features and backend infrastructure across Owie Motion, accelerating feature delivery while maintaining scalable architecture.",
    rating: 5
  },
  {
    id: "t2",
    name: "Partai Nasional Demokrat",
    role: "AI-Augmented Full Stack Developer",
    company: "NasDem",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    text:
      "Delivered a secure admin dashboard with election data aggregation, RBAC, and Redis-based background jobs, reducing the initial development timeline by 40%.",
    rating: 5
  },
  {
    id: "t3",
    name: "Pemerintah Kota Surabaya",
    role: "Solo Flutter Developer",
    company: "Surabaya Smart City",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
    text:
      "Built two production Flutter applications end-to-end in a two-week sprint, achieving a 4.8/5 pilot satisfaction rating and zero crashes at launch.",
    rating: 5
  },
  {
    id: "t4",
    name: "Veteran Robotics UPNVJT",
    role: "Autonomous Drone Solo Programmer",
    company: "KRTI / PIMNAS",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
    text:
      "Engineered a complete autonomous drone system using ROS2, MAVLink, and computer vision, complemented by a full-stack monitoring dashboard deployed on a VPS.",
    rating: 5
  }
];

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Owie Motion",
    category: "Web App",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    tags: ["Next.js", "Generative AI", "Full-Stack"],
    year: "2026"
  },
  {
    id: "p2",
    title: "NasDem Election Dashboard",
    category: "Web App",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    tags: ["Next.js", "RBAC", "Redis"],
    year: "2026"
  },
  {
    id: "p3",
    title: "Surabaya Smart City Apps",
    category: "Mobile App",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600",
    tags: ["Flutter", "Offline-First", "IoT"],
    year: "2025"
  },
  {
    id: "p4",
    title: "Autonomous Drone Delivery",
    category: "Autonomous Systems",
    image:
      "https://images.unsplash.com/photo-1507582020474-9a35b7d455d5?auto=format&fit=crop&q=80&w=600",
    tags: ["ROS2", "MAVLink", "Computer Vision"],
    year: "2025"
  },
  {
    id: "p5",
    title: "Landslide Detection IoT",
    category: "IoT",
    image:
      "https://images.unsplash.com/photo-1581093588402-485ed6ad48d4?auto=format&fit=crop&q=80&w=600",
    tags: ["Flutter", "Computer Vision", "IoT"],
    year: "2025"
  },
  {
    id: "p6",
    title: "Diamante NFT Marketplace",
    category: "Blockchain",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600",
    tags: ["Solidity", "Diamante", "NFT"],
    year: "2025"
  },
  {
    id: "p7",
    title: "ArcalisAI LLM Pipeline",
    category: "AI/ML",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600",
    tags: ["GPT", "DeepSeek", "API Integration"],
    year: "2025"
  },
  {
    id: "p8",
    title: "Solana Migration Contracts",
    category: "Blockchain",
    image:
      "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?auto=format&fit=crop&q=80&w=600",
    tags: ["Rust", "Solana", "Solidity"],
    year: "2025"
  },
  {
    id: "p9",
    title: "Carv Community Operations",
    category: "Community",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600",
    tags: ["Discord", "Event Ops", "Support"],
    year: "2023-2025"
  },
  {
    id: "p10",
    title: "BlockHood Web3 Community",
    category: "Community",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600",
    tags: ["Web3", "Partnerships", "Leadership"],
    year: "2025"
  },
  {
    id: "p11",
    title: "Venimee Discord Channel",
    category: "Community",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600",
    tags: ["Discord", "Moderation", "Growth"],
    year: "2024-2026"
  },
  {
    id: "p12",
    title: "Autonomous Surface Vehicle",
    category: "Robotics",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600",
    tags: ["ASV", "KKCTBN", "KKI"],
    year: "2022-2024"
  },
  {
    id: "p13",
    title: "Bangkit IoT Computer Vision",
    category: "AI/ML",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    tags: ["Python", "TensorFlow", "IoT"],
    year: "2024"
  },
  {
    id: "p14",
    title: "Imersa Junior Web Project",
    category: "Web App",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600",
    tags: ["HTML", "CSS", "JavaScript"],
    year: "2021"
  }
];
