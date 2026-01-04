# Folaz

A modern Next.js 15 project skeleton with Tailwind CSS, shadcn/ui, and Sanity CMS integration.

## Features

- **Next.js 15** - Latest version with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Sanity CMS** - Headless CMS integration with Studio
- **Data Layer** - Pre-configured data fetching functions
- **Type Safety** - Complete TypeScript types for all content models

## Content Models

This project includes four pre-configured Sanity content schemas:

### 1. Services
- Title
- Slug
- Cover Image
- Image List
- Description
- Expertises (bullet list)

### 2. Projects
- Title
- Slug
- Image
- Description

### 3. Vacancies
- Title
- Slug
- Location
- Work Type (remote/hybrid/office)
- About the Role
- Responsibilities (bullet list)
- Requirements (bullet list)

### 4. Partners
- Name
- Logo
- Display Order

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn
- A Sanity account ([sanity.io](https://sanity.io))

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd folaz
   npm install
   ```

2. **Set up Sanity:**
   
   Visit [https://sanity.io/manage](https://sanity.io/manage) and:
   - Create a new project or select an existing one
   - Copy your Project ID
   - Create an API token with Editor permissions

3. **Configure environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-12-20
   SANITY_API_TOKEN=your_token_here
   ```
   
   See `ENV.md` for detailed instructions.

4. **Deploy Sanity schemas:**
   ```bash
   npx sanity schema deploy
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Access the application:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

## Project Structure

```
folaz/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── studio/            # Sanity Studio route
├── components/
│   └── ui/                # shadcn/ui components
├── data/                  # Data fetching layer
│   ├── services.ts        # Service queries
│   ├── projects.ts        # Project queries
│   ├── vacancies.ts       # Vacancy queries
│   ├── partners.ts        # Partner queries
│   └── index.ts           # Exports
├── types/
│   └── index.ts           # TypeScript types
├── sanity/
│   ├── env.ts             # Environment config
│   ├── lib/
│   │   ├── client.ts      # Sanity client
│   │   ├── fetch.ts       # Fetch utilities
│   │   ├── image.ts       # Image URL builder
│   │   └── queries.ts     # GROQ queries
│   └── schemas/           # Content schemas
│       ├── service.ts
│       ├── project.ts
│       ├── vacancy.ts
│       ├── partner.ts
│       └── index.ts
├── lib/
│   └── utils.ts           # Utility functions
└── sanity.config.ts       # Sanity configuration
```

## Usage

### Fetching Data

Import and use the pre-configured data fetching functions:

```typescript
import { getServices, getServiceBySlug } from '@/data'

// In a Server Component
export default async function ServicesPage() {
  const services = await getServices()
  
  return (
    <div>
      {services.map((service) => (
        <div key={service._id}>
          <h2>{service.title}</h2>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  )
}
```

### Using Images

Use the `urlFor` helper to generate Sanity image URLs:

```typescript
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

<Image
  src={urlFor(service.coverImage).width(800).height(600).url()}
  alt={service.title}
  width={800}
  height={600}
/>
```

### Adding shadcn/ui Components

Install components as needed:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Sanity Studio

Access the Sanity Studio at `/studio` to manage your content. The Studio is embedded directly in your Next.js application.

## Customization

### Adding New Content Types

1. Create a new schema in `sanity/schemas/`
2. Register it in `sanity/schemas/index.ts`
3. Create TypeScript types in `types/index.ts`
4. Add GROQ queries in `sanity/lib/queries.ts`
5. Create data fetching functions in `data/`

### Styling

This project uses Tailwind CSS with CSS variables for theming. Customize colors in `app/globals.css`.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in project settings
4. Deploy!

### Other Platforms

Ensure you set all environment variables from `.env.local` in your hosting platform's environment configuration.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## License

MIT

## Support

For issues and questions, please refer to the documentation links above or create an issue in the repository.
