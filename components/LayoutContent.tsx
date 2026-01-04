'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Service } from '@/types'

interface LayoutContentProps {
  services: Service[]
  children: React.ReactNode
}

export function LayoutContent({ services, children }: LayoutContentProps) {
  const pathname = usePathname()
  const isStudioUrl = pathname.startsWith('/studio')

  return (
    <>
      {!isStudioUrl && <Navbar services={services} />}
      
      {children}

      {!isStudioUrl && (
        <div className="mt-8">
          <Footer />
        </div>
      )}
    </>
  )
}

