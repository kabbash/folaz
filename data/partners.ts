import { sanityFetch } from '@/sanity/lib/fetch'
import { partnersQuery } from '@/sanity/lib/queries'
import { Partner } from '@/types'

export async function getPartners(): Promise<Partner[]> {
  try {
    const partners = await sanityFetch<Partner[]>({
      query: partnersQuery,
      tags: ['partner'],
    })
    return partners || []
  } catch (error) {
    console.error('Error fetching partners:', error)
    return []
  }
}

