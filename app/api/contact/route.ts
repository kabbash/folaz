import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  console.log('[API /api/contact] POST request received')
  
  try {
    // Log environment variables (without exposing the actual keys)
    console.log('[API /api/contact] Environment check:', {
      hasResendApiKey: !!process.env.RESEND_API_KEY,
      hasFromEmail: !!process.env.RESEND_FROM_EMAIL,
      hasToEmail: !!process.env.RESEND_TO_CONTACT_EMAIL,
      fromEmail: process.env.RESEND_FROM_EMAIL ? '***' + process.env.RESEND_FROM_EMAIL.slice(-10) : 'NOT SET',
      toEmail: process.env.RESEND_TO_CONTACT_EMAIL ? '***' + process.env.RESEND_TO_CONTACT_EMAIL.slice(-10) : 'NOT SET',
    })

    const body = await request.json()
    console.log('[API /api/contact] Request body received:', { 
      name: body.name, 
      email: body.email, 
      subject: body.subject,
      messageLength: body.message?.length 
    })
    
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('[API /api/contact] Validation failed: Missing required fields')
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log('[API /api/contact] Validation failed: Invalid email format')
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if Resend is properly configured
    if (!process.env.RESEND_API_KEY) {
      console.error('[API /api/contact] RESEND_API_KEY is not set!')
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact support.' },
        { status: 500 }
      )
    }

    if (!process.env.RESEND_FROM_EMAIL || !process.env.RESEND_TO_CONTACT_EMAIL) {
      console.error('[API /api/contact] Email addresses not configured')
      return NextResponse.json(
        { error: 'Email service is not fully configured. Please contact support.' },
        { status: 500 }
      )
    }

    console.log('[API /api/contact] Sending email via Resend...')
    
    // Send email using Resend
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [process.env.RESEND_TO_CONTACT_EMAIL || ''],
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1212a0; border-bottom: 2px solid #1212a0; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;">
              <strong style="color: #15151c;">Name:</strong> ${name}
            </p>
            <p style="margin: 10px 0;">
              <strong style="color: #15151c;">Email:</strong> 
              <a href="mailto:${email}" style="color: #1212a0;">${email}</a>
            </p>
            <p style="margin: 10px 0;">
              <strong style="color: #15151c;">Subject:</strong> ${subject}
            </p>
          </div>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #1212a0;">
            <strong style="color: #15151c;">Message:</strong>
            <p style="margin: 10px 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>This email was sent from the Folaz Engineering contact form.</p>
          </div>
        </div>
      `,
    })

    console.log('[API /api/contact] Email sent successfully:', data)

    return NextResponse.json(
      { message: 'Email sent successfully', data },
      { status: 200 }
    )
  } catch (error) {
    console.error('[API /api/contact] Error caught:', error)
    console.error('[API /api/contact] Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    
    return NextResponse.json(
      { 
        error: 'Failed to send email. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

