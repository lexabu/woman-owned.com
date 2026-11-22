export interface Business {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  city: string;
  state: string;
  /** Only set when the business's own site is live and verified. */
  website?: string;
  appointmentsUrl?: string;
  /** Only set when verified against the business's own site. */
  owner?: {
    name: string;
    bio?: string;
    /** True only where the business's own site names this person as its founder. */
    founderVerified?: true;
  };
  image: string;
  services: string[];
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  contact?: {
    label?: string;
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