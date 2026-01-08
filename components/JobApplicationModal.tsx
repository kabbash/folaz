'use client'

import { useState, useRef } from 'react'

interface JobApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  jobTitle: string
}

export function JobApplicationModal({ isOpen, onClose, jobTitle }: JobApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [resume, setResume] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
      if (!allowedTypes.includes(file.type)) {
        setSubmitStatus({
          type: 'error',
          message: 'Please upload a PDF or DOC/DOCX file',
        })
        return
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024 // 10MB
      if (file.size > maxSize) {
        setSubmitStatus({
          type: 'error',
          message: 'File size must be less than 10MB',
        })
        return
      }

      setResume(file)
      setSubmitStatus({ type: null, message: '' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!resume) {
      setSubmitStatus({
        type: 'error',
        message: 'Please upload your resume',
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const data = new FormData()
      data.append('name', formData.name)
      data.append('email', formData.email)
      data.append('phone', formData.phone)
      data.append('message', formData.message)
      data.append('jobTitle', jobTitle)
      data.append('resume', resume)

      const response = await fetch('/api/job-application', {
        method: 'POST',
        body: data,
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Your application has been submitted successfully! We will review it and get back to you soon.',
        })
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        })
        setResume(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        
        // Close modal after 3 seconds
        setTimeout(() => {
          onClose()
          setSubmitStatus({ type: null, message: '' })
        }, 3000)
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to submit application. Please try again.',
        })
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRemoveFile = () => {
    setResume(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#2f2f3e] hover:text-[#1212a0] transition-colors"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="p-6 md:p-8">
          <h2 className="text-[28px] md:text-[32px] font-bold leading-[1.25] text-[#1212a0] mb-2">
            Apply for Position
          </h2>
          
          <p className="text-[18px] font-semibold text-[#15151c] mb-4">
            {jobTitle}
          </p>
          
          <p className="text-[16px] leading-[1.5] text-[#15151c] mb-6">
            Fill out the form below to apply for this position. Please attach your resume in PDF or DOC format.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Status Message */}
            {submitStatus.type && (
              <div
                className={`p-4 rounded-lg ${
                  submitStatus.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                <p className="text-sm font-medium">{submitStatus.message}</p>
              </div>
            )}

            {/* Name Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-[16px] font-semibold leading-[1.5] text-[#15151c]">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full h-12 px-4 py-2.5 bg-white border-0 border-b border-[#1212a0] text-[16px] leading-[1.5] text-[#15151c] placeholder:text-[#15151c]/60 focus:outline-none shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)]"
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[16px] font-semibold leading-[1.5] text-[#15151c]">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe@gmail.com"
                required
                className="w-full h-12 px-4 py-2.5 bg-white border-0 border-b border-[#1212a0] text-[16px] leading-[1.5] text-[#15151c] placeholder:text-[#15151c]/60 focus:outline-none shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)]"
              />
            </div>

            {/* Phone Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-[16px] font-semibold leading-[1.5] text-[#15151c]">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                className="w-full h-12 px-4 py-2.5 bg-white border-0 border-b border-[#1212a0] text-[16px] leading-[1.5] text-[#15151c] placeholder:text-[#15151c]/60 focus:outline-none shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)]"
              />
            </div>

            {/* Message Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-[16px] font-semibold leading-[1.5] text-[#15151c]">
                Cover Letter / Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us why you're a great fit for this position..."
                rows={4}
                className="w-full px-4 py-2.5 bg-white border-0 border-b border-[#1212a0] text-[16px] leading-[1.5] text-[#15151c] placeholder:text-[#15151c]/60 focus:outline-none resize-none shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)]"
              />
            </div>

            {/* File Upload */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="resume" className="text-[16px] font-semibold leading-[1.5] text-[#15151c]">
                Resume / CV *
              </label>
              
              {!resume ? (
                <div className="relative">
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-[#1212a0] rounded-lg bg-[#1212a0]/5 hover:bg-[#1212a0]/10 transition-colors flex flex-col items-center justify-center gap-2"
                  >
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <path d="M24 32V16M24 16L18 22M24 16L30 22" stroke="#1212a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M38 32V38C38 39.1046 37.1046 40 36 40H12C10.8954 40 10 39.1046 10 38V32" stroke="#1212a0" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <p className="text-[16px] font-semibold text-[#1212a0]">
                      Click to upload resume
                    </p>
                    <p className="text-[14px] text-[#2f2f3e]">
                      PDF, DOC, or DOCX (max 10MB)
                    </p>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-[#1212a0]/5 border border-[#1212a0]/20 rounded-lg">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M20 4H8C6.89543 4 6 4.89543 6 6V26C6 27.1046 6.89543 28 8 28H24C25.1046 28 26 27.1046 26 26V10L20 4Z" fill="#1212a0" opacity="0.2"/>
                    <path d="M20 4V10H26" stroke="#1212a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 4H8C6.89543 4 6 4.89543 6 6V26C6 27.1046 6.89543 28 8 28H24C25.1046 28 26 27.1046 26 26V10L20 4Z" stroke="#1212a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-[#15151c] truncate">
                      {resume.name}
                    </p>
                    <p className="text-[12px] text-[#2f2f3e]">
                      {(resume.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    aria-label="Remove file"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 5L5 15M5 5l10 10" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-6 py-2 rounded bg-[#1212a0] text-white text-[16px] font-semibold leading-[1.5] hover:bg-[#0d0d70] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgba(18, 18, 160, 1) 0%, rgba(18, 18, 160, 1) 100%)'
              }}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}



