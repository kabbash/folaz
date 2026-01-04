'use client'

import { useEffect, useState } from 'react'
import { Vacancy } from '@/types'
import { JobApplicationModal } from './JobApplicationModal'

interface JobDetailModalProps {
  vacancy: Vacancy | null
  isOpen: boolean
  onClose: () => void
}

export function JobDetailModal({ vacancy, isOpen, onClose }: JobDetailModalProps) {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)
  useEffect(() => {
    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden'
      
      // Handle ESC key
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      document.addEventListener('keydown', handleEsc)
      
      return () => {
        document.body.style.overflow = 'unset'
        document.removeEventListener('keydown', handleEsc)
      }
    }
  }, [isOpen, onClose])

  const handleApplyClick = () => {
    setIsApplicationModalOpen(true)
  }

  const handleCloseApplicationModal = () => {
    setIsApplicationModalOpen(false)
  }

  if (!isOpen || !vacancy) return null

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#2f2f3e]/80 backdrop-blur-[5px] md:items-center md:p-4"
      onClick={handleBackdropClick}
    >
      {/* Modal Content */}
      <div className="relative w-full max-w-[370px] md:max-w-[1058px] bg-white rounded-lg mx-auto my-6 md:my-0">
        {/* Desktop Close Button */}
        <button
          onClick={onClose}
          className="hidden md:flex absolute right-3 top-3 items-center justify-center p-2.5 rounded bg-[rgba(47,47,62,0.15)] backdrop-blur-[7.5px] hover:bg-[rgba(47,47,62,0.25)] transition-colors"
          aria-label="Close modal"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M1 13L13 1" stroke="#2f2f3e" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Mobile Close Button (outside modal) */}
        <button
          onClick={onClose}
          className="md:hidden absolute -right-0 -top-12 size-8 flex items-center justify-center rounded-full bg-white"
          aria-label="Close modal"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M1 13L13 1" stroke="#2f2f3e" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="flex flex-col gap-6 p-6 md:p-10">
          {/* Job Title */}
          <div className="flex flex-col items-center px-6 md:px-0">
            <h2 className="text-[22px] md:text-[28px] font-semibold leading-[1.3] text-[#1212a0] text-center">
              {vacancy.title}
            </h2>
          </div>

          {/* Info Bar */}
          <div className="bg-[#d8d8dd] rounded flex flex-col md:flex-row md:gap-[100px] gap-2.5 items-start md:items-center justify-center px-10 py-2.5">
            <p className="text-[16px] font-semibold leading-[1.5] text-[#15151c]">
              Location: <span className="font-normal">{vacancy.location}</span>
            </p>
            <p className="text-[16px] font-semibold leading-[1.5] text-[#15151c]">
              Employment: <span className="font-normal">{vacancy.jobType}</span>
            </p>
          </div>

          {/* Content Sections */}
          <div className="flex flex-col gap-6">
            {/* About the Role */}
            {vacancy.aboutTheRole && (
              <div className="flex flex-col gap-2">
                <h3 className="text-[18px] md:text-[22px] font-semibold leading-[1.3] text-[#15151c]">
                  About the Role:
                </h3>
                <p className="text-[16px] leading-[1.5] text-[#15151c]">
                  {vacancy.aboutTheRole}
                </p>
              </div>
            )}

            {/* Responsibilities */}
            {vacancy.responsibilities && vacancy.responsibilities.length > 0 && (
              <div className="flex flex-col gap-2">
                <h3 className="text-[18px] md:text-[22px] font-semibold leading-[1.3] text-[#15151c]">
                  Responsibilities:
                </h3>
                <ul className="list-disc pl-6 text-[16px] leading-[1.5] text-[#15151c] flex flex-col gap-1">
                  {vacancy.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {vacancy.requirements && vacancy.requirements.length > 0 && (
              <div className="flex flex-col gap-2">
                <h3 className="text-[18px] md:text-[22px] font-semibold leading-[1.3] text-[#15151c]">
                  Requirements:
                </h3>
                <ul className="list-disc pl-6 text-[16px] leading-[1.5] text-[#15151c] flex flex-col gap-1">
                  {vacancy.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Apply Now Button */}
          <button
            onClick={handleApplyClick}
            className="inline-flex items-center justify-center px-6 py-2 rounded bg-[#1212a0] text-white text-[16px] font-semibold leading-[1.5] hover:bg-[#0d0d70] transition-colors"
            style={{
              background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgba(18, 18, 160, 1) 0%, rgba(18, 18, 160, 1) 100%)'
            }}
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={handleCloseApplicationModal}
        jobTitle={vacancy.title}
      />
    </div>
  )
}


