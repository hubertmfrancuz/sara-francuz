import ViewTransitionLink from "./ViewTransitionLink"

interface Collection {
  title: string
  slug: { current: string }
}

interface ContactInfo {
  contactEmail: string
  instagramHandle: string
}

interface FooterProps {
  collections: Collection[]
  contactInfo: ContactInfo
}

export default function Footer({ collections, contactInfo }: FooterProps) {
  return (
    <footer className='px-500 pt-1000 pb-600'>
      <div className='mx-auto flex flex-col items-center gap-400'>
        {/* Navigation Links */}
        <nav className='flex items-center text-herbik-lg italic'>
          <ViewTransitionLink
            href='/shop'
            className='text-graphite-900 transition-colors hover:text-graphite-300'
          >
            Shop
          </ViewTransitionLink>
          <span className='text-graphite-900'>,</span>
          <ViewTransitionLink
            href='/projects'
            className='text-graphite-900 transition-colors hover:text-graphite-300 ml-200'
          >
            Projects
          </ViewTransitionLink>
          <span className='text-graphite-900'>,</span>
          <ViewTransitionLink
            href='/about'
            className='text-graphite-900 transition-colors hover:text-graphite-300 ml-200'
          >
            About
          </ViewTransitionLink>
          <span className='text-graphite-900'>,</span>
          <ViewTransitionLink
            href='/faq'
            className='text-graphite-900 transition-colors hover:text-graphite-300 ml-200'
          >
            FAQ
          </ViewTransitionLink>
        </nav>

        {/* Copyright */}
        <p className='text-herbik-sm font-herbik'>Sara Francuz © 2025</p>
      </div>
    </footer>
  )
}
