import Link from 'next/link';
import { ArrowLeft, MapPin, Building2 } from 'lucide-react';
import BusinessCard from '@/components/BusinessCard';
import { getBusinessesByCity } from '@/lib/utils';
import { categories } from '@/data/businesses';

export const metadata = {
  title: "Lexington Women-Owned Businesses | Woman-Owned",
  description: "Discover amazing women-owned businesses in Lexington, Kentucky. Support local female entrepreneurs and find unique services in your community.",
};

export default function LexingtonDirectoryPage() {
  const lexingtonBusinesses = getBusinessesByCity('Lexington');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/directory"
            className="inline-flex items-center text-navy-600 hover:text-navy-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Directory
          </Link>
          
          <div className="flex items-center mb-4">
            <MapPin className="h-6 w-6 text-coral-500 mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Lexington, Kentucky
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            {lexingtonBusinesses.length} amazing women-owned businesses in the Bluegrass State
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Quick Links */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/directory/lexington/${category.slug}`}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
              >
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {category.businessCount} business{category.businessCount !== 1 ? 'es' : ''}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* All Businesses */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            All Lexington Businesses
          </h2>
          <p className="text-gray-600">
            Supporting the amazing women entrepreneurs of Lexington
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lexingtonBusinesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      </div>
    </div>
  );
}