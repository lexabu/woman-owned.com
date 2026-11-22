import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact Us | Woman-Owned',
  description: 'Questions, partnerships or listing updates? Get in touch with the Woman-Owned team.',
  path: '/contact',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
