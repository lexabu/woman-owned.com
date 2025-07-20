import Link from 'next/link';
import { MapPin, Tag } from 'lucide-react';
import { notFound } from 'next/navigation';
import BusinessCard from '@/components/BusinessCard';
import { 
  getBusinessesByCityAndCategory,
  getCityBySlug, 
  cityExists,
  categoryExists,
  getAllCategoriesWithCounts
} from '@/utils/businessUtils';
import { APP_CONFIG } from '@/utils/constants';

interface CityCategory {
  params: Promise<{
    city: string;
    category: string;
  }>;
}

export async function generateMetadata({ params }: CityCategory) {
  const resolvedParams = await params;
  const city = getCityBySlug(resolvedParams.city);
  const categories = getAllCategoriesWithCounts();
  const category = categories.find(cat => cat.slug === resolvedParams.category);
  
  if (!city || !category) {
    return {
      title: 'Page Not Found | Woman-Owned',
    };
  }

  return {
    title: `${category.name} in ${city.name} | ${APP_CONFIG.NAME}`,
    description: `Find women-owned ${category.name.toLowerCase()} businesses in ${city.name}, ${city.state}. Support local female entrepreneurs in your area.`,
  };
}

export async function generateStaticParams() {
  const cities = ['lexington', 'los-angeles', 'miami', 'new-orleans', 'lafayette', 'atlanta'];
  const categories = ['beauty', 'fashion', 'home', 'food', 'services'];
  
  const params = [];
  for (const city of cities) {
    for (const category of categories) {
      params.push({ city, category });
    }
  }
  
  return params;
}

export default async function CityCategory({ params }: CityCategory) {
  const resolvedParams = await params;
  
  // Check if city and category exist
  if (!cityExists(resolvedParams.city) || !categoryExists(resolvedParams.category)) {
    notFound();
  }

  const city = getCityBySlug(resolvedParams.city);
  const categories = getAllCategoriesWithCounts();
  const category = categories.find(cat => cat.slug === resolvedParams.category);
  const businesses = getBusinessesByCityAndCategory(resolvedParams.city, resolvedParams.category);

  if (!city || !category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link 
              href="/directory"
              className="text-navy-600 hover:text-navy-700"
            >
              Directory
            </Link>
            <span className="text-gray-400">/</span>
            <Link 
              href={`/directory/${resolvedParams.city}`}
              className="text-navy-600 hover:text-navy-700"
            >
              {city.name}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{category.name}</span>
          </div>
          
          <div className="flex items-center mb-4">
            <Tag className="h-6 w-6 text-coral-500 mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {category.name}
            </h1>
          </div>
          
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{city.name}, {city.state}</span>
          </div>
          
          <p className="text-xl text-gray-600">
            {businesses.length} women-owned {category.name.toLowerCase()} business{businesses.length !== 1 ? 'es' : ''} in {city.name}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {businesses.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {category.name} in {city.name}
              </h2>
              <p className="text-gray-600">
                Discover amazing women-owned {category.name.toLowerCase()} businesses
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">
              No {category.name.toLowerCase()} businesses found in {city.name} yet.
            </p>
            <p className="text-gray-500 mb-6">
              Be the first to add your {category.name.toLowerCase()} business to our directory!
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