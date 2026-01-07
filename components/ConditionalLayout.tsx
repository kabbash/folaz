'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Service } from '@/types'

interface ConditionalLayoutProps {
  services: Service[]
  children: React.ReactNode
}

export function ConditionalLayout({ services, children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Hide navbar and footer on studio pages
  const isStudioPage = pathname?.startsWith('/studio')

  return (
    <>
      {!isStudioPage && <Navbar services={services} />}
      {children}
      {!isStudioPage && <Footer />}
    </>
  )
}

