import Link from 'next/link';
import { MapPin, Building2, Filter } from 'lucide-react';
import BusinessCard from '@/components/BusinessCard';
import { businesses, categories, cities } from '@/data/businesses';

export const metadata = {
  title: "Business Directory | Woman-Owned",
  description: "Browse our complete directory of women-owned businesses. Find amazing local businesses by city and category.",
};

export default function DirectoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Business Directory
          </h1>
          <p className="text-xl text-gray-600">
            Discover amazing women-owned businesses in your area
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Filter className="h-5 w-5 text-gray-500 mr-2" />
                <h2 className="font-semibold text-lg">Filters</h2>
              </div>
              
              {/* Cities */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Cities
                </h3>
                <div className="space-y-2">
                  {cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/directory/${city.slug}`}
                      className="block p-2 rounded hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-700">{city.name}, {city.state}</span>
                      <span className="text-sm text-gray-500 ml-2">({city.businessCount})</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Building2 className="h-4 w-4 mr-2" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/directory/lexington/${category.slug}`}
                      className="block p-2 rounded hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-700">{category.name}</span>
                      <span className="text-sm text-gray-500 ml-2">({category.businessCount})</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Business Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                All Businesses ({businesses.length})
              </h2>
              <p className="text-gray-600">
                Supporting women entrepreneurs across the country
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {businesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}