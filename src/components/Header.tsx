'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 rounded-md p-1">
            <h1 className="text-2xl font-bold text-navy-600">Woman-Owned</h1>
            <span className="sr-only"> - Home page</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Main navigation">
            <Link 
              href="/directory" 
              className="text-gray-700 hover:text-navy-600 focus:text-navy-600 focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 rounded-md px-2 py-1 transition-colors"
            >
              Directory
            </Link>
            <Link 
              href="/submit" 
              className="text-gray-700 hover:text-navy-600 focus:text-navy-600 focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 rounded-md px-2 py-1 transition-colors"
            >
              Submit Business
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-navy-600 focus:text-navy-600 focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 rounded-md px-2 py-1 transition-colors"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-navy-600 focus:text-navy-600 focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 rounded-md px-2 py-1 transition-colors"
            >
              Contact
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 text-gray-600 hover:text-navy-600 focus:text-navy-600 focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 rounded-md transition-colors"
              aria-label="Search businesses"
              title="Search businesses"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-navy-600 focus:text-navy-600 focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 rounded-md transition-colors"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav 
            id="mobile-menu"
            className="md:hidden py-4 border-t border-gray-200"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="space-y-2">
              <Link 
                href="/directory" 
                className="block px-3 py-2 text-gray-700 hover:text-navy-600 hover:bg-gray-50 focus:text-navy-600 focus:bg-gray-50 focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Directory
              </Link>
              <Link 
                href="/submit" 
                className="block px-3 py-2 text-gray-700 hover:text-navy-600 hover:bg-gray-50 focus:text-navy-600 focus:bg-gray-50 focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Submit Business
              </Link>
              <Link 
                href="/about" 
                className="block px-3 py-2 text-gray-700 hover:text-navy-600 hover:bg-gray-50 focus:text-navy-600 focus:bg-gray-50 focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="block px-3 py-2 text-gray-700 hover:text-navy-600 hover:bg-gray-50 focus:text-navy-600 focus:bg-gray-50 focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}