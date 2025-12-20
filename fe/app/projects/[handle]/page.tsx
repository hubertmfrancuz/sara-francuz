import {client} from '@/lib/sanity'
import {projectQuery, relatedProjectsQuery, projectsQuery} from '@/lib/queries'
import {Project} from '@/lib/types'
import ProjectClient from './ProjectClient'
import {notFound} from 'next/navigation'
import { Metadata } from 'next'

// Revalidate every hour, or instantly via webhook
export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{handle: string}>
}): Promise<Metadata> {
  const {handle} = await params
  const project: Project | null = await client.fetch(
    projectQuery,
    { handle },
    {
      next: { revalidate: 3600, tags: ['project', `project-${handle}`] }
    }
  )

  if (!project) {
    return {
      title: "Project Not Found - Sara Francuz",
    }
  }

  return {
    title: `${project.title} - Sara Francuz`,
    description: project.description || `${project.title} - A design project by Sara Francuz`,
  }
}

// Generate static paths for all projects at build time
export async function generateStaticParams() {
  const projects: Project[] = await client.fetch(projectsQuery)

  return projects.map((project) => ({
    handle: project.handle.current,
  }))
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{handle: string}>
}) {
  const {handle} = await params
  const project: Project | null = await client.fetch(
    projectQuery,
    { handle },
    {
      next: { revalidate: 3600, tags: ['project', `project-${handle}`] }
    }
  )

  if (!project) {
    notFound()
  }

  // Fetch related projects from the same category
  const relatedProjects: Project[] = project.category?.slug?.current
    ? await client.fetch(
        relatedProjectsQuery,
        {
          categorySlug: project.category.slug.current,
          handle,
        },
        {
          next: { revalidate: 3600, tags: ['projects'] }
        }
      )
    : []

  return <ProjectClient project={project} relatedProjects={relatedProjects} />
}
