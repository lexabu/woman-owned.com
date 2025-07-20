import Link from 'next/link';
import { ArrowLeft, MapPin, Building2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import BusinessCard from '@/components/BusinessCard';
import { 
  getBusinessesByCity, 
  getCityBySlug, 
  cityExists,
  getAllCategoriesWithCounts,
  getBusinessesByCityAndCategory 
} from '@/utils/businessUtils';
import { APP_CONFIG } from '@/utils/constants';

interface CityPageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateMetadata({ params }: CityPageProps) {
  const resolvedParams = await params;
  const city = getCityBySlug(resolvedParams.city);
  
  if (!city) {
    return {
      title: 'City Not Found | Woman-Owned',
    };
  }

  return {
    title: `${city.name} Women-Owned Businesses | ${APP_CONFIG.NAME}`,
    description: `Discover amazing women-owned businesses in ${city.name}, ${city.state}. Support local female entrepreneurs and find unique services in your community.`,
  };
}

export async function generateStaticParams() {
  // Generate paths for all cities
  const cities = [
    { city: 'lexington' },
    { city: 'los-angeles' },
    { city: 'miami' },
    { city: 'new-orleans' },
    { city: 'lafayette' },
    { city: 'atlanta' },
  ];
  
  return cities;
}

export default async function CityDirectoryPage({ params }: CityPageProps) {
  const resolvedParams = await params;
  
  // Check if city exists
  if (!cityExists(resolvedParams.city)) {
    notFound();
  }

  const city = getCityBySlug(resolvedParams.city);
  const cityBusinesses = getBusinessesByCity(resolvedParams.city);
  const categories = getAllCategoriesWithCounts();

  if (!city) {
    notFound();
  }

  // Get categories that have businesses in this city
  const localCategories = categories.filter(category => {
    const businessesInCategory = getBusinessesByCityAndCategory(resolvedParams.city, category.slug);
    return businessesInCategory.length > 0;
  }).map(category => ({
    ...category,
    businessCount: getBusinessesByCityAndCategory(resolvedParams.city, category.slug).length
  }));

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
              {city.name}, {city.state}
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            {cityBusinesses.length} amazing women-owned business{cityBusinesses.length !== 1 ? 'es' : ''} in {city.name}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {localCategories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {localCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/directory/${resolvedParams.city}/${category.slug}`}
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
        )}

        {/* All Businesses */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            All {city.name} Businesses
          </h2>
          <p className="text-gray-600">
            Supporting the amazing women entrepreneurs of {city.name}
          </p>
        </div>
        
        {cityBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">
              We&apos;re expanding to {city.name}! Be the first to join our community.
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center bg-coral-500 hover:bg-coral-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Submit Your Business
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}