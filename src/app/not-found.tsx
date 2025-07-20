'use client';

import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="bg-coral-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="h-12 w-12 text-coral-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. 
          It might have been moved or doesn&apos;t exist.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center bg-coral-500 hover:bg-coral-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full justify-center"
          >
            <Home className="h-5 w-5 mr-2" />
            Go Home
          </Link>
          
          <Link
            href="/directory"
            className="inline-flex items-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors w-full justify-center"
          >
            <Search className="h-5 w-5 mr-2" />
            Browse Directory
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center bg-transparent text-coral-600 hover:text-coral-700 px-6 py-3 font-semibold transition-colors w-full justify-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Looking for a specific business?{' '}
            <Link href="/directory" className="text-coral-600 hover:text-coral-700 font-medium">
              Search our directory
            </Link>{' '}
            or{' '}
            <Link href="/contact" className="text-coral-600 hover:text-coral-700 font-medium">
              contact us
            </Link>{' '}
            for help.
          </p>
        </div>
      </div>
    </div>
  );
}