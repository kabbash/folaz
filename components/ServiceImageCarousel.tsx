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
  const isScrollingRef = useRef(false)
  const isInitialMount = useRef(true)
  const [enableScrollSnap, setEnableScrollSnap] = useState(false)

  if (!images || images.length === 0) {
    return null
  }

  const totalSlides = images.length

  // Reset state when service changes (navigation)
  useEffect(() => {
    setCurrentIndex(0)
    setEnableScrollSnap(false)
    isInitialMount.current = true
    
    // Reset scroll position to start
    const container = mobileScrollContainerRef.current
    if (container) {
      container.scrollLeft = 0
    }
    
    const timer = setTimeout(() => {
      setEnableScrollSnap(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [serviceName])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0))
  }

  // Scroll to the current card when index changes
  useEffect(() => {
    // Skip scrolling on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const container = mobileScrollContainerRef.current
    if (!container || isScrollingRef.current) return

    const cards = container.querySelectorAll('[data-card-index]')
    const targetCard = cards[currentIndex] as HTMLElement
    
    if (targetCard) {
      isScrollingRef.current = true
      targetCard.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
      
      // Reset scrolling flag after animation
      setTimeout(() => {
        isScrollingRef.current = false
      }, 500)
    }
  }, [currentIndex])

  // Detect scroll position and update current index
  useEffect(() => {
    const container = mobileScrollContainerRef.current
    if (!container) return

    // Don't set up scroll listener if scroll snap is not enabled yet (prevents auto-scroll on mount)
    if (!enableScrollSnap) return

    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      
      scrollTimeout = setTimeout(() => {
        if (isScrollingRef.current) return

        const cards = container.querySelectorAll('[data-card-index]')
        const containerRect = container.getBoundingClientRect()
        const containerCenter = containerRect.left + containerRect.width / 2

        let closestIndex = 0
        let closestDistance = Infinity

        cards.forEach((card, index) => {
          const cardRect = card.getBoundingClientRect()
          const cardCenter = cardRect.left + cardRect.width / 2
          const distance = Math.abs(containerCenter - cardCenter)

          if (distance < closestDistance) {
            closestDistance = distance
            closestIndex = index
          }
        })

        if (closestIndex !== currentIndex) {
          setCurrentIndex(closestIndex)
        }
      }, 100)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      container.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [currentIndex, enableScrollSnap])

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
                <div className="w-full h-full rounded overflow-hidden bg-white flex items-center justify-center">
                  <img
                    src={urlFor(image).fit('max').width(800).url()}
                    alt={`${serviceName} - Image ${idx + 1}`}
                    className="max-w-full max-h-full object-contain"
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
      <div className="md:hidden flex flex-col gap-10 w-full overflow-hidden">
        {/* Scrollable Container */}
        <div 
          ref={mobileScrollContainerRef}
          className="overflow-x-auto overflow-y-visible scrollbar-hide"
          style={{
            scrollSnapType: enableScrollSnap ? 'x mandatory' : 'none',
            WebkitOverflowScrolling: 'touch',
            scrollPaddingLeft: 'calc(50% - 160px)',
            scrollPaddingRight: 'calc(50% - 160px)'
          }}
        >
          <div 
            className="flex pb-4" 
            style={{ 
              gap: '16px', 
              paddingLeft: 'calc(50% - 160px)', 
              paddingRight: 'calc(50% - 160px)' 
            }}
          >
            {images.map((image, index) => {
              const isCenter = index === currentIndex
              
              return (
                <button
                  key={index}
                  data-card-index={index}
                  onClick={() => handleImageClick(index)}
                  className={`shrink-0 bg-white rounded-lg p-3.5 transition-shadow duration-300 cursor-pointer ${
                    isCenter 
                      ? 'shadow-[0px_4px_20px_0px_rgba(18,18,160,0.25)]' 
                      : 'shadow-[0px_2px_8px_0px_rgba(47,47,62,0.15)]'
                  }`}
                  style={{ 
                    scrollSnapAlign: 'center',
                    scrollSnapStop: 'always',
                    width: '320px',
                    minHeight: '280px'
                  }}
                >
                  <div className="w-full h-full rounded overflow-hidden bg-white flex items-center justify-center">
                    <img
                      src={urlFor(image).fit('max').width(600).url()}
                      alt={`${serviceName} - Image ${index + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </button>
              )
            })}
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

