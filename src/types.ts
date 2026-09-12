export interface Service {
  id: string;
  title: string;
  tags: string[];
  description: string;
  image?: string | null;
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
  description: string;
}
