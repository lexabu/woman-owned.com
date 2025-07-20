// Application constants
export const APP_CONFIG = {
  NAME: 'Woman-Owned',
  TAGLINE: 'Discover Amazing Women-Owned Businesses',
  DESCRIPTION: 'Supporting women entrepreneurs and connecting you with incredible local businesses that make our communities stronger.',
  BASE_URL: 'https://woman-owned.com',
} as const;

// Business categories
export const BUSINESS_CATEGORIES = {
  BEAUTY_WELLNESS: 'Beauty & Wellness',
  FASHION_JEWELRY: 'Fashion & Jewelry',
  HOME_LIFESTYLE: 'Home & Lifestyle',
  FOOD_DINING: 'Food & Dining',
  EDUCATION_SERVICES: 'Education & Services',
} as const;

// Category slugs
export const CATEGORY_SLUGS = {
  BEAUTY: 'beauty',
  FASHION: 'fashion',
  HOME: 'home',
  FOOD: 'food',
  SERVICES: 'services',
} as const;

// Default values
export const DEFAULTS = {
  FEATURED_BUSINESS_LIMIT: 10,
  PLACEHOLDER_IMAGE: '/images/placeholder.svg',
} as const;

// Route patterns
export const ROUTES = {
  HOME: '/',
  DIRECTORY: '/directory',
  SUBMIT: '/submit',
  ABOUT: '/about',
  CONTACT: '/contact',
  BUSINESS: '/business',
} as const;

// Phone number area codes by city
export const AREA_CODES = {
  LEXINGTON: '859',
  LOS_ANGELES: '323',
  MIAMI: '305',
  NEW_ORLEANS: '504',
  LAFAYETTE: '337',
  ATLANTA: '404',
} as const;