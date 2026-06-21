import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

export default function Name3D({ name, className = '', variant = 'hero' }) {
  const isNav = variant === 'nav'
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isHovering = useMotionValue(0)

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [isNav ? 10 : 18, isNav ? -10 : -18]),
    { stiffness: 200, damping: 20 },
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [isNav ? -10 : -18, isNav ? 10 : 18]),
    { stiffness: 200, damping: 20 },
  )
  const scale = useSpring(
    useTransform(isHovering, [0, 1], [1, isNav ? 1.02 : 1.04]),
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

  const textSizeClass = isNav
    ? 'text-sm leading-tight sm:text-base lg:text-xl'
    : 'text-4xl leading-none sm:text-5xl lg:text-6xl'

  const depthLayers = isNav ? [8, 4] : [24, 16, 8]

  const nameContent = isNav ? (
    <span className={`text-gradient block uppercase ${textSizeClass}`}>{name}</span>
  ) : (
    <>
      <span className={`text-gradient block uppercase ${textSizeClass}`}>
        {firstLine}
      </span>
      <span className={`text-gradient mt-1 block uppercase ${textSizeClass}`}>
        {lastLine}
      </span>
    </>
  )

  const shadowContent = isNav ? (
    <span className={`block uppercase ${textSizeClass}`}>{name}</span>
  ) : (
    <>
      <span className={`block uppercase ${textSizeClass}`}>{firstLine}</span>
      <span className={`mt-1 block uppercase ${textSizeClass}`}>{lastLine}</span>
    </>
  )

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
        className={`pointer-events-none absolute -z-10 rounded-3xl bg-neon/30 blur-3xl ${
          isNav ? '-inset-2' : '-inset-6'
        }`}
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
        {depthLayers.map((depth) => (
          <div
            key={depth}
            className="pointer-events-none absolute inset-0 font-bold tracking-tight text-neon-dark/25 uppercase"
            style={{
              transform: `translateZ(-${depth}px)`,
              WebkitTextStroke: '1px rgb(0 200 83 / 0.08)',
            }}
            aria-hidden
          >
            {shadowContent}
          </div>
        ))}

        <div
          className={`relative font-bold tracking-tight uppercase ${isNav ? 'whitespace-nowrap' : ''}`}
          style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
        >
          {nameContent}

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
            <span className={`block text-transparent uppercase ${textSizeClass}`}>
              {isNav ? name : firstLine}
            </span>
            {!isNav && (
              <span className={`mt-1 block text-transparent uppercase ${textSizeClass}`}>
                {lastLine}
              </span>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
