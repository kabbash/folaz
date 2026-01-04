'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Project } from '@/types'
import { urlFor } from '@/sanity/lib/image'

interface ProjectCarouselProps {
  projects: Project[]
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No projects available yet.</p>
      </div>
    )
  }

  const totalSlides = projects.length

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0))
  }

  // Get the 3 cards to display: left, center, right
  const getVisibleProjects = () => {
    const leftIndex = currentIndex === 0 ? projects.length - 1 : (currentIndex - 1) % projects.length
    const centerIndex = currentIndex % projects.length
    const rightIndex = (currentIndex + 1) % projects.length

    return [
      { project: projects[leftIndex], position: 'left' },
      { project: projects[centerIndex], position: 'center' },
      { project: projects[rightIndex], position: 'right' },
    ]
  }

  const visibleCards = getVisibleProjects()

  return (
    <div className="w-full">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="relative h-[558px] w-full mx-auto" style={{ maxWidth: '1280px' }}>
          {visibleCards.map(({ project, position }, idx) => {
            const isCenter = position === 'center'
            const isLeft = position === 'left'
            
            return (
              <Link
                key={`${project._id}-${position}`}
                href="#"
                className="absolute bg-white rounded-lg p-3.5 flex flex-col gap-3.5 hover:shadow-[0px_6px_24px_0px_rgba(47,47,62,0.2)] transition-all duration-300"
                style={{
                  left: isLeft ? '50px' : isCenter ? '50%' : 'auto',
                  right: isLeft ? 'auto' : isCenter ? 'auto' : '50px',
                  top: isCenter ? '0' : '93px',
                  width: isCenter ? '540px' : '308px',
                  height: isCenter ? '558px' : '365px',
                  zIndex: isCenter ? 3 : 1,
                  transform: isCenter ? 'translateX(-50%)' : 'none',
                  boxShadow: isCenter 
                    ? '0px 4px 20px 0px rgba(47,47,62,0.15)' 
                    : '0px 4px 4px 0px rgba(18,18,160,0.1)',
                }}
              >
                <div className="flex-1 rounded overflow-hidden bg-gray-100">
                  {project.image ? (
                    <img
                      src={urlFor(project.image).width(800).height(600).url()}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                      <span className="text-5xl">🏗️</span>
                    </div>
                  )}
                </div>
                <div className="p-3.5 flex items-center justify-center" style={{ minHeight: isCenter ? '120px' : '100px' }}>
                  <h3 className={`${isCenter ? 'text-[28px]' : 'text-[22px]'} font-semibold leading-[1.3] text-[#15151c] text-center`}>
                    {project.title}
                  </h3>
                </div>
              </Link>
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
            {projects.map((_, index) => (
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
        <div className="relative overflow-x-auto overflow-y-visible">
          <div className="flex gap-2.5 pb-4" style={{ scrollSnapType: 'x mandatory' }}>
            {projects.map((project, index) => {
              const isCenter = index === currentIndex
              
              return (
                <Link
                  key={project._id}
                  href="#"
                  className={`flex-shrink-0 bg-white rounded-lg p-3.5 flex flex-col gap-6 transition-all ${
                    isCenter 
                      ? 'w-[320px] h-[300px] shadow-[0px_4px_16px_0px_rgba(18,18,160,0.15)]' 
                      : 'w-[270px] h-[280px] shadow-[0px_2px_8px_0px_rgba(47,47,62,0.15)]'
                  }`}
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="flex-1 rounded overflow-hidden bg-gray-100">
                    {project.image ? (
                      <img
                        src={urlFor(project.image).width(400).height(300).url()}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                        <span className="text-4xl">🏗️</span>
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center justify-center gap-6">
          <button 
            onClick={handlePrev}
            className="w-6 h-3 hover:opacity-70 transition-opacity rotate-90"
            aria-label="Previous slide"
          >
            <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
              <path d="M1 1L6 5L11 1" stroke="#1212a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="flex items-center gap-2.5">
            {projects.map((_, index) => (
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
            className="w-6 h-3 hover:opacity-70 transition-opacity -rotate-90"
            aria-label="Next slide"
          >
            <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
              <path d="M1 1L6 5L11 1" stroke="#1212a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

