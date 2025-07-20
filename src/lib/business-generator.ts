import { Business } from '@/types/business';

interface BusinessInput {
  name: string;
  website: string;
  description: string;
  category: string;
  city: string;
  state: string;
  ownerName: string;
  ownerBio?: string;
  services: string[];
  phone?: string;
  email?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
}

export function generateBusinessData(input: BusinessInput): Business {
  // Generate slug from business name
  const slug = input.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // Generate unique ID (in real app, this would come from database)
  const id = Math.random().toString(36).substring(2, 9);

  const business: Business = {
    id,
    name: input.name,
    slug,
    description: input.description,
    category: input.category,
    city: input.city,
    state: input.state,
    website: input.website,
    owner: {
      name: input.ownerName,
      bio: input.ownerBio,
    },
    image: '/images/placeholder.svg', // Default placeholder
    services: input.services,
    socialMedia: {
      ...(input.instagram && { instagram: input.instagram }),
      ...(input.facebook && { facebook: input.facebook }),
      ...(input.twitter && { twitter: input.twitter }),
    },
    contact: {
      ...(input.phone && { phone: input.phone }),
      ...(input.email && { email: input.email }),
    },
    featured: false, // New businesses start as non-featured
    createdAt: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
  };

  return business;
}

export function formatBusinessForDataFile(business: Business): string {
  return `  {
    id: '${business.id}',
    name: '${business.name}',
    slug: '${business.slug}',
    description: '${business.description.replace(/'/g, "\\'")}',
    category: '${business.category}',
    city: '${business.city}',
    state: '${business.state}',
    website: '${business.website}',
    owner: {
      name: '${business.owner.name}',${
        business.owner.bio ? `\n      bio: '${business.owner.bio.replace(/'/g, "\\'")}'` : ''
      }
    },
    image: '${business.image}',
    services: [
${business.services.map(service => `      '${service}'`).join(',\n')}
    ],${
      Object.keys(business.socialMedia || {}).length > 0 ? `
    socialMedia: {${
      business.socialMedia?.instagram ? `\n      instagram: '${business.socialMedia.instagram}',` : ''
    }${
      business.socialMedia?.facebook ? `\n      facebook: '${business.socialMedia.facebook}',` : ''
    }${
      business.socialMedia?.twitter ? `\n      twitter: '${business.socialMedia.twitter}',` : ''
    }
    },` : ''
    }${
      Object.keys(business.contact || {}).length > 0 ? `
    contact: {${
      business.contact?.phone ? `\n      phone: '${business.contact.phone}',` : ''
    }${
      business.contact?.email ? `\n      email: '${business.contact.email}',` : ''
    }
    },` : ''
    }
    featured: ${business.featured},
    createdAt: '${business.createdAt}'
  }`;
}

export function validateBusinessData(input: Partial<BusinessInput>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields
  if (!input.name?.trim()) errors.push('Business name is required');
  if (!input.website?.trim()) errors.push('Website URL is required');
  if (!input.description?.trim()) errors.push('Description is required');
  if (!input.category?.trim()) errors.push('Category is required');
  if (!input.city?.trim()) errors.push('City is required');
  if (!input.state?.trim()) errors.push('State is required');
  if (!input.ownerName?.trim()) errors.push('Owner name is required');
  if (!input.services?.length) errors.push('At least one service is required');

  // URL validation
  if (input.website && !isValidUrl(input.website)) {
    errors.push('Website URL must be valid (include https://)');
  }

  // Email validation
  if (input.email && !isValidEmail(input.email)) {
    errors.push('Email address must be valid');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}