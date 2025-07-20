import { Business } from '@/types/business';

export const businesses: Business[] = [
  {
    id: '1',
    name: 'Lana Salon Suite',
    slug: 'lana-salon-suite',
    description: 'Premier beauty salon offering personalized hair styling, coloring, and beauty treatments in an upscale, intimate setting. Lana provides expert hair care services with a focus on creating stunning, customized looks for every client.',
    category: 'Beauty & Wellness',
    city: 'Lexington',
    state: 'Kentucky',
    website: 'https://lanasalonsuite.com',
    owner: {
      name: 'Lana',
      bio: 'Professional stylist with years of experience in creating beautiful, personalized looks for her clients.'
    },
    image: '/images/placeholder.svg',
    services: [
      'Hair Styling',
      'Hair Coloring',
      'Highlights',
      'Hair Treatments',
      'Blowouts',
      'Special Occasion Styling'
    ],
    socialMedia: {
      instagram: '@lanasalonsuite',
      facebook: 'LanaSalonSuite'
    },
    contact: {
      phone: '(859) 555-0123',
      email: 'hello@lanasalonsuite.com'
    },
    featured: true,
    createdAt: '2025-01-01'
  },
  {
    id: '2',
    name: 'Almaza Fine Jewelry',
    slug: 'almaza-fine-jewelry',
    description: 'Exquisite handcrafted jewelry featuring unique designs and premium materials. Almaza specializes in custom pieces, engagement rings, and fine jewelry that tells your story through beautiful, timeless craftsmanship.',
    category: 'Fashion & Jewelry',
    city: 'Lexington',
    state: 'Kentucky',
    website: 'https://almazafinejewelry.com',
    owner: {
      name: 'Almaza',
      bio: 'Master jeweler and designer creating one-of-a-kind pieces that celebrate life\'s special moments.'
    },
    image: '/images/placeholder.svg',
    services: [
      'Custom Jewelry Design',
      'Engagement Rings',
      'Wedding Bands',
      'Fine Jewelry',
      'Jewelry Repair',
      'Appraisals'
    ],
    socialMedia: {
      instagram: '@almazafinejewelry',
      facebook: 'AlmazaFineJewelry'
    },
    contact: {
      phone: '(859) 555-0124',
      email: 'info@almazafinejewelry.com'
    },
    featured: true,
    createdAt: '2025-01-01'
  },
  {
    id: '3',
    name: 'Shop Marais Home',
    slug: 'shop-marais-home',
    description: 'Curated home decor and lifestyle boutique featuring unique furnishings, art, and accessories. Shop Marais Home brings together beautiful, carefully selected pieces to help you create a home that reflects your personal style.',
    category: 'Home & Lifestyle',
    city: 'Lexington',
    state: 'Kentucky',
    website: 'https://shopmaraishome.com',
    owner: {
      name: 'Marais',
      bio: 'Interior design enthusiast and curator with an eye for beautiful, unique pieces that make a house feel like home.'
    },
    image: '/images/placeholder.svg',
    services: [
      'Home Decor',
      'Furniture',
      'Art & Accessories',
      'Interior Styling',
      'Gift Items',
      'Custom Orders'
    ],
    socialMedia: {
      instagram: '@shopmaraishome',
      facebook: 'ShopMaraisHome'
    },
    contact: {
      phone: '(859) 555-0125',
      email: 'hello@shopmaraishome.com'
    },
    featured: true,
    createdAt: '2025-01-01'
  }
];

export const categories = [
  { name: 'Beauty & Wellness', slug: 'beauty', businessCount: 1 },
  { name: 'Fashion & Jewelry', slug: 'fashion', businessCount: 1 },
  { name: 'Home & Lifestyle', slug: 'home', businessCount: 1 }
];

export const cities = [
  { name: 'Lexington', slug: 'lexington', state: 'Kentucky', businessCount: 3 }
];