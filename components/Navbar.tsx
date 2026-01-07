'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Service } from '@/types'
import Image from 'next/image'

interface NavbarProps {
  services?: Service[]
}

export function Navbar({ services = [] }: NavbarProps) {
  const pathname = usePathname()
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileServicesRef = useRef<HTMLDivElement>(null)

  // Determine active states
  const isHomeActive = pathname === '/'
  const isServicesActive = pathname?.startsWith('/services')
  const isCareersActive = pathname === '/careers'
  const isContactActive = pathname === '/contact'

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Only handle desktop dropdown
      if (window.innerWidth >= 768) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsServicesOpen(false)
        }
      }
    }

    if (isServicesOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isServicesOpen])

  return (
    <nav className="fixed top-0 md:top-5 left-0 md:left-1/2 md:-translate-x-1/2 z-50 w-full md:max-w-[1280px] px-4 md:px-0">
      <div className="backdrop-blur-[10px] bg-white/90 md:rounded-lg shadow-[0px_2px_6px_0px_rgba(47,47,62,0.15)] px-4 md:px-[30px] py-3 md:py-[14px]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="h-[50px] md:h-[56px] w-[180px] md:w-[200px] relative">
              <Image 
                src="/nav-logo.png" 
                alt="Folaz" 
                fill
                className="object-contain"
                priority 
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-0">
            <Link 
              href="/" 
              className={`px-6 py-2.5 text-[16px] font-semibold border-r border-[#d8d8dd] transition-colors ${
                isHomeActive ? 'text-[#1212a0]' : 'text-[#15151c] hover:text-[#1212a0]'
              }`}
            >
              Home
            </Link>
            
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`px-6 py-2.5 text-[16px] font-semibold border-r border-[#d8d8dd] flex items-center gap-2.5 hover:bg-[rgba(219,219,219,0.25)] transition-colors ${
                  isServicesActive ? 'text-[#1212a0]' : 'text-[#15151c]'
                }`}
                type="button"
              >
                Services
                <svg width="12" height="6" viewBox="0 0 12 6" fill="none" className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}>
                  <path d="M1 1L6 5L11 1" stroke={isServicesActive ? '#1212a0' : '#15151c'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Services Dropdown */}
              {isServicesOpen && services.length > 0 && (
                <div className="absolute left-0 top-[calc(100%+12px)] bg-white rounded shadow-[0px_6px_10px_0px_rgba(18,18,160,0.05)] p-3.5 w-[314px] z-50">
                  {services.map((service, index) => (
                    <div key={service._id}>
                      <Link
                        href={`/services/${service.slug.current}`}
                        className="block py-1.5 text-[16px] font-semibold text-[#15151c] hover:text-[#1212a0] transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        {service.title}
                      </Link>
                      {index < services.length - 1 && (
                        <div className="h-px bg-[#d8d8dd] my-4" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link 
              href="/careers" 
              className={`px-6 py-2.5 text-[16px] font-semibold border-r border-[#d8d8dd] transition-colors ${
                isCareersActive ? 'text-[#1212a0]' : 'text-[#15151c] hover:text-[#1212a0]'
              }`}
            >
              Careers
            </Link>

            <Link 
              href="/contact" 
              className={`px-6 py-2.5 text-[16px] font-semibold transition-colors ${
                isContactActive ? 'text-[#1212a0]' : 'text-[#15151c] hover:text-[#1212a0]'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="#15151c" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="#15151c" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-[#d8d8dd] flex flex-col gap-2">
            <Link 
              href="/" 
              className={`px-4 py-2.5 text-[16px] font-semibold hover:bg-[#f5f5f6] rounded transition-colors ${
                isHomeActive ? 'text-[#1212a0]' : 'text-[#15151c]'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Services Mobile Dropdown */}
            <div ref={mobileServicesRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`w-full px-4 py-2.5 text-[16px] font-semibold hover:bg-[#f5f5f6] rounded transition-colors flex items-center justify-between ${
                  isServicesActive ? 'text-[#1212a0]' : 'text-[#15151c]'
                }`}
                type="button"
              >
                Services
                <svg width="12" height="6" viewBox="0 0 12 6" fill="none" className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}>
                  <path d="M1 1L6 5L11 1" stroke={isServicesActive ? '#1212a0' : '#15151c'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {isServicesOpen && services.length > 0 && (
                <div className="mt-2 ml-4 flex flex-col gap-2">
                  {services.map((service) => (
                    <Link
                      key={service._id}
                      href={`/services/${service.slug.current}`}
                      className="px-4 py-2 text-[14px] font-semibold text-[#15151c] hover:text-[#1212a0] hover:bg-[#f5f5f6] rounded transition-colors"
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        setIsServicesOpen(false)
                      }}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link 
              href="/careers" 
              className={`px-4 py-2.5 text-[16px] font-semibold hover:bg-[#f5f5f6] rounded transition-colors ${
                isCareersActive ? 'text-[#1212a0]' : 'text-[#15151c]'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Careers
            </Link>
            <Link 
              href="/contact" 
              className={`px-4 py-2.5 text-[16px] font-semibold hover:bg-[#f5f5f6] rounded transition-colors ${
                isContactActive ? 'text-[#1212a0]' : 'text-[#15151c]'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

