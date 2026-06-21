import { motion } from 'framer-motion'
import profileImg from '../assets/profile.png'
import Name3D from './Name3D'
import { siteConfig } from '../data/portfolio'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex items-start overflow-hidden pt-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgb(0_230_118/0.08),transparent_50%)]" />

      <div className="mx-auto grid max-w-6xl flex-1 grid-cols-1 items-center gap-12 px-6 pt-4 pb-8 sm:pt-6 lg:grid-cols-2 lg:gap-16 lg:pt-8 lg:pb-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Name3D name={siteConfig.name} className="mb-4" />
          <h1 className="text-gradient text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {siteConfig.title}
          </h1>
          <p className="mt-6 max-w-lg text-lg text-white/90">{siteConfig.tagline}</p>
          <p className="mt-2 max-w-lg text-white/60">{siteConfig.subtitle}</p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 inline-block rounded-full bg-gradient-to-r from-neon to-neon-dark px-8 py-3 font-medium text-black shadow-[0_0_30px_rgb(0_230_118/0.4)] transition-shadow hover:shadow-[0_0_40px_rgb(0_230_118/0.6)]"
          >
            Let&apos;s Connect
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="relative mx-auto flex justify-center lg:justify-end"
        >
          <div className="relative" style={{ perspective: 1000 }}>
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-neon/20 blur-3xl"
            />
            <motion.div
              animate={{
                y: [0, -18, 0],
                rotateX: [2, -4, 2],
                rotateY: [-3, 3, -3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative rounded-full border-2 border-neon p-1 glow-neon"
            >
              <div className="overflow-hidden rounded-full bg-black">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="h-64 w-64 scale-110 object-cover sm:h-72 sm:w-72 lg:h-80 lg:w-80"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
