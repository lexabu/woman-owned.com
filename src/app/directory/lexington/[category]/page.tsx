import Link from 'next/link';
import { ArrowLeft, MapPin, Building2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import BusinessCard from '@/components/BusinessCard';
import { getBusinessesByCityAndCategory } from '@/lib/utils';
import { categories } from '@/data/businesses';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const categoryData = categories.find(c => c.slug === category);
  
  if (!categoryData) {
    return {
      title: "Category Not Found | Woman-Owned",
    };
  }

  return {
    title: `${categoryData.name} in Lexington | Woman-Owned`,
    description: `Discover women-owned ${categoryData.name.toLowerCase()} businesses in Lexington, Kentucky. Support local female entrepreneurs in the ${categoryData.name.toLowerCase()} industry.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const categoryData = categories.find(c => c.slug === category);
  
  if (!categoryData) {
    notFound();
  }

  const categoryBusinesses = getBusinessesByCityAndCategory('Lexington', categoryData.name);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/directory/lexington"
            className="inline-flex items-center text-navy-600 hover:text-navy-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Lexington
          </Link>
          
          <div className="flex items-center mb-2">
            <Building2 className="h-6 w-6 text-coral-500 mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {categoryData.name}
            </h1>
          </div>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Lexington, Kentucky</span>
          </div>
          <p className="text-xl text-gray-600">
            {categoryBusinesses.length} women-owned {categoryData.name.toLowerCase()} business{categoryBusinesses.length !== 1 ? 'es' : ''} in Lexington
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {categoryBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No businesses found
            </h3>
            <p className="text-gray-600 mb-6">
              We don&apos;t have any {categoryData.name.toLowerCase()} businesses listed in Lexington yet.
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