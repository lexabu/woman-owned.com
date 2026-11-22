import type { JsonLdNode } from '@/lib/structured-data';

/** Renders schema.org JSON-LD into the server HTML. `<` is escaped so data can't close the script tag. */
export default function JsonLd({ data }: { data: JsonLdNode }) {
  const json = JSON.stringify({ '@context': 'https://schema.org', ...data }).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
