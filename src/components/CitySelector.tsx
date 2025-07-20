'use client';

import { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { getAllCities } from '@/utils/businessUtils';

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (citySlug: string) => void;
  className?: string;
}

export default function CitySelector({ selectedCity, onCityChange, className = '' }: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const cities = getAllCities();
  const currentCity = cities.find(city => city.slug === selectedCity) || cities[0];

  const handleCitySelect = (citySlug: string) => {
    onCityChange(citySlug);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Current city: ${currentCity.name}. Click to change city.`}
      >
        <MapPin className="h-4 w-4 text-coral-500" aria-hidden="true" />
        <span>{currentCity.name}, {currentCity.state}</span>
        <ChevronDown 
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          aria-hidden="true" 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <ul role="listbox" className="py-1">
            {cities.map((city) => (
              <li key={city.slug} role="option" aria-selected={city.slug === selectedCity}>
                <button
                  onClick={() => handleCitySelect(city.slug)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors ${
                    city.slug === selectedCity 
                      ? 'bg-coral-50 text-coral-700 font-medium' 
                      : 'text-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{city.name}, {city.state}</span>
                    <span className="text-xs text-gray-500">
                      {city.businessCount} business{city.businessCount !== 1 ? 'es' : ''}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}