export interface BusinessSubmissionData {
  businessName: string;
  ownerName: string;
  email: string;
  phone?: string;
  website: string;
  city: string;
  state: string;
  category: string;
  description: string;
  services: string;
  socialInstagram?: string;
  socialFacebook?: string;
  additionalInfo?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function generateBusinessSubmissionEmail(data: BusinessSubmissionData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `New Business Submission: ${data.businessName}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #eb6a22; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .section { margin-bottom: 25px; }
        .section h3 { color: #2d3748; border-bottom: 2px solid #eb6a22; padding-bottom: 5px; }
        .field { margin-bottom: 10px; }
        .label { font-weight: bold; color: #4a5568; }
        .value { margin-left: 10px; }
        .footer { background: #f7fafc; padding: 15px; text-align: center; color: #718096; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🏢 New Business Submission</h1>
        <p>Woman-Owned.com Directory</p>
      </div>
      
      <div class="content">
        <div class="section">
          <h3>Business Information</h3>
          <div class="field">
            <span class="label">Business Name:</span>
            <span class="value">${data.businessName}</span>
          </div>
          <div class="field">
            <span class="label">Website:</span>
            <span class="value"><a href="${data.website}" target="_blank">${data.website}</a></span>
          </div>
          <div class="field">
            <span class="label">Category:</span>
            <span class="value">${data.category}</span>
          </div>
          <div class="field">
            <span class="label">Location:</span>
            <span class="value">${data.city}, ${data.state}</span>
          </div>
        </div>

        <div class="section">
          <h3>Owner Information</h3>
          <div class="field">
            <span class="label">Owner Name:</span>
            <span class="value">${data.ownerName}</span>
          </div>
          <div class="field">
            <span class="label">Email:</span>
            <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
          </div>
          ${data.phone ? `
          <div class="field">
            <span class="label">Phone:</span>
            <span class="value">${data.phone}</span>
          </div>
          ` : ''}
        </div>

        <div class="section">
          <h3>Business Description</h3>
          <p>${data.description}</p>
        </div>

        ${data.services ? `
        <div class="section">
          <h3>Services Offered</h3>
          <p>${data.services}</p>
        </div>
        ` : ''}

        ${(data.socialInstagram || data.socialFacebook) ? `
        <div class="section">
          <h3>Social Media</h3>
          ${data.socialInstagram ? `
          <div class="field">
            <span class="label">Instagram:</span>
            <span class="value">${data.socialInstagram}</span>
          </div>
          ` : ''}
          ${data.socialFacebook ? `
          <div class="field">
            <span class="label">Facebook:</span>
            <span class="value">${data.socialFacebook}</span>
          </div>
          ` : ''}
        </div>
        ` : ''}

        ${data.additionalInfo ? `
        <div class="section">
          <h3>Additional Information</h3>
          <p>${data.additionalInfo}</p>
        </div>
        ` : ''}
      </div>
      
      <div class="footer">
        <p>This submission was received from Woman-Owned.com</p>
        <p>Review and add to directory at your earliest convenience.</p>
      </div>
    </body>
    </html>
  `;

  const text = `
New Business Submission: ${data.businessName}

BUSINESS INFORMATION
Business Name: ${data.businessName}
Website: ${data.website}
Category: ${data.category}
Location: ${data.city}, ${data.state}

OWNER INFORMATION
Owner Name: ${data.ownerName}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}

BUSINESS DESCRIPTION
${data.description}

${data.services ? `SERVICES OFFERED\n${data.services}` : ''}

${(data.socialInstagram || data.socialFacebook) ? `SOCIAL MEDIA` : ''}
${data.socialInstagram ? `Instagram: ${data.socialInstagram}` : ''}
${data.socialFacebook ? `Facebook: ${data.socialFacebook}` : ''}

${data.additionalInfo ? `ADDITIONAL INFORMATION\n${data.additionalInfo}` : ''}

---
This submission was received from Woman-Owned.com
Review and add to directory at your earliest convenience.
  `;

  return { subject, html, text };
}

export function generateContactEmail(data: ContactFormData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Contact Form: ${data.subject}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #eb6a22; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .section { margin-bottom: 25px; }
        .field { margin-bottom: 10px; }
        .label { font-weight: bold; color: #4a5568; }
        .value { margin-left: 10px; }
        .message { background: #f7fafc; padding: 15px; border-left: 4px solid #eb6a22; }
        .footer { background: #f7fafc; padding: 15px; text-align: center; color: #718096; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>📧 Contact Form Message</h1>
        <p>Woman-Owned.com</p>
      </div>
      
      <div class="content">
        <div class="section">
          <div class="field">
            <span class="label">From:</span>
            <span class="value">${data.name}</span>
          </div>
          <div class="field">
            <span class="label">Email:</span>
            <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
          </div>
          <div class="field">
            <span class="label">Subject:</span>
            <span class="value">${data.subject}</span>
          </div>
        </div>

        <div class="section">
          <h3>Message:</h3>
          <div class="message">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
        </div>
      </div>
      
      <div class="footer">
        <p>This message was sent from the Woman-Owned.com contact form</p>
        <p>Please respond to ${data.email}</p>
      </div>
    </body>
    </html>
  `;

  const text = `
Contact Form Message from Woman-Owned.com

FROM: ${data.name}
EMAIL: ${data.email}
SUBJECT: ${data.subject}

MESSAGE:
${data.message}

---
This message was sent from the Woman-Owned.com contact form
Please respond to ${data.email}
  `;

  return { subject, html, text };
}

export function generateBusinessOwnerConfirmationEmail(data: BusinessSubmissionData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Thank you for submitting ${data.businessName} to Woman-Owned.com`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #eb6a22; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .section { margin-bottom: 25px; }
        .cta { background: #eb6a22; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
        .footer { background: #f7fafc; padding: 15px; text-align: center; color: #718096; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🎉 Thank You, ${data.ownerName}!</h1>
        <p>Your business submission has been received</p>
      </div>
      
      <div class="content">
        <div class="section">
          <h3>What happens next?</h3>
          <p>Thank you for submitting <strong>${data.businessName}</strong> to our directory of amazing women-owned businesses. Here's what you can expect:</p>
          
          <ul>
            <li><strong>Review Process:</strong> Our team will review your submission within 2-3 business days</li>
            <li><strong>Quality Check:</strong> We'll verify your business information and website</li>
            <li><strong>Publication:</strong> Once approved, your business will be live on Woman-Owned.com</li>
            <li><strong>Notification:</strong> We'll email you when your business page is live</li>
          </ul>
        </div>

        <div class="section">
          <h3>Your Submission Summary</h3>
          <p><strong>Business:</strong> ${data.businessName}</p>
          <p><strong>Website:</strong> <a href="${data.website}">${data.website}</a></p>
          <p><strong>Location:</strong> ${data.city}, ${data.state}</p>
          <p><strong>Category:</strong> ${data.category}</p>
        </div>

        <div class="section">
          <h3>While You Wait</h3>
          <p>Explore other amazing women-owned businesses in our directory and share Woman-Owned.com with your network!</p>
          <a href="https://woman-owned.com/directory" class="cta">Browse Directory</a>
        </div>
      </div>
      
      <div class="footer">
        <p>Questions? Reply to this email or contact us at hello@woman-owned.com</p>
        <p>Supporting women entrepreneurs, one business at a time 💪</p>
      </div>
    </body>
    </html>
  `;

  const text = `
Thank You, ${data.ownerName}!

Your business submission has been received.

WHAT HAPPENS NEXT?

Thank you for submitting ${data.businessName} to our directory of amazing women-owned businesses. Here's what you can expect:

• Review Process: Our team will review your submission within 2-3 business days
• Quality Check: We'll verify your business information and website  
• Publication: Once approved, your business will be live on Woman-Owned.com
• Notification: We'll email you when your business page is live

YOUR SUBMISSION SUMMARY

Business: ${data.businessName}
Website: ${data.website}
Location: ${data.city}, ${data.state}
Category: ${data.category}

WHILE YOU WAIT

Explore other amazing women-owned businesses in our directory and share Woman-Owned.com with your network!

Visit: https://woman-owned.com/directory

---
Questions? Reply to this email or contact us at hello@woman-owned.com
Supporting women entrepreneurs, one business at a time 💪
  `;

  return { subject, html, text };
}