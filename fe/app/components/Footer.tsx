import ViewTransitionLink from "./ViewTransitionLink"

export default function Footer() {
  return (
    <footer className='px-400 pt-1000 pb-600'>
      <div className='mx-auto flex max-w-2xl md:max-w-[1400px] flex-col items-center gap-600'>
        {/* Navigation Links */}
        <nav className='flex flex-col items-center leading-[100%] gap-300'>
          <ViewTransitionLink
            href='/about'
            className='text-herbik-lg transition-opacity hover:opacity-50'
          >
            About
          </ViewTransitionLink>
          <ViewTransitionLink
            href='/faq'
            className='text-herbik-lg transition-opacity hover:opacity-50'
          >
            FAQ
          </ViewTransitionLink>
          <ViewTransitionLink
            href='/privacy-policy'
            className='text-herbik-lg transition-opacity hover:opacity-50'
          >
            Privacy Policy
          </ViewTransitionLink>
        </nav>

        {/* Copyright */}
        <p className='text-herbik-sm font-herbik'>© Sara Francuz</p>
      </div>
    </footer>
  )
}
