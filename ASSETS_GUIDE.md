# Assets Management Guide

## 📁 Folder Structure

In Next.js, static assets should be organized in the `public` folder:

```
/public
  /assets
    /images
      /home
        - why-choose-us.png
        - hero-background.jpg
      /services
        - service-1.png
        - service-2.png
      /projects
        - project-1.jpg
      /partners
        - partner-logo-1.png
    /icons
      - logo.svg
    /fonts
      - custom-font.woff2
```

## 🖼️ Using Images in Components

### Option 1: Next.js Image Component (Recommended)

```tsx
import Image from 'next/image'

export function MyComponent() {
  return (
    <div className="relative w-full h-[400px]">
      <Image
        src="/assets/images/home/my-image.png"
        alt="Description"
        fill
        className="object-cover"
        priority // Use for above-the-fold images
      />
    </div>
  )
}
```

### Option 2: Regular img tag

```tsx
export function MyComponent() {
  return (
    <img 
      src="/assets/images/home/my-image.png" 
      alt="Description"
      className="w-full h-auto"
    />
  )
}
```

### Option 3: Import Static Image (TypeScript)

For images you want to import directly:

```tsx
import whyChooseUsImage from '@/public/assets/images/home/why-choose-us.png'
import Image from 'next/image'

export function MyComponent() {
  return (
    <Image
      src={whyChooseUsImage}
      alt="Description"
      className="w-full h-auto"
    />
  )
}
```

## 🎯 Best Practices

### 1. **Image Optimization**
- Use `.webp` or `.avif` for better compression
- Keep images under 500KB when possible
- Use appropriate dimensions (don't use 4K images for thumbnails)

### 2. **Naming Convention**
- Use lowercase and hyphens: `hero-background.jpg`
- Be descriptive: `steel-structure-project-1.png`
- Avoid spaces: ❌ `My Image.png` → ✅ `my-image.png`

### 3. **Organization**
- Group by section: `/home`, `/services`, `/projects`
- Keep related images together
- Use subfolders for large sections

### 4. **Alt Text**
Always provide meaningful alt text for accessibility:
```tsx
<Image 
  src="/assets/images/team.jpg"
  alt="Engineering team reviewing structural plans"
/>
```

## 📦 Current Project Setup

Your images are now in:
```
/public/assets/images/home/why-choose-us.png
```

Accessible in components as:
```tsx
<Image src="/assets/images/home/why-choose-us.png" alt="..." />
```

## 🔧 Adding New Images

1. **Add to public folder**:
   ```bash
   /public/assets/images/[section]/image-name.png
   ```

2. **Reference in component**:
   ```tsx
   src="/assets/images/[section]/image-name.png"
   ```

## ⚠️ Important Notes

- ❌ Don't put images outside the `public` folder if you want to reference them by path
- ❌ Don't use `/public` in the path: `src="/public/assets/..."` (wrong)
- ✅ Start path with `/`: `src="/assets/..."` (correct)
- ✅ Next.js automatically optimizes images when using `<Image>` component

## 📊 Image Formats

| Format | Use Case | Pros | Cons |
|--------|----------|------|------|
| `.webp` | Modern web images | Small size, good quality | Not supported in very old browsers |
| `.jpg` | Photos | Good compression | No transparency |
| `.png` | Graphics, logos | Transparency support | Larger file size |
| `.svg` | Icons, logos | Scalable, tiny size | Not suitable for photos |

## 🚀 Performance Tips

1. **Use Next.js Image component** for automatic optimization
2. **Add priority prop** to above-the-fold images
3. **Specify dimensions** when possible to prevent layout shift
4. **Use blur placeholders** for better UX:

```tsx
<Image
  src="/assets/images/hero.jpg"
  alt="Hero"
  fill
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." 
/>
```

## 📝 Example Component

Complete example with all best practices:

```tsx
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative w-full h-[600px]">
      <Image
        src="/assets/images/home/hero-background.jpg"
        alt="Modern steel structure construction site"
        fill
        className="object-cover"
        priority
        quality={85}
      />
      <div className="relative z-10">
        <h1>Your Content Here</h1>
      </div>
    </section>
  )
}
```

## 🔍 Troubleshooting

### Image not showing?
1. Check the path starts with `/assets/...`
2. Verify file exists in `/public/assets/...`
3. Check file extension matches (`.png` vs `.jpg`)
4. Restart dev server: `npm run dev`

### Image looks pixelated?
1. Use higher resolution source image
2. Remove `quality` prop or set to higher value (default is 75)
3. Consider using `.webp` format

### Build fails with image error?
1. Ensure all image paths are correct
2. Check image files aren't corrupted
3. Verify Next.js config allows remote images if using external URLs



