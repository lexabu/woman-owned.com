import { NextRequest, NextResponse } from 'next/server';
import { generateBusinessSubmissionEmail, generateBusinessOwnerConfirmationEmail, type BusinessSubmissionData } from '@/lib/email-templates';

// Rate limiting store (in production, use Redis or similar)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(/, /)[0] : 'unknown';
  return ip;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // Max 5 submissions per 15 minutes

  const current = rateLimit.get(key);
  
  if (!current || now > current.resetTime) {
    rateLimit.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count++;
  return true;
}

function validateBusinessSubmission(data: unknown): { valid: boolean; errors: string[] } {
  const formData = data as Record<string, unknown>;
  const errors: string[] = [];

  // Required fields
  if (!formData.businessName || typeof formData.businessName !== 'string' || !formData.businessName.trim()) {
    errors.push('Business name is required');
  }
  if (!formData.ownerName || typeof formData.ownerName !== 'string' || !formData.ownerName.trim()) {
    errors.push('Owner name is required');
  }
  if (!formData.email || typeof formData.email !== 'string' || !formData.email.trim()) {
    errors.push('Email is required');
  }
  if (!formData.website || typeof formData.website !== 'string' || !formData.website.trim()) {
    errors.push('Website is required');
  }
  if (!formData.city || typeof formData.city !== 'string' || !formData.city.trim()) {
    errors.push('City is required');
  }
  if (!formData.state || typeof formData.state !== 'string' || !formData.state.trim()) {
    errors.push('State is required');
  }
  if (!formData.category || typeof formData.category !== 'string' || !formData.category.trim()) {
    errors.push('Category is required');
  }
  if (!formData.description || typeof formData.description !== 'string' || !formData.description.trim()) {
    errors.push('Description is required');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formData.email && typeof formData.email === 'string' && !emailRegex.test(formData.email)) {
    errors.push('Valid email address is required');
  }

  // URL validation
  if (formData.website && typeof formData.website === 'string') {
    try {
      new URL(formData.website);
      if (!formData.website.startsWith('http://') && !formData.website.startsWith('https://')) {
        errors.push('Website URL must include http:// or https://');
      }
    } catch {
      errors.push('Valid website URL is required');
    }
  }

  // Content validation
  if (formData.description && typeof formData.description === 'string') {
    if (formData.description.length < 50) {
      errors.push('Description must be at least 50 characters');
    }
    if (formData.description.length > 1000) {
      errors.push('Description must be less than 1000 characters');
    }
  }

  return { valid: errors.length === 0, errors };
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many submissions. Please try again in 15 minutes.' 
        },
        { status: 429 }
      );
    }

    const data: BusinessSubmissionData = await request.json();

    // Validate input
    const validation = validateBusinessSubmission(data);
    if (!validation.valid) {
      return NextResponse.json(
        { 
          success: false, 
          errors: validation.errors 
        },
        { status: 400 }
      );
    }

    // Sanitize data
    const sanitizedData: BusinessSubmissionData = {
      businessName: data.businessName.trim(),
      ownerName: data.ownerName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() || '',
      website: data.website.trim(),
      city: data.city.trim(),
      state: data.state.trim(),
      category: data.category.trim(),
      description: data.description.trim(),
      services: data.services?.trim() || '',
      socialInstagram: data.socialInstagram?.trim() || '',
      socialFacebook: data.socialFacebook?.trim() || '',
      additionalInfo: data.additionalInfo?.trim() || '',
    };

    // Generate emails (ready for production email service)
    const _adminEmail = generateBusinessSubmissionEmail(sanitizedData);
    const _ownerEmail = generateBusinessOwnerConfirmationEmail(sanitizedData);

    // In production, send emails using your email service
    // Example with different email services:
    
    if (process.env.NODE_ENV === 'production') {
      // Option 1: Send with Resend
      // const resend = new Resend(process.env.RESEND_API_KEY);
      // await resend.emails.send({
      //   from: 'hello@woman-owned.com',
      //   to: 'admin@woman-owned.com',
      //   subject: adminEmail.subject,
      //   html: adminEmail.html,
      // });

      // Option 2: Send with SendGrid
      // const sgMail = require('@sendgrid/mail');
      // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      // await sgMail.send({
      //   to: 'admin@woman-owned.com',
      //   from: 'hello@woman-owned.com',
      //   subject: adminEmail.subject,
      //   html: adminEmail.html,
      // });

      // Option 3: Send with Formspree
      // await fetch('https://formspree.io/f/your-form-id', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(sanitizedData),
      // });
    }

    // Log submission for development
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Business Submission Received:');
      console.log('Business:', sanitizedData.businessName);
      console.log('Owner:', sanitizedData.ownerName);
      console.log('Email:', sanitizedData.email);
      console.log('Website:', sanitizedData.website);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Business submission received successfully!' 
    });

  } catch (error) {
    console.error('Business submission error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred while processing your submission. Please try again.' 
      },
      { status: 500 }
    );
  }
}