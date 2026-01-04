import Image from "next/image"

export function WhyChooseUs() {
  const benefits = [
    {
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28.5" fill="#E8F4F8"/>
          <path d="M18 30.5L25 37.5L42 20.5" stroke="#4FB3D4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="15" cy="15" r="4" fill="#FFB84D"/>
          <circle cx="45" cy="45" r="3" fill="#4FB3D4"/>
        </svg>
      ),
      title: 'Multidisciplinary Engineering & Consulting Expertise',
      description: 'Contribute to engineering solutions across diverse regions including the USA, MENA, Gulf, and Egypt.',
    },
    {
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28.5" fill="#E8F4F8"/>
          <path d="M24 30L28 34L36 26" stroke="#4FB3D4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="30" cy="30" r="10" stroke="#4FB3D4" strokeWidth="2"/>
          <circle cx="15" cy="15" r="4" fill="#FFB84D"/>
        </svg>
      ),
      title: 'Certified PE Supervision & Compliance',
      description: 'All designs and calculations are produced or overseen by licensed Professional Engineers (PE), ensuring accuracy, safety, and adherence to U.S. state standards.',
    },
    {
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28.5" fill="#E8F4F8"/>
          <circle cx="30" cy="30" r="12" stroke="#4FB3D4" strokeWidth="2"/>
          <path d="M18 30 Q 30 18, 42 30 Q 30 42, 18 30" stroke="#4FB3D4" strokeWidth="1.5" fill="none"/>
          <circle cx="30" cy="18" r="2" fill="#4FB3D4"/>
          <circle cx="30" cy="42" r="2" fill="#4FB3D4"/>
          <circle cx="42" cy="30" r="2" fill="#4FB3D4"/>
          <circle cx="18" cy="30" r="2" fill="#4FB3D4"/>
          <circle cx="45" cy="15" r="3" fill="#FFB84D"/>
        </svg>
      ),
      title: 'Global Project Experience',
      description: 'We operate across the USA, MENA region, Gulf Area, and Egypt, collaborating with reputable contractors and consultants on diverse structural projects.',
    },
    {
      icon: (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28.5" fill="#E8F4F8"/>
          <path d="M30 18 L30 30 M24 24 L36 36" stroke="#4FB3D4" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="30" cy="30" r="8" fill="#4FB3D4" fillOpacity="0.2"/>
          <path d="M30 22 C33.866 22 37 25.134 37 29 C37 32.866 33.866 36 30 36 C26.134 36 23 32.866 23 29" stroke="#4FB3D4" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="15" cy="45" r="4" fill="#FFB84D"/>
        </svg>
      ),
      title: 'Optimized, High-Quality Deliverables',
      description: 'Our designs, drawings, and BIM outputs are cost-efficient, practical, and presented with a competitive level of quality and detail.',
    },
  ]

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 py-10 md:py-20">
      <div className="flex flex-col gap-6 md:gap-10 items-center">
        {/* Section Header */}
        <div className="backdrop-blur-[5px] border-t border-b-2 border-[rgba(47,47,62,0.15)] px-6 md:px-10 py-2.5 rounded-full">
          <h2 className="text-[28px] md:text-[32px] font-bold leading-[1.25] text-[#1212a0] text-center">
            Why Companies Choose Us
          </h2>
        </div>

        {/* Content */}
        <div className="relative w-full grid grid-cols-1 md:grid-cols-[632px_1fr] gap-8 items-start">
          {/* Benefits List - Left Side */}
          <div className="backdrop-blur-[10px] bg-white/90 rounded p-6 shadow-[0px_2px_15px_0px_rgba(18,18,160,0.15)] flex flex-col gap-6 z-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-3.5 items-start">
                <div className="shrink-0">
                  {benefit.icon}
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-[18px] md:text-[22px] font-semibold leading-[1.3] text-[#15151c]">
                    {benefit.title}
                  </h3>
                  <p className="text-[16px] leading-[1.5] text-[#15151c]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Image - Right Side */}
          <div className="relative h-[400px] md:h-[621px] rounded-lg overflow-hidden md:absolute md:right-0 md:top-0 md:w-[calc(100%-216px)]">
            <Image
              src="/assets/images/home/why-choose-us.png"
              alt="Engineering team reviewing blueprints"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[rgba(18,18,160,0.05)]" />
          </div>
        </div>
      </div>
    </section>
  )
}


