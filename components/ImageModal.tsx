'use client'

import { useEffect } from 'react'
import { SanityImage } from '@/types'
import { urlFor } from '@/sanity/lib/image'

interface ImageModalProps {
  image: SanityImage
  alt: string
  isOpen: boolean
  onClose: () => void
}

export function ImageModal({ image, alt, isOpen, onClose }: ImageModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 backdrop-blur-[7.5px] bg-[rgba(47,47,62,0.8)]" />

      {/* Modal Content */}
      <div
        className="relative max-w-[1058px] max-h-[800px] w-[90vw] h-[80vh] bg-white rounded-lg p-10 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-[10px] right-[10px] z-10 backdrop-blur-[7.5px] bg-[rgba(47,47,62,0.15)] p-2.5 rounded hover:bg-[rgba(47,47,62,0.25)] transition-colors"
          aria-label="Close modal"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L12 12M12 1L1 12"
              stroke="#2F2F3E"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Image */}
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={urlFor(image).width(1600).height(1200).url()}
            alt={alt}
            className="max-w-full max-h-full object-contain rounded"
          />
        </div>
      </div>
    </div>
  )
}



