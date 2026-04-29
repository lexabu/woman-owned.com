import Link from 'next/link';
import { ArrowRight, BookOpen, FileCheck, Award } from 'lucide-react';

export const metadata = {
  title: 'Resources for Women-Owned Businesses | Woman-Owned',
  description:
    'Practical guides on certification, classification, and growth for women-owned businesses. Start with our WBE certification guide.',
};

const guides = [
  {
    href: '/resources/wbe-certification-guide',
    title: 'WBE Certification: A Complete Guide',
    description:
      'What WBE certification is, who certifies it, what it costs, and the real-world benefits — set-aside contracts, supplier diversity programs, and marketing trust.',
    icon: Award,
    readTime: '12 min read',
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-navy-600 via-navy-700 to-navy-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Resources</h1>
          <p className="text-xl md:text-2xl text-navy-200">
            Practical, evergreen guides to help women entrepreneurs understand certification,
            classification codes, and the programs designed to grow their businesses.
          </p>
        </div>
      </div>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-coral-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-coral-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Plain-language</h3>
              <p className="text-gray-600">
                No jargon, no fluff. Written for business owners who need answers, not legalese.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-coral-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="h-8 w-8 text-coral-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Actionable</h3>
              <p className="text-gray-600">
                Every guide ends with concrete next steps you can take this week.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-coral-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-coral-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Up to date</h3>
              <p className="text-gray-600">
                Reviewed regularly so you don&apos;t end up following advice from 2017.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guide list */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
            Available Guides
          </h2>
          <div className="space-y-6">
            {guides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-coral-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-coral-600" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{guide.title}</h3>
                        <span className="text-sm text-gray-500 ml-4 flex-shrink-0">
                          {guide.readTime}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{guide.description}</p>
                      <span className="text-coral-600 font-medium inline-flex items-center">
                        Read guide
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-coral-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Run a women-owned business?
          </h2>
          <p className="text-xl text-coral-100 mb-8">
            Get listed in our directory and reach customers who are actively looking to support
            women entrepreneurs.
          </p>
          <Link
            href="/submit"
            className="bg-white text-coral-500 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
          >
            List Your Business
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
