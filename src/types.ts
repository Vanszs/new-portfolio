export interface Service {
  id: string; // e.g., '01', '02'
  title: string;
  tags: string[];
  description: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
  rating: number;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  tags: string[];
  year: string;
}
