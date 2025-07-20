'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Search, Star } from 'lucide-react';
import BusinessCard from '@/components/BusinessCard';
import CitySelector from '@/components/CitySelector';
import { 
  getFeaturedBusinessesByCity,
  getCityBySlug,
  getAllCities,
  getTotalCityCount,
  getBusinessCountByCity
} from '@/utils/businessUtils';
import { APP_CONFIG } from '@/utils/constants';

export default function Home() {
  const [selectedCity, setSelectedCity] = useState('lexington');
  
  const cities = getAllCities();
  const currentCity = getCityBySlug(selectedCity) || cities[0];
  const featuredBusinesses = getFeaturedBusinessesByCity(selectedCity);
  const totalCities = getTotalCityCount();
  const currentCityBusinessCount = getBusinessCountByCity(selectedCity);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-600 via-navy-700 to-navy-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <CitySelector 
                selectedCity={selectedCity} 
                onCityChange={setSelectedCity}
                className="mb-4"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {APP_CONFIG.TAGLINE} in {currentCity.name}
            </h1>
            <p className="text-xl md:text-2xl text-navy-200 mb-8 max-w-3xl mx-auto">
              {APP_CONFIG.DESCRIPTION} in {currentCity.name}, {currentCity.state}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/directory"
                className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
              >
                Explore Directory
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/submit"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-navy-800 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Submit Your Business
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-navy-600 mb-2">{featuredBusinesses.length}</div>
              <div className="text-gray-600">Featured Businesses</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-navy-600 mb-2">{totalCities}</div>
              <div className="text-gray-600">Cities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-navy-600 mb-2">{currentCityBusinessCount}</div>
              <div className="text-gray-600">Local Businesses</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured in {currentCity.name}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover these amazing women-owned businesses making a difference in {currentCity.name}, {currentCity.state}.
            </p>
          </div>
          
          {featuredBusinesses.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link
                  href={`/directory/${selectedCity}`}
                  className="inline-flex items-center bg-navy-600 hover:bg-navy-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  View All {currentCity.name} Businesses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">
                We&apos;re expanding to {currentCity.name}! Be the first to join our community.
              </p>
              <Link
                href="/submit"
                className="inline-flex items-center bg-coral-500 hover:bg-coral-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Submit Your Business
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

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
