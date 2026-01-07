import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Verify the secret token to ensure the request is coming from Sanity
    const secret = request.nextUrl.searchParams.get('secret')
    
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Get the document type from the request body
    const body = await request.json()
    const { _type, slug } = body

    console.log('Revalidation triggered for:', { _type, slug })

    // Revalidate based on document type
    switch (_type) {
      case 'service':
        // Revalidate services list page
        revalidatePath('/services')
        // If slug exists, revalidate the specific service page
        if (slug?.current) {
          revalidatePath(`/services/${slug.current}`)
        }
        // Revalidate homepage (services section)
        revalidatePath('/')
        break

      case 'project':
        // Revalidate homepage (projects section)
        revalidatePath('/')
        break

      case 'partner':
        // Revalidate homepage (partners section)
        revalidatePath('/')
        break

      case 'vacancy':
        // Revalidate careers page
        revalidatePath('/careers')
        break

      default:
        // Revalidate all pages as fallback
        revalidatePath('/')
        revalidatePath('/services')
        revalidatePath('/careers')
        revalidatePath('/contact')
    }

    return NextResponse.json(
      {
        revalidated: true,
        now: Date.now(),
        type: _type,
        slug: slug?.current || null,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error revalidating:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint for manual testing
export async function GET(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get('secret')
    
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Revalidate all main paths
    revalidatePath('/')
    revalidatePath('/services')
    revalidatePath('/careers')
    revalidatePath('/contact')

    return NextResponse.json(
      {
        revalidated: true,
        now: Date.now(),
        message: 'All paths revalidated',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error revalidating:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}


