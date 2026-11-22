import Link from 'next/link';
import { ArrowRight, Search, Star } from 'lucide-react';
import HomeCityHighlights from '@/components/HomeCityHighlights';
import { pageMetadata } from '@/lib/seo';
import { APP_CONFIG } from '@/utils/constants';

export const metadata = pageMetadata({
  title: `${APP_CONFIG.NAME} | ${APP_CONFIG.TAGLINE}`,
  description: APP_CONFIG.DESCRIPTION,
  path: '/',
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HomeCityHighlights />

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We believe in the power of women-owned businesses to transform communities. 
            Our platform celebrates female entrepreneurs, helps customers discover incredible 
            local businesses, and creates meaningful connections that drive economic growth.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="bg-coral-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-coral-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Celebrate Success</h3>
              <p className="text-gray-600">Highlighting the achievements of women entrepreneurs</p>
            </div>
            <div className="text-center">
              <div className="bg-coral-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-coral-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Easy Discovery</h3>
              <p className="text-gray-600">Making it simple to find amazing local businesses</p>
            </div>
            <div className="text-center">
              <div className="bg-coral-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-8 w-8 text-coral-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Drive Growth</h3>
              <p className="text-gray-600">Supporting economic development in our communities</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-coral-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-coral-100 mb-8">
            Join our growing community of women entrepreneurs and supporters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit"
              className="bg-white text-coral-500 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              List Your Business
            </Link>
            <Link
              href="/directory"
              className="border-2 border-white text-white hover:bg-white hover:text-coral-500 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Browse Directory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
