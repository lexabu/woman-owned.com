import type { Business } from '@/types/business';
import type { Guide } from '@/data/resources';
import { socialProfiles } from '@/utils/businessUtils';
import { APP_CONFIG } from '@/utils/constants';
import { absoluteUrl, businessImage, businessPath } from '@/lib/seo';

type JsonLdValue = string | number | JsonLdNode | JsonLdValue[] | undefined;

/** One schema.org node. Undefined values are dropped by JSON.stringify. */
export interface JsonLdNode {
  '@type': string;
  [property: string]: JsonLdValue;
}

const ORGANIZATION_ID = absoluteUrl('/#organization');
const WEBSITE_ID = absoluteUrl('/#website');

export const organizationJsonLd = (): JsonLdNode => ({
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: APP_CONFIG.NAME,
  url: absoluteUrl('/'),
  logo: absoluteUrl('/apple-icon'),
  description: APP_CONFIG.DESCRIPTION,
});

export const websiteJsonLd = (): JsonLdNode => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: APP_CONFIG.NAME,
  url: absoluteUrl('/'),
  description: APP_CONFIG.DESCRIPTION,
  inLanguage: 'en-US',
  publisher: { '@type': 'Organization', '@id': ORGANIZATION_ID },
});

/**
 * A listing is a LocalBusiness only when its public street address is known (and shown on the page);
 * otherwise it is an Organization. Founder is emitted only for owners verified on the business's own site.
 */
export function businessJsonLd(business: Business): JsonLdNode {
  const pageUrl = absoluteUrl(businessPath(business));
  const image = businessImage(business);
  const sameAs = socialProfiles(business).map((profile) => profile.url);
  const streetAddress = business.contact?.address;

  return {
    '@type': streetAddress ? 'LocalBusiness' : 'Organization',
    '@id': `${pageUrl}#business`,
    name: business.name,
    description: business.description,
    url: business.website,
    mainEntityOfPage: pageUrl,
    image: image && absoluteUrl(image),
    telephone: business.contact?.phone,
    email: business.contact?.email,
    address: streetAddress
      ? {
          '@type': 'PostalAddress',
          streetAddress,
          addressLocality: business.city,
          addressRegion: business.state,
          addressCountry: 'US',
        }
      : undefined,
    areaServed: { '@type': 'City', name: business.city },
    founder: business.owner && { '@type': 'Person', name: business.owner.name },
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };
}

export const itemListJsonLd = (name: string, listings: Business[]): JsonLdNode => ({
  '@type': 'ItemList',
  name,
  numberOfItems: listings.length,
  itemListElement: listings.map((business, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: business.name,
    url: absoluteUrl(businessPath(business)),
  })),
});

export const articleJsonLd = (guide: Guide): JsonLdNode => ({
  '@type': 'Article',
  headline: guide.title,
  description: guide.description,
  url: absoluteUrl(guide.path),
  mainEntityOfPage: absoluteUrl(guide.path),
  datePublished: guide.datePublished,
  dateModified: guide.dateModified,
  author: { '@type': 'Organization', '@id': ORGANIZATION_ID, name: APP_CONFIG.NAME },
  publisher: { '@type': 'Organization', '@id': ORGANIZATION_ID, name: APP_CONFIG.NAME },
});
