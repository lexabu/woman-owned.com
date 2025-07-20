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

// Theme colors - matches CSS custom properties in globals.css
export const COLORS = {
  // Coral - Primary brand color
  CORAL: {
    50: '#fef7f4',
    100: '#fdeee8',
    200: '#fad8c7',
    300: '#f7c2a6',
    400: '#f19664',
    500: '#eb6a22', // Primary coral
    600: '#d4601f',
    700: '#b14d1a',
    800: '#8e3915',
    900: '#742f12',
  },
  
  // Navy - Secondary brand color  
  NAVY: {
    50: '#f0f2f5',
    100: '#d9dee6',
    200: '#b3becc',
    300: '#8d9eb3',
    400: '#675d80',
    500: '#4a5568',
    600: '#2d3748', // Primary navy
    700: '#2a2e3a',
    800: '#1a202c',
    900: '#171923',
  },
  
  // Gold - Accent color (currently unused in components)
  GOLD: {
    50: '#fffcf0',
    100: '#fef7d9',
    200: '#fdecb3',  
    300: '#fce08d',
    400: '#fac842',
    500: '#f7b500', // Primary gold
    600: '#dea300',
    700: '#b58600',
    800: '#916a00',  
    900: '#775700',
  },
  
  // Neutral colors for backgrounds and text
  NEUTRAL: {
    WHITE: '#ffffff',
    BLACK: '#000000',
    DARK_BACKGROUND: '#0a0a0a',
    DARK_FOREGROUND: '#ededed',
    LIGHT_GRAY: '#f7fafc',
    MEDIUM_GRAY: '#718096',
    DARK_TEXT: '#333333',
  },
  
  // Semantic color mappings
  PRIMARY: '#eb6a22', // coral-500
  SECONDARY: '#2d3748', // navy-600
  ACCENT: '#f7b500', // gold-500
  SUCCESS: '#10b981', // green-500 (for future use)
  WARNING: '#f59e0b', // amber-500 (for future use)
  DANGER: '#ef4444', // red-500 (for future use)
} as const;

// Color utilities for email templates and other use cases
export const EMAIL_COLORS = {
  HEADER: COLORS.CORAL[500],
  TEXT: COLORS.NAVY[600], 
  LABEL: COLORS.NAVY[500],
  BACKGROUND: COLORS.NEUTRAL.LIGHT_GRAY,
  MUTED_TEXT: COLORS.NEUTRAL.MEDIUM_GRAY,
  DARK_TEXT: COLORS.NEUTRAL.DARK_TEXT,
} as const;