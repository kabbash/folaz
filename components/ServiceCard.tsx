import Link from 'next/link'
import Image from 'next/image'
import { Service } from '@/types'
import { urlFor } from '@/sanity/lib/image'

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg p-3.5 flex flex-col gap-6 h-full relative">
      {/* Blue Accent Bar */}
      <div className="absolute left-0 top-[233px] md:top-[233px] w-full h-[70px] md:h-[70px] bg-[#1212a0] opacity-10" />

      {/* Service Image */}
      <div className="relative w-full h-[200px] rounded overflow-hidden">
        {service.coverImage && (
          <Image
            src={urlFor(service.coverImage).width(600).height(400).url()}
            alt={service.title}
            fill
            className="object-contain"
          />
        )}
      </div>

      {/* Service Content */}
      <div className="flex flex-col flex-1 justify-between gap-4">
        <div className="flex flex-col gap-2.5">
          {/* Title */}
          <div className="h-[58px] flex flex-col justify-center">
            <h3 className="text-[18px] md:text-[22px] font-semibold leading-[1.3] text-[#15151c] text-center">
              {service.title}
            </h3>
          </div>

          {/* Short Description */}
          <p className="text-[16px] leading-[1.5] text-[#15151c]">
            {service.shortDescription}
          </p>
        </div>

        {/* Learn More Link */}
        <Link
          href={`/services/${service.slug.current}`}
          className="border-b border-[#1212a0] pb-0.5 text-[16px] font-semibold text-[#1212a0] hover:text-[#0d0d70] transition-colors self-start"
        >
          Learn More →
        </Link>
      </div>
    </div>
  )
}

