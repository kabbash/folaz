import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const message = formData.get('message') as string
    const jobTitle = formData.get('jobTitle') as string
    const file = formData.get('resume') as File

    // Validate required fields
    if (!name || !email || !jobTitle || !file) {
      return NextResponse.json(
        { error: 'Name, email, job title, and resume are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only PDF and DOC/DOCX files are allowed' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const buffer = await file.arrayBuffer()
    const fileContent = Buffer.from(buffer)

    // Send email using Resend
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || '',
      to: [process.env.RESEND_TO_CAREERS_EMAIL || ''],
      replyTo: email,
      subject: `Job Application: ${jobTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1212a0; border-bottom: 2px solid #1212a0; padding-bottom: 10px;">
            New Job Application
          </h2>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #e8f4f8; border-radius: 4px;">
            <p style="margin: 0;">
              <strong style="color: #15151c;">Position Applied For:</strong> ${jobTitle}
            </p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;">
              <strong style="color: #15151c;">Name:</strong> ${name}
            </p>
            <p style="margin: 10px 0;">
              <strong style="color: #15151c;">Email:</strong> 
              <a href="mailto:${email}" style="color: #1212a0;">${email}</a>
            </p>
            ${phone ? `
            <p style="margin: 10px 0;">
              <strong style="color: #15151c;">Phone:</strong> ${phone}
            </p>
            ` : ''}
          </div>
          
          ${message ? `
          <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #1212a0;">
            <strong style="color: #15151c;">Cover Letter / Message:</strong>
            <p style="margin: 10px 0; white-space: pre-wrap;">${message}</p>
          </div>
          ` : ''}
          
          <div style="margin: 20px 0; padding: 15px; background-color: #e8f4f8; border-radius: 4px;">
            <p style="margin: 0;">
              <strong style="color: #15151c;">📎 Resume attached:</strong> ${file.name}
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>This email was sent from the Folaz Engineering job application form.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: file.name,
          content: fileContent,
        },
      ],
    })

    return NextResponse.json(
      { message: 'Application submitted successfully', data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error submitting job application:', error)
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again later.' },
      { status: 500 }
    )
  }
}




