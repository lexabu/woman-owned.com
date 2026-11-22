import { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

/** AI assistants and search crawlers named explicitly, so a future `*` rule can't silently block them. */
const WELCOMED_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Google-Extended',
  'Bingbot',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: [...WELCOMED_CRAWLERS, '*'], allow: '/', disallow: '/private/' },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
