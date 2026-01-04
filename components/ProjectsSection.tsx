import { Project } from '@/types'
import { ProjectCarousel } from './ProjectCarousel'

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 py-10 md:py-20">
      <div className="flex flex-col gap-6 md:gap-10 items-center">
        {/* Section Header */}
        <div className="flex flex-col gap-4 md:gap-6 items-center w-full">
          <div className="backdrop-blur-[5px] border-t border-b-2 border-[rgba(47,47,62,0.15)] px-6 md:px-10 py-2.5 rounded-full">
            <h2 className="text-[28px] md:text-[32px] font-bold leading-[1.25] text-[#1212a0] text-center">
              A Glimpse of Our Projects
            </h2>
          </div>

          <p className="text-[16px] font-semibold leading-[1.5] text-black text-center max-w-3xl">
            A selection of steel, concrete, industrial, and non-building structures completed across the USA, MENA, and Gulf regions—engineered with precision and reliability.
          </p>
        </div>

        {/* Projects Carousel */}
        <ProjectCarousel projects={projects} />
      </div>
    </section>
  )
}

