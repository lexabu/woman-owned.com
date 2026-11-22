import { businesses, cities } from '@/data/businesses';
import { wbeCertificationGuide } from '@/data/resources';
import { absoluteUrl, businessPath } from '@/lib/seo';
import { getBusinessesByCity } from '@/utils/businessUtils';
import { APP_CONFIG } from '@/utils/constants';

export const dynamic = 'force-static';

/** llms.txt (https://llmstxt.org) generated from the directory data so it never drifts from the site. */
function buildLlmsTxt(): string {
  const citySections = cities
    .map((city) => ({ city, listings: getBusinessesByCity(city.slug) }))
    .filter(({ listings }) => listings.length > 0);

  const lines = [
    `# ${APP_CONFIG.NAME}`,
    '',
    `> ${APP_CONFIG.NAME} (${absoluteUrl('/')}) is a directory of women-owned businesses in the United States. ` +
      `It lists ${businesses.length} businesses across ${citySections.length} cities; each listing gives the business's ` +
      'description, category, city, services and official website.',
    '',
    '## Key pages',
    '',
    `- [Business directory](${absoluteUrl('/directory')}): Every listed women-owned business, filterable by city and category.`,
    `- [${wbeCertificationGuide.title}](${absoluteUrl(wbeCertificationGuide.path)}): ${wbeCertificationGuide.description}`,
    `- [Resources](${absoluteUrl('/resources')}): Guides for women business owners.`,
    `- [Submit a business](${absoluteUrl('/submit')}): How a women-owned business can request a listing.`,
    `- [About](${absoluteUrl('/about')}): The directory's mission.`,
    '',
    ...citySections.flatMap(({ city, listings }) => [
      `## ${city.name}, ${city.state}`,
      '',
      `- [${city.name} directory](${absoluteUrl(`/directory/${city.slug}`)}): All women-owned businesses listed in ${city.name}.`,
      ...listings.map(
        (business) =>
          `- [${business.name}](${absoluteUrl(businessPath(business))}): ${business.category}. ${business.description}`,
      ),
      '',
    ]),
  ];
  return lines.join('\n');
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
