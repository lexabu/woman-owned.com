import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Re-export utilities from the centralized location
export {
  getBusinessBySlug,
  getBusinessesByCity,
  getBusinessesByCategory,
  getFeaturedBusinesses,
  getBusinessesByCityAndCategory,
  getAllBusinesses,
  getTotalBusinessCount,
  getFeaturedBusinessCount,
  getTotalCityCount,
  getFeaturedBusinessesByCity,
  getBusinessCountByCity,
  getCityBySlug,
  getAllCities,
  getAllCategoriesWithCounts,
  cityExists,
  categoryExists
} from '@/utils/businessUtils';