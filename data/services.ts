import { sanityFetch } from '@/sanity/lib/fetch'
import { servicesQuery, serviceBySlugQuery } from '@/sanity/lib/queries'
import { Service } from '@/types'

export async function getServices(): Promise<Service[]> {
  try {
    const services = await sanityFetch<Service[]>({
      query: servicesQuery,
      tags: ['service'],
    })
    return services || []
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const service = await sanityFetch<Service>({
      query: serviceBySlugQuery,
      params: { slug },
      tags: ['service', slug],
    })
    return service || null
  } catch (error) {
    console.error(`Error fetching service with slug ${slug}:`, error)
    return null
  }
}

