# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# Sanity Configuration
# Get these values from https://sanity.io/manage

# Project ID (required)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here

# Dataset name (usually 'production')
NEXT_PUBLIC_SANITY_DATASET=production

# API version (YYYY-MM-DD format)
NEXT_PUBLIC_SANITY_API_VERSION=2024-12-20

# API Token (required for write operations and drafts)
# Create a token at https://sanity.io/manage/personal/tokens
SANITY_API_TOKEN=your_token_here

# Revalidation Secret (required for webhook security)
# Generate a random string to secure the revalidation endpoint
SANITY_REVALIDATE_SECRET=your_random_secret_here

# Resend Configuration
# Get your API key from https://resend.com/api-keys

# Resend API Key (required for sending emails)
RESEND_API_KEY=re_your_api_key_here

# Email address to send contact form emails FROM
# Default: 'onboarding@resend.dev' (Resend's test domain)
# After verifying your domain, use: 'Folaz Engineering <contact@folazengineering.com>'
RESEND_FROM_EMAIL=onboarding@resend.dev

# Email address to send contact form emails TO
# Default: 'info@folazengineering.com'
RESEND_TO_EMAIL=info@folazengineering.com
```

## Getting Your Sanity Credentials

1. Go to [https://sanity.io/manage](https://sanity.io/manage)
2. Create a new project or select an existing one
3. Copy the **Project ID**
4. The default dataset is usually **production**
5. Create an API token with **Editor** or **Administrator** permissions

## Generating Revalidation Secret

The revalidation secret is used to secure the webhook endpoint. Generate a random string:

```bash
# On macOS/Linux, generate a random secret:
openssl rand -base64 32

# Or use any random string generator
```

Copy the generated string and use it as `SANITY_REVALIDATE_SECRET`.

## Getting Your Resend API Key

1. Go to [https://resend.com](https://resend.com) and sign up or log in
2. Navigate to [API Keys](https://resend.com/api-keys)
3. Click **Create API Key**
4. Give it a name (e.g., "Folaz Contact Form")
5. Copy the API key and add it to your `.env.local` file

### Important Notes for Resend:

- The free tier includes 100 emails per day and 3,000 emails per month
- By default, you can only send emails from `onboarding@resend.dev`
- To send from your own domain (e.g., `contact@folazengineering.com`):
  1. Add and verify your domain in the [Resend Dashboard](https://resend.com/domains)
  2. Update the `RESEND_FROM_EMAIL` environment variable
  3. Example: `RESEND_FROM_EMAIL='Folaz Engineering <contact@folazengineering.com>'`

