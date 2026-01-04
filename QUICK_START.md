# Quick Start Guide

Get your Folaz project up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Sanity

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click "Create New Project"
3. Give it a name and copy the Project ID

## Step 3: Create Environment File

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-12-20
SANITY_API_TOKEN=your_token_here
```

To get your API token:
1. Go to [sanity.io/manage/personal/tokens](https://sanity.io/manage/personal/tokens)
2. Click "Create New Token"
3. Give it Editor permissions
4. Copy the token

## Step 4: Deploy Sanity Schemas (Optional)

```bash
npx sanity schema deploy
```

This will sync your content schemas with Sanity.

## Step 5: Start Development

```bash
npm run dev
```

Your app will be available at:
- **Frontend:** http://localhost:3000
- **Sanity Studio:** http://localhost:3000/studio

## Next Steps

1. Log in to Sanity Studio at `/studio`
2. Add your first content (Services, Projects, Vacancies, or Partners)
3. Modify `app/page.tsx` to display your content
4. Start building your application!

## Common Commands

```bash
# Install a shadcn/ui component
npx shadcn@latest add button

# Build for production
npm run build

# Run production server
npm start

# Run linter
npm run lint
```

## Need Help?

Check out the full [README.md](README.md) for detailed documentation.

