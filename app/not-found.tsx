import Link from 'next/link'
import Image from 'next/image'

export default function NotFoundPage() {
  return (
    <main className="pt-20 md:pt-0">
      {/* Hero Section with curved bottom - Desktop Only */}
      <div className="hidden md:block relative w-full h-[500px] rounded-bl-[100px] rounded-br-[100px] overflow-hidden">
        <Image
          src="/assets/images/home/why-choose-us.png"
          alt="Engineering structure"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[rgba(18,18,160,0.05)]" />
      </div>

      {/* Hero Section - Mobile Only */}
      <div className="md:hidden relative w-full h-[400px] overflow-hidden">
        <Image
          src="/assets/images/home/why-choose-us.png"
          alt="Engineering structure"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[rgba(18,18,160,0.05)]" />
      </div>

      {/* Content Card */}
      <section className="relative w-full max-w-[848px] mx-auto px-4 -mt-20 md:-mt-20">
        <div className="backdrop-blur-[10px] bg-white/90 p-6 md:p-10 rounded-lg shadow-[0px_6px_10px_0px_rgba(18,18,160,0.05)]">
          {/* Title and Message */}
          <div className="flex flex-col gap-2 items-center justify-center mb-6 md:mb-10">
            <h1 className="text-[28px] md:text-[32px] font-bold leading-[1.25] text-[#15151c] text-center">
              404: Structure not found
            </h1>
            <p className="text-[16px] font-semibold leading-[1.5] text-[#15151c] text-center">
              The page you&apos;re looking for might have been moved or no longer exists.
            </p>
          </div>

          {/* Button */}
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-2 rounded bg-[#1212a0] text-white text-[16px] font-semibold leading-[1.5] hover:bg-[#0d0d70] transition-colors"
              style={{
                background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgba(18, 18, 160, 1) 0%, rgba(18, 18, 160, 1) 100%)'
              }}
            >
              Return to the Homepage
            </Link>
          </div>
        </div>
      </section>

      {/* Spacer for footer */}
      <div className="h-20 md:h-32" />
    </main>
  )
}


