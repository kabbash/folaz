# Setup Checklist

Use this checklist to get your Folaz project up and running.

## ✅ Initial Setup (Completed)

- [x] Next.js 15 project initialized
- [x] Tailwind CSS v4 configured
- [x] shadcn/ui set up
- [x] Sanity CMS integrated
- [x] TypeScript types created
- [x] Data layer implemented
- [x] Build tested successfully
- [x] Documentation written

## 📋 Your Next Steps

### 1. Create Sanity Project
- [ ] Go to [sanity.io/manage](https://sanity.io/manage)
- [ ] Click "Create New Project"
- [ ] Name your project
- [ ] Copy the Project ID

### 2. Get API Token
- [ ] Go to [sanity.io/manage/personal/tokens](https://sanity.io/manage/personal/tokens)
- [ ] Click "Create New Token"
- [ ] Give it a name (e.g., "Folaz Development")
- [ ] Select "Editor" or "Administrator" permissions
- [ ] Copy the token (you won't see it again!)

### 3. Configure Environment
- [ ] Create `.env.local` file in project root
- [ ] Add `NEXT_PUBLIC_SANITY_PROJECT_ID` with your project ID
- [ ] Add `NEXT_PUBLIC_SANITY_DATASET=production`
- [ ] Add `NEXT_PUBLIC_SANITY_API_VERSION=2024-12-20`
- [ ] Add `SANITY_API_TOKEN` with your token

### 4. Deploy Schemas (Optional)
- [ ] Run `npx sanity schema deploy`
- [ ] This syncs your content schemas with Sanity

### 5. Start Development
- [ ] Run `npm run dev`
- [ ] Open http://localhost:3000
- [ ] Access Sanity Studio at http://localhost:3000/studio

### 6. Add Content
- [ ] Log in to Sanity Studio
- [ ] Create your first Service
- [ ] Create your first Project
- [ ] Create your first Vacancy
- [ ] Add Partners

### 7. Build Your Application
- [ ] Modify `app/page.tsx` to display content
- [ ] Add routes for services, projects, vacancies
- [ ] Install shadcn/ui components as needed
- [ ] Customize styling in `app/globals.css`

### 8. Deploy (When Ready)
- [ ] Push code to GitHub
- [ ] Connect to Vercel
- [ ] Add environment variables in Vercel
- [ ] Deploy!

## 🔧 Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Linting
npm run lint

# Add shadcn/ui component
npx shadcn@latest add [component-name]

# Deploy Sanity schemas
npx sanity schema deploy
```

## 📚 Documentation

- **Full Guide:** `README.md`
- **Quick Start:** `QUICK_START.md`
- **Environment Setup:** `ENV.md`
- **Project Overview:** `PROJECT_SUMMARY.md`

## 🆘 Troubleshooting

### Build Errors
- Make sure all environment variables are set
- Try deleting `.next` folder and rebuilding
- Check Node.js version (20.x or higher required)

### Sanity Studio Not Loading
- Verify environment variables are correct
- Check that `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
- Make sure you're accessing `/studio` route

### Content Not Showing
- Verify content exists in Sanity Studio
- Check data fetching functions are called correctly
- Look at browser console for errors

## ✨ Tips

1. **Start Simple:** Begin with one content type and get it working
2. **Use TypeScript:** The types are already set up - use them!
3. **Test Locally:** Always test builds locally before deploying
4. **Read Docs:** Check the README for detailed examples

## 🎯 Success Criteria

You're ready to develop when:
- ✅ Development server runs without errors
- ✅ You can access Sanity Studio at `/studio`
- ✅ You can create content in Sanity
- ✅ Build completes successfully

---

**Need Help?** Check the documentation files or visit:
- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)

