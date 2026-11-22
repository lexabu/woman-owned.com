import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Submit Your Business | Woman-Owned',
  description: 'Submit your women-owned business to be listed in the Woman-Owned directory.',
  path: '/submit',
});

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
