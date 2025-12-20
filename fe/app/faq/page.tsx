import { client } from '@/lib/sanity'
import PageLayout from '@/app/components/PageLayout'
import FAQClient from './FAQClient'

interface FAQEntry {
  question: string
  answer: string
}

interface FAQPage {
  title: string
  faqEntries: FAQEntry[]
}

const faqPageQuery = `*[_type == "faqPage"][0] {
  title,
  faqEntries[] {
    question,
    answer
  }
}`

// Revalidate every hour, or instantly via webhook
export const revalidate = 3600

export default async function FAQPage() {
  const faqData: FAQPage | null = await client.fetch(
    faqPageQuery,
    {},
    {
      next: { revalidate: 3600, tags: ['faq-page'] }
    }
  )

  if (!faqData) {
    return (
      <div className='min-h-screen pt-[80px] md:pt-[104px] pb-1000 px-400 md:px-0'>
        <PageLayout pattern="centered-narrow">
          <p className='text-herbik-base'>FAQ page content not found.</p>
        </PageLayout>
      </div>
    )
  }

  return (
    <div className='min-h-screen pt-[80px] md:pt-[104px] pb-1000 px-400 md:px-0'>
      <PageLayout pattern="centered-narrow">
        {/* Page Title */}
        <h1 className='mb-800 text-herbik-xl italic'>{faqData.title}</h1>

        {/* FAQ Entries */}
        <FAQClient faqEntries={faqData.faqEntries} />
      </PageLayout>
    </div>
  )
}
