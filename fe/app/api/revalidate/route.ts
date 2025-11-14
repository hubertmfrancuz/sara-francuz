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
    const { _type, slug } = body

    console.log('Revalidation webhook received:', { _type, slug })

    // Revalidate based on content type
    switch (_type) {
      case 'homePage':
        revalidateTag('home-page', {})
        revalidatePath('/', 'page')
        break

      case 'aboutPage':
        revalidateTag('about-page', {})
        revalidatePath('/about', 'page')
        break

      case 'faqPage':
        revalidateTag('faq-page', {})
        revalidatePath('/faq', 'page')
        break

      case 'product':
        // Revalidate specific product and all products
        if (slug) {
          revalidateTag(`product-${slug}`, {})
          revalidatePath(`/shop/${slug}`, 'page')
        }
        revalidateTag('products', {})
        revalidatePath('/shop', 'page')
        // Also revalidate home page since products can be featured there
        revalidateTag('home-page', {})
        revalidatePath('/', 'page')
        break

      case 'collection':
        // Revalidate collections
        revalidateTag('collections', {})
        revalidatePath('/', 'page')
        revalidatePath('/shop', 'page')
        break

      default:
        // Revalidate everything as fallback
        revalidateTag('home-page', {})
        revalidateTag('about-page', {})
        revalidateTag('faq-page', {})
        revalidateTag('products', {})
        revalidateTag('collections', {})
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
