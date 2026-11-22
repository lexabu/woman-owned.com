import { MetadataRoute } from 'next';
import { businesses, categories, cities } from '@/data/businesses';
import { wbeCertificationGuide } from '@/data/resources';
import { absoluteUrl, businessPath } from '@/lib/seo';
import { getBusinessesByCityAndCategory } from '@/utils/businessUtils';

/**
 * The only sitemap source. lastmod is set only where the data records a real edit date (the guides);
 * everything else omits it rather than claim "changed at build time".
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, lastModified?: string) => ({ url: absoluteUrl(path), lastModified });

  const cityPages = cities.flatMap((city) => {
    const categoryPages = categories
      .filter((category) => getBusinessesByCityAndCategory(city.slug, category.slug).length > 0)
      .map((category) => entry(`/directory/${city.slug}/${category.slug}`));
    return [entry(`/directory/${city.slug}`), ...categoryPages];
  });

  return [
    entry('/'),
    entry('/directory'),
    ...cityPages,
    ...businesses.map((business) => entry(businessPath(business))),
    entry('/resources', wbeCertificationGuide.dateModified),
    entry(wbeCertificationGuide.path, wbeCertificationGuide.dateModified),
    entry('/about'),
    entry('/submit'),
    entry('/contact'),
  ];
}
