import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

export default function Card3D({
  children,
  index = 0,
  className = '',
  tilt = 10,
  hoverScale = 1.03,
  href,
  showGradient = false,
}) {
  const cardRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isHovering = useMotionValue(0)

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [tilt, -tilt]),
    { stiffness: 260, damping: 22 },
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-tilt, tilt]),
    { stiffness: 260, damping: 22 },
  )
  const scale = useSpring(
    useTransform(isHovering, [0, 1], [1, hoverScale]),
    { stiffness: 260, damping: 22 },
  )

  const glareX = useTransform(mouseX, [-0.5, 0.5], ['20%', '80%'])
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['20%', '80%'])
  const glareOpacity = useTransform(isHovering, [0, 1], [0, 0.35])
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle at ${x} ${y}, rgb(0 230 118 / 0.25), transparent 55%)`,
  )

  const shadowOpacity = useTransform(isHovering, [0, 1], [0, 1])

  const handleMouseMove = (event) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return

    mouseX.set((event.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseEnter = () => isHovering.set(1)

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    isHovering.set(0)
  }

  const CardTag = href ? motion.a : motion.div

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={className}
      style={{ perspective: 1200 }}
    >
      <CardTag
        ref={cardRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className="group relative flex h-full flex-col rounded-2xl border border-neon/30 bg-surface transition-colors hover:border-neon/60"
      >
        <motion.div
          className="pointer-events-none absolute -inset-2 -z-10 rounded-3xl bg-neon/20 blur-2xl"
          style={{ opacity: shadowOpacity }}
          aria-hidden
        />

        {showGradient && (
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top_left,rgb(0_230_118/0.12),transparent_60%)]"
            style={{ transform: 'translateZ(1px)' }}
            aria-hidden
          />
        )}

        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            opacity: glareOpacity,
            background: glareBackground,
            transform: 'translateZ(2px)',
          }}
          aria-hidden
        />

        <div
          className="relative flex h-full flex-col p-6"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {children}
        </div>

        <div
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-neon/15 transition-all group-hover:ring-neon/35"
          style={{ transform: 'translateZ(4px)' }}
          aria-hidden
        />
      </CardTag>
    </motion.div>
  )
}
