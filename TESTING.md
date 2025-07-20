# 🧪 Testing Guide - Woman-Owned.com

This guide covers testing strategies and tools for ensuring the Woman-Owned.com platform maintains high quality and performance.

## 🚀 Quick Testing Checklist

### Pre-Deployment Testing
- [ ] Build completes without errors (`npm run build`)
- [ ] All pages render correctly (`npm run dev`)
- [ ] Forms submit successfully (contact & business submission)
- [ ] Lighthouse scores 90+ in all categories
- [ ] Mobile responsiveness on multiple devices
- [ ] Accessibility compliance (axe-core clean)

## 🔧 Manual Testing Procedures

### 🖱️ User Journey Testing

#### New Visitor Flow
1. **Homepage** → Check hero section loads, featured businesses display
2. **Directory Navigation** → Test city and category filtering  
3. **Business Detail** → Verify all information displays, external links work
4. **Contact Form** → Submit test message, verify email received
5. **Business Submission** → Complete form, check confirmation

#### Mobile User Flow  
1. **Responsive Design** → Test on phone/tablet breakpoints
2. **Touch Navigation** → Verify mobile menu, touch targets
3. **Form Usability** → Test form completion on mobile
4. **PWA Install** → Test app installation prompt

#### Accessibility Flow
1. **Keyboard Navigation** → Tab through entire site
2. **Screen Reader** → Test with screen reader software
3. **Color Contrast** → Verify readability in high contrast mode
4. **Focus Management** → Check visible focus indicators

### 📊 Performance Testing

#### Core Web Vitals
```bash
# Test with Lighthouse CLI
npx lighthouse https://your-site.com --output=html --output-path=lighthouse-report.html

# Target Scores:
# Performance: 90+
# Accessibility: 95+  
# Best Practices: 90+
# SEO: 95+
```

#### Speed Testing
```bash
# Test page load speeds
curl -w "@curl-format.txt" -o /dev/null -s https://your-site.com

# Create curl-format.txt:
#      time_namelookup:  %{time_namelookup}s\n
#         time_connect:  %{time_connect}s\n
#      time_appconnect:  %{time_appconnect}s\n
#     time_pretransfer:  %{time_pretransfer}s\n
#        time_redirect:  %{time_redirect}s\n
#   time_starttransfer:  %{time_starttransfer}s\n
#                     ----------\n
#           time_total:  %{time_total}s\n
```

### 🔍 SEO Testing

#### Structured Data Validation
1. **Google Rich Results Test**: [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
2. **Schema Markup Validator**: [validator.schema.org](https://validator.schema.org)
3. **Test URLs**:
   - Homepage: `https://your-site.com`
   - Business page: `https://your-site.com/business/lana-salon-suite`
   - Category page: `https://your-site.com/directory/lexington/beauty`

#### Meta Tags Testing
```bash
# Check meta tags with curl
curl -s https://your-site.com | grep -i "<meta\|<title"

# Verify Open Graph tags
curl -s https://your-site.com | grep -i "og:"

# Check Twitter cards  
curl -s https://your-site.com | grep -i "twitter:"
```

#### Sitemap Validation
1. **Google Search Console**: Submit and check for errors
2. **Sitemap Validator**: [www.xml-sitemaps.com/validate-xml-sitemap.html](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
3. **Manual Check**: Visit `/sitemap.xml` and verify all URLs

### 📱 Cross-Browser Testing

#### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest) 
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Mobile Browsers  
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Samsung Internet
- [ ] Firefox Mobile

#### Test Checklist Per Browser
- [ ] Page layout renders correctly
- [ ] Navigation works properly
- [ ] Forms submit successfully
- [ ] Images load and display
- [ ] JavaScript functionality works
- [ ] CSS animations/transitions work

## 🤖 Automated Testing Tools

### 🔧 Setup Testing Dependencies

```bash
# Install testing tools
npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
npm install --save-dev @axe-core/cli pa11y lighthouse-ci
```

### 🧪 Component Testing Examples

```javascript
// __tests__/BusinessCard.test.js
import { render, screen } from '@testing-library/react';
import BusinessCard from '@/components/BusinessCard';

const mockBusiness = {
  id: '1',
  name: 'Test Business',
  slug: 'test-business',
  description: 'A test business description',
  category: 'Beauty & Wellness',
  city: 'Lexington',
  state: 'Kentucky',
  website: 'https://test.com',
  owner: { name: 'Test Owner' },
  image: '/test-image.jpg',
  services: ['Service 1', 'Service 2'],
  featured: true,
  createdAt: '2025-01-01'
};

test('renders business card with correct information', () => {
  render(<BusinessCard business={mockBusiness} />);
  
  expect(screen.getByText('Test Business')).toBeInTheDocument();
  expect(screen.getByText('Beauty & Wellness')).toBeInTheDocument();
  expect(screen.getByText('Lexington, Kentucky')).toBeInTheDocument();
});

test('has accessible navigation links', () => {
  render(<BusinessCard business={mockBusiness} />);
  
  const learnMoreLink = screen.getByRole('link', { name: /learn more/i });
  expect(learnMoreLink).toHaveAttribute('href', '/business/test-business');
});
```

### 🔍 API Testing

```javascript
// __tests__/api/contact.test.js
import { POST } from '@/app/api/contact/route';
import { NextRequest } from 'next/server';

test('contact form validation', async () => {
  const request = new NextRequest('http://localhost:3000/api/contact', {
    method: 'POST',
    body: JSON.stringify({
      name: '',
      email: 'invalid-email',
      subject: '',
      message: ''
    })
  });

  const response = await POST(request);
  const data = await response.json();

  expect(response.status).toBe(400);
  expect(data.success).toBe(false);
  expect(data.errors).toContain('Name is required');
});
```

### ♿ Accessibility Testing

```bash
# Test with axe-core CLI
npx axe https://your-site.com

# Test with pa11y
npx pa11y https://your-site.com

# Test specific pages
npx pa11y https://your-site.com/business/lana-salon-suite
npx pa11y https://your-site.com/directory/lexington
```

### 🚀 Performance Testing

```bash
# Lighthouse CI configuration
# .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/directory',
        'http://localhost:3000/business/lana-salon-suite'
      ],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.95}],
        'categories:best-practices': ['error', {minScore: 0.9}],
        'categories:seo': ['error', {minScore: 0.95}]
      }
    }
  }
};

# Run performance tests
npm run build && npm start &
npx lhci autorun
```

## 📋 Testing Scenarios

### 🎯 Business Submission Testing

#### Valid Submission
```javascript
const validSubmission = {
  businessName: "Amazing Hair Salon",
  ownerName: "Jane Smith", 
  email: "jane@amazinghair.com",
  website: "https://amazinghair.com",
  city: "Lexington",
  state: "Kentucky",
  category: "Beauty & Wellness",
  description: "Professional hair styling services with over 10 years of experience in the beauty industry.",
  services: "Hair cuts, coloring, styling, treatments"
};
```

#### Invalid Submissions to Test
- Missing required fields
- Invalid email format
- Invalid website URL
- Description too short (<50 chars)
- Description too long (>1000 chars)

### 📞 Contact Form Testing

#### Test Cases
- Valid contact submission
- Missing required fields
- Invalid email format
- Message too short/long
- Spam keyword detection
- Rate limiting (multiple submissions)

### 🔗 Link Testing

```bash
# Check for broken links
npm install -g broken-link-checker
blc https://your-site.com -ro --exclude "linkedin.com,twitter.com"

# Or use online tools:
# - W3C Link Checker
# - Dead Link Checker
```

## 🛡️ Security Testing

### 🔒 Basic Security Checks

#### Rate Limiting
```bash
# Test rate limiting on contact form
for i in {1..15}; do
  curl -X POST https://your-site.com/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test message"}' \
    --write-out "%{http_code}\n"
done
# Should see 429 responses after limit reached
```

#### Input Validation
```bash
# Test SQL injection attempts (should be blocked)
curl -X POST https://your-site.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"'\''; DROP TABLE users; --","email":"test@test.com","subject":"Test","message":"Test"}'
```

#### XSS Prevention
```bash
# Test XSS attempts (should be sanitized)
curl -X POST https://your-site.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"<script>alert(\"XSS\")</script>","email":"test@test.com","subject":"Test","message":"Test"}'
```

## 📊 Performance Benchmarks

### 🎯 Target Metrics

#### Lighthouse Scores
- **Performance**: 90+ (Target: 95+)
- **Accessibility**: 95+ (Target: 100)
- **Best Practices**: 90+ (Target: 95+)
- **SEO**: 95+ (Target: 100)

#### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1

#### Load Times
- **Homepage**: < 2s (first visit), < 1s (return visit)
- **Directory Pages**: < 1.5s
- **Business Pages**: < 1.5s

## 🔄 Continuous Testing

### 🤖 Automated Testing Pipeline

```yaml
# .github/workflows/test.yml
name: Testing Pipeline
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run build
        run: npm run build
      
      - name: Run accessibility tests
        run: npx pa11y-ci --sitemap http://localhost:3000/sitemap.xml
      
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
```

### 📈 Monitoring

#### Real User Monitoring
- Set up Web Vitals monitoring in production
- Track user interaction metrics
- Monitor error rates and performance degradation

#### Uptime Monitoring
- Set up monitoring with services like:
  - Pingdom
  - UptimeRobot  
  - StatusPage.io

## 🐛 Bug Reporting Template

When reporting issues, include:

```markdown
## Bug Report

**Environment:**
- Browser: [Chrome 91, Firefox 89, etc.]
- Device: [Desktop, Mobile - iPhone 12, etc.]
- URL: [Specific page where issue occurs]

**Steps to Reproduce:**
1. Navigate to...
2. Click on...
3. Fill out form...
4. Submit...

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Screenshots:**
[If applicable]

**Console Errors:**
[Any JavaScript errors from browser console]
```

---

This comprehensive testing strategy ensures the Woman-Owned.com platform maintains high quality, performance, and accessibility standards throughout its development and deployment lifecycle.