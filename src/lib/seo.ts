import type { Metadata } from 'next';
import type { Business } from '@/types/business';
import { APP_CONFIG, DEFAULTS } from '@/utils/constants';

/** Absolute URL on the canonical host (www). */
export const absoluteUrl = (path: string): string => new URL(path, APP_CONFIG.BASE_URL).toString();

export const businessPath = (business: Business): string => `/business/${business.slug}`;

/** The business's real photo, or undefined while it still uses the placeholder. */
export const businessImage = (business: Business): string | undefined =>
  business.image === DEFAULTS.PLACEHOLDER_IMAGE ? undefined : business.image;

/** Last time a listing's content changed, as an ISO date. */
export const businessLastModified = (business: Business): string =>
  business.updatedAt ?? business.createdAt;

/** Most recent change across a set of listings, for list pages' sitemap lastmod. */
export const latestModified = (listings: Business[]): string | undefined =>
  listings.map(businessLastModified).sort().at(-1);

interface PageSeo {
  title: string;
  description: string;
  /** Path on this site; resolved against metadataBase for canonical and og:url. */
  path: string;
  type?: 'website' | 'article';
  images?: string[];
}

/** Title, description, canonical and matching Open Graph/Twitter tags for one page. */
export function pageMetadata({ title, description, path, type = 'website', images }: PageSeo): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: APP_CONFIG.NAME, type, images },
    twitter: { card: 'summary_large_image', title, description, images },
  };
}
