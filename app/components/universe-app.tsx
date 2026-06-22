'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  dailyMessages,
  starMessages,
  thingsILove,
  sillyMessages,
  favoriteMemories,
  hundredReasons,
  secretLetter,
} from '../data/messages'

// ========== CONFIGURACIÓN ==========
const TOTAL_PHOTOS = 80
const galleryPhotos = Array.from({ length: TOTAL_PHOTOS }, (_, i) => ({
  src: `/gallery/foto${i + 1}.jpg`,
  caption: `Foto ${i + 1}`,
}))

const RELATIONSHIP_START = new Date('2024-11-07T00:00:00').getTime()
const SPOTIFY_EMBED = 'https://open.spotify.com/embed/playlist/0puzuQ8m05aVKmlwJ0sChp?utm_source=generator&si=9571bc876e144a81'
// ====================================

type Section = 'inicio' | 'galeria' | 'musica' | 'mensaje' | 'contador' | 'cosas-amo' | 'tonterias' | 'carta' | 'recuerdos' | 'razones' | 'estrellas'

const navItems: { id: Section; label: string }[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'galeria', label: 'Fotos' },
  { id: 'musica', label: 'Música' },
  { id: 'mensaje', label: 'Mensaje' },
  { id: 'contador', label: 'Contador' },
  { id: 'cosas-amo', label: 'Te amo' },
  { id: 'tonterias', label: '¿Sabías que?' },
  { id: 'carta', label: 'Carta' },
  { id: 'recuerdos', label: 'Recuerdos' },
  { id: 'razones', label: '100 razones' },
  { id: 'estrellas', label: 'Estrellas' },
]

// ========== STARS BACKGROUND ==========
function StarsBackground() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([])

  useEffect(() => {
    const generated = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }))
    setStars(generated)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--duration': `${star.duration}s`,
            '--delay': `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

// ========== FLOATING HEARTS ==========
function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number; duration: number; delay: number; emoji: string }[]>([])

  useEffect(() => {
    const emojis = ['❤️', '🖤', '💕', '💗', '💝']
    const generated = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 10,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }))
    setHearts(generated)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-heart"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            '--duration': `${heart.duration}s`,
            '--delay': `${heart.delay}s`,
          } as React.CSSProperties}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  )
}

// ========== SECTION WRAPPER ==========
function SectionWrapper({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section id={id} ref={ref} className={`section-container relative z-10 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </section>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-8 text-center tracking-tight">
      <span className="gradient-text">{title}</span>
    </h2>
  )
}

// ========== WELCOME SCREEN ==========
function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0000] px-6"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <StarsBackground />
      <FloatingHearts />
      <motion.div
        className="relative z-10 text-center max-w-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.div
          className="text-6xl sm:text-7xl mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          🌙
        </motion.div>
        <h1 className="text-3xl sm:text-5xl font-display font-bold gradient-text mb-6 tracking-tight">
          Nuestro pequeño universo
        </h1>
        <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-10 px-4">
          Si estás aquí, es porque quería dejarte un lugar al que siempre puedas volver cuando me extrañes.
          Siempre estaré para ti, mi intención con esto es compartirte mi vida y quiero que sea así por siempre.
        </p>
        <motion.button
          onClick={onEnter}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-red-900 via-rose-800 to-red-900 text-white font-semibold text-lg shadow-lg animate-pulse-glow hover:scale-105 active:scale-95 transition-transform"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Entrar a nuestro universo
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// ========== GALLERY ==========
function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <>
      <SectionTitle title="Mis fotos" />
      <p className="text-center text-white/60 mb-8 text-sm">
        Cada foto es un recuerdo que guardo con amor en mi corazón
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {galleryPhotos.map((photo, i) => (
          <motion.div
            key={i}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group glass-card"
            whileHover={{ scale: 1.03, zIndex: 10 }}
            onClick={() => setLightbox(i)}
          >
            <div className="w-full h-full bg-gradient-to-br from-red-950/50 to-rose-950/50 flex items-center justify-center">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover"
                onError={(e: any) => { e.target.style.display = 'none' }}
              />
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-xs text-white/90 text-center">{photo.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="w-full max-w-4xl flex flex-col items-center"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full flex justify-end mb-3">
                <button
                  onClick={() => setLightbox(null)}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-colors border border-white/20"
                >
                  Cerrar
                </button>
              </div>

              <div className="relative w-full rounded-xl overflow-hidden bg-red-950/20 flex items-center justify-center" style={{ maxHeight: '65vh' }}>
                <img
                  src={galleryPhotos[lightbox].src}
                  alt={galleryPhotos[lightbox].caption}
                  className="w-full object-contain"
                  style={{ maxHeight: '65vh' }}
                  onError={(e: any) => { e.target.style.display = 'none' }}
                />
              </div>

              <p className="text-center text-white/70 mt-3 text-sm">
                Foto {lightbox + 1} de {galleryPhotos.length}
              </p>

              <div className="flex justify-center gap-4 mt-4 w-full">
                <button
                  onClick={() => setLightbox(Math.max(0, lightbox - 1))}
                  disabled={lightbox === 0}
                  className="flex-1 max-w-[140px] px-4 py-3 glass-card rounded-xl hover:bg-white/10 transition-colors text-white/80 disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setLightbox(Math.min(galleryPhotos.length - 1, lightbox + 1))}
                  disabled={lightbox === galleryPhotos.length - 1}
                  className="flex-1 max-w-[140px] px-4 py-3 glass-card rounded-xl hover:bg-white/10 transition-colors text-white/80 disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium"
                >
                  Siguiente
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ========== MUSIC ==========
function MusicSection() {
  return (
    <>
      <SectionTitle title="Nuestra música" />
      <p className="text-center text-white/60 mb-8 text-sm">
        Las canciones que nos definen, las que me recuerdan a ti
      </p>
      <div className="glass-card rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto">
        <iframe
          style={{ borderRadius: '12px' }}
          src={SPOTIFY_EMBED}
          width="100%"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-xl"
        />
      </div>
    </>
  )
}

// ========== DAILY MESSAGE ==========
function DailyMessageSection() {
  const [message, setMessage] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    const idx = dayOfYear % (dailyMessages?.length ?? 1)
    setMessage(dailyMessages?.[idx] ?? 'Te amo')
  }, [])

  const getRandomMessage = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      const idx = Math.floor(Math.random() * (dailyMessages?.length ?? 1))
      setMessage(dailyMessages?.[idx] ?? 'Te amo')
      setIsRefreshing(false)
    }, 400)
  }, [])

  return (
    <>
      <SectionTitle title="Mensaje del día" />
      <div className="glass-card rounded-2xl p-8 sm:p-12 max-w-2xl mx-auto text-center animate-shimmer">
        <div className="text-4xl mb-6">💌</div>
        <AnimatePresence mode="wait">
          <motion.p
            key={message}
            className="text-lg sm:text-xl text-white/90 italic leading-relaxed font-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            &ldquo;{message}&rdquo;
          </motion.p>
        </AnimatePresence>
        <button
          onClick={getRandomMessage}
          disabled={isRefreshing}
          className="mt-8 px-6 py-3 rounded-full bg-rose-900/30 border border-rose-800/40 text-rose-300 hover:bg-rose-900/50 transition-all text-sm disabled:opacity-50"
        >
          {isRefreshing ? 'Cargando...' : 'Otro mensaje'}
        </button>
      </div>
    </>
  )
}

// ========== RELATIONSHIP COUNTER ==========
function CountdownSection() {
  const [daysTogether, setDaysTogether] = useState(0)
  const [timeDetail, setTimeDetail] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const update = () => {
      const now = Date.now()
      const diff = now - RELATIONSHIP_START
      if (diff <= 0) return
      setDaysTogether(Math.floor(diff / 86400000))
      setTimeDetail({
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <SectionTitle title="Tiempo juntos" />
      <p className="text-center text-white/60 mb-8 text-sm">
        Desde el 7 de noviembre, cada segundo contigo vale todo
      </p>
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="glass-card rounded-2xl p-8 text-center mb-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-6xl sm:text-8xl font-bold font-mono bg-gradient-to-b from-rose-400 to-red-700 bg-clip-text text-transparent">
            {mounted ? daysTogether : '--'}
          </div>
          <div className="text-white/60 text-lg mt-2 uppercase tracking-widest">
            {daysTogether === 1 ? 'día juntos' : 'días juntos'}
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Horas', value: timeDetail.hours, color: 'from-rose-700 to-red-900' },
            { label: 'Minutos', value: timeDetail.minutes, color: 'from-red-800 to-rose-900' },
            { label: 'Segundos', value: timeDetail.seconds, color: 'from-rose-600 to-red-800' },
          ].map((unit) => (
            <motion.div
              key={unit.label}
              className="glass-card rounded-xl p-4 text-center"
              whileHover={{ scale: 1.05, y: -3 }}
            >
              <div className={`text-2xl sm:text-4xl font-bold font-mono bg-gradient-to-b ${unit.color} bg-clip-text text-transparent`}>
                {mounted ? String(unit.value).padStart(2, '0') : '--'}
              </div>
              <div className="text-white/40 text-xs mt-1 uppercase tracking-wider">{unit.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}

// ========== THINGS I LOVE ==========
function ThingsILoveSection() {
  return (
    <>
      <SectionTitle title="Cosas que amo de ti" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {thingsILove.map((thing, i) => (
          <motion.div
            key={i}
            className="glass-card rounded-xl p-5 flex items-start gap-3 hover:border-rose-800/50 transition-colors"
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <span className="text-rose-700 text-xl mt-0.5">♥</span>
            <p className="text-white/80 text-sm">{thing}</p>
          </motion.div>
        ))}
      </div>
    </>
  )
}

// ========== ¿SABÍAS QUE? ==========
function SillyZone() {
  const [currentJoke, setCurrentJoke] = useState('')
  const [showJoke, setShowJoke] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const getJoke = useCallback(() => {
    const idx = Math.floor(Math.random() * (sillyMessages?.length ?? 1))
    setCurrentJoke(sillyMessages?.[idx] ?? '')
    setShowJoke(true)
    setClickCount((c) => c + 1)
  }, [])

  return (
    <>
      <SectionTitle title="¿Sabías que?" />
      <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto text-center">
        <p className="text-white/60 mb-6 text-sm">Cosas que quiero que sepas sobre nosotros</p>

        <AnimatePresence mode="wait">
          {showJoke && (
            <motion.div
              key={currentJoke}
              className="bg-rose-900/10 rounded-xl p-6 mb-6 border border-rose-800/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <p className="text-white/90 text-lg">{currentJoke}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap gap-3 justify-center">
          <motion.button
            onClick={getJoke}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-red-900 to-rose-800 text-white font-semibold hover:shadow-lg hover:shadow-red-900/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Descubrir
          </motion.button>
          <motion.button
            onClick={() => { setShowJoke(false); setCurrentJoke('') }}
            className="px-6 py-3 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Limpiar
          </motion.button>
        </div>

        {clickCount > 0 && (
          <p className="text-white/30 text-xs mt-4">Has descubierto {clickCount} {clickCount === 1 ? 'cosa' : 'cosas'}</p>
        )}
      </div>
    </>
  )
}

// ========== SECRET LETTER ==========
function SecretLetterSection() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <SectionTitle title="Carta secreta" />
      <div className="max-w-2xl mx-auto text-center">
        {!isOpen ? (
          <motion.div
            className="glass-card rounded-2xl p-12 cursor-pointer hover:border-rose-800/50 transition-colors"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="text-7xl mb-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✉️
            </motion.div>
            <p className="text-white/60 text-sm">Toca el sobre para abrirlo...</p>
            <p className="text-white/30 text-xs mt-2">Con mucho amor dentro</p>
          </motion.div>
        ) : (
          <motion.div
            className="glass-card rounded-2xl p-6 sm:p-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-4xl mb-6">💝</div>
            <div className="text-left text-white/85 leading-relaxed space-y-4 text-sm sm:text-base font-sans">
              {secretLetter.split('\n\n').map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-8 px-6 py-3 rounded-full bg-rose-900/20 border border-rose-800/30 text-rose-300 hover:bg-rose-900/40 transition-all text-sm"
            >
              Cerrar carta
            </button>
          </motion.div>
        )}
      </div>
    </>
  )
}

// ========== MEMORIES ==========
function MemoriesSection() {
  return (
    <>
      <SectionTitle title="Recuerdos favoritos" />
      <div className="space-y-6 max-w-2xl mx-auto">
        {favoriteMemories.map((memory, i) => (
          <motion.div
            key={i}
            className="glass-card rounded-xl p-6 relative overflow-hidden hover:border-rose-800/40 transition-colors"
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{memory.emoji}</span>
              <div>
                <h3 className="text-lg font-semibold text-rose-400 mb-2">{memory.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{memory.description}</p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-900/10 to-transparent rounded-bl-full" />
          </motion.div>
        ))}
      </div>
    </>
  )
}

// ========== 100 REASONS ==========
function HundredReasonsSection() {
  const [showAll, setShowAll] = useState(false)
  const displayed = showAll ? hundredReasons : hundredReasons.slice(0, 20)

  return (
    <>
      <SectionTitle title="100 razones por las que te amo" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
        {displayed.map((reason, i) => (
          <motion.div
            key={i}
            className="glass-card rounded-lg p-4 flex items-start gap-3 hover:border-rose-800/40 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 10) * 0.03, duration: 0.4 }}
            whileHover={{ scale: 1.01 }}
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-red-900 to-rose-800 flex items-center justify-center text-xs font-bold">
              {i + 1}
            </span>
            <p className="text-white/80 text-sm">{reason}</p>
          </motion.div>
        ))}
      </div>
      {!showAll && (
        <div className="text-center mt-8">
          <motion.button
            onClick={() => setShowAll(true)}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-red-900 to-rose-800 text-white font-semibold hover:shadow-lg hover:shadow-red-900/40 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver las 100 razones
          </motion.button>
        </div>
      )}
    </>
  )
}

// ========== INTERACTIVE STARS ==========
function InteractiveStarsSection() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [interactiveStars, setInteractiveStars] = useState<{ id: number; x: number; y: number; size: number }[]>([])

  useEffect(() => {
    const s = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      size: Math.random() * 4 + 2,
    }))
    setInteractiveStars(s)
  }, [])

  const handleStarClick = useCallback(() => {
    const idx = Math.floor(Math.random() * (starMessages?.length ?? 1))
    setSelectedMessage(starMessages?.[idx] ?? '')
  }, [])

  return (
    <>
      <SectionTitle title="Cielo de estrellas" />
      <p className="text-center text-white/60 mb-6 text-sm">
        Toca una estrella y descubre un mensaje
      </p>
      <div
        ref={canvasRef}
        className="relative w-full h-64 sm:h-96 glass-card rounded-2xl overflow-hidden cursor-pointer"
        style={{ background: 'radial-gradient(ellipse at center, #1a0000 0%, #0d0000 100%)' }}
      >
        {interactiveStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute cursor-pointer"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size * 2}px`,
              height: `${star.size * 2}px`,
            }}
            onClick={handleStarClick}
            whileHover={{ scale: 3 }}
            whileTap={{ scale: 0.5 }}
          >
            <div
              className="w-full h-full rounded-full bg-white animate-twinkle"
              style={{ '--delay': `${star.id * 0.3}s`, '--duration': '2s' } as React.CSSProperties}
            />
          </motion.div>
        ))}

        <AnimatePresence>
          {selectedMessage && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
            >
              <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-6 max-w-sm border border-rose-900/30">
                <p className="text-white/90 text-center text-sm sm:text-base italic">
                  &ldquo;{selectedMessage}&rdquo;
                </p>
                <p className="text-white/30 text-center text-xs mt-3">Toca para cerrar</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

// ========== NAVIGATION ==========
function BottomNav({ activeSection }: { activeSection: string }) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#0d0000]/90 backdrop-blur-lg border-t border-rose-900/20">
      <div className="max-w-5xl mx-auto px-2">
        <div className="flex overflow-x-auto scrollbar-hide py-2 gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex flex-col items-center min-w-[60px] px-2 py-2 rounded-lg transition-colors text-center ${
                activeSection === item.id
                  ? 'bg-rose-900/30 text-rose-300'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }`}
            >
              <span className="text-[10px] whitespace-nowrap font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

// ========== MAIN APP ==========
export default function UniverseApp() {
  const [entered, setEntered] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    if (!entered) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [entered])

  return (
    <div className="min-h-screen bg-[#0d0000]">
      <AnimatePresence>
        {!entered && <WelcomeScreen onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {entered && (
        <>
          <StarsBackground />
          <FloatingHearts />

          <SectionWrapper id="inicio">
            <div className="text-center py-12">
              <motion.div
                className="text-5xl sm:text-6xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🌙
              </motion.div>
              <h1 className="text-3xl sm:text-5xl font-display font-bold gradient-text mb-4 tracking-tight">
                Nuestro pequeño universo
              </h1>
              <p className="text-white/50 text-sm sm:text-base max-w-lg mx-auto">
                Un lugar especial creado solo para ti, con todo mi amor
              </p>
            </div>
          </SectionWrapper>

          <SectionWrapper id="galeria"><GallerySection /></SectionWrapper>
          <SectionWrapper id="musica"><MusicSection /></SectionWrapper>
          <SectionWrapper id="mensaje"><DailyMessageSection /></SectionWrapper>
          <SectionWrapper id="contador"><CountdownSection /></SectionWrapper>
          <SectionWrapper id="cosas-amo"><ThingsILoveSection /></SectionWrapper>
          <SectionWrapper id="tonterias"><SillyZone /></SectionWrapper>
          <SectionWrapper id="carta"><SecretLetterSection /></SectionWrapper>
          <SectionWrapper id="recuerdos"><MemoriesSection /></SectionWrapper>
          <SectionWrapper id="razones"><HundredReasonsSection /></SectionWrapper>
          <SectionWrapper id="estrellas" className="pb-32"><InteractiveStarsSection /></SectionWrapper>

          <div className="text-center py-8 pb-24 relative z-10">
            <p className="text-white/20 text-xs">Hecho con todo mi amor para ti</p>
          </div>

          <BottomNav activeSection={activeSection} />
        </>
      )}
    </div>
  )
}