import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  // Generate JSON-LD structured data for breadcrumbs
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.href && { "item": `https://woman-owned.com${item.href}` })
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      
      <nav 
        className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
        aria-label="Breadcrumb navigation"
      >
        <Link 
          href="/" 
          className="flex items-center hover:text-navy-600 focus:text-navy-600 focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 rounded-md px-1 py-1 transition-colors"
          aria-label="Home"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Home</span>
        </Link>
        
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
            {item.href ? (
              <Link 
                href={item.href}
                className="hover:text-navy-600 focus:text-navy-600 focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 rounded-md px-1 py-1 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span 
                className="text-gray-900 font-medium"
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}