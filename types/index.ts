// Base Sanity Document
export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

// Slug type
export interface Slug {
  _type: 'slug'
  current: string
}

// Sanity Image type
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

// Service Type
export interface Service extends SanityDocument {
  _type: 'service'
  title: string
  slug: Slug
  coverImage: SanityImage
  imageList?: SanityImage[]
  shortDescription: string
  description: string
  expertises?: string[]
  projectsSectionTitle?: string
  order: number
}

// Project Type
export interface Project extends SanityDocument {
  _type: 'project'
  title: string
  slug: Slug
  image: SanityImage
  description: string
}

// Vacancy Type
export interface Vacancy extends SanityDocument {
  _type: 'vacancy'
  title: string
  slug: Slug
  location: string
  workType: 'remote' | 'hybrid' | 'from-office'
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
  aboutTheRole: string
  responsibilities?: string[]
  requirements?: string[]
  isActive: boolean
  order: number
  publishedAt: string
}

// Partner Type
export interface Partner extends SanityDocument {
  _type: 'partner'
  name: string
  logo: SanityImage
  website?: string
  order?: number
}

