import { Partner } from '@/types'
import { urlFor } from '@/sanity/lib/image'

interface PartnersSectionProps {
  partners: Partner[]
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  // Sort by display order
  const sortedPartners = [...partners].sort((a, b) => (a.order || 0) - (b.order || 0))

  return (
    <section className="w-full bg-white py-10 md:py-14">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex flex-col gap-6 md:gap-10 items-center">
          {/* Section Header */}
          <div className="backdrop-blur-[5px] border-t border-b-2 border-[rgba(47,47,62,0.15)] px-6 md:px-10 py-2.5 rounded-full">
            <h2 className="text-[28px] md:text-[32px] font-bold leading-[1.25] text-[#1212a0] text-center">
              Trusted by Leading Partners
            </h2>
          </div>

          {/* Partners Grid - 5 logos per row */}
          <div className="w-full flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {sortedPartners.map((partner) => {
              const logoElement = partner.logo && (
                <img
                  src={urlFor(partner.logo).url()}
                  alt={partner.name}
                  className="max-w-[120px] max-h-[80px] md:max-w-[220px] md:max-h-[160px] w-auto h-auto object-contain"
                />
              )

              return (
                <div 
                  key={partner._id}
                  className="relative transition-opacity hover:opacity-80"
                >
                  {partner.website ? (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {logoElement}
                    </a>
                  ) : (
                    logoElement
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

