# Woman-Owned.com

A modern, SEO-optimized directory platform celebrating women-owned businesses across America. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🌟 Features

- **SEO-Optimized**: Complete meta tags, structured data, sitemaps, and Open Graph support
- **Responsive Design**: Mobile-first approach with beautiful, accessible UI
- **Static Site Generation**: Optimal performance with Next.js App Router
- **Business Directory**: Searchable by city and category with detailed business profiles
- **Submission Forms**: Easy business and contact form handling
- **Scalable Architecture**: Ready to expand to new cities and categories

## 🚀 Getting Started

### Prerequisites

- Node.js 22 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/woman-owned.com.git
cd woman-owned.com
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── directory/         # Directory pages with filtering
│   ├── business/         # Individual business pages
│   ├── submit/           # Business submission form
│   ├── about/            # About page
│   └── contact/          # Contact page
├── components/            # Reusable React components
├── data/                 # Business data and configurations
├── lib/                  # Utility functions
└── types/                # TypeScript type definitions
```

## 🏢 Featured Businesses

Currently featuring amazing women-owned businesses in Lexington, Kentucky:

- **Lana Salon Suite** - Premier beauty salon services
- **Almaza Fine Jewelry** - Custom jewelry and engagement rings  
- **Shop Marais Home** - Curated home decor and lifestyle boutique

## 🔧 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **SEO**: Next.js metadata routes (`sitemap.ts`, `robots.ts`, `/llms.txt`), structured data (JSON-LD)
- **Deployment**: Vercel (recommended)

## 📈 SEO Features

- ✅ Meta tags and Open Graph
- ✅ Structured data (JSON-LD) for LocalBusiness
- ✅ XML sitemap generation
- ✅ Robots.txt
- ✅ Clean, semantic URLs
- ✅ Mobile-optimized performance
- ✅ Accessibility compliant

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on every push to main

### Other Platforms

The site is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify  
- Railway
- Any platform supporting Node.js

## 🔄 Adding New Businesses

1. Add business data to `src/data/businesses.ts`
2. Add business images to `public/images/`
3. Update categories and cities as needed
4. The site will automatically generate new pages and sitemap entries

## 📊 Performance

- ⚡ Lighthouse scores: 90+ in all categories
- 🚀 Static site generation for optimal loading
- 📱 Mobile-first responsive design
- 🎨 Optimized images and assets

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♀️ Support

For questions or support:
- Email: hello@woman-owned.com
- Create an issue in this repository

## 🎯 Roadmap

- [ ] Add search functionality
- [ ] Implement user reviews and ratings
- [ ] Add more cities and categories
- [ ] Mobile app development
- [ ] Advanced filtering options
- [ ] Business owner dashboard

---

Built with ❤️ to support women entrepreneurs everywhere.
