import Link from 'next/link';
import Image from 'next/image';
import { Business } from '@/types/business';
import { ExternalLink, MapPin } from 'lucide-react';

interface AccessibleBusinessCardProps {
  business: Business;
  headingLevel?: 'h2' | 'h3' | 'h4';
}

export default function AccessibleBusinessCard({ 
  business, 
  headingLevel = 'h3' 
}: AccessibleBusinessCardProps) {
  const HeadingTag = headingLevel;

  return (
    <article 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-coral-500 focus-within:ring-offset-2"
      role="article"
      aria-labelledby={`business-${business.id}-title`}
    >
      <div className="relative h-48 bg-gray-200">
        <Image
          src={business.image}
          alt={`Photo of ${business.name}, a woman-owned ${business.category.toLowerCase()} business`}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <HeadingTag 
            id={`business-${business.id}-title`}
            className="text-xl font-semibold text-gray-900"
          >
            {business.name}
          </HeadingTag>
          <span 
            className="text-sm bg-coral-100 text-coral-800 px-2 py-1 rounded-full"
            role="badge"
            aria-label={`Business category: ${business.category}`}
          >
            {business.category}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" aria-hidden="true" />
          <span>{business.city}, {business.state}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {business.description}
        </p>
        
        <div className="flex gap-3" role="group" aria-label="Business actions">
          <Link
            href={`/business/${business.slug}`}
            className="flex-1 bg-navy-600 text-white px-4 py-2 rounded-md text-center hover:bg-navy-700 focus:bg-navy-700 focus:ring-2 focus:ring-navy-500 focus:ring-offset-2 transition-colors"
            aria-describedby={`business-${business.id}-title`}
          >
            Learn More About {business.name}
            <span className="sr-only"> - opens business details page</span>
          </Link>
          <a
            href={business.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            aria-label={`Visit ${business.name} website (opens in new tab)`}
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">External link to {business.name} website</span>
          </a>
        </div>
      </div>
    </article>
  );
}