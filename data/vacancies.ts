import { client } from '@/sanity/lib/client'
import { Vacancy } from '@/types'

// Query to get all active vacancies, ordered by display order
const vacanciesQuery = `*[_type == "vacancy" && isActive == true] | order(order asc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  _rev,
  title,
  slug,
  location,
  workType,
  jobType,
  aboutTheRole,
  responsibilities,
  requirements,
  isActive,
  order,
  publishedAt
}`

// Query to get a single vacancy by slug
const vacancyBySlugQuery = `*[_type == "vacancy" && slug.current == $slug][0] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  _rev,
  title,
  slug,
  location,
  workType,
  jobType,
  aboutTheRole,
  responsibilities,
  requirements,
  isActive,
  order,
  publishedAt
}`

export async function getVacancies(): Promise<Vacancy[]> {
  try {
    const vacancies = await client.fetch<Vacancy[]>(vacanciesQuery)
    return vacancies
  } catch (error) {
    console.error('Error fetching vacancies:', error)
    return []
  }
}

export async function getVacancyBySlug(slug: string): Promise<Vacancy | null> {
  try {
    const vacancy = await client.fetch<Vacancy>(vacancyBySlugQuery, { slug })
    return vacancy
  } catch (error) {
    console.error('Error fetching vacancy:', error)
    return null
  }
}
