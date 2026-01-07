import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative w-full">
      {/* Hero Image */}
      <div className="relative w-full h-[400px] md:h-[600px] md:rounded-bl-[100px] md:rounded-br-[100px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-blue-600/40" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/images/hero-background.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20" />
      </div>

      {/* Hero Content */}
      <div className="relative -mt-32 md:absolute md:top-[440px] md:left-1/2 md:-translate-x-1/2 w-full md:max-w-[1064px] px-4 md:px-0 z-10">
        <div className="backdrop-blur-[10px] bg-white/90 rounded-lg shadow-[0px_4px_10px_0px_rgba(47,47,62,0.15)] p-6 md:p-6 flex flex-col items-center gap-4 md:gap-[30px]">
          <h1 className="text-[32px] md:text-[48px] font-bold leading-[1.2] text-[#1212a0] text-center">
            Engineering Precision. Real-World Solutions.
          </h1>
          
          <p className="text-[16px] md:text-[22px] font-semibold leading-[1.5] md:leading-[1.3] text-[#15151c] text-center">
            We design, review, and deliver structural systems that meet global standards and withstand real-life demands—backed by licensed PE expertise across the USA, MENA, Gulf, and Egypt.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-4 pt-2.5 w-full md:w-auto">
            <Link
              href="/services"
              className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-[#1212a0] to-[#1212a0] hover:from-[#0d0d80] hover:to-[#0d0d80] text-white rounded text-[16px] font-semibold text-center transition-all"
            >
              Explore Our Services
            </Link>
            <Link
              href="/contact"
              className="w-full md:w-auto px-6 py-2 border border-[#1212a0] text-[#1212a0] hover:bg-[#1212a0] hover:text-white rounded text-[16px] font-semibold text-center transition-all"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}


