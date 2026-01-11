'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    console.log('[Contact Form] Starting submission...', formData)

    try {
      console.log('[Contact Form] Sending request to /api/contact')
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('[Contact Form] Response status:', response.status)
      
      let data
      try {
        data = await response.json()
        console.log('[Contact Form] Response data:', data)
      } catch (parseError) {
        console.error('[Contact Form] Failed to parse response:', parseError)
        throw new Error('Invalid response from server')
      }

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message! We will get back to you soon.',
        })
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
      } else {
        console.error('[Contact Form] Request failed:', data)
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to send message. Please try again.',
        })
      }
    } catch (error) {
      console.error('[Contact Form] Error submitting form:', error)
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
      console.log('[Contact Form] Submission complete')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <main className="pt-20 md:pt-0">
      {/* Hero Section with curved bottom */}
      <section className="relative w-full h-[400px] md:h-[340px] md:rounded-bl-[100px] md:rounded-br-[100px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/home/why-choose-us.png"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[rgba(18,18,160,0.05)]" />
        </div>
      </section>

      {/* Contact Card */}
      <section className="relative w-full max-w-[1064px] mx-auto px-4 -mt-20 md:-mt-20 mb-20">
        <div className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.9)] rounded-lg shadow-[0px_6px_10px_0px_rgba(18,18,160,0.05)]">
          {/* Desktop: Two Columns | Mobile: Stacked */}
          <div className="flex flex-col md:flex-row">
            {/* Left Section: Contact Information */}
            <div className="flex-1 p-6 md:p-6 flex flex-col gap-6">
              <h1 className="text-[34px] md:text-[48px] font-bold leading-[1.2] text-[#15151c]">
                For inquiries:
              </h1>

              {/* Email */}
              <div className="flex gap-2 items-center">
                <div className="w-6 h-6 shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="6" width="16" height="12" rx="2" fill="#d8d8dd" opacity="0.3"/>
                    <path d="M4 8L12 13L20 8" stroke="#1212a0" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="8" cy="14" r="2" fill="#1212a0"/>
                  </svg>
                </div>
                <a
                  href="mailto:info@folazengineering.com"
                  className="text-[22px] font-semibold leading-[1.3] text-[#1212a0] underline hover:opacity-80 transition-opacity"
                >
                  info@folazengineering.com
                </a>
              </div>

              {/* Location Info */}
              <div className="flex gap-2 items-start">
                <div className="w-6 h-6 shrink-0 mt-0.5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#d8d8dd" opacity="0.3"/>
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke="#1212a0" strokeWidth="2"/>
                    <circle cx="12" cy="9" r="2.5" fill="#1212a0"/>
                  </svg>
                </div>
                <div className="flex-1 text-[#15151c]">
                  <p className="text-[22px] font-semibold leading-[1.3] mb-2">USA Office:</p>
                  <p className="text-[16px] leading-[1.5] mb-1">
                    <span className="font-semibold">Phone:</span> +1 2017369875
                  </p>
                  <p className="text-[16px] leading-[1.5] mb-4">
                    <span className="font-semibold">Address:</span> 8345 NW 66 ST, MIAMI, FL33166
                  </p>

                  <p className="text-[22px] font-semibold leading-[1.3] mb-2">Egypt Offices:</p>
                  <p className="text-[16px] leading-[1.5] mb-1">
                    <span className="font-semibold">Phone:</span> +2 0100 2988431
                  </p>
                  <p className="text-[16px] leading-[1.5] mb-1">
                    <span className="font-semibold">Address 1:</span> Plot 3, 4-S4, Industrial Zone, Qattameya, Cairo, Egypt
                  </p>
                  <p className="text-[16px] leading-[1.5] mb-4">
                    <span className="font-semibold">Address 2:</span> 16-Mostafa Safwat Street-Helwan
                  </p>

                  <p className="text-[16px] leading-[1.5] mb-1 font-semibold">Managing Director:</p>
                  <p className="text-[16px] leading-[1.5]">Mahmoud Ahmed, PE., M.Sc., M.ASCE, GMICE</p>
                </div>
              </div>
            </div>

            {/* Divider - Vertical on desktop, horizontal on mobile */}
            <div className="hidden md:block w-px h-auto bg-[#2f2f3e] my-6" />
            <div className="md:hidden h-px w-full bg-[#2f2f3e]" />

            {/* Right Section: Contact Form */}
            <div className="w-full md:w-[524px] p-6 md:p-10 flex flex-col gap-8">
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
                    Name
                  </label>
                  <div className="relative">
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
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[16px] font-semibold leading-[1.5] text-[#15151c]">
                    Email
                  </label>
                  <div className="relative">
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
                </div>

                {/* Subject Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-[16px] font-semibold leading-[1.5] text-[#15151c]">
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject title"
                      required
                      className="w-full h-12 px-4 py-2.5 bg-white border-0 border-b border-[#1212a0] text-[16px] leading-[1.5] text-[#15151c] placeholder:text-[#15151c]/60 focus:outline-none shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)]"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[16px] font-semibold leading-[1.5] text-[#15151c]">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message here..."
                      required
                      rows={5}
                      className="w-full px-4 py-2.5 bg-white border-0 border-b border-[#1212a0] text-[16px] leading-[1.5] text-[#15151c] placeholder:text-[#15151c]/60 focus:outline-none resize-none shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.1)]"
                    />
                  </div>
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
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


