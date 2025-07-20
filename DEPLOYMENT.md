# 🚀 Deployment Guide - Woman-Owned.com

This guide covers deployment options for the Woman-Owned.com website, from development to production.

## 📋 Pre-Deployment Checklist

### ✅ Required Environment Variables

Create a `.env.local` file (never commit this to version control):

```bash
# Site Configuration
SITE_URL=https://woman-owned.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Form Handling (Choose one)
FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
# OR
SENDGRID_API_KEY=SG.your-sendgrid-api-key
SENDGRID_FROM_EMAIL=hello@woman-owned.com
# OR  
RESEND_API_KEY=re_your-resend-api-key

# Email Service (Optional)
ADMIN_EMAIL=admin@woman-owned.com
```

### ✅ Build Verification

```bash
# Install dependencies
npm install

# Run type checking
npm run build

# Verify all pages generate successfully
# Should see "✓ Generating static pages (18/18)" 

# Test locally
npm run dev
```

## 🌟 Recommended: Vercel Deployment

Vercel is the recommended platform for optimal Next.js performance.

### Step 1: Connect Repository

1. Push your code to GitHub/GitLab/Bitbucket
2. Visit [vercel.com](https://vercel.com) and sign in
3. Click "New Project" → Import your repository
4. Select the repository and click "Import"

### Step 2: Configure Environment Variables

In the Vercel dashboard:

1. Go to Settings → Environment Variables
2. Add each variable from your `.env.local` file
3. Set appropriate environments (Production, Preview, Development)

### Step 3: Configure Custom Domain

1. Go to Settings → Domains
2. Add your custom domain (e.g., `woman-owned.com`)
3. Follow Vercel's DNS configuration instructions
4. Update `SITE_URL` environment variable to match your domain

### Step 4: Deploy

```bash
# Option 1: Auto-deploy on git push (recommended)
git add .
git commit -m "Initial deployment"
git push origin main

# Option 2: Manual deploy with Vercel CLI
npm i -g vercel
vercel --prod
```

## 🔧 Alternative Deployment Options

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Site Settings
5. Configure custom domain and SSL

### AWS Amplify

1. Connect repository in AWS Amplify console
2. Use these build settings:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Railway

1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
USER nextjs
EXPOSE 3000
CMD ["npm", "start"]
```

## 📧 Email Service Setup

### Option 1: Formspree (Easiest)

1. Create account at [formspree.io](https://formspree.io)
2. Create new form
3. Copy endpoint URL to `FORMSPREE_ENDPOINT`
4. Forms will work immediately

### Option 2: SendGrid

1. Create SendGrid account
2. Generate API key
3. Verify sender email address
4. Add API key to environment variables
5. Uncomment SendGrid code in API routes

### Option 3: Resend

1. Create Resend account
2. Generate API key  
3. Verify domain
4. Add API key to environment variables
5. Uncomment Resend code in API routes

## 🔍 Analytics Setup

### Google Analytics 4

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Copy Measurement ID (G-XXXXXXXXXX)
3. Add to `NEXT_PUBLIC_GA_ID` environment variable

### Google Tag Manager

1. Create GTM account at [tagmanager.google.com](https://tagmanager.google.com)
2. Copy Container ID (GTM-XXXXXXX)
3. Add to `NEXT_PUBLIC_GTM_ID` environment variable

## 🛡️ Security Considerations

### Content Security Policy

Add to `next.config.ts`:

```typescript
const nextConfig = {
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' *.google-analytics.com *.analytics.google.com;"
        }
      ]
    }
  ]
};
```

### Rate Limiting

The API routes include basic rate limiting. For production:

1. Use Redis for distributed rate limiting
2. Consider Cloudflare for DDoS protection
3. Implement CAPTCHA for forms if needed

## 📊 Performance Optimization

### Image Optimization

1. Add actual business images to `public/images/`
2. Use Next.js Image component (already implemented)
3. Consider using a CDN like Cloudinary

### Caching

```typescript
// next.config.ts
const nextConfig = {
  headers: async () => [
    {
      source: '/sitemap.xml',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=86400, s-maxage=86400'
        }
      ]
    }
  ]
};
```

## 🧪 Testing Deployment

### Lighthouse Audit

```bash
npm install -g lighthouse
lighthouse https://your-domain.com --output html --output-path ./lighthouse-report.html
```

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

### SEO Testing

1. **Google Search Console**: Verify domain and submit sitemap
2. **Rich Results Test**: Test structured data at [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
3. **PageSpeed Insights**: Test at [pagespeed.web.dev](https://pagespeed.web.dev)

### Accessibility Testing

```bash
# Install axe-core CLI
npm install -g @axe-core/cli

# Test accessibility
axe https://your-domain.com
```

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test # if you have tests
```

## 📈 Post-Deployment Tasks

### 1. Submit to Search Engines

- **Google**: Submit sitemap in Search Console
- **Bing**: Submit to Bing Webmaster Tools
- **DuckDuckGo**: Will crawl automatically

### 2. Monitor Performance

- Set up Google Analytics goals
- Monitor Core Web Vitals
- Track business submission rates

### 3. Regular Updates

- Update business information monthly
- Add new businesses quarterly
- Review and update SEO quarterly

## 🆘 Troubleshooting

### Build Failures

```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules
rm -rf node_modules
npm install

# Try building again
npm run build
```

### Environment Variable Issues

```bash
# Check if variables are set
echo $NEXT_PUBLIC_GA_ID

# In production, check Vercel dashboard
# Variables starting with NEXT_PUBLIC_ are client-side
```

### Form Submission Issues

1. Check API route logs in deployment platform
2. Verify environment variables are set
3. Test API endpoints directly
4. Check email service configuration

---

## 🎉 Success!

Your Woman-Owned.com website should now be live and fully functional. The site includes:

- ✅ SEO optimization with structured data
- ✅ Analytics tracking  
- ✅ Form handling with email notifications
- ✅ Mobile-responsive design
- ✅ Accessibility compliance
- ✅ Performance optimization
- ✅ Progressive Web App features

For ongoing support, monitor your deployment platform logs and analytics dashboard.