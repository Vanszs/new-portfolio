export interface ZickrianExperience {
  id: string;
  organization: string;
  role: string;
  type: string;
  period: string;
  duration: string;
  location: string;
  logo?: string | null;
  tags: string[];
  description: string;
  bullets?: string[];
}

export interface ZickrianProject {
  id: string;
  title: string;
  year: string;
  category: string;
  description: string;
  image?: string | null;
  tags: string[];
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface StackGroup {
  number: string;
  label: string;
  items: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  href?: string;
}

export interface Award {
  title: string;
  prize: string;
  date: string;
  grade: string;
  href?: string;
}

export interface Publication {
  title: string;
  journal: string;
  date: string;
  href?: string;
}