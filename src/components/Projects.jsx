import { motion } from 'framer-motion'
import { ArrowUpRight, FolderGit2 } from 'lucide-react'
import Card3D from './Card3D'
import { projects } from '../data/portfolio'

export default function Projects() {
  return (
    <section id="projects" className="pb-8 sm:pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-3xl font-bold text-white sm:mb-6"
        >
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {projects.map((project, index) => (
            <Card3D
              key={project.title}
              href={project.link}
              index={index}
              className="min-h-[240px]"
            >
              <div
                className="mb-4 flex items-start justify-between"
                style={{ transform: 'translateZ(50px)' }}
              >
                <FolderGit2 className="h-8 w-8 text-neon" strokeWidth={1.5} />
                <ArrowUpRight className="h-5 w-5 text-white/30 transition-colors group-hover:text-neon" />
              </div>

              <div style={{ transform: 'translateZ(35px)' }}>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {project.title}
                </h3>
              </div>

              <div className="flex-1" style={{ transform: 'translateZ(25px)' }}>
                <p className="mb-4 text-sm leading-relaxed text-white/50">
                  {project.description}
                </p>
              </div>

              <div
                className="mt-auto flex flex-wrap gap-2"
                style={{ transform: 'translateZ(20px)' }}
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-neon/20 bg-neon/5 px-3 py-1 text-xs text-white/70 transition-colors group-hover:border-neon/40 group-hover:text-white/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  )
}
