import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import SocialShare from '@/components/SocialShare';
import { getBusinessBySlug } from '@/lib/utils';
import { businesses } from '@/data/businesses';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return businesses.map((business) => ({
    slug: business.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);
  
  if (!business) {
    return {
      title: "Business Not Found | Woman-Owned",
    };
  }

  return {
    title: `${business.name} | Woman-Owned Business in ${business.city}`,
    description: business.description,
    keywords: `${business.name}, women-owned business, ${business.category}, ${business.city}, ${business.state}, ${business.services.join(', ')}`,
    openGraph: {
      title: `${business.name} | Woman-Owned Business`,
      description: business.description,
      type: "website",
      images: [business.image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${business.name} | Woman-Owned Business`,
      description: business.description,
      images: [business.image],
    },
  };
}

export default async function BusinessPage({ params }: PageProps) {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);
  
  if (!business) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.name,
    "description": business.description,
    "url": business.website,
    "image": business.image,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": business.city,
      "addressRegion": business.state,
      "addressCountry": "US"
    },
    "telephone": business.contact?.phone,
    "email": business.contact?.email,
    "founder": {
      "@type": "Person",
      "name": business.owner.name
    },
    "serviceArea": {
      "@type": "City",
      "name": business.city
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
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
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Business Image */}
              <div className="lg:col-span-1">
                <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden bg-gray-200">
                  <Image
                    src={business.image}
                    alt={business.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
              
              {/* Business Info */}
              <div className="lg:col-span-2">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {business.name}
                    </h1>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{business.city}, {business.state}</span>
                    </div>
                    <span className="inline-block bg-coral-100 text-coral-800 px-3 py-1 rounded-full text-sm font-medium">
                      {business.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <SocialShare
                      url={`https://woman-owned.com/business/${business.slug}`}
                      title={`Check out ${business.name} - Woman-Owned Business`}
                      description={business.description}
                    />
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-navy-600 hover:bg-navy-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
                    >
                      Visit Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {business.description}
                </p>
                
                {/* Contact Info */}
                {(business.contact?.phone || business.contact?.email) && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg text-gray-900 mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      {business.contact.phone && (
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          <a href={`tel:${business.contact.phone}`} className="hover:text-navy-600">
                            {business.contact.phone}
                          </a>
                        </div>
                      )}
                      {business.contact.email && (
                        <div className="flex items-center text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          <a href={`mailto:${business.contact.email}`} className="hover:text-navy-600">
                            {business.contact.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Social Media */}
                {business.socialMedia && (
                  <div className="flex space-x-4">
                    {business.socialMedia.instagram && (
                      <a
                        href={`https://instagram.com/${business.socialMedia.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-coral-600 transition-colors"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    )}
                    {business.socialMedia.facebook && (
                      <a
                        href={`https://facebook.com/${business.socialMedia.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-coral-600 transition-colors"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                    )}
                    {business.socialMedia.twitter && (
                      <a
                        href={`https://twitter.com/${business.socialMedia.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-coral-600 transition-colors"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Services */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {business.services.map((service, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-coral-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Owner Bio */}
              {business.owner.bio && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About {business.owner.name}</h2>
                  <p className="text-gray-700 leading-relaxed">{business.owner.bio}</p>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Support This Business</h3>
                <p className="text-gray-600 mb-4">
                  Help support {business.owner.name} and other women entrepreneurs by visiting their website and sharing with your network.
                </p>
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-coral-500 hover:bg-coral-600 text-white text-center px-4 py-3 rounded-lg font-semibold transition-colors"
                >
                  Visit {business.name}
                </a>
              </div>
              
              {/* Similar Businesses */}
              <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">More in {business.city}</h3>
                <Link
                  href={`/directory/${business.city.toLowerCase()}`}
                  className="text-navy-600 hover:text-navy-700 font-medium"
                >
                  View all {business.city} businesses →
                </Link>
                <div className="mt-3">
                  <Link
                    href={`/directory/${business.city.toLowerCase()}/${business.category.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`}
                    className="text-navy-600 hover:text-navy-700 font-medium"
                  >
                    More {business.category} businesses →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}