# Job & Internship Application Setup

This document explains how the job and internship application features are configured with file upload functionality.

## Overview

The application system allows candidates to submit their applications directly through the website, including:
- Personal information (name, email, phone)
- Optional cover letter/message
- Resume/CV upload (PDF, DOC, or DOCX)

Applications are sent via email to the configured recipient address with the resume attached.

### Two Application Types

1. **Job Applications**: For specific job postings shown in the careers page
2. **Internship Applications**: For general internship opportunities

## Features

- ✅ File upload with drag-and-drop UI
- ✅ File type validation (PDF, DOC, DOCX only)
- ✅ File size validation (max 10MB)
- ✅ Email and required field validation
- ✅ Loading states during submission
- ✅ Success/error messages
- ✅ Form reset after successful submission
- ✅ Professional HTML email template with attachment
- ✅ Modal interface with clean UX

## Setup Instructions

### 1. Environment Variables

The internship application uses the same Resend configuration as the contact form. Ensure you have these variables in your `.env.local` file:

```bash
# Required - Your Resend API key
RESEND_API_KEY=re_your_api_key_here

# Required - Email to send FROM
RESEND_FROM_EMAIL=onboarding@resend.dev

# Required - Email to send TO (where applications will be received)
RESEND_TO_EMAIL=resumes@folazengineering.com
```

### 2. Email Configuration

**Recipient Email**: Update `RESEND_TO_EMAIL` to the email address where you want to receive internship applications (e.g., `resumes@folazengineering.com` or `hr@folazengineering.com`).

**Sender Email**: If you have a verified domain in Resend, update `RESEND_FROM_EMAIL`:

```bash
RESEND_FROM_EMAIL='Folaz Engineering Careers <careers@folazengineering.com>'
```

## Files Created/Modified

### New Files

**Internship Applications:**
- `/app/api/internship/route.ts` - API endpoint for handling internship applications
- `/components/InternshipModal.tsx` - Modal component with application form and file uploader

**Job Applications:**
- `/app/api/job-application/route.ts` - API endpoint for handling job applications
- `/components/JobApplicationModal.tsx` - Modal component with application form and file uploader

### Modified Files

- `/app/careers/page.tsx` - Updated to use internship modal instead of mailto link
- `/components/JobDetailModal.tsx` - Updated to use job application modal instead of mailto link
- `/components/index.ts` - Added InternshipModal and JobApplicationModal exports

## API Endpoints

### Internship Application

**POST** `/api/internship`

#### Request Body (FormData)

```javascript
{
  name: string (required)
  email: string (required)
  phone: string (optional)
  message: string (optional)
  resume: File (required - PDF, DOC, or DOCX, max 10MB)
}
```

### Job Application

**POST** `/api/job-application`

#### Request Body (FormData)

```javascript
{
  name: string (required)
  email: string (required)
  phone: string (optional)
  message: string (optional)
  jobTitle: string (required)
  resume: File (required - PDF, DOC, or DOCX, max 10MB)
}
```

### Response

**Success (200)**
```json
{
  "message": "Application submitted successfully",
  "data": { ... }
}
```

**Error (400/500)**
```json
{
  "error": "Error message"
}
```

### Validation Rules

1. **Required Fields**: name, email, resume
2. **Email Format**: Must be a valid email address
3. **File Type**: Only PDF (.pdf), DOC (.doc), or DOCX (.docx)
4. **File Size**: Maximum 10MB
5. **Phone**: Optional, no validation

## Email Templates

### Internship Application Email
- **Subject**: "Internship Application"
- **Content**:
  - Applicant's name
  - Applicant's email (clickable)
  - Applicant's phone (if provided)
  - Cover letter/message (if provided)
  - Resume attachment with original filename

### Job Application Email
- **Subject**: "Job Application: [Job Title]"
- **Content**:
  - Position applied for (highlighted)
  - Applicant's name
  - Applicant's email (clickable)
  - Applicant's phone (if provided)
  - Cover letter/message (if provided)
  - Resume attachment with original filename

## User Flows

### Internship Application Flow

1. User visits the `/careers` page
2. User clicks "Apply for Internship" button in the Internship Opportunities section
3. Internship modal opens with the application form
4. User fills out their information
5. User clicks the file upload area to select their resume
6. File is validated (type and size)
7. User submits the form
8. Loading state is displayed
9. Success message is shown for 3 seconds
10. Modal automatically closes
11. Email is sent with subject "Internship Application"

### Job Application Flow

1. User visits the `/careers` page
2. User clicks "Learn more" on a specific job posting
3. Job detail modal opens showing job information
4. User clicks "Apply Now" button
5. Job application modal opens (pre-filled with job title)
6. User fills out their information
7. User clicks the file upload area to select their resume
8. File is validated (type and size)
9. User submits the form
10. Loading state is displayed
11. Success message is shown for 3 seconds
12. Modal automatically closes
13. Email is sent with subject "Job Application: [Job Title]"

## File Upload Component

The file upload component provides:
- Visual feedback with upload icon
- File type and size information
- Selected file preview with name and size
- Remove file button
- Instant validation feedback

## Testing

### Testing Internship Applications

1. Start the development server: `npm run dev`
2. Navigate to `/careers`
3. Scroll to "Internship Opportunities" section
4. Click "Apply for Internship" button
5. Fill out the form:
   - Enter name and email
   - Optionally add phone and message
   - Upload a PDF, DOC, or DOCX file (max 10MB)
6. Submit the form
7. Check the configured recipient email for the application with subject "Internship Application"

### Testing Job Applications

1. Start the development server: `npm run dev`
2. Navigate to `/careers`
3. Click "Learn more" on any job listing
4. In the job detail modal, click "Apply Now"
5. Fill out the form:
   - Enter name and email
   - Optionally add phone and message
   - Upload a PDF, DOC, or DOCX file (max 10MB)
6. Submit the form
7. Check the configured recipient email for the application with subject "Job Application: [Job Title]"

## Troubleshooting

### "Only PDF and DOC/DOCX files are allowed"
- Ensure you're uploading a file with .pdf, .doc, or .docx extension
- Check that the file's MIME type is correct

### "File size must be less than 10MB"
- Compress your PDF or document file
- Convert images to lower resolution if embedded in the document

### "Failed to submit application"
- Check that `RESEND_API_KEY` is set correctly
- Verify `RESEND_FROM_EMAIL` and `RESEND_TO_EMAIL` are configured
- Check browser console for detailed error messages
- Verify network connectivity

### Application submitted but email not received
- Check spam/junk folder
- Verify the recipient email in `RESEND_TO_EMAIL`
- Check Resend dashboard for delivery status
- Ensure your Resend account is active and has remaining quota

## File Size Limits

- **Maximum file size**: 10MB
- **Recommended size**: Under 5MB for faster uploads
- **Resend limits**: Check your Resend plan for attachment size limits

## Security Considerations

1. File type validation is performed on both client and server
2. File size validation prevents large file uploads
3. Files are not stored on the server - sent directly via email
4. Email addresses are validated before processing
5. FormData is used to prevent XSS attacks

## Future Enhancements

Potential improvements:
- Store applications in a database
- Add application tracking for applicants
- Support for portfolio links
- Multiple file uploads
- Integration with ATS (Applicant Tracking System)

