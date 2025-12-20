"use client"

import { Project } from "@/lib/types"
import { urlFor } from "@/lib/sanity"
import ImageWithFade from "@/app/components/ImageWithFade"
import ViewTransitionLink from "@/app/components/ViewTransitionLink"

interface ProjectClientProps {
  project: Project
  relatedProjects: Project[]
}

// Format date to "MM YYYY" format
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${month} ${year}`
}

export default function ProjectClient({
  project,
  relatedProjects,
}: ProjectClientProps) {
  return (
    <div className='min-h-screen pb-1000 pt-[80px] md:pt-[104px]'>
      {/* Main Content */}
      <div className='px-400 md:px-0 md:max-w-[800px] md:mx-auto'>
        {/* Project Header */}
        <div className='mb-800 md:mb-1000 text-center'>
          <h1 className='text-herbik-xl md:text-herbik-2xl italic leading-1 mb-400'>
            {project.title}
          </h1>
          <div className='flex items-baseline justify-between gap-400 mb-300'>
            <span className='text-cutive font-cutive uppercase text-graphite-500'>
              {formatDate(project.date)}
            </span>
            <span className='text-cutive font-cutive uppercase flex-shrink-0'>
              {project.category.title}
            </span>
          </div>
          {project.description && (
            <div className='text-herbik-base leading-1.5 [&>p]:indent-900'>
              {project.description.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>

        {/* Project Images */}
        {project.images && project.images.length > 0 && (
          <div className='space-y-600 md:space-y-800'>
            {project.images.map((item, index) => {
              const isNextVertical = project.images && index < project.images.length - 1 && project.images[index + 1]?.orientation === 'vertical'
              const isPreviousVertical = index > 0 && project.images && project.images[index - 1]?.orientation === 'vertical'
              const isVertical = item.orientation === 'vertical'

              // Skip if this is the second vertical image in a row (it will be rendered with the first)
              if (isVertical && isPreviousVertical) {
                return null
              }

              // Render two vertical images side by side
              if (isVertical && isNextVertical && project.images) {
                const nextItem = project.images[index + 1]
                return (
                  <div key={index} className='grid grid-cols-2 gap-400 md:gap-600'>
                    {/* First vertical image */}
                    <div>
                      <div className='relative aspect-[4/5] w-full overflow-hidden mb-300'>
                        <ImageWithFade
                          src={urlFor(item.image).url()}
                          alt={item.image.alt || project.title}
                          fill
                          className='object-cover'
                        />
                      </div>
                      {item.caption && (
                        <p className='font-herbik text-herbik-sm text-graphite-900'>
                          {item.caption}
                        </p>
                      )}
                    </div>

                    {/* Second vertical image */}
                    <div>
                      <div className='relative aspect-[4/5] w-full overflow-hidden mb-300'>
                        <ImageWithFade
                          src={urlFor(nextItem.image).url()}
                          alt={nextItem.image.alt || project.title}
                          fill
                          className='object-cover'
                        />
                      </div>
                      {nextItem.caption && (
                        <p className='font-herbik text-herbik-sm text-graphite-900'>
                          {nextItem.caption}
                        </p>
                      )}
                    </div>
                  </div>
                )
              }

              // Render horizontal or single vertical image
              return (
                <div key={index}>
                  <div className={`relative w-full overflow-hidden mb-200 ${
                    item.orientation === 'horizontal' ? 'aspect-[5/4]' : 'aspect-[4/5]'
                  }`}>
                    <ImageWithFade
                      src={urlFor(item.image).url()}
                      alt={item.image.alt || project.title}
                      fill
                      className='object-cover'
                    />
                  </div>
                  {item.caption && (
                    <p className='font-herbik text-herbik-sm text-graphite-900'>
                      {item.caption}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Credits */}
        {project.credits && (
          <div className='mt-1000 pt-600'>
            <h3 className='text-cutive font-cutive uppercase mb-300'>Credits</h3>
            <div className='text-herbik-base leading-1.5'>
              {project.credits.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className='mt-1000 border-t border-graphite-900 pt-800'>
            <h3 className='text-cutive font-cutive uppercase mb-600'>
              More from {project.category.title}
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-400 md:gap-600'>
              {relatedProjects.map((relatedProject) => (
                <ViewTransitionLink
                  key={relatedProject._id}
                  href={`/projects/${relatedProject.handle.current}`}
                  className='group'
                >
                  <div className='relative aspect-[4/5] w-full overflow-hidden mb-200'>
                    {relatedProject.mainImage && (
                      <ImageWithFade
                        src={urlFor(relatedProject.mainImage).url()}
                        alt={relatedProject.mainImage.alt || relatedProject.title}
                        fill
                        className='object-cover transition-opacity duration-300 group-hover:opacity-80'
                      />
                    )}
                  </div>
                  <h4 className='text-cutive font-cutive uppercase leading-none'>
                    {relatedProject.title}
                  </h4>
                  <p className='font-herbik text-herbik-sm text-graphite-900'>
                    {formatDate(relatedProject.date)}
                  </p>
                </ViewTransitionLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
