'use client'

import { useState, useRef, useEffect } from 'react'
import { SanityImage } from '@/types'
import { urlFor } from '@/sanity/lib/image'
import { ImageModal } from './ImageModal'

interface ServiceImageCarouselProps {
  images: SanityImage[]
  serviceName: string
}

export function ServiceImageCarousel({ images, serviceName }: ServiceImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const mobileScrollContainerRef = useRef<HTMLDivElement>(null)

  if (!images || images.length === 0) {
    return null
  }

  const totalSlides = images.length

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0))
  }

  // Scroll to current index on mobile when currentIndex changes
  useEffect(() => {
    const container = mobileScrollContainerRef.current
    if (!container) return

    const card = container.children[currentIndex] as HTMLElement
    if (!card) return

    // Use scrollIntoView with center alignment for better browser support
    requestAnimationFrame(() => {
      card.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    })
  }, [currentIndex])

  // Update currentIndex when user manually scrolls on mobile
  useEffect(() => {
    const container = mobileScrollContainerRef.current
    if (!container) return

    // Use IntersectionObserver to detect which card is centered
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio (most visible)
        let mostVisible = entries[0]
        entries.forEach((entry) => {
          if (entry.intersectionRatio > mostVisible.intersectionRatio) {
            mostVisible = entry
          }
        })

        if (mostVisible && mostVisible.isIntersecting && mostVisible.intersectionRatio >= 0.5) {
          const index = Array.from(container.children).indexOf(mostVisible.target as Element)
          if (index !== -1 && index !== currentIndex) {
            setCurrentIndex(index)
          }
        }
      },
      {
        root: container,
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '0px'
      }
    )

    // Observe all cards
    Array.from(container.children).forEach((child) => {
      observer.observe(child)
    })

    return () => {
      observer.disconnect()
    }
  }, [currentIndex, images.length])

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  const handleCloseModal = () => {
    setSelectedImageIndex(null)
  }

  // Get the 3 cards to display: left, center, right (only if we have enough images)
  const getVisibleImages = () => {
    if (images.length === 1) {
      return [{ image: images[0], position: 'center', imageIndex: 0 }]
    }
    
    if (images.length === 2) {
      return [
        { image: images[currentIndex], position: 'center', imageIndex: currentIndex },
        { image: images[(currentIndex + 1) % images.length], position: 'right', imageIndex: (currentIndex + 1) % images.length },
      ]
    }

    const leftIndex = currentIndex === 0 ? images.length - 1 : (currentIndex - 1) % images.length
    const centerIndex = currentIndex % images.length
    const rightIndex = (currentIndex + 1) % images.length

    return [
      { image: images[leftIndex], position: 'left', imageIndex: leftIndex },
      { image: images[centerIndex], position: 'center', imageIndex: centerIndex },
      { image: images[rightIndex], position: 'right', imageIndex: rightIndex },
    ]
  }

  const visibleCards = getVisibleImages()

  return (
    <div className="w-full">
      {/* Image Modal */}
      {selectedImageIndex !== null && (
        <ImageModal
          image={images[selectedImageIndex]}
          alt={`${serviceName} - Image ${selectedImageIndex + 1}`}
          isOpen={true}
          onClose={handleCloseModal}
        />
      )}

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="relative h-[372px] w-full mx-auto" style={{ maxWidth: '1280px' }}>
          {visibleCards.map(({ image, position, imageIndex }, idx) => {
            const isCenter = position === 'center'
            const isLeft = position === 'left'
            
            return (
              <button
                key={`${idx}-${position}`}
                onClick={() => handleImageClick(imageIndex)}
                className="absolute bg-white rounded-lg p-2.5 transition-all duration-300 hover:shadow-lg cursor-pointer"
                style={{
                  left: isLeft ? '50px' : isCenter ? '50%' : 'auto',
                  right: isLeft ? 'auto' : isCenter ? 'auto' : '50px',
                  top: isCenter ? '0' : '66px',
                  width: isCenter ? '462px' : '308px',
                  height: isCenter ? '372px' : '240px',
                  zIndex: isCenter ? 3 : 1,
                  transform: isCenter ? 'translateX(-50%)' : 'none',
                  boxShadow: isCenter 
                    ? '0px 2px 8px 0px rgba(47,47,62,0.15)' 
                    : '0px 2px 8px 0px rgba(47,47,62,0.15)',
                }}
              >
                <div className="w-full h-full rounded overflow-hidden bg-white">
                  <img
                    src={urlFor(image).width(800).height(600).url()}
                    alt={`${serviceName} - Image ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </button>
            )
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button 
            onClick={handlePrev}
            className="w-6 h-6 hover:opacity-70 transition-opacity"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#1212a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="flex items-center gap-2.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-5 h-5 rounded shadow-[0px_1px_1px_0px_rgba(18,18,160,0.25)] transition-colors ${
                  index === currentIndex ? 'bg-[#1212a0]' : 'bg-[#d8d8dd]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="w-6 h-6 hover:opacity-70 transition-opacity"
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#1212a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile View - Horizontal Scrolling Carousel */}
      <div className="md:hidden flex flex-col gap-10">
        {/* Scrollable Container */}
        <div className="relative overflow-x-scroll overflow-y-visible" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div 
            ref={mobileScrollContainerRef}
            className="flex gap-2.5 pb-4" 
            style={{ 
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleImageClick(index)}
                className="flex-shrink-0 bg-white rounded-lg p-3.5 w-[85vw] max-w-[320px] h-[280px] shadow-[0px_2px_8px_0px_rgba(47,47,62,0.15)] hover:shadow-lg transition-shadow cursor-pointer"
                style={{ 
                  scrollSnapAlign: 'center',
                  scrollSnapStop: 'always'
                }}
              >
                <div className="w-full h-full rounded overflow-hidden bg-white">
                  <img
                    src={urlFor(image).width(400).height(300).url()}
                    alt={`${serviceName} - Image ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center justify-center gap-6">
          <button 
            onClick={handlePrev}
            className="w-6 h-6 hover:opacity-70 transition-opacity"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#1212a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="flex items-center gap-2.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-5 h-5 rounded shadow-[0px_1px_1px_0px_rgba(18,18,160,0.25)] transition-colors ${
                  index === currentIndex ? 'bg-[#1212a0]' : 'bg-[#d8d8dd]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="w-6 h-6 hover:opacity-70 transition-opacity"
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#1212a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

