import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Projects',
  description:
    'Explore non-commercial and open source projects created by Ahmed Mannai. Software development projects including mobile apps, backend systems, and digital tools.',
})

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        <div className="space-y-3 pb-10 pt-8 md:space-y-4">
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-black dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-600 dark:text-gray-400">
            Some of the non-commercial and open source projects I have created
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.slug ? `/projects/${d.slug}` : d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
