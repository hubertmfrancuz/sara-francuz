import {client} from '@/lib/sanity'
import {projectsQuery, projectCategoriesQuery} from '@/lib/queries'
import {Project} from '@/lib/types'
import ProjectsClient from './ProjectsClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Projects - Sara Francuz",
  description: "Explore our design projects and creative work",
}

export default async function ProjectsPage() {
  // Fetch all projects
  const projects: Project[] = await client.fetch(
    projectsQuery,
    {},
    {
      next: { revalidate: 3600, tags: ['projects'] }
    }
  )

  // Fetch categories with project counts
  const {categories} = await client.fetch(
    projectCategoriesQuery,
    {},
    {
      next: { revalidate: 3600, tags: ['projectCategories'] }
    }
  )

  return (
    <ProjectsClient
      projects={projects}
      categories={categories}
    />
  )
}
