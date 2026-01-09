# Sanity Webhook Setup for Automatic Revalidation

This document explains how to set up webhooks so that changes in Sanity Studio automatically update your Next.js website without requiring a rebuild.

## Overview

When you edit content in Sanity Studio, the changes won't appear on your website immediately because Next.js uses caching. The webhook system solves this by:

1. Sanity detects when content is published/updated
2. Sanity sends a webhook to your Next.js API
3. Next.js revalidates the affected pages
4. Users see updated content within seconds

## Prerequisites

1. Your Next.js application must be deployed (Vercel, Netlify, etc.)
2. You need access to your Sanity project dashboard
3. You need to set the `SANITY_REVALIDATE_SECRET` environment variable

## Step 1: Generate a Secret Token

Generate a random secret token to secure your webhook endpoint:

```bash
# On macOS/Linux:
openssl rand -base64 32

# On Windows (PowerShell):
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

**Example output:**
```
Xk8pL2mN5vQ9rT4wY7bH3jF6gK1sD0zA
```

## Step 2: Add Environment Variable

Add the secret to your `.env.local` file:

```bash
SANITY_REVALIDATE_SECRET=Xk8pL2mN5vQ9rT4wY7bH3jF6gK1sD0zA
```

**Important:** Also add this to your deployment environment variables (Vercel, Netlify, etc.)

### Adding to Vercel

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name**: `SANITY_REVALIDATE_SECRET`
   - **Value**: Your generated secret
   - **Environments**: Production, Preview, Development
4. Click **Save**
5. Redeploy your project for the changes to take effect

## Step 3: Configure Webhook in Sanity

1. Go to [Sanity Manage](https://sanity.io/manage)
2. Select your project
3. Click on **API** in the left sidebar
4. Scroll down to **Webhooks** section
5. Click **Create webhook** (or **Add webhook**)

### Webhook Configuration

Fill in the following details:

**Name:**
```
Production Revalidation
```

**URL:**
```
https://your-domain.com/api/revalidate?secret=YOUR_SECRET_HERE
```

Replace:
- `your-domain.com` with your actual domain (e.g., `folazengineering.com`)
- `YOUR_SECRET_HERE` with the secret you generated in Step 1

**Example:**
```
https://folazengineering.com/api/revalidate?secret=Xk8pL2mN5vQ9rT4wY7bH3jF6gK1sD0zA
```

**Dataset:**
- Select `production` (or your dataset name)

**Trigger on:**
- ✅ Create
- ✅ Update
- ✅ Delete

**Filter (Optional):**

To only trigger for specific document types, you can add a GROQ filter:

```groq
_type == "service" || _type == "project" || _type == "partner" || _type == "vacancy"
```

Or leave empty to trigger for all document types.

**Projection (Optional):**

Add this to send only necessary data:

```groq
{
  _type,
  _id,
  "slug": slug.current
}
```

**HTTP Method:**
- Select `POST`

**HTTP Headers (Optional):**

You can add a custom header for extra security:

```
Content-Type: application/json
```

**API Version:**
- Select `v2021-03-25` or later

**Enable:**
- ✅ Check this box to activate the webhook

Click **Save** to create the webhook.

## Step 4: Test the Webhook

### Test from Sanity Studio

1. Go to your Sanity Studio (e.g., `https://your-domain.com/studio`)
2. Edit any document (service, project, partner, or vacancy)
3. Click **Publish**
4. Wait 5-10 seconds
5. Visit your website and verify the changes appear

### Test Manually

You can test the revalidation endpoint manually using curl:

```bash
# Test the GET endpoint (revalidates all paths)
curl "https://your-domain.com/api/revalidate?secret=YOUR_SECRET_HERE"

# Test the POST endpoint (revalidates specific document type)
curl -X POST "https://your-domain.com/api/revalidate?secret=YOUR_SECRET_HERE" \
  -H "Content-Type: application/json" \
  -d '{"_type": "service", "slug": {"current": "structural-analysis"}}'
```

### Expected Response

A successful revalidation returns:

```json
{
  "revalidated": true,
  "now": 1704398400000,
  "type": "service",
  "slug": "structural-analysis"
}
```

An authentication error returns:

```json
{
  "message": "Invalid secret"
}
```

## Step 5: Monitor Webhook Activity

### View Webhook Logs in Sanity

1. Go to [Sanity Manage](https://sanity.io/manage)
2. Select your project
3. Click on **API** → **Webhooks**
4. Click on your webhook name
5. View the **Deliveries** tab to see webhook execution history

### Check Next.js Logs

If deployed on Vercel:

1. Go to your project on Vercel
2. Click on **Deployments**
3. Select your current deployment
4. Click on **Functions** tab
5. Find `/api/revalidate` to see execution logs

## How It Works

The revalidation API (`/app/api/revalidate/route.ts`) handles different document types:

| Document Type | Pages Revalidated |
|--------------|-------------------|
| `service` | `/services`, `/services/[slug]`, `/` (homepage) |
| `project` | `/` (homepage projects section) |
| `partner` | `/` (homepage partners section) |
| `vacancy` | `/careers` |
| Other types | All main pages |

## Troubleshooting

### Changes Not Appearing

1. **Check webhook was triggered:**
   - Go to Sanity webhooks → Deliveries
   - Verify the webhook was sent successfully (status 200)

2. **Check secret is correct:**
   - Verify `SANITY_REVALIDATE_SECRET` matches in both:
     - Your `.env.local` (development)
     - Your deployment environment variables (production)
     - Your webhook URL

3. **Check deployment:**
   - Ensure your site is deployed with the latest code
   - Verify the `/api/revalidate` route exists in production

4. **Clear browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or open in incognito/private mode

### Webhook Failing (Non-200 Response)

1. **401 Unauthorized:**
   - Secret mismatch → verify `SANITY_REVALIDATE_SECRET`

2. **404 Not Found:**
   - Route not deployed → redeploy your application

3. **500 Internal Server Error:**
   - Check your deployment logs for errors
   - Verify the revalidation code is correct

### Testing in Development

For local testing, you can use ngrok to expose your local server:

```bash
# Install ngrok
npm install -g ngrok

# Run your Next.js dev server
npm run dev

# In another terminal, expose port 3000
ngrok http 3000

# Use the ngrok URL in your Sanity webhook
# Example: https://abc123.ngrok.io/api/revalidate?secret=YOUR_SECRET
```

## Security Best Practices

1. **Keep secret secure:**
   - Never commit the secret to git
   - Use different secrets for production and staging

2. **Use environment variables:**
   - Store the secret in environment variables only
   - Never hardcode in the application

3. **Rotate secrets periodically:**
   - Generate a new secret every 3-6 months
   - Update both your env vars and Sanity webhook

4. **Monitor webhook logs:**
   - Regularly check for failed or suspicious requests
   - Set up alerts for repeated failures

## Multiple Environments

If you have staging and production environments, create separate webhooks:

**Production Webhook:**
- URL: `https://folazengineering.com/api/revalidate?secret=PROD_SECRET`
- Dataset: `production`

**Staging Webhook:**
- URL: `https://staging.folazengineering.com/api/revalidate?secret=STAGING_SECRET`
- Dataset: `staging` or `production`

## Advanced Configuration

### Custom Revalidation Logic

You can modify `/app/api/revalidate/route.ts` to add custom revalidation logic:

```typescript
case 'service':
  // Revalidate all service-related pages
  revalidatePath('/services')
  revalidatePath(`/services/${slug.current}`)
  revalidatePath('/')
  
  // Add custom logic
  if (slug.current === 'special-service') {
    revalidatePath('/special-page')
  }
  break
```

### Revalidate All Pages

To revalidate all pages at once, use the GET endpoint:

```bash
curl "https://your-domain.com/api/revalidate?secret=YOUR_SECRET"
```

## Summary

✅ Webhook endpoint created: `/api/revalidate`
✅ Secret-based authentication for security
✅ Automatic revalidation based on document type
✅ Manual testing endpoint available
✅ Comprehensive error handling and logging

Your Sanity content will now automatically update on your website within seconds of publishing! 🎉




