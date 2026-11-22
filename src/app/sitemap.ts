import { MetadataRoute } from 'next';
import { businesses, categories, cities } from '@/data/businesses';
import { wbeCertificationGuide } from '@/data/resources';
import { absoluteUrl, businessLastModified, businessPath, latestModified } from '@/lib/seo';
import { getBusinessesByCity, getBusinessesByCityAndCategory } from '@/utils/businessUtils';

/**
 * The only sitemap source. lastmod comes from the data (listing dates, guide dates);
 * pages with no dated content omit it rather than claim "changed at build time".
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, lastModified?: string) => ({ url: absoluteUrl(path), lastModified });

  const cityPages = cities.flatMap((city) => {
    const cityListings = getBusinessesByCity(city.slug);
    const categoryPages = categories
      .map((category) => ({ category, listings: getBusinessesByCityAndCategory(city.slug, category.slug) }))
      .filter(({ listings }) => listings.length > 0)
      .map(({ category, listings }) => entry(`/directory/${city.slug}/${category.slug}`, latestModified(listings)));
    return [entry(`/directory/${city.slug}`, latestModified(cityListings)), ...categoryPages];
  });

  return [
    entry('/', latestModified(businesses)),
    entry('/directory', latestModified(businesses)),
    ...cityPages,
    ...businesses.map((business) => entry(businessPath(business), businessLastModified(business))),
    entry('/resources', wbeCertificationGuide.dateModified),
    entry(wbeCertificationGuide.path, wbeCertificationGuide.dateModified),
    entry('/about'),
    entry('/submit'),
    entry('/contact'),
  ];
}
