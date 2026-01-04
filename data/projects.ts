import { sanityFetch } from '@/sanity/lib/fetch'
import { projectsQuery, projectBySlugQuery } from '@/sanity/lib/queries'
import { Project } from '@/types'

export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await sanityFetch<Project[]>({
      query: projectsQuery,
      tags: ['project'],
    })
    return projects || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const project = await sanityFetch<Project>({
      query: projectBySlugQuery,
      params: { slug },
      tags: ['project', slug],
    })
    return project || null
  } catch (error) {
    console.error(`Error fetching project with slug ${slug}:`, error)
    return null
  }
}

