import { notFound } from 'next/navigation'
import { ServiceImageCarousel } from '@/components/ServiceImageCarousel'
import { getServiceBySlug } from '@/data/services'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

interface ServiceDetailPageProps {
  params: {
    slug: string
  }
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  // In Next.js 15, params is a Promise and must be awaited
  const { slug } = await params
  
  // Fetch service data
  const service = await getServiceBySlug(slug)

  // If service not found, show 404
  if (!service) {
    notFound()
  }

  return (
    <main className="pt-20 md:pt-0 md:mt-28">
      {/* Service Title Section */}
      <section className="w-full max-w-[1280px] mx-auto px-4 py-10 md:py-20">
        <div className="flex flex-col gap-6 md:gap-10 items-center">
          <h1 className="text-[28px] md:text-[32px] font-bold leading-[1.25] text-[#1212a0] text-center max-w-[630px]">
            {service.title}
          </h1>
        </div>
      </section>

      {/* Description Section */}
      <section className="w-full max-w-[630px] mx-auto px-4 md:px-0 flex flex-col gap-[27px] items-center">
        {/* Top Decorative Lines */}
        <div className="opacity-30 w-full max-w-[300px]">
          <svg width="300" height="13" viewBox="0 0 300 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <line x1="45" y1="1.104" x2="254.649" y2="1.104" stroke="#1212A0" strokeWidth="2.208"/>
            <line x1="0" y1="11.896" x2="9.066" y2="11.896" stroke="#1212A0" strokeWidth="2.208"/>
            <line x1="22" y1="11.896" x2="239.344" y2="11.896" stroke="#1212A0" strokeWidth="2.208"/>
            <line x1="289" y1="11.896" x2="298.066" y2="11.896" stroke="#1212A0" strokeWidth="2.208"/>
          </svg>
        </div>

        {/* Description Text */}
        <p className="text-[16px] leading-[1.5] text-[#15151c] text-justify w-full">
          {service.description}
        </p>

        {/* Bottom Decorative Lines */}
        <div className="opacity-30 rotate-180 w-full max-w-[300px]">
          <svg width="300" height="13" viewBox="0 0 300 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <line x1="45" y1="1.104" x2="254.649" y2="1.104" stroke="#1212A0" strokeWidth="2.208"/>
            <line x1="0" y1="11.896" x2="9.066" y2="11.896" stroke="#1212A0" strokeWidth="2.208"/>
            <line x1="22" y1="11.896" x2="239.344" y2="11.896" stroke="#1212A0" strokeWidth="2.208"/>
            <line x1="289" y1="11.896" x2="298.066" y2="11.896" stroke="#1212A0" strokeWidth="2.208"/>
          </svg>
        </div>
      </section>

      {/* Our Expertise Section */}
      {service.expertises && service.expertises.length > 0 && (
        <section className="w-full max-w-[1280px] mx-auto px-4 py-10 md:py-20 mt-10 md:mt-20">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-6">
            {/* Image */}
            <div className="relative w-full md:w-[699px] h-[270px] md:h-[510px] rounded overflow-hidden shadow-[0px_4px_15px_0px_rgba(18,18,160,0.15)] bg-white flex-shrink-0 order-1">
              {service.coverImage ? (
                <Image
                  src={urlFor(service.coverImage).width(1400).height(1020).url()}
                  alt={service.title}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="flex items-center justify-center size-full bg-gray-100 text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Expertise List */}
            <div className="flex flex-col gap-4 w-full md:w-[507px] order-2">
              <h2 className="text-[22px] md:text-[28px] font-semibold leading-[1.3] text-[#1212a0]">
                Our Expertise Includes
              </h2>
              <ul className="flex flex-col gap-4">
                {service.expertises.map((expertise, index) => (
                  <li 
                    key={index}
                    className="text-[18px] md:text-[22px] font-semibold leading-[1.3] text-[#15151c] list-disc ml-[27px] md:ml-[33px]"
                  >
                    {expertise}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Selected Service Images Section */}
      {service.imageList && service.imageList.length > 0 && (
        <section className="w-full max-w-[1280px] mx-auto px-4 py-10 md:py-20">
          <div className="flex flex-col gap-10 items-center">
            <h2 className="text-[22px] md:text-[28px] font-semibold leading-[1.3] text-[#1212a0]">
              Selected Steel Design Projects
            </h2>
            <ServiceImageCarousel images={service.imageList} serviceName={service.title} />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="w-full max-w-[1280px] mx-auto px-4 py-10 md:py-20">
        <div className="relative flex items-center justify-center min-h-[300px] md:min-h-[260px]">
          {/* Tilted Card Background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-full max-w-[370px] md:max-w-[856px] h-[334px] md:h-[260px] bg-white rounded shadow-[0px_2px_15px_0px_rgba(47,47,62,0.15)]"
              style={{ transform: 'rotate(0.76deg)' }}
            />
            <div 
              className="absolute w-full max-w-[370px] md:max-w-[856px] h-[334px] md:h-[260px] border border-[#1212a0] border-dashed rounded"
              style={{ transform: 'rotate(2.33deg)' }}
            />
          </div>

          {/* CTA Content */}
          <div className="relative z-10 flex flex-col gap-6 items-center justify-center text-center max-w-[338px] md:max-w-[628px] px-4 py-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-[22px] md:text-[28px] font-semibold leading-[1.3] text-[#1212a0]">
                Start Your Steel Design Project With Us
              </h2>
              <p className="text-[16px] font-semibold leading-[1.5] text-[#15151c]">
                Whether you&apos;re designing a PEB structure, an industrial steel frame, or a complex non-building facility, our team is ready to support your project from concept to execution.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2 rounded bg-[#1212a0] text-white text-[16px] font-semibold leading-[1.5] hover:bg-[#0d0d70] transition-colors"
              style={{
                background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgba(18, 18, 160, 1) 0%, rgba(18, 18, 160, 1) 100%)'
              }}
            >
              Request a Quote
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
