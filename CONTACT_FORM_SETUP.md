# Contact Form & Internship Application Setup with Resend

This document explains how the contact form and internship application are configured and how to set them up.

## Overview

Both the contact form and internship application use [Resend](https://resend.com) to send emails:
- **Contact Form**: Sends inquiries to the configured email address
- **Internship Application**: Sends applications with resume attachments to the configured email address

## Features

- ✅ Email validation
- ✅ Loading states during submission
- ✅ Success/error messages
- ✅ Form reset after successful submission
- ✅ Professional HTML email template
- ✅ Reply-to field set to user's email

## Setup Instructions

### 1. Get Your Resend API Key

1. Go to [https://resend.com](https://resend.com) and sign up or log in
2. Navigate to [API Keys](https://resend.com/api-keys)
3. Click **Create API Key**
4. Give it a name (e.g., "Folaz Contact Form")
5. Copy the API key

### 2. Add Environment Variables

Add the following to your `.env.local` file:

```bash
# Required - Your Resend API key
RESEND_API_KEY=re_your_api_key_here

# Optional - Email to send FROM (defaults to onboarding@resend.dev)
RESEND_FROM_EMAIL=onboarding@resend.dev

# Optional - Email to send TO (defaults to info@folazengineering.com)
RESEND_TO_EMAIL=info@folazengineering.com
```

### 3. Configure Email Addresses (Optional)

**Sender Email (FROM)**

By default, emails are sent from `onboarding@resend.dev`. To use your own domain:

1. Add and verify your domain in the [Resend Dashboard](https://resend.com/domains)
2. Update the `RESEND_FROM_EMAIL` environment variable:

```bash
RESEND_FROM_EMAIL='Folaz Engineering <contact@folazengineering.com>'
```

**Recipient Email (TO)**

By default, emails are sent to `info@folazengineering.com`. Both the contact form and internship applications use this same email address. To change the recipient:

```bash
RESEND_TO_EMAIL=your-email@example.com
```

**Note**: If you want different recipients for contact inquiries vs. internship applications, you can:
1. Create separate environment variables (e.g., `RESEND_CONTACT_EMAIL` and `RESEND_INTERNSHIP_EMAIL`)
2. Update the respective API routes to use different variables

## Files Created/Modified

### Contact Form
- `/app/api/contact/route.ts` - API endpoint for contact form
- `/app/contact/page.tsx` - Contact form with API integration

### Internship Application
- `/app/api/internship/route.ts` - API endpoint for internship applications
- `/components/InternshipModal.tsx` - Modal with file upload
- `/app/careers/page.tsx` - Updated to use internship modal

### Documentation
- `/ENV.md` - Updated with Resend configuration
- `/INTERNSHIP_APPLICATION_SETUP.md` - Detailed internship setup guide

## API Endpoint

**POST** `/api/contact`

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry about services",
  "message": "I would like to know more about..."
}
```

### Response

**Success (200)**
```json
{
  "message": "Email sent successfully",
  "data": { ... }
}
```

**Error (400/500)**
```json
{
  "error": "Error message"
}
```

## Resend Pricing

- **Free Tier**: 100 emails/day, 3,000 emails/month
- **Pro**: $20/month for 50,000 emails/month
- See [pricing](https://resend.com/pricing) for more details

## Testing

1. Start the development server: `npm run dev`
2. Navigate to `/contact`
3. Fill out the form and submit
4. Check the email at `info@folazengineering.com`

## Troubleshooting

### "Failed to send email"

- Check that `RESEND_API_KEY` is set in `.env.local`
- Verify the API key is valid in your Resend dashboard
- Check the console for detailed error messages

### Emails not arriving

- Check spam/junk folder
- Verify the recipient email in `/app/api/contact/route.ts`
- Check Resend dashboard for delivery status

### Domain verification issues

- Ensure DNS records are properly configured
- Wait up to 48 hours for DNS propagation
- Use the Resend dashboard to verify domain status

