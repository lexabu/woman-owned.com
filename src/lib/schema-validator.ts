import { Business } from '@/types/business';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateBusiness(business: Business): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields validation
  if (!business.id?.trim()) errors.push('Business ID is required');
  if (!business.name?.trim()) errors.push('Business name is required');
  if (!business.slug?.trim()) errors.push('Business slug is required');
  if (!business.description?.trim()) errors.push('Business description is required');
  if (!business.category?.trim()) errors.push('Business category is required');
  if (!business.city?.trim()) errors.push('City is required');
  if (!business.state?.trim()) errors.push('State is required');
  if (!business.website?.trim()) errors.push('Website URL is required');
  if (!business.owner?.name?.trim()) errors.push('Owner name is required');
  if (!business.image?.trim()) errors.push('Business image is required');
  if (!business.services?.length) errors.push('At least one service is required');
  if (!business.createdAt?.trim()) errors.push('Created date is required');

  // Format validations
  if (business.website && !isValidUrl(business.website)) {
    errors.push('Website URL must be valid (include https://)');
  }

  if (business.contact?.email && !isValidEmail(business.contact.email)) {
    errors.push('Contact email must be valid');
  }

  if (business.contact?.phone && !isValidPhone(business.contact.phone)) {
    warnings.push('Phone number format should be (XXX) XXX-XXXX');
  }

  // Slug validation
  if (business.slug && !isValidSlug(business.slug)) {
    errors.push('Slug must be lowercase with hyphens only (no spaces or special characters)');
  }

  // Description length
  if (business.description && business.description.length < 50) {
    warnings.push('Description should be at least 50 characters for better SEO');
  }

  if (business.description && business.description.length > 500) {
    warnings.push('Description should be under 500 characters for optimal display');
  }

  // Services validation
  if (business.services) {
    business.services.forEach((service, index) => {
      if (!service?.trim()) {
        errors.push(`Service at index ${index} is empty`);
      }
    });
  }

  // Social media format validation
  if (business.socialMedia?.instagram && !business.socialMedia.instagram.startsWith('@')) {
    warnings.push('Instagram handle should start with @');
  }

  // Date validation
  if (business.createdAt && !isValidDate(business.createdAt)) {
    errors.push('Created date must be in YYYY-MM-DD format');
  }

  // SEO recommendations
  if (business.name && business.name.length > 60) {
    warnings.push('Business name should be under 60 characters for better SEO titles');
  }

  if (!business.owner.bio) {
    warnings.push('Owner bio is recommended for better business storytelling');
  }

  if (!business.contact?.phone && !business.contact?.email) {
    warnings.push('At least one contact method (phone or email) is recommended');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

export function validateStructuredData(business: Business): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if business data supports rich structured data
  if (!business.city || !business.state) {
    errors.push('City and state are required for LocalBusiness schema');
  }

  if (!business.contact?.phone && !business.contact?.email) {
    warnings.push('Contact information improves LocalBusiness schema effectiveness');
  }

  if (!business.description || business.description.length < 100) {
    warnings.push('Longer descriptions improve structured data quality');
  }

  if (!business.services?.length) {
    warnings.push('Services list enhances LocalBusiness schema');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

export function validateSEOReadiness(business: Business): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Meta title length (business name + location + "Women-Owned Business")
  const estimatedTitleLength = business.name.length + business.city.length + 25;
  if (estimatedTitleLength > 60) {
    warnings.push('Business name + location may create too long page titles for SEO');
  }

  // Meta description length
  if (business.description.length < 120) {
    warnings.push('Description should be at least 120 characters for optimal meta descriptions');
  }

  if (business.description.length > 160) {
    warnings.push('Description over 160 characters may be truncated in search results');
  }

  // Image optimization
  if (business.image === '/images/placeholder.svg') {
    warnings.push('Replace placeholder image with actual business photo for better engagement');
  }

  // Local SEO factors
  if (!business.contact?.phone) {
    warnings.push('Phone number helps with local SEO rankings');
  }

  if (!business.contact?.address) {
    warnings.push('Business address would improve local SEO (if applicable)');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

// Helper functions
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

function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  return phoneRegex.test(phone);
}

function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

function isValidDate(date: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;
  
  const parsedDate = new Date(date);
  return parsedDate instanceof Date && !isNaN(parsedDate.getTime());
}