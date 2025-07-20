export interface Business {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  city: string;
  state: string;
  website: string;
  owner: {
    name: string;
    bio?: string;
  };
  image: string;
  services: string[];
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  contact?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  featured: boolean;
  createdAt: string;
}

export interface City {
  name: string;
  slug: string;
  state: string;
  businessCount: number;
}

export interface Category {
  name: string;
  slug: string;
  businessCount: number;
}