export type Settings = {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  address: string;
  cnpj: string;
};

export type Client = {
  id: string;
  name: string;
  phone: string;
  email: string;
  document: string;
  address: string;
  notes: string;
};

export type Service = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
};

export type Project = {
  id: string;
  slug: string;
  name: string;
  category: string;
  excerpt: string;
  description: string;
  technologies: string;
  cover: string;
  videoUrl: string;
  externalUrl: string;
  featured: boolean;
};

export type DocumentItem = {
  description: string;
  quantity: number;
  unitPrice: number;
};

export type Budget = {
  id: string;
  number: string;
  clientId: string;
  status: string;
  validity: string;
  deadline: string;
  notes: string;
  total: number;
  createdAt: string;
  items: DocumentItem[];
};

export type Order = {
  id: string;
  number: string;
  clientId: string;
  status: string;
  paymentMethod: string;
  notes: string;
  total: number;
  createdAt: string;
  items: DocumentItem[];
};

export type Warranty = {
  id: string;
  number: string;
  clientId: string;
  status: string;
  coverage: string;
  term: string;
  notes: string;
  createdAt: string;
  items: DocumentItem[];
};

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  service: string;
  message: string;
  createdAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  username: string;
};

export type Database = {
  settings: Settings;
  users: User[];
  clients: Client[];
  services: Service[];
  projects: Project[];
  budgets: Budget[];
  orders: Order[];
  warranties: Warranty[];
  leads: Lead[];
};
