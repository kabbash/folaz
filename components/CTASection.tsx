import Link from 'next/link'

export function CTASection() {
  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 py-10 md:py-16">
      <div className="relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-full max-w-[850px] h-[284px] rounded shadow-[0px_2px_15px_0px_rgba(47,47,62,0.15)]"
            style={{ transform: 'rotate(0.4deg) skewX(-0.3deg)' }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-full max-w-[850px] h-[284px] border border-dashed border-[#1212a0] rounded"
            style={{ transform: 'rotate(-0.9deg) skewX(0.3deg)' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-[628px] mx-auto py-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-[22px] md:text-[28px] font-semibold leading-[1.3] text-[#1212a0]">
              Ready to Build Something Stronger?
            </h2>
            <p className="text-[16px] font-semibold leading-[1.5] text-[#15151c]">
              From steel structures to complex concrete systems, our PE-led team delivers practical, optimized, and code-compliant engineering solutions across the USA, MENA, Gulf, and Egypt.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-6 py-2 bg-gradient-to-r from-[#1212a0] to-[#1212a0] hover:from-[#0d0d80] hover:to-[#0d0d80] text-white rounded text-[16px] font-semibold transition-all"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </section>
  )
}




