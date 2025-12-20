import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Secret token for webhook authentication
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET

export async function POST(request: NextRequest) {
  try {
    // Verify the request is authorized
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${REVALIDATE_SECRET}`) {
      return NextResponse.json(
        { message: 'Invalid authorization' },
        { status: 401 }
      )
    }

    const body = await request.json()
    // Extract slug from handle.current for products, or slug.current for other types
    const slug = body.slug || body.handle?.current || body.slug?.current
    const { _type } = body

    console.log('Revalidation webhook received:', { _type, slug, body })

    // Revalidate based on content type
    switch (_type) {
      case 'homePage':
        revalidateTag('home-page', 'max')
        revalidatePath('/', 'page')
        break

      case 'aboutPage':
        revalidateTag('about-page', 'max')
        revalidatePath('/about', 'page')
        break

      case 'faqPage':
        revalidateTag('faq-page', 'max')
        revalidatePath('/faq', 'page')
        break

      case 'product':
        // Revalidate specific product and all products
        if (slug) {
          revalidateTag(`product-${slug}`, 'max')
          revalidatePath(`/shop/${slug}`, 'page')
        }
        revalidateTag('products', 'max')
        revalidatePath('/shop', 'page')
        // Only revalidate home if product is featured (check body.isFeatured or always revalidate to be safe)
        revalidateTag('home-page', 'max')
        break

      case 'collection':
        // Revalidate collections list and specific collection page
        if (slug) {
          revalidateTag('collection-detail', 'max')
          revalidatePath(`/collections/${slug}`, 'page')
        }
        revalidateTag('collections', 'max')
        revalidatePath('/shop', 'page')
        revalidateTag('home-page', 'max')
        break

      case 'project':
        // Revalidate specific project and all projects
        if (slug) {
          revalidateTag(`project-${slug}`, 'max')
          revalidatePath(`/projects/${slug}`, 'page')
        }
        revalidateTag('projects', 'max')
        revalidatePath('/projects', 'page')
        break

      case 'projectCategory':
        // Revalidate project categories and projects page
        revalidateTag('projectCategories', 'max')
        revalidatePath('/projects', 'page')
        break

      default:
        // Revalidate everything as fallback
        revalidateTag('home-page', 'max')
        revalidateTag('about-page', 'max')
        revalidateTag('faq-page', 'max')
        revalidateTag('products', 'max')
        revalidateTag('collections', 'max')
        revalidateTag('collection-detail', 'max')
        revalidateTag('projects', 'max')
        revalidateTag('projectCategories', 'max')
        revalidatePath('/', 'page')
    }

    return NextResponse.json({
      revalidated: true,
      _type,
      slug,
      now: Date.now(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}
