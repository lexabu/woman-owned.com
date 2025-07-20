import { type ClassValue, clsx } from "clsx";
import { businesses } from '@/data/businesses';
import { Business } from '@/types/business';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getBusinessBySlug(slug: string): Business | undefined {
  return businesses.find(business => business.slug === slug);
}

export function getBusinessesByCity(city: string): Business[] {
  return businesses.filter(business => 
    business.city.toLowerCase() === city.toLowerCase()
  );
}

export function getBusinessesByCategory(category: string): Business[] {
  return businesses.filter(business => 
    business.category.toLowerCase().includes(category.toLowerCase())
  );
}

export function getFeaturedBusinesses(): Business[] {
  return businesses.filter(business => business.featured);
}

export function getBusinessesByCityAndCategory(city: string, category: string): Business[] {
  return businesses.filter(business => 
    business.city.toLowerCase() === city.toLowerCase() &&
    business.category.toLowerCase().includes(category.toLowerCase())
  );
}