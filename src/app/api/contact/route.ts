import { NextRequest, NextResponse } from 'next/server';
import { generateContactEmail, type ContactFormData } from '@/lib/email-templates';

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
  const maxRequests = 10; // Max 10 contact messages per 15 minutes

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

function validateContactForm(data: unknown): { valid: boolean; errors: string[] } {
  const formData = data as Record<string, unknown>;
  const errors: string[] = [];

  // Required fields
  if (!formData.name || typeof formData.name !== 'string' || !formData.name.trim()) {
    errors.push('Name is required');
  }
  if (!formData.email || typeof formData.email !== 'string' || !formData.email.trim()) {
    errors.push('Email is required');
  }
  if (!formData.subject || typeof formData.subject !== 'string' || !formData.subject.trim()) {
    errors.push('Subject is required');
  }
  if (!formData.message || typeof formData.message !== 'string' || !formData.message.trim()) {
    errors.push('Message is required');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formData.email && typeof formData.email === 'string' && !emailRegex.test(formData.email)) {
    errors.push('Valid email address is required');
  }

  // Content validation
  if (formData.message && typeof formData.message === 'string') {
    if (formData.message.length < 10) {
      errors.push('Message must be at least 10 characters');
    }
    if (formData.message.length > 2000) {
      errors.push('Message must be less than 2000 characters');
    }
  }

  if (formData.name && typeof formData.name === 'string' && formData.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  if (formData.subject && typeof formData.subject === 'string' && formData.subject.length > 200) {
    errors.push('Subject must be less than 200 characters');
  }

  // Basic spam detection
  const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'congratulations', 'bitcoin', 'crypto'];
  const messageText = `${formData.name || ''} ${formData.subject || ''} ${formData.message || ''}`.toLowerCase();
  
  const hasSpamKeywords = spamKeywords.some(keyword => 
    messageText.includes(keyword)
  );
  
  if (hasSpamKeywords) {
    errors.push('Message contains prohibited content');
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
          error: 'Too many messages sent. Please try again in 15 minutes.' 
        },
        { status: 429 }
      );
    }

    const data: ContactFormData = await request.json();

    // Validate input
    const validation = validateContactForm(data);
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
    const sanitizedData: ContactFormData = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      subject: data.subject.trim(),
      message: data.message.trim(),
    };

    // Generate email (ready for production email service)
    const _contactEmail = generateContactEmail(sanitizedData);

    // In production, send email using your email service
    if (process.env.NODE_ENV === 'production') {
      // Option 1: Send with Resend
      // const resend = new Resend(process.env.RESEND_API_KEY);
      // await resend.emails.send({
      //   from: 'hello@woman-owned.com',
      //   to: 'hello@woman-owned.com',
      //   subject: contactEmail.subject,
      //   html: contactEmail.html,
      //   replyTo: sanitizedData.email,
      // });

      // Option 2: Send with SendGrid
      // const sgMail = require('@sendgrid/mail');
      // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      // await sgMail.send({
      //   to: 'hello@woman-owned.com',
      //   from: 'hello@woman-owned.com',
      //   replyTo: sanitizedData.email,
      //   subject: contactEmail.subject,
      //   html: contactEmail.html,
      // });
    }

    // Log contact for development
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Contact Form Submission:');
      console.log('From:', sanitizedData.name, `(${sanitizedData.email})`);
      console.log('Subject:', sanitizedData.subject);
      console.log('Message:', sanitizedData.message);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully! We\'ll get back to you soon.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred while sending your message. Please try again.' 
      },
      { status: 500 }
    );
  }
}