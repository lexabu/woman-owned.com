import Link from 'next/link';
import Image from 'next/image';
import { Business } from '@/types/business';
import { ExternalLink, MapPin } from 'lucide-react';

interface BusinessCardProps {
  business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-200">
        <Image
          src={business.image}
          alt={business.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{business.name}</h3>
          <span className="text-sm bg-coral-100 text-coral-800 px-2 py-1 rounded-full">
            {business.category}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{business.city}, {business.state}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{business.description}</p>
        
        <div className="flex gap-3">
          <Link
            href={`/business/${business.slug}`}
            className="flex-1 bg-navy-600 text-white px-4 py-2 rounded-md text-center hover:bg-navy-700 transition-colors"
          >
            Learn More
          </Link>
          <a
            href={business.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}