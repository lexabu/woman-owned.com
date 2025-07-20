import { Heart, Target, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "About Us | Woman-Owned",
  description: "Learn about our mission to support women entrepreneurs and connect communities with amazing women-owned businesses.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-navy-600 via-navy-700 to-navy-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Woman-Owned
          </h1>
          <p className="text-xl md:text-2xl text-navy-200">
            We&apos;re on a mission to celebrate women entrepreneurs and strengthen local communities 
            through the power of business.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe women-owned businesses are the backbone of thriving communities. 
              Our platform connects customers with incredible entrepreneurs while providing 
              the visibility and support these businesses deserve.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-coral-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-coral-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Celebrate Success</h3>
              <p className="text-gray-600">
                We highlight the incredible achievements of women entrepreneurs, sharing their 
                stories and showcasing the unique value they bring to their communities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-coral-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-10 w-10 text-coral-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Drive Discovery</h3>
              <p className="text-gray-600">
                Our platform makes it easy for customers to find amazing local businesses, 
                creating meaningful connections that benefit both entrepreneurs and communities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-coral-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-coral-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Build Community</h3>
              <p className="text-gray-600">
                We foster a supportive ecosystem where women entrepreneurs can thrive, 
                connecting them with customers, resources, and each other.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Woman-Owned was born from a simple observation: women entrepreneurs create 
              incredible businesses that make our communities stronger, more vibrant, and more connected. 
              Yet too often, these amazing businesses struggle to get the visibility they deserve.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              We believe in building strong communities by connecting people with amazing women-owned 
              businesses. Our platform works across the nation, creating a model that truly benefits both 
              businesses and customers. Every women-owned business in our directory gets the attention 
              and support they need to thrive.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Our nationwide network celebrates women entrepreneurs in cities and towns across America. 
              Each community we serve makes our entire network stronger, creating more opportunities for 
              discovery, connection, and growth.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Authenticity</h3>
              <p className="text-gray-700">
                We believe in genuine connections and authentic storytelling. Every business 
                in our directory is real, verified, and truly women-owned.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community First</h3>
              <p className="text-gray-700">
                Strong communities are built by supporting local businesses. We prioritize 
                local connections and community impact in everything we do.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Empowerment</h3>
              <p className="text-gray-700">
                We&apos;re here to lift up women entrepreneurs, giving them the tools and visibility 
                they need to grow their businesses and achieve their dreams.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-700">
                We maintain high standards for both our platform and the businesses we feature, 
                ensuring every customer has an exceptional experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-coral-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-coral-100 mb-8">
            Whether you&apos;re a woman entrepreneur or someone who believes in supporting local business, 
            we&apos;d love to have you as part of our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit"
              className="bg-white text-coral-500 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
            >
              List Your Business
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/directory"
              className="border-2 border-white text-white hover:bg-white hover:text-coral-500 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
            >
              Explore Directory
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}