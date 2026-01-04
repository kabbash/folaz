'use client'

import Image from "next/image";
import { useEffect, useState } from 'react'
import { Vacancy } from '@/types'
import { JobDetailModal } from '@/components/JobDetailModal'
import { InternshipModal } from '@/components/InternshipModal'

export default function CareersPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false)

  useEffect(() => {
    // Fetch vacancies on client side
    async function fetchVacancies() {
      try {
        const response = await fetch('/api/vacancies')
        const data = await response.json()
        setVacancies(data)
      } catch (error) {
        console.error('Error fetching vacancies:', error)
      }
    }
    fetchVacancies()
  }, [])

  const handleLearnMore = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedVacancy(null), 300) // Clear after animation
  }

  const openInternshipModal = () => {
    setIsInternshipModalOpen(true)
  }

  const closeInternshipModal = () => {
    setIsInternshipModalOpen(false)
  }

  return (
    <main className="pt-20 md:pt-0">
      {/* Page Title Section */}
      <section className="w-full max-w-[1279px] mx-auto px-4 pt-10 md:pt-32 pb-6 md:pb-12">
        <div className="flex gap-2.5 items-end justify-center">
          {/* Left Decorative Dots - Desktop Only */}
          <div className="hidden md:flex items-center justify-center">
            <svg width="47" height="10" viewBox="0 0 47 10" fill="none" className="rotate-90">
              <circle cx="4.5" cy="1" r="1" fill="#1212a0" opacity="0.3"/>
              <circle cx="4.5" cy="4.5" r="1" fill="#1212a0" opacity="0.3"/>
              <circle cx="4.5" cy="8" r="1" fill="#1212a0" opacity="0.5"/>
              <circle cx="1" cy="1" r="1" fill="#1212a0" opacity="0.3"/>
              <circle cx="1" cy="4.5" r="1" fill="#1212a0" opacity="0.3"/>
              <circle cx="1" cy="8" r="1" fill="#1212a0" opacity="0.3"/>
            </svg>
          </div>

          <h1 className="text-[34px] md:text-[48px] font-bold leading-[1.2] text-[#1212a0] text-center">
            Build the Future With Folaz | Engineering
          </h1>

          {/* Right Decorative Dots - Desktop Only */}
          <div className="hidden md:flex items-center justify-center">
            <svg width="47" height="10" viewBox="0 0 47 10" fill="none" className="rotate-90 scale-y-[-1]">
              <circle cx="4.5" cy="1" r="1" fill="#1212a0" opacity="0.3"/>
              <circle cx="4.5" cy="4.5" r="1" fill="#1212a0" opacity="0.3"/>
              <circle cx="4.5" cy="8" r="1" fill="#1212a0" opacity="0.5"/>
              <circle cx="1" cy="1" r="1" fill="#1212a0" opacity="0.3"/>
              <circle cx="1" cy="4.5" r="1" fill="#1212a0" opacity="0.3"/>
              <circle cx="1" cy="8" r="1" fill="#1212a0" opacity="0.3"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Hero Section with Image and Benefits Card */}
      <section className="relative w-full max-w-[1280px] mx-auto px-4 md:px-20 py-10 md:py-0 md:mt-10 md:mb-20">
        {/* Background Image - Desktop Only */}
        <div className="hidden md:block relative w-full h-[592px] rounded-lg overflow-hidden mb-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1212a0]/10 to-[#1212a0]/5" />
          <Image
              src="/assets/images/home/why-choose-us.png"
              alt="Engineering team reviewing blueprints"
              fill
              className="object-cover"
              priority
            />
          
          {/* Benefits Card - Positioned inside the image container */}
          <div className="absolute left-0 top-10 backdrop-blur-[10px] bg-white/90 p-6 rounded shadow-[0px_2px_15px_0px_rgba(18,18,160,0.15)] w-[632px]">
            <h2 className="text-[32px] font-bold leading-[1.25] text-[#1212a0] mb-6">
              Why Work at Folaz | Engineering?
            </h2>

            <div className="flex flex-col gap-6">
              {/* Benefit 1 */}
              <div className="flex gap-3.5 items-start">
                <div className="w-12 h-12 shrink-0 relative">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="23" fill="white"/>
                    <circle cx="24" cy="24" r="18" fill="#d8d8dd" opacity="0.3"/>
                    <path d="M24 8C15.2 8 8 15.2 8 24C8 32.8 15.2 40 24 40C32.8 40 40 32.8 40 24C40 15.2 32.8 8 24 8Z" stroke="#1212a0" strokeWidth="2" fill="none"/>
                    <path d="M24 14V24L30 28" stroke="#1212a0" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-[22px] font-semibold leading-[1.3] text-[#15151c] mb-2.5">
                    Work on Global Projects
                  </h3>
                  <p className="text-[16px] leading-[1.5] text-[#15151c]">
                    Contribute to engineering solutions across diverse regions including the USA, MENA, Gulf, and Egypt.
                  </p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="flex gap-3.5 items-start">
                <div className="w-12 h-12 shrink-0 relative">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect x="1" y="1" width="46" height="46" rx="4" fill="white"/>
                    <rect x="8" y="12" width="32" height="24" rx="2" fill="#d8d8dd" opacity="0.3"/>
                    <path d="M16 18L24 24L32 18" stroke="#1212a0" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="20" cy="28" r="3" fill="#1212a0"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-[22px] font-semibold leading-[1.3] text-[#15151c] mb-2.5">
                    Learn From PE-Licensed Experts
                  </h3>
                  <p className="text-[16px] leading-[1.5] text-[#15151c]">
                    Collaborate with experienced engineers who guide, mentor, and review all technical work.
                  </p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="flex gap-3.5 items-start">
                <div className="w-12 h-12 shrink-0 relative">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" fill="white"/>
                    <circle cx="24" cy="24" r="16" fill="#d8d8dd" opacity="0.3"/>
                    <path d="M24 10L26 22H36L28 28L30 40L24 34L18 40L20 28L12 22H22L24 10Z" fill="#1212a0" opacity="0.7"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-[22px] font-semibold leading-[1.3] text-[#15151c] mb-2.5">
                    Growth & Development
                  </h3>
                  <p className="text-[16px] leading-[1.5] text-[#15151c]">
                    Gain exposure to advanced tools, real-world projects, and continuous professional development.
                  </p>
                </div>
              </div>

              {/* Benefit 4 */}
              <div className="flex gap-3.5 items-start">
                <div className="w-12 h-12 shrink-0 relative">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" fill="white"/>
                    <circle cx="24" cy="24" r="4" fill="#1212a0"/>
                    <circle cx="24" cy="24" r="10" stroke="#d8d8dd" strokeWidth="2" opacity="0.5"/>
                    <circle cx="24" cy="24" r="16" stroke="#1212a0" strokeWidth="2"/>
                    <path d="M24 10V14M24 34V38M38 24H34M14 24H10" stroke="#1212a0" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-[22px] font-semibold leading-[1.3] text-[#15151c] mb-2.5">
                    Innovative Engineering Culture
                  </h3>
                  <p className="text-[16px] leading-[1.5] text-[#15151c]">
                    We value precision, teamwork, and problem-solving using the latest structural and BIM technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Image and Card Section */}
        <div className="md:hidden relative">
          {/* Background Image - Mobile */}
          <div className="relative w-full h-[269px] overflow-hidden">
            <Image
              src="/assets/images/home/why-choose-us.png"
              alt="Engineering team reviewing blueprints"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[rgba(18,18,160,0.05)]" />
          </div>

          {/* Benefits Card - Mobile - Overlapping the image */}
          <div className="relative -mt-24 mx-4 backdrop-blur-[10px] bg-[#f5f5f6] p-6 rounded shadow-[0px_2px_15px_0px_rgba(18,18,160,0.15)]">
            <h2 className="text-[28px] font-bold leading-[1.25] text-[#1212a0] mb-6">
              Why Work at Folaz | Engineering?
            </h2>

            <div className="flex flex-col gap-6">
            {/* Benefit 1 */}
            <div className="flex gap-3.5 items-start">
              <div className="w-12 h-12 shrink-0 relative">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="23" fill="white"/>
                  <circle cx="24" cy="24" r="18" fill="#d8d8dd" opacity="0.3"/>
                  <path d="M24 8C15.2 8 8 15.2 8 24C8 32.8 15.2 40 24 40C32.8 40 40 32.8 40 24C40 15.2 32.8 8 24 8Z" stroke="#1212a0" strokeWidth="2" fill="none"/>
                  <path d="M24 14V24L30 28" stroke="#1212a0" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-[18px] font-semibold leading-[1.3] text-[#15151c] mb-2.5">
                  Work on Global Projects
                </h3>
                <p className="text-[16px] leading-[1.5] text-[#15151c]">
                  Contribute to engineering solutions across diverse regions including the USA, MENA, Gulf, and Egypt.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex gap-3.5 items-start">
              <div className="w-12 h-12 shrink-0 relative">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="1" y="1" width="46" height="46" rx="4" fill="white"/>
                  <rect x="8" y="12" width="32" height="24" rx="2" fill="#d8d8dd" opacity="0.3"/>
                  <path d="M16 18L24 24L32 18" stroke="#1212a0" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="20" cy="28" r="3" fill="#1212a0"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-[18px] font-semibold leading-[1.3] text-[#15151c] mb-2.5">
                  Learn From PE-Licensed Experts
                </h3>
                <p className="text-[16px] leading-[1.5] text-[#15151c]">
                  Collaborate with experienced engineers who guide, mentor, and review all technical work.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex gap-3.5 items-start">
              <div className="w-12 h-12 shrink-0 relative">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="20" fill="white"/>
                  <circle cx="24" cy="24" r="16" fill="#d8d8dd" opacity="0.3"/>
                  <path d="M24 10L26 22H36L28 28L30 40L24 34L18 40L20 28L12 22H22L24 10Z" fill="#1212a0" opacity="0.7"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-[18px] font-semibold leading-[1.3] text-[#15151c] mb-2.5">
                  Growth & Development
                </h3>
                <p className="text-[16px] leading-[1.5] text-[#15151c]">
                  Gain exposure to advanced tools, real-world projects, and continuous professional development.
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="flex gap-3.5 items-start">
              <div className="w-12 h-12 shrink-0 relative">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="20" fill="white"/>
                  <circle cx="24" cy="24" r="4" fill="#1212a0"/>
                  <circle cx="24" cy="24" r="10" stroke="#d8d8dd" strokeWidth="2" opacity="0.5"/>
                  <circle cx="24" cy="24" r="16" stroke="#1212a0" strokeWidth="2"/>
                  <path d="M24 10V14M24 34V38M38 24H34M14 24H10" stroke="#1212a0" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-[18px] font-semibold leading-[1.3] text-[#15151c] mb-2.5">
                  Innovative Engineering Culture
                </h3>
                <p className="text-[16px] leading-[1.5] text-[#15151c]">
                  We value precision, teamwork, and problem-solving using the latest structural and BIM technologies.
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Opportunities Section */}
      <section className="w-full max-w-[848px] mx-auto px-4 py-10 md:py-20">
        <div className="flex flex-col gap-10 items-center">
          <h2 className="text-[28px] md:text-[32px] font-bold leading-[1.25] text-[#1212a0] text-center">
            Open Career Opportunities
          </h2>

          {vacancies && vacancies.length > 0 ? (
            <>
              {/* Job Listings - Desktop */}
              <div className="hidden md:flex flex-col gap-4 w-full">
                {vacancies.map((vacancy) => (
                  <div
                    key={vacancy._id}
                    className="bg-white flex items-center justify-between p-2.5 rounded shadow-sm"
                  >
                    <p className="flex-1 text-[16px] font-semibold leading-[1.5] text-[#2f2f3e]">
                      {vacancy.title}
                    </p>
                    <div className="flex items-center gap-10">
                      <p className="text-[16px] leading-[1.5] text-[#2f2f3e] text-center">
                        {vacancy.location}
                      </p>
                      <p className="text-[16px] leading-[1.5] text-[#2f2f3e] text-center">
                        {vacancy.jobType}
                      </p>
                      <button
                        onClick={() => handleLearnMore(vacancy)}
                        className="text-[16px] font-semibold leading-[1.5] text-[#1212a0] border-b border-[#1212a0] pb-0.5 hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        Learn more
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Job Listings - Mobile */}
              <div className="md:hidden flex flex-col gap-6 w-full">
                {vacancies.map((vacancy) => (
                  <div
                    key={vacancy._id}
                    className="relative bg-white flex flex-col gap-2.5 p-2.5 rounded shadow-sm"
                  >
                    {/* Blue background overlay */}
                    <div className="absolute inset-0 bg-[#1212a0] opacity-10 rounded pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col gap-2.5">
                      <p className="text-[16px] font-semibold leading-[1.5] text-[#2f2f3e]">
                        {vacancy.title}
                      </p>
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between text-[16px] leading-[1.5] text-[#2f2f3e] text-center">
                          <p>{vacancy.location}</p>
                          <p>{vacancy.jobType}</p>
                        </div>
                        <button
                          onClick={() => handleLearnMore(vacancy)}
                          className="self-end text-[16px] font-semibold leading-[1.5] text-[#1212a0] border-b border-[#1212a0] pb-0.5 hover:opacity-80 transition-opacity cursor-pointer"
                        >
                          Learn more
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Empty State */}
              <div className="bg-white p-2.5 rounded">
                <p className="text-[16px] font-semibold leading-[1.5] text-[#2f2f3e] text-center">
                  No available opportunities at the moment.
                </p>
              </div>

              {/* Contact Information */}
              <div className="flex flex-col gap-6 items-center">
                <div className="flex flex-col gap-1 items-center text-center">
                  <p className="text-[16px] font-semibold leading-[1.5] text-[#15151c]">
                    You can still send your resume to:
                  </p>
                  <a 
                    href="mailto:resumes@folazengineering.com"
                    className="text-[16px] font-semibold leading-[1.5] text-[#1212a0] underline hover:opacity-80 transition-opacity"
                  >
                    resumes@folazengineering.com
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="w-full max-w-[632px] mx-auto px-4">
        <hr className="border-t border-[#2f2f3e]/30" />
      </div>

      {/* Internship Opportunities Section */}
      <section className="w-full max-w-[848px] mx-auto px-4 py-10 md:py-20">
        <div className="flex flex-col gap-6 items-center">
          <h2 className="text-[28px] md:text-[32px] font-bold leading-[1.25] text-[#1212a0] text-center">
            Internship Opportunities
          </h2>

          <p className="text-[16px] leading-[1.5] text-[#15151c] text-center max-w-full">
            We welcome passionate engineering students and fresh graduates who want hands-on experience in structural design, detailing, and BIM modeling.
          </p>

          <div className="flex flex-col gap-1 items-center text-center">
            <p className="text-[16px] font-semibold leading-[1.5] text-[#15151c]">
              Click the button below to submit your application with your resume
            </p>
          </div>

          <button
            onClick={openInternshipModal}
            className="inline-flex items-center justify-center px-6 py-2 rounded bg-[#1212a0] text-white text-[16px] font-semibold leading-[1.5] hover:bg-[#0d0d70] transition-colors"
            style={{
              background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgba(18, 18, 160, 1) 0%, rgba(18, 18, 160, 1) 100%)'
            }}
          >
            Apply for Internship
          </button>
        </div>
      </section>

      {/* Job Detail Modal */}
      <JobDetailModal
        vacancy={selectedVacancy}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* Internship Application Modal */}
      <InternshipModal
        isOpen={isInternshipModalOpen}
        onClose={closeInternshipModal}
      />
    </main>
  )
}

