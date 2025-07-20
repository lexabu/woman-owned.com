import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Woman-Owned Business Directory',
    short_name: 'Woman-Owned',
    description: 'Discover and support amazing women-owned businesses in your community. Connect with female entrepreneurs and find unique local services.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#eb6a22',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en-US',
    categories: ['business', 'directory', 'local', 'women', 'entrepreneurs'],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512.png', 
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512', 
        type: 'image/png',
        purpose: 'any'
      }
    ],
    shortcuts: [
      {
        name: 'Browse Directory',
        short_name: 'Directory',
        description: 'Browse all women-owned businesses',
        url: '/directory',
        icons: [{ src: '/icon-192.png', sizes: '192x192' }]
      },
      {
        name: 'Submit Business',
        short_name: 'Submit',
        description: 'Submit your woman-owned business',
        url: '/submit',
        icons: [{ src: '/icon-192.png', sizes: '192x192' }]
      },
      {
        name: 'Lexington Businesses',
        short_name: 'Lexington',
        description: 'View businesses in Lexington, KY',
        url: '/directory/lexington',
        icons: [{ src: '/icon-192.png', sizes: '192x192' }]
      }
    ],
    screenshots: [
      {
        src: '/screenshot-wide.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Woman-Owned business directory homepage'
      },
      {
        src: '/screenshot-narrow.png',
        sizes: '375x812',
        type: 'image/png', 
        form_factor: 'narrow',
        label: 'Woman-Owned mobile business listings'
      }
    ]
  };
}