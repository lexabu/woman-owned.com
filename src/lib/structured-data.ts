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

export function localBusinessJsonLd(business: Business): JsonLdNode {
  const pageUrl = absoluteUrl(businessPath(business));
  const image = businessImage(business);
  const sameAs = socialProfiles(business).map((profile) => profile.url);

  return {
    '@type': 'LocalBusiness',
    '@id': `${pageUrl}#business`,
    name: business.name,
    description: business.description,
    url: business.website,
    mainEntityOfPage: pageUrl,
    image: image && absoluteUrl(image),
    telephone: business.contact?.phone,
    email: business.contact?.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.contact?.address,
      addressLocality: business.city,
      addressRegion: business.state,
      addressCountry: 'US',
    },
    areaServed: { '@type': 'City', name: business.city },
    founder: { '@type': 'Person', name: business.owner.name, description: business.owner.bio },
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    makesOffer: business.services.map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service },
    })),
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
