import { PartnersSection } from '@/components/PartnersSection'
import { getServices } from '@/data/services'
import { getPartners } from '@/data/partners'
import { ServiceCard } from '@/components/ServiceCard'

export default async function ServicesPage() {
  const [services, partners] = await Promise.all([
    getServices(),
    getPartners(),
  ])

  return (
    <main className="pt-20 md:pt-0">
      {/* Page Title Section */}
      <section className="pt-10 md:pt-32 pb-6 md:pb-12 px-4">
        <div className="max-w-[1279px] mx-auto">
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
              Our Engineering & Consulting Services
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
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 pb-10 md:pb-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection partners={partners} />
    </main>
  )
}

