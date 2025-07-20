#!/usr/bin/env node

/**
 * Simple script to add a new business to the data file
 * Usage: node scripts/add-business.js
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

async function collectBusinessData() {
  console.log('\n🏢 Adding a new women-owned business to the directory\n');

  const business = {};

  // Basic info
  business.name = await question('Business name: ');
  business.website = await question('Website URL (include https://): ');
  business.description = await question('Business description: ');
  
  // Category selection
  console.log('\nAvailable categories:');
  console.log('1. Beauty & Wellness');
  console.log('2. Fashion & Jewelry');
  console.log('3. Home & Lifestyle');
  console.log('4. Food & Beverage');
  console.log('5. Professional Services');
  console.log('6. Other');
  
  const categoryChoice = await question('Select category (1-6): ');
  const categories = {
    '1': 'Beauty & Wellness',
    '2': 'Fashion & Jewelry', 
    '3': 'Home & Lifestyle',
    '4': 'Food & Beverage',
    '5': 'Professional Services',
    '6': 'Other'
  };
  business.category = categories[categoryChoice] || 'Other';

  // Location
  business.city = await question('City: ');
  business.state = await question('State: ');

  // Owner info
  business.ownerName = await question('Owner name: ');
  business.ownerBio = await question('Owner bio (optional): ');

  // Services
  console.log('\nEnter services (press Enter after each, empty line to finish):');
  business.services = [];
  let service;
  while ((service = await question('Service: ')) !== '') {
    business.services.push(service);
  }

  // Contact info (optional)
  business.phone = await question('Phone number (optional): ');
  business.email = await question('Email (optional): ');

  // Social media (optional)
  business.instagram = await question('Instagram handle (optional, without @): ');
  business.facebook = await question('Facebook page name (optional): ');

  return business;
}

function formatBusinessObject(business) {
  const id = generateId();
  const slug = generateSlug(business.name);
  const today = new Date().toISOString().split('T')[0];

  return `  {
    id: '${id}',
    name: '${business.name}',
    slug: '${slug}',
    description: '${business.description.replace(/'/g, "\\'")}',
    category: '${business.category}',
    city: '${business.city}',
    state: '${business.state}',
    website: '${business.website}',
    owner: {
      name: '${business.ownerName}',${
        business.ownerBio ? `\n      bio: '${business.ownerBio.replace(/'/g, "\\'")}'` : ''
      }
    },
    image: '/images/placeholder.svg',
    services: [
${business.services.map(service => `      '${service}'`).join(',\n')}
    ],${
      (business.instagram || business.facebook) ? `
    socialMedia: {${
      business.instagram ? `\n      instagram: '@${business.instagram}',` : ''
    }${
      business.facebook ? `\n      facebook: '${business.facebook}',` : ''
    }
    },` : ''
    }${
      (business.phone || business.email) ? `
    contact: {${
      business.phone ? `\n      phone: '${business.phone}',` : ''
    }${
      business.email ? `\n      email: '${business.email}',` : ''
    }
    },` : ''
    }
    featured: false,
    createdAt: '${today}'
  }`;
}

async function main() {
  try {
    const business = await collectBusinessData();
    
    console.log('\n📋 Review your business data:');
    console.log('================================');
    console.log(`Name: ${business.name}`);
    console.log(`Website: ${business.website}`);
    console.log(`Category: ${business.category}`);
    console.log(`Location: ${business.city}, ${business.state}`);
    console.log(`Owner: ${business.ownerName}`);
    console.log(`Services: ${business.services.join(', ')}`);
    
    const confirm = await question('\nAdd this business to the directory? (y/N): ');
    
    if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
      const businessObject = formatBusinessObject(business);
      
      console.log('\n📝 Add this to src/data/businesses.ts:');
      console.log('=====================================');
      console.log(businessObject + ',');
      console.log('\n✨ Don\'t forget to:');
      console.log('1. Update the categories array if this is a new category');
      console.log('2. Update the cities array if this is a new city');
      console.log('3. Add a proper business image to public/images/');
      console.log('4. Run npm run build to regenerate the sitemap');
    } else {
      console.log('\n❌ Business not added.');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    rl.close();
  }
}

main();