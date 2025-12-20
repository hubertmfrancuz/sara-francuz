"use client"

import { useState, useMemo, useEffect } from "react"
import { Project, ProjectCategory } from "@/lib/types"
import { motion, AnimatePresence } from "framer-motion"
import ViewTransitionLink from "@/app/components/ViewTransitionLink"
import ImageWithFade from "@/app/components/ImageWithFade"
import { urlFor } from "@/lib/sanity"
import PageLayout from "@/app/components/PageLayout"

interface ProjectsClientProps {
  projects: Project[]
  categories: ProjectCategory[]
}

// Format date to "MM YYYY" format
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${month} ${year}`
}

export default function ProjectsClient({
  projects,
  categories,
}: ProjectsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Check if projects have been animated before
  useEffect(() => {
    const animated = sessionStorage.getItem('projects-animated')
    if (animated) {
      setHasAnimated(true)
    } else {
      sessionStorage.setItem('projects-animated', 'true')
    }
  }, [])

  // Custom easing
  const customEase = [0.65, 0.05, 0.36, 1] as [number, number, number, number]

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (!selectedCategory) {
      return projects
    }
    return projects.filter(project =>
      project.category?.slug?.current === selectedCategory
    )
  }, [projects, selectedCategory])

  // Calculate total projects count from all categories
  const totalProjectsCount = categories.reduce(
    (sum, category) => sum + (category.count || 0),
    0
  )

  const handleCategoryFilter = (slug: string | null) => {
    setSelectedCategory(slug)
  }

  return (
    <div className='min-h-screen pb-1000 pt-[80px] md:pt-[104px]'>
      <PageLayout pattern="with-sidebar" className='px-400 md:px-0'>
        {/* Filters Sidebar */}
        <div className='sidebar mb-800 md:mb-0'>
          {/* Category Filter */}
          <div>
            <h3 className='mb-300 text-cutive font-cutive uppercase'>
              CATEGORY
            </h3>
            <div className='flex flex-col gap-100'>
              <button
                onClick={() => handleCategoryFilter(null)}
                className='text-left text-herbik-lg italic cursor-pointer'
              >
                <span
                  className={`transition-colors duration-300 pb-200 ${!selectedCategory ? "" : "text-graphite-300 hover:text-graphite-500"}`}
                >
                  All ({totalProjectsCount})
                </span>
              </button>
              {categories.map(category => {
                if (!category.slug?.current) return null
                return (
                  <button
                    key={category.slug.current}
                    onClick={() =>
                      handleCategoryFilter(category.slug.current)
                    }
                    className='text-left text-herbik-lg italic cursor-pointer'
                  >
                    <span
                      className={`transition-colors duration-300 pb-200 ${
                        selectedCategory === category.slug.current
                          ? ""
                          : "text-graphite-300 hover:text-graphite-500"
                      }`}
                    >
                      {category.title} ({category.count})
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Projects List Container */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory || 'all'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: customEase }}
              className='flex flex-col gap-300'
            >
              {filteredProjects.map((project, index) => {
                const staggerDelay = hasAnimated ? 0 : Math.min(index * 0.05, 0.5)
                return (
                  <motion.div
                    key={project._id}
                    initial={hasAnimated ? { opacity: 1 } : { opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: hasAnimated ? 0 : 0.6,
                      delay: staggerDelay,
                      ease: customEase,
                    }}
                    className='border-b border-graphite-300 pb-300'
                  >
                <ViewTransitionLink
                  href={`/projects/${project.handle.current}`}
                  className='flex gap-400 md:gap-600 group cursor-pointer'
                >
                  {/* Project Image */}
                  <div className='relative aspect-[4/5] w-[140px] md:w-[208px] flex-shrink-0 overflow-hidden'>
                    {project.mainImage && (
                      <ImageWithFade
                        src={urlFor(project.mainImage).url()}
                        alt={project.mainImage.alt || project.title}
                        fill
                        lqip={project.mainImage.asset?.metadata?.lqip}
                        className='object-cover'
                      />
                    )}
                  </div>

                  {/* Project Info */}
                  <div className='flex-1 flex flex-col justify-between'>
                    {/* Top Section: Date, Title, Category */}
                    <div>
                      <div className='flex items-start justify-between gap-400 mb-200'>
                        <span className='text-cutive font-cutive uppercase text-graphite-500'>
                          {formatDate(project.date)}
                        </span>
                        <span className='text-cutive font-cutive uppercase flex-shrink-0'>
                          {project.category.title}
                        </span>
                      </div>
                      <h2 className='text-herbik-lg italic leading-1.2'>
                        {project.title}
                      </h2>
                    </div>

                    {/* View Project Link */}
                    <span className='text-cutive font-cutive transition-colors duration-300 group-hover:text-graphite-500'>
                      | VIEW PROJECT
                    </span>
                  </div>
                </ViewTransitionLink>
              </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* No Projects Message */}
          <AnimatePresence>
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: customEase }}
                className='py-1000 text-center'
              >
                <p className='text-herbik-base italic'>
                  No projects found in this category.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PageLayout>
    </div>
  )
}
