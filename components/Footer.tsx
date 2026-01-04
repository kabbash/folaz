import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-[#11111e] to-[#2f2f3e] rounded-t-lg overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Logo and Description */}
        <div className="flex flex-col items-center gap-4 pb-6 border-b border-dashed border-white/25">
          <div className="relative h-10 w-[47px]">
            <Image 
              src="/assets/images/logo.png" 
              alt="Folaz" 
              fill
              className="object-cover"
              priority 
            />
          </div>
          
          <div className="flex flex-col items-center gap-2 text-white text-center max-w-full md:max-w-none">
            <p className="text-[16px] md:text-[22px] font-semibold leading-[1.3]">
              Structural Engineering • Consulting • PE Review
            </p>
            <p className="text-[16px] leading-[1.5] font-semibold">
              We provide structural engineering, PE review, BIM modeling, and cost-optimized design solutions across the USA, MENA, Gulf, and Egypt.
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-6">
          <Link 
            href="/" 
            className="px-6 py-2 bg-[#2f2f3e] rounded-full text-white text-[16px] font-semibold hover:bg-[#3f3f4e] transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/services" 
            className="px-6 py-2 bg-[#2f2f3e] rounded-full text-white text-[16px] font-semibold hover:bg-[#3f3f4e] transition-colors"
          >
            Services
          </Link>
          <Link 
            href="/careers" 
            className="px-6 py-2 bg-[#2f2f3e] rounded-full text-white text-[16px] font-semibold hover:bg-[#3f3f4e] transition-colors"
          >
            Careers
          </Link>
          <Link 
            href="/contact" 
            className="px-6 py-2 bg-[#2f2f3e] rounded-full text-white text-[16px] font-semibold hover:bg-[#3f3f4e] transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/15 pt-4">
          <p className="text-center text-white text-[14px] leading-[1.5]">
            © 2025 Folaz | Engineering. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}



