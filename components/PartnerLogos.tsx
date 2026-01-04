import { Partner } from '@/types'
import { urlFor } from '@/sanity/lib/image'

interface PartnerLogosProps {
  partners: Partner[]
}

export function PartnerLogos({ partners }: PartnerLogosProps) {
  // Sort by display order
  const sortedPartners = [...partners].sort((a, b) => (a.order || 0) - (b.order || 0))

  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-6 md:gap-10">
      {sortedPartners.map((partner) => (
        <div 
          key={partner._id}
          className="relative grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
        >
          {partner.logo && (
            <img
              src={urlFor(partner.logo).width(300).height(200).url()}
              alt={partner.name}
              className="max-w-[130px] md:max-w-[200px] max-h-[60px] md:max-h-[120px] object-contain"
            />
          )}
        </div>
      ))}
    </div>
  )
}



