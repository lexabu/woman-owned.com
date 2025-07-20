import { businesses, cities, categories } from '@/data/businesses';
import { Business } from '@/types/business';

/**
 * Get all businesses from master data
 */
export const getAllBusinesses = (): Business[] => {
  return businesses;
};

/**
 * Get total count of all businesses
 */
export const getTotalBusinessCount = (): number => {
  return businesses.length;
};

/**
 * Get total count of featured businesses
 */
export const getFeaturedBusinessCount = (): number => {
  return businesses.filter(business => business.featured).length;
};

/**
 * Get total count of cities
 */
export const getTotalCityCount = (): number => {
  return cities.length;
};

/**
 * Get businesses for a specific city
 */
export const getBusinessesByCity = (citySlug: string): Business[] => {
  return businesses.filter(business => 
    business.city.toLowerCase().replace(/\s+/g, '-') === citySlug.toLowerCase()
  );
};

/**
 * Get featured businesses for a specific city
 */
export const getFeaturedBusinessesByCity = (citySlug: string): Business[] => {
  return businesses.filter(business => 
    business.city.toLowerCase().replace(/\s+/g, '-') === citySlug.toLowerCase() && 
    business.featured
  );
};

/**
 * Get business count for a specific city
 */
export const getBusinessCountByCity = (citySlug: string): number => {
  return getBusinessesByCity(citySlug).length;
};

/**
 * Get all featured businesses
 */
export const getFeaturedBusinesses = (): Business[] => {
  return businesses.filter(business => business.featured);
};

/**
 * Get businesses by category
 */
export const getBusinessesByCategory = (categorySlug: string): Business[] => {
  return businesses.filter(business => {
    const businessCategorySlug = business.category.toLowerCase().replace(/\s+/g, '-').replace('&', '');
    const searchSlug = categorySlug.toLowerCase();
    
    // Handle special cases
    if (searchSlug === 'beauty') return businessCategorySlug.includes('beauty');
    if (searchSlug === 'fashion') return businessCategorySlug.includes('fashion');
    if (searchSlug === 'home') return businessCategorySlug.includes('home');
    if (searchSlug === 'food') return businessCategorySlug.includes('food');
    if (searchSlug === 'services') return businessCategorySlug.includes('services') || businessCategorySlug.includes('education');
    
    return businessCategorySlug.includes(searchSlug);
  });
};

/**
 * Get businesses by city and category
 */
export const getBusinessesByCityAndCategory = (citySlug: string, categorySlug: string): Business[] => {
  return businesses.filter(business => {
    const matchesCity = business.city.toLowerCase().replace(/\s+/g, '-') === citySlug.toLowerCase();
    const businessCategorySlug = business.category.toLowerCase().replace(/\s+/g, '-').replace('&', '');
    const searchSlug = categorySlug.toLowerCase();
    
    let matchesCategory = false;
    if (searchSlug === 'beauty') matchesCategory = businessCategorySlug.includes('beauty');
    else if (searchSlug === 'fashion') matchesCategory = businessCategorySlug.includes('fashion');
    else if (searchSlug === 'home') matchesCategory = businessCategorySlug.includes('home');
    else if (searchSlug === 'food') matchesCategory = businessCategorySlug.includes('food');
    else if (searchSlug === 'services') matchesCategory = businessCategorySlug.includes('services') || businessCategorySlug.includes('education');
    else matchesCategory = businessCategorySlug.includes(searchSlug);
    
    return matchesCity && matchesCategory;
  });
};

/**
 * Get a business by its slug
 */
export const getBusinessBySlug = (slug: string): Business | undefined => {
  return businesses.find(business => business.slug === slug);
};

/**
 * Get city information by slug
 */
export const getCityBySlug = (slug: string) => {
  return cities.find(city => city.slug === slug.toLowerCase());
};

/**
 * Get all cities
 */
export const getAllCities = () => {
  return cities;
};

/**
 * Get all categories with accurate counts
 */
export const getAllCategoriesWithCounts = () => {
  return categories.map(category => ({
    ...category,
    businessCount: getBusinessesByCategory(category.slug).length
  }));
};

/**
 * Check if a city exists
 */
export const cityExists = (citySlug: string): boolean => {
  return cities.some(city => city.slug === citySlug.toLowerCase());
};

/**
 * Check if a category exists
 */
export const categoryExists = (categorySlug: string): boolean => {
  return categories.some(category => category.slug === categorySlug.toLowerCase());
};