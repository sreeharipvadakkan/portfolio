import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

export default function Name3D({ name, className = '' }) {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isHovering = useMotionValue(0)

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [18, -18]),
    { stiffness: 200, damping: 20 },
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-18, 18]),
    { stiffness: 200, damping: 20 },
  )
  const scale = useSpring(
    useTransform(isHovering, [0, 1], [1, 1.04]),
    { stiffness: 200, damping: 20 },
  )

  const glareX = useTransform(mouseX, [-0.5, 0.5], ['15%', '85%'])
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['15%', '85%'])
  const glareOpacity = useTransform(isHovering, [0, 1], [0, 0.5])
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle at ${x} ${y}, rgb(255 255 255 / 0.35), transparent 50%)`,
  )

  const glowOpacity = useTransform(isHovering, [0, 1], [0.15, 0.55])

  const handleMouseMove = (event) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    mouseX.set((event.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    isHovering.set(0)
  }

  const words = name.split(' ')
  const firstLine = words.slice(0, -1).join(' ')
  const lastLine = words[words.length - 1]

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${className}`}
      style={{ perspective: 1400 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => isHovering.set(1)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-neon/30 blur-3xl"
        style={{ opacity: glowOpacity }}
        aria-hidden
      />

      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className="relative cursor-default"
      >
        {[24, 16, 8].map((depth) => (
          <div
            key={depth}
            className="pointer-events-none absolute inset-0 font-bold tracking-tight text-neon-dark/25 uppercase"
            style={{
              transform: `translateZ(-${depth}px)`,
              WebkitTextStroke: '1px rgb(0 200 83 / 0.08)',
            }}
            aria-hidden
          >
            <span className="block text-4xl leading-none sm:text-5xl lg:text-6xl">
              {firstLine}
            </span>
            <span className="mt-1 block text-4xl leading-none sm:text-5xl lg:text-6xl">
              {lastLine}
            </span>
          </div>
        ))}

        <div
          className="relative font-bold tracking-tight uppercase"
          style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
        >
          <span className="text-gradient block text-4xl leading-none sm:text-5xl lg:text-6xl">
            {firstLine}
          </span>
          <span className="text-gradient mt-1 block text-4xl leading-none sm:text-5xl lg:text-6xl">
            {lastLine}
          </span>

          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: glareOpacity,
              background: glareBackground,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              transform: 'translateZ(35px)',
            }}
            aria-hidden
          >
            <span className="block text-4xl leading-none text-transparent sm:text-5xl lg:text-6xl">
              {firstLine}
            </span>
            <span className="mt-1 block text-4xl leading-none text-transparent sm:text-5xl lg:text-6xl">
              {lastLine}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
