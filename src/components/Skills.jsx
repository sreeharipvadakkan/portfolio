import { motion } from 'framer-motion'
import { Code2, Server, Paintbrush } from 'lucide-react'
import Card3D from './Card3D'
import { skills } from '../data/portfolio'

const iconMap = {
  code: Code2,
  server: Server,
  brush: Paintbrush,
}

const bentoLayout = [
  'md:col-span-2 lg:col-span-2 lg:row-span-2',
  'md:col-span-2 lg:col-span-2 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
]

function SkillCard({ skill, index, isHero }) {
  const Icon = iconMap[skill.icon] ?? Code2
  const technologies = Array.isArray(skill.technologies) ? skill.technologies : []

  return (
    <Card3D
      index={index}
      tilt={isHero ? 14 : 10}
      hoverScale={isHero ? 1.02 : 1.03}
      showGradient={isHero}
      className={`${bentoLayout[index] ?? 'lg:col-span-1'} ${
        isHero ? 'min-h-[280px] lg:min-h-0' : 'min-h-[180px]'
      }`}
    >
      <div style={{ transform: 'translateZ(50px)' }}>
        <Icon
          className={`text-neon ${isHero ? 'mb-6 h-10 w-10' : 'mb-4 h-8 w-8'}`}
          strokeWidth={1.5}
        />
      </div>

      <div style={{ transform: 'translateZ(35px)' }}>
        <h3
          className={`font-semibold text-white ${
            isHero ? 'mb-4 text-xl sm:text-2xl' : 'mb-3 text-lg'
          }`}
        >
          {skill.title}
        </h3>
      </div>

      <div className="mt-auto" style={{ transform: 'translateZ(20px)' }}>
        {isHero ? (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-neon/20 bg-neon/5 px-3 py-1 text-xs text-white/70 transition-colors group-hover:border-neon/40 group-hover:text-white/90"
              >
                {tech}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm leading-relaxed text-white/50">
            {technologies.join(', ')}
          </p>
        )}
      </div>
    </Card3D>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-3xl font-bold text-white sm:mb-6"
        >
          Technical Expertise
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.title}
              skill={skill}
              index={index}
              isHero={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
