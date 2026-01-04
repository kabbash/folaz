import { Hero } from '@/components/Hero'
import { ServicesSection } from '@/components/ServicesSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { PartnersSection } from '@/components/PartnersSection'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { CTASection } from '@/components/CTASection'
import { getServices } from '@/data/services'
import { getProjects } from '@/data/projects'
import { getPartners } from '@/data/partners'

export default async function Home() {
  // Fetch data from Sanity
  const [services, projects, partners] = await Promise.all([
    getServices(),
    getProjects(),
    getPartners(),
  ])

  return (
    <main className="pt-20 md:pt-0">
      <Hero />
      
      <div className="pt-10 md:pt-48 space-y-0">
        <ServicesSection services={services} />
        <ProjectsSection projects={projects} />
        <PartnersSection partners={partners} />
        <WhyChooseUs />
        <CTASection />
      </div>
    </main>
  )
}
