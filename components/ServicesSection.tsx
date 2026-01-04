import Link from 'next/link'
import { Service } from '@/types'
import { ServiceCarousel } from './ServiceCarousel'

interface ServicesSectionProps {
  services: Service[]
}

export function ServicesSection({ services }: ServicesSectionProps) {

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 py-10 md:py-20">
      <div className="flex flex-col gap-6 md:gap-10 items-center">
        {/* Section Header */}
        <div className="flex flex-col gap-4 md:gap-6 items-center w-full">
          <div className="backdrop-blur-[5px] border-t border-b-2 border-[rgba(47,47,62,0.15)] px-6 md:px-10 py-2.5 rounded-full">
            <h2 className="text-[28px] md:text-[32px] font-bold leading-[1.25] text-[#1212a0] text-center">
              Our Engineering Services
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center w-full">
            <p className="text-[16px] font-semibold leading-[1.5] text-black text-center max-w-2xl">
              Explore the full range of structural engineering services crafted for contractors, developers, and consultants across global markets.
            </p>
            <Link 
              href="/services"
              className="text-[16px] font-semibold text-[#1212a0] border-b border-[#1212a0] pb-0.5 hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              View All Services →
            </Link>
          </div>
        </div>

        {/* Services Carousel */}
        <ServiceCarousel services={services} />
      </div>
    </section>
  )
}

