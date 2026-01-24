export type HeroHighlight = {
  title: string;
  text: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  contactCta: string;
  imageUrl: string;
  highlights: HeroHighlight[];
};

export type Service = {
  title: string;
  description: string;
  items: string[];
};

export type Solution = {
  tag: string;
  title: string;
  text: string;
};

export type TechnologyItem = {
  title: string;
  text: string;
  meta: string;
  imageUrl?: string;
};

export type ProductItem = {
  name: string;
  category: string;
  description: string;
  imageUrl?: string;
};

export type CompanyMetric = {
  value: string;
  label: string;
  text: string;
};

export type NewsItem = {
  id: string;
  date: string;
  title: string;
  text: string;
  imageUrl?: string;
};

export type ResourceItem = {
  id: string;
  title: string;
  href: string;
  description: string;
};

export type ContactChannel = {
  label: string;
  value: string;
};

export type ContactContent = {
  eyebrow: string;
  title: string;
  text: string;
  whatsapp: string;
  commercialEmail: string;
  channels: ContactChannel[];
  resources: ResourceItem[];
};

export type GuidanceContent = {
  eyebrow: string;
  title: string;
  text: string;
  tags: string[];
};

export type TechnologyContent = {
  eyebrow: string;
  title: string;
  text: string;
};

export type CompanyContent = {
  eyebrow: string;
  title: string;
  text: string;
};

export type NewsContent = {
  eyebrow: string;
  title: string;
  text: string;
};

export type JobsContent = {
  eyebrow: string;
  title: string;
  text: string;
  points: string[];
};

export type LandingContent = {
  hero: HeroContent;
  guidance: GuidanceContent;
  services: Service[];
  solutions: Solution[];
  technology: TechnologyItem[];
  products: ProductItem[];
  company: CompanyMetric[];
  news: NewsItem[];
  contact: ContactContent;
  jobs: JobsContent;
};
