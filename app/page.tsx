"use client"

import React, { useState, useEffect, useRef } from "react"
import { Calendar, MapPin, Music, Camera, Gift, Users, Sparkles, Heart, Clock, Star, Menu, X, Play, Pause } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { APP_CONFIG } from "@/lib/config"

// Fecha del evento
const EVENT_DATE = new Date("2025-09-05T21:00:00")

// Hook para animaciones de scroll
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return [ref, isVisible] as const
}

// Hook para música de fondo con auto-start
function useBackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audioElement = new Audio('/assets/music/background-music.mp3')
    audioElement.loop = true
    audioElement.volume = 0.3
    setAudio(audioElement)

    return () => {
      audioElement.pause()
      audioElement.src = ''
    }
  }, [])

  const startMusic = () => {
    if (audio && !isPlaying) {
      audio.play().catch(console.error)
      setIsPlaying(true)
    }
  }

  const toggleMusic = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        audio.play().catch(console.error)
        setIsPlaying(true)
      }
    }
  }

  return { isPlaying, toggleMusic, startMusic }
}

// Componente Countdown
function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = EVENT_DATE.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex gap-2 sm:gap-4 justify-center items-center my-4 sm:my-6">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg border border-slate-300 backdrop-blur-sm">
            <span className="text-lg sm:text-2xl font-bold text-blue-900">{value.toString().padStart(2, "0")}</span>
          </div>
          <div className="text-xs sm:text-sm text-blue-800 mt-1 font-medium">
            {unit === "days" ? "días" : unit === "hours" ? "hrs" : unit === "minutes" ? "min" : "seg"}
          </div>
        </div>
      ))}
    </div>
  )
}

// Componente Carrusel con imágenes reales
function PhotoCarousel({ photos }: { photos: string[] }) {
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [ref, isVisible] = useScrollAnimation()
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [photos.length])

  const handleImageError = (index: number) => {
    setImageError(prev => ({ ...prev, [index]: true }))
  }

  return (
    <div ref={ref} className={`relative w-full max-w-sm sm:max-w-lg mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border-2 border-slate-300 bg-gradient-to-br from-slate-100 to-slate-200">
        {imageError[currentPhoto] ? (
          <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-600">
            <div className="text-center">
              <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Foto {currentPhoto + 1}</p>
            </div>
          </div>
        ) : (
          <img
            src={photos[currentPhoto] || "/placeholder.svg"}
            alt={`Foto ${currentPhoto + 1}`}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out"
            onError={() => handleImageError(currentPhoto)}
          />
        )}
      </div>
      <div className="flex justify-center mt-3 sm:mt-4 gap-1 sm:gap-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPhoto(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentPhoto 
                ? "bg-blue-900 scale-125 shadow-lg" 
                : "bg-slate-400 hover:bg-slate-500 hover:scale-110"
            }`}
          />
        ))}
      </div>
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-slate-200 to-slate-400 rounded-full opacity-60 animate-pulse" />
      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-slate-300 to-slate-500 rounded-full opacity-40 animate-pulse delay-1000" />
    </div>
  )
}

// Modal del Mapa
function MapModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-md mx-4 border-2 border-slate-300 bg-white/95 backdrop-blur-sm shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-blue-900 font-playfair text-lg sm:text-xl">Ubicación del evento</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden shadow-lg border-2 border-blue-200 bg-gradient-to-br from-slate-50 to-blue-50 p-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.393073964839!2d-61.93323268481344!3d-37.45439397982309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95ea3b2e2e2e2e2b%3A0x2e2e2e2e2e2e2e2e!2sManuel%20Belgrano%20458%2C%20Coronel%20Su%C3%A1rez%2C%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses-419!2sar!4v1689970000000!5m2!1ses-419!2sar"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            />
          </div>
          <Button onClick={onClose} className="w-full bg-gradient-to-r from-slate-400 via-slate-500 to-blue-600 hover:from-slate-500 hover:via-slate-600 hover:to-blue-700 text-white font-bold shadow-lg border border-slate-300">
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Componente de sección animada
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [ref, isVisible] = useScrollAnimation()
  
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  )
}

// Componente de formulario de música funcional
function MusicForm({ currentGuest }: { currentGuest: { family: string, guests: number } | null }) {
  const [song, setSong] = useState("")
  const [artist, setArtist] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!song.trim()) {
      setMessage("Por favor ingresa una canción")
      setMessageType("error")
      return
    }

    if (!currentGuest) {
      setMessage("Error: No se pudo identificar la familia")
      setMessageType("error")
      return
    }

    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await fetch('/api/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          family: currentGuest.family,
          song: song.trim(),
          artist: artist.trim() || null
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("¡Canción agregada exitosamente!")
        setMessageType("success")
        setSong("")
        setArtist("")
      } else {
        setMessage(data.error || "Error al agregar la canción")
        setMessageType("error")
      }
    } catch (error) {
      setMessage("Error de conexión. Intenta nuevamente.")
      setMessageType("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        <Input
          type="text"
          value={song}
          onChange={(e) => setSong(e.target.value)}
          placeholder="Nombre de la canción *"
          className="text-center border-2 border-slate-300 focus:border-blue-500 bg-gradient-to-r from-slate-50 to-white"
          required
          disabled={isSubmitting}
        />
        <Input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Artista (opcional)"
          className="text-center border-2 border-slate-300 focus:border-blue-500 bg-gradient-to-r from-slate-50 to-white"
          disabled={isSubmitting}
        />
      </div>
      
      <Button 
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 hover:from-slate-300 hover:via-slate-400 hover:to-slate-500 text-blue-900 font-bold shadow-lg border border-slate-300 disabled:opacity-50"
      >
        {isSubmitting ? "ENVIANDO..." : "SUGERIR CANCIÓN"}
      </Button>

      {message && (
        <div className={`text-center text-sm font-medium p-3 rounded-lg ${
          messageType === "success" 
            ? "bg-blue-100 text-blue-800 border border-blue-300" 
            : "bg-slate-100 text-slate-800 border border-slate-300"
        }`}>
          {message}
        </div>
      )}
    </form>
  )
}

export default function InvitacionXV() {
  const [accessCode, setAccessCode] = useState("")
  const [hasAccess, setHasAccess] = useState(false)
  const [showPreAccess, setShowPreAccess] = useState(false)
  const [error, setError] = useState("")
  const [mapOpen, setMapOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // Códigos de acceso con información de familias
  const ACCESS_CODES = {
    "AZU15A": { family: "Familia Aguirre-Rollhaiser", guests: 4 },
  "AZU15B": { family: "Familia Vigas-Biagioli", guests: 6 },
  "AZU15C": { family: "Familia Hubert-Herrero", guests: 3 },
  "AZU15D": { family: "Titi Y Eze", guests: 2 },
  "AZU15E": { family: "More Y Nacho", guests: 2 },
  "AZU15F": { family: "Milos Y Sabi", guests: 2 },
  "AZU15G": { family: "Paisa Y Gaby", guests: 2 },
  "AZU15H": { family: "Familia Roht- Iturrioz", guests: 4 },
  "AZU15I": { family: "Familia Biscaro-Roth", guests: 4 },
  "AZU15J": { family: "Sole, Lolita Y Bis", guests: 3 },
  "AZU15K": { family: "Gaby y Benja", guests: 2 },
  "AZU15L": { family: "Pablo, Vane Y Rochi", guests: 3 },
  "AZU15M": { family: "Silvia Y Pulpo", guests: 2 },
  "AZU15N": { family: "Silvana", guests: 1 },
  "AZU15O": { family: "Jesus, Paula y Agus", guests: 3 },
  "AZU15P": { family: "Juli, Silvi", guests: 2 },
  "AZU15Q": { family: "Pili", guests: 1 },
  "AZU15R": { family: "Cande", guests: 1 },
  "AZU15S": { family: "Lo", guests: 1 },
  "AZU15T": { family: "Juli Araya", guests: 1 },
  "AZU15U": { family: "Juli Scherho", guests: 1 },
  "AZU15V": { family: "Rocha", guests: 1 },
  "AZU15W": { family: "Alma", guests: 1 },
  "AZU15X": { family: "Valen", guests: 1 },
  "AZU15Y": { family: "Marti", guests: 1 },
  "AZU15Z": { family: "Lucy Gelinger", guests: 1 },
  "AZU15A1": { family: "Fati R", guests: 1 },
  "AZU15B1": { family: "Jose Sosa", guests: 1 },
  "AZU15C1": { family: "Avi", guests: 1 },
  "AZU15D1": { family: "Espe", guests: 1 },
  "AZU15E1": { family: "Yayi", guests: 1 },
  "AZU15F1": { family: "Licho", guests: 1 },
  "AZU15G1": { family: "Nemo", guests: 1 },
  "AZU15H1": { family: "Nils", guests: 1 },
  "AZU15I1": { family: "Jero", guests: 1 },
  "AZU15J1": { family: "Mati Koppel", guests: 1 },
  "AZU15K1": { family: "Bauti", guests: 1 },
  "AZU15L1": { family: "Facu", guests: 1 },
  "AZU15M1": { family: "Nahue", guests: 1 },
  "AZU15N1": { family: "Tomy", guests: 1 },
  "AZU15O1": { family: "Manu", guests: 1 },
  "AZU15P1": { family: "Colito Lizarreta", guests: 1 },
  "AZU15Q1": { family: "Lucy Steinbach", guests: 1 },
  "AZU15R1": { family: "Mati", guests: 1 },
  "AZU15S1": { family: "Mauro", guests: 1 },
  "AZU15T1": { family: "Pulpo", guests: 1 },
  "AZU15U1": { family: "Mahi", guests: 1 },
  "AZU15V1": { family: "Eve", guests: 1 },
  "AZU15W1": { family: "Sabi", guests: 1 },
  "AZU15X1": { family: "Agus Suppes", guests: 1 },
  "AZU15Y1": { family: "Isa Natucci", guests: 1 },
  "AZU15Z1": { family: "Pili Sastre", guests: 1 },
  "AZU15A12": { family: "Anita", guests: 1 },
  "AZU15B12": { family: "Delfi Ristagno", guests: 1 },
  "AZU15C12": { family: "Delfi Zarandon", guests: 1 },
  "AZU15D12": { family: "Delfi Pastor y Mila", guests: 2 },
  "AZU15E12": { family: "Abuela ceci", guests: 1 },
  "AZU15F12": { family: "Tio Iña", guests: 1 },
  "AZU15G12": { family: "Elisa", guests: 1 },
  "AZU15H12": { family: "Mari", guests: 1 },
  "AZU15I12": { family: "Vale", guests: 1 },
  "AZU15J12": { family: "Negra", guests: 1 },
  "AZU15K12": { family: "Pepe", guests: 1 },

  }
  const [currentGuest, setCurrentGuest] = useState<{family: string, guests: number} | null>(null)
  const { isPlaying, toggleMusic, startMusic } = useBackgroundMusic()

  const GUEST_COUNT = 2

  // 8 fotos reales - estas rutas apuntan a la carpeta public/assets/photos/
  const photos = [
    "/assets/photos/foto-1.jpg",
    "/assets/photos/foto-2.jpg", 
    "/assets/photos/foto-3.jpg",
    "/assets/photos/foto-4.jpg",
    "/assets/photos/foto-5.jpg",
    "/assets/photos/foto-10.jpg",
    "/assets/photos/foto-7.jpg",
    "/assets/photos/foto-12.jpg",
  ]

  const handleCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const code = accessCode.trim().toUpperCase()
    if (ACCESS_CODES[code as keyof typeof ACCESS_CODES]) {
      setCurrentGuest(ACCESS_CODES[code as keyof typeof ACCESS_CODES])
      setShowPreAccess(true)
      setError("")
      // Auto-start music when code is correct
      setTimeout(() => startMusic(), 500)
    } else {
      setError("Código incorrecto. Intenta nuevamente.")
    }
  }

  const navigationItems = [
    { icon: Calendar, href: "#fecha", label: "Fecha" },
    { icon: MapPin, href: "#ubicacion", label: "Ubicación" },
    { icon: Music, href: "#musica", label: "Música" },
    { icon: Camera, href: "#fotos", label: "Fotos" },
    { icon: Gift, href: "#regalo", label: "Regalo" },
    { icon: Users, href: "#confirmacion", label: "Confirmar" },
  ]

  // Pantalla de código de acceso
  if (!hasAccess && !showPreAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-blue-100 flex items-center justify-center p-4">
        {/* Fondo con imagen */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/assets/images/background.jpg')",
          }}
        />
        
        {/* Elementos decorativos plateados */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-gradient-to-br from-slate-300 to-slate-500 rounded-full opacity-60 animate-pulse" />
        <div className="absolute bottom-32 right-16 w-2 h-2 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full opacity-40 animate-pulse delay-1000" />

        <Card className="w-full max-w-sm relative z-10 bg-white/95 backdrop-blur-sm border-2 border-slate-300 shadow-2xl">
          <CardContent className="p-6 sm:p-8 text-center space-y-6">
            <div className="space-y-3">
              <div className="relative">
                <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-blue-900 mx-auto animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-slate-300 to-slate-500 rounded-full opacity-60" />
              </div>
              <h2 className="text-lg sm:text-xl font-playfair font-bold text-blue-900 leading-tight">
                ¡Me encantaría que seas parte de este día tan especial!
              </h2>
            </div>

            <p className="text-slate-700 text-sm sm:text-base">Ingresá tu código para continuar:</p>

            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <Input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Código de acceso"
                className="text-center font-bold tracking-widest text-blue-900 border-2 border-slate-300 focus:border-blue-500 bg-gradient-to-r from-slate-50 to-white"
                required
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 hover:from-slate-300 hover:via-slate-400 hover:to-slate-500 text-blue-900 font-bold shadow-lg border border-slate-300"
              >
                Ver invitación
              </Button>
              {error && <p className="text-slate-600 text-sm font-medium">{error}</p>}
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Pantalla de pre-acceso
  if (!hasAccess && showPreAccess && currentGuest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-blue-100 flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/assets/images/background.jpg')",
          }}
        />

        <Card className="w-full max-w-sm relative z-10 bg-white/95 backdrop-blur-sm border-2 border-blue-200 shadow-2xl">
          <CardContent className="p-6 sm:p-8 text-center space-y-6">
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-blue-900 mx-auto animate-pulse hover:animate-bounce hover:scale-125 transition-transform duration-300" />
            
            <div className="space-y-3">
              <h3 className="text-lg sm:text-xl font-playfair font-bold text-blue-900">
                {currentGuest.family}
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                ¡Me gustaría que puedas compartir este día conmigo!
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 py-4">
              <span className="text-blue-900 font-medium text-sm sm:text-base">Nº DE INVITADOS:</span>
              <div className="bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-xl px-3 sm:px-4 py-2 border-2 border-slate-400 shadow-lg">
                <span className="text-xl sm:text-2xl font-bold text-blue-900">{currentGuest.guests}</span>
              </div>
            </div>

            <Button
              onClick={() => setHasAccess(true)}
              className="w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 hover:from-slate-300 hover:via-slate-400 hover:to-slate-500 text-blue-900 font-bold shadow-lg border border-slate-300"
            >
              Abrir invitación
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Invitación principal
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 font-inter">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: "url('/assets/images/background.jpg')",
        }}
      />
      
      {/* Elementos decorativos plateados flotantes */}
      <div className="fixed top-20 left-4 w-2 h-2 bg-gradient-to-br from-slate-300 to-slate-500 rounded-full opacity-40 animate-pulse z-10" />
      <div className="fixed bottom-40 right-8 w-3 h-3 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full opacity-30 animate-pulse delay-1000 z-10" />
      <div className="fixed top-1/2 right-4 w-1 h-1 bg-gradient-to-br from-slate-200 to-slate-400 rounded-full opacity-50 animate-pulse delay-500 z-10" />

      {/* Control de música */}
      <Button
        onClick={toggleMusic}
        className="fixed top-4 left-4 z-50 p-3 bg-white/95 backdrop-blur-sm border-2 border-slate-300 shadow-lg rounded-xl"
        variant="ghost"
      >
        {isPlaying ? <Pause className="w-5 h-5 text-blue-900" /> : <Play className="w-5 h-5 text-blue-900" />}
      </Button>

      <div className="relative z-10">
        {/* Navegación móvil */}
        <nav className="lg:hidden fixed top-4 right-4 z-50">
          <Button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-3 bg-white/95 backdrop-blur-sm border-2 border-slate-300 shadow-lg rounded-xl"
            variant="ghost"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-blue-900" /> : <Menu className="w-6 h-6 text-blue-900" />}
          </Button>
          
          {mobileMenuOpen && (
            <div className="absolute top-16 right-0 bg-white/95 backdrop-blur-sm border-2 border-slate-300 rounded-xl shadow-xl p-4 space-y-3 min-w-[200px]">
              {navigationItems.map(({ icon: Icon, href, label }, index) => (
                <a
                  key={index}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors text-blue-900"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </a>
              ))}
            </div>
          )}
        </nav>

        {/* Navegación lateral para desktop */}
        <nav className="hidden lg:flex fixed left-0 top-0 h-full w-20 bg-white/95 backdrop-blur-sm border-r-2 border-slate-200 shadow-xl z-50 flex-col items-center py-6 gap-6">
          <div className="p-2 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-xl border-2 border-slate-400 shadow-lg">
            <Sparkles className="w-8 h-8 text-blue-900" />
          </div>

          {navigationItems.map(({ icon: Icon, href }, index) => (
            <a
              key={index}
              href={href}
              className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all duration-200 hover:scale-110 border border-slate-300 shadow-md hover:shadow-lg"
            >
              <Icon className="w-6 h-6 text-blue-900" />
            </a>
          ))}
        </nav>

        {/* Contenido principal */}
        <main className="lg:ml-20 min-h-screen">
          {/* Sección Hero */}
          <section id="fecha" className="min-h-screen flex items-center justify-center p-4 sm:p-8">
            <AnimatedSection className="text-center space-y-6 sm:space-y-8 max-w-2xl">
              <div className="space-y-4">
                <h1 className="text-lg sm:text-2xl font-playfair font-bold text-blue-900 tracking-wider">TE INVITO A MIS XV</h1>
                <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-slate-400 via-slate-500 to-blue-600 mx-auto rounded-full shadow-sm" />
                
                {/* Título AzuFest */}
                <div className="relative py-4">
                  <h2 className="azufest-title text-center animate-float">
                    AzuFest
                  </h2>
                  <div className="absolute -top-2 -right-4 w-4 h-4 bg-gradient-to-br from-slate-300 to-slate-500 rounded-full opacity-50 animate-pulse" />
                </div>
                
                <h3 className="text-2xl sm:text-4xl font-playfair text-blue-900 font-bold">Azu</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-base sm:text-xl font-bold text-blue-900 flex-wrap">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-center">5 de septiembre 2025 · 21:00 hs</span>
                </div>
                <Countdown />
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => {
                    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=XV%20Azu&dates=20250905T210000/20250906T040000&details=Fiesta%20de%20XV%20Azu&location=Manuel%20Belgrano%20458%2C%20Coronel%20Suárez`
                    window.open(url, "_blank")
                  }}
                  className="bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 hover:from-slate-300 hover:via-slate-400 hover:to-slate-500 text-blue-900 font-bold px-6 sm:px-8 py-3 shadow-lg border border-slate-300 text-sm sm:text-base"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Agendar fecha
                </Button>
              </div>

              <div className="space-y-2 text-blue-900">
                <p className="text-base sm:text-lg font-medium">Salón Municipal</p>
                <p className="text-sm sm:text-base">Manuel Belgrano 458, Coronel Suárez</p>
                <Button
                  onClick={() => setMapOpen(true)}
                  variant="outline"
                  className="mt-4 border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white text-sm sm:text-base"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Ver ubicación
                </Button>
              </div>
            </AnimatedSection>
          </section>

          {/* Separador decorativo */}
          <AnimatedSection className="flex justify-center py-6 sm:py-8">
            <div className="flex items-center gap-4">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
              <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-slate-400 via-slate-500 to-blue-600 rounded-full shadow-sm" />
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
            </div>
          </AnimatedSection>

          {/* Sección Música */}
          <section id="musica" className="py-12 sm:py-16 px-4 sm:px-8 bg-gradient-to-r from-slate-100/50 to-blue-100/50 relative overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-slate-200/30 to-blue-200/30 rounded-full blur-xl opacity-60 animate-pulse"></div>
            <div className="absolute bottom-20 right-16 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-slate-200/40 rounded-full blur-2xl opacity-50 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-slate-300/20 to-blue-300/20 rounded-full blur-lg opacity-40 animate-pulse delay-500"></div>
            
            {/* Notas musicales decorativas distribuidas por todo el fondo */}
            <div className="absolute top-16 right-1/4 text-slate-300/40 text-4xl animate-bounce delay-300">♪</div>
            <div className="absolute bottom-32 left-1/3 text-blue-300/40 text-3xl animate-bounce delay-700">♫</div>
            <div className="absolute top-1/3 right-16 text-slate-400/30 text-5xl animate-pulse delay-1200">♬</div>
            <div className="absolute bottom-16 left-16 text-blue-200/50 text-2xl animate-bounce delay-500">♩</div>
            
            {/* Más notas musicales para llenar el fondo */}
            <div className="absolute top-24 left-1/2 text-slate-300/30 text-3xl animate-pulse delay-800">♪</div>
            <div className="absolute bottom-40 right-1/3 text-blue-200/40 text-4xl animate-bounce delay-1500">♫</div>
            <div className="absolute top-1/2 left-20 text-slate-400/25 text-2xl animate-pulse delay-200">♬</div>
            <div className="absolute top-20 right-20 text-blue-300/35 text-3xl animate-bounce delay-1100">♩</div>
            <div className="absolute bottom-24 left-1/2 text-slate-300/35 text-5xl animate-pulse delay-600">♪</div>
            <div className="absolute top-40 left-1/4 text-blue-200/30 text-2xl animate-bounce delay-900">♫</div>
            <div className="absolute bottom-48 right-24 text-slate-400/40 text-4xl animate-pulse delay-1300">♬</div>
            <div className="absolute top-60 right-1/2 text-blue-300/25 text-3xl animate-bounce delay-400">♩</div>
            <div className="absolute bottom-60 left-24 text-slate-300/30 text-2xl animate-pulse delay-1000">♪</div>
            <div className="absolute top-1/4 right-1/4 text-blue-200/35 text-4xl animate-bounce delay-1400">♫</div>
            <div className="absolute bottom-1/3 left-1/3 text-slate-400/30 text-3xl animate-pulse delay-100">♬</div>
            <div className="absolute top-3/4 right-1/3 text-blue-300/40 text-2xl animate-bounce delay-1600">♩</div>
            
            <AnimatedSection>
              <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm border-2 border-blue-200 shadow-xl relative z-10">
                <CardContent className="p-6 sm:p-8 text-center space-y-6">
                  <div className="space-y-4">
                    <div className="relative p-3 sm:p-4 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-2xl w-fit mx-auto border-2 border-slate-400 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group">
                      <Music className="w-10 h-10 sm:w-12 sm:h-12 text-blue-900 group-hover:rotate-12 transition-transform duration-300" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full opacity-60 group-hover:animate-bounce" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-playfair font-bold text-blue-900">
                      ¡Quiero armar la playlist perfecta!
                    </h3>
                    <p className="text-slate-700 text-base sm:text-lg">
                      Decime cuáles son las canciones que no pueden faltar en mi fiesta
                    </p>
                  </div>

                  <MusicForm currentGuest={currentGuest} />
                </CardContent>
              </Card>
            </AnimatedSection>
          </section>

          {/* Sección Fotos */}
          <section id="fotos" className="py-12 sm:py-16 px-4 sm:px-8 bg-gradient-to-br from-slate-100/40 via-blue-50/30 to-slate-50/50 relative overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-16 right-20 w-24 h-24 bg-gradient-to-br from-blue-100/30 to-slate-200/30 rounded-full blur-xl opacity-50 animate-pulse delay-300"></div>
            <div className="absolute bottom-16 left-20 w-28 h-28 bg-gradient-to-br from-slate-200/40 to-blue-100/40 rounded-full blur-2xl opacity-40 animate-pulse delay-1200"></div>
            <div className="absolute top-1/3 left-16 w-20 h-20 bg-gradient-to-br from-blue-200/25 to-slate-300/25 rounded-full blur-lg opacity-35 animate-pulse delay-700"></div>
            
            {/* Elementos decorativos de cámaras y fotos */}
            <div className="absolute top-20 left-1/4 text-slate-300/30 text-4xl animate-pulse delay-500">◉</div>
            <div className="absolute bottom-32 right-1/3 text-blue-300/35 text-3xl animate-bounce delay-800">◎</div>
            <div className="absolute top-1/2 right-20 text-slate-400/25 text-5xl animate-pulse delay-1100">▢</div>
            <div className="absolute bottom-20 left-1/3 text-blue-300/40 text-2xl animate-bounce delay-400">✦</div>
            <div className="absolute top-32 right-1/2 text-slate-300/35 text-3xl animate-pulse delay-900">◐</div>
            <div className="absolute bottom-40 left-1/4 text-blue-200/30 text-4xl animate-bounce delay-1300">◑</div>
            <div className="absolute top-2/3 left-20 text-slate-400/30 text-2xl animate-pulse delay-200">▢</div>
            <div className="absolute bottom-1/3 right-24 text-blue-300/35 text-3xl animate-bounce delay-1000">✧</div>
            <div className="absolute top-1/4 left-1/2 text-slate-300/25 text-5xl animate-pulse delay-600">◉</div>
            <div className="absolute bottom-60 right-1/4 text-blue-200/40 text-2xl animate-bounce delay-1400">◎</div>
            
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
              <AnimatedSection>
                <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-blue-900">MI HISTORIA</h3>
              </AnimatedSection>
              
              <PhotoCarousel photos={photos} />

              <AnimatedSection>
                <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm border-2 border-blue-200 shadow-xl">
                  <CardContent className="p-6 sm:p-8 text-center space-y-6">
                    <div className="space-y-4">
                      <div className="relative p-3 sm:p-4 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-2xl w-fit mx-auto border-2 border-slate-400 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group">
                        <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-blue-900 group-hover:animate-pulse" />
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full opacity-50 group-hover:animate-ping" />
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-blue-900">¡Revive la magia de mi gran día!</h4>
                      <p className="text-slate-700 text-sm sm:text-base">Comparte tus fotos en el álbum de Google Drive</p>
                    </div>

                    <Button
                      onClick={() => window.open(APP_CONFIG.GOOGLE_DRIVE.FOLDER_URL, "_blank")}
                      className="bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 hover:from-slate-300 hover:via-slate-400 hover:to-slate-500 text-blue-900 font-bold shadow-lg border border-slate-300"
                    >
                      <Camera className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      SUBIR FOTOS
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </section>

          {/* Nueva sección: La fiesta está en marcha */}
          <section className="py-12 sm:py-16 px-4 sm:px-8 bg-gradient-to-bl from-blue-50/40 via-slate-100/30 to-blue-100/50 relative overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-20 left-16 w-22 h-22 bg-gradient-to-br from-slate-200/30 to-blue-200/30 rounded-full blur-xl opacity-45 animate-pulse delay-400"></div>
            <div className="absolute bottom-24 right-20 w-26 h-26 bg-gradient-to-br from-blue-100/35 to-slate-200/35 rounded-full blur-2xl opacity-40 animate-pulse delay-1100"></div>
            <div className="absolute top-1/2 right-16 w-18 h-18 bg-gradient-to-br from-slate-300/25 to-blue-300/25 rounded-full blur-lg opacity-35 animate-pulse delay-800"></div>
            
            {/* Elementos decorativos de estrellas y celebración */}
            <div className="absolute top-24 right-1/4 text-slate-300/30 text-4xl animate-pulse delay-600">✦</div>
            <div className="absolute bottom-28 left-1/3 text-blue-300/35 text-3xl animate-bounce delay-900">✧</div>
            <div className="absolute top-1/3 left-20 text-slate-400/25 text-5xl animate-pulse delay-1300">◆</div>
            <div className="absolute bottom-16 right-1/3 text-blue-300/40 text-2xl animate-bounce delay-500">◉</div>
            <div className="absolute top-36 left-1/2 text-slate-300/35 text-3xl animate-pulse delay-1000">✦</div>
            <div className="absolute bottom-36 left-1/4 text-blue-200/30 text-4xl animate-bounce delay-1400">✧</div>
            <div className="absolute top-2/3 right-24 text-slate-400/30 text-2xl animate-pulse delay-300">◇</div>
            <div className="absolute bottom-1/4 right-1/2 text-blue-300/35 text-3xl animate-bounce delay-1200">◐</div>
            <div className="absolute top-1/4 right-1/3 text-slate-300/25 text-5xl animate-pulse delay-700">✦</div>
            <div className="absolute bottom-48 left-20 text-blue-200/40 text-2xl animate-bounce delay-1500">✧</div>
            
            <AnimatedSection>
              <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm border-2 border-blue-200 shadow-xl relative z-10">
                <CardContent className="p-6 sm:p-8 text-center space-y-6">
                  <div className="space-y-4">
                    <div className="relative p-3 sm:p-4 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-2xl w-fit mx-auto border-2 border-slate-400 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group">
            <Star className="w-10 h-10 sm:w-12 sm:h-12 text-blue-900 group-hover:rotate-180 transition-transform duration-500" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full opacity-60 group-hover:animate-spin" />
          </div>
          <h4 className="text-xl sm:text-2xl font-playfair font-bold text-blue-900">¡La fiesta está en marcha!</h4>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            Esta noche cumplo mi sueño de quinceañera...
            <br />
            ¡Gracias por ser parte de este momento tan especial!
          </p>
        </div>
      </CardContent>
    </Card>
  </AnimatedSection>
</section>

          {/* Sección Dress Code y Regalo */}
          <section id="regalo" className="py-12 sm:py-16 px-4 sm:px-8 bg-gradient-to-r from-slate-100/50 to-blue-100/50 relative overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-12 left-12 w-24 h-24 bg-gradient-to-br from-slate-200/30 to-blue-200/30 rounded-full blur-xl opacity-50 animate-pulse delay-200"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-100/35 to-slate-200/35 rounded-full blur-2xl opacity-45 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-br from-slate-300/25 to-blue-300/25 rounded-full blur-lg opacity-40 animate-pulse delay-600"></div>
            
            {/* Elementos decorativos temáticos - vestimenta y regalos */}
            <div className="absolute top-20 right-1/4 text-slate-300/30 text-4xl animate-pulse delay-400">◇</div>
            <div className="absolute bottom-32 left-1/3 text-blue-300/35 text-3xl animate-bounce delay-800">▣</div>
            <div className="absolute top-1/3 left-16 text-slate-400/25 text-5xl animate-pulse delay-1200">◆</div>
            <div className="absolute bottom-16 right-1/3 text-blue-300/40 text-2xl animate-bounce delay-500">✦</div>
            <div className="absolute top-32 left-1/2 text-slate-300/35 text-3xl animate-pulse delay-900">◉</div>
            <div className="absolute bottom-40 right-1/4 text-blue-200/30 text-4xl animate-bounce delay-1300">◇</div>
            <div className="absolute top-2/3 right-24 text-slate-400/30 text-2xl animate-pulse delay-300">✧</div>
            <div className="absolute bottom-1/4 left-20 text-blue-300/35 text-3xl animate-bounce delay-1100">◐</div>
            <div className="absolute top-1/4 right-1/3 text-slate-300/25 text-5xl animate-pulse delay-700">◆</div>
            <div className="absolute bottom-48 left-1/4 text-blue-200/40 text-2xl animate-bounce delay-1400">◇</div>
            
            <AnimatedSection>
              <div className="max-w-4xl mx-auto grid gap-6 sm:gap-8 md:grid-cols-2">
                <Card className="bg-white/95 backdrop-blur-sm border-2 border-blue-200 shadow-xl">
                  <CardContent className="p-6 sm:p-8 text-center space-y-6">
                    <div className="space-y-4">
                      <div className="relative p-3 sm:p-4 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-2xl w-fit mx-auto border-2 border-slate-400 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group">
                        <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-blue-900 group-hover:animate-bounce" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full opacity-60 group-hover:animate-pulse" />
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-blue-900">Mi noche se viste de gala!</h4>
                      <p className="text-xl sm:text-2xl font-bold text-blue-900">¡Y VOS TAMBIÉN!</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/95 backdrop-blur-sm border-2 border-blue-200 shadow-xl">
                  <CardContent className="p-6 sm:p-8 text-center space-y-6">                  <div className="space-y-4">
                    <div className="relative p-3 sm:p-4 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-2xl w-fit mx-auto border-2 border-slate-400 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group">
                      <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-blue-900 group-hover:-rotate-12 transition-transform duration-300" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full opacity-60 group-hover:animate-bounce" />
                    </div>
                      <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                        Si deseas hacerme un regalo, además de tu hermosa presencia, habrá una urna en el salón.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </AnimatedSection>
          </section>

          {/* Sección Confirmación */}
          <section id="confirmacion" className="py-12 sm:py-16 px-4 sm:px-8">
            <AnimatedSection>
              <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm border-2 border-blue-200 shadow-xl">
                <CardContent className="p-6 sm:p-8 text-center space-y-6">
                  <div className="space-y-4">
                    <div className="relative p-3 sm:p-4 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 rounded-2xl w-fit mx-auto border-2 border-slate-400 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group">
                      <Users className="w-10 h-10 sm:w-12 sm:h-12 text-blue-900 group-hover:scale-125 transition-transform duration-300" />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full opacity-50 animate-pulse group-hover:animate-ping" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-playfair font-bold text-blue-900">
                      ¡Decile "SÍ ACEPTO" a mi invitación!
                    </h3>
                  </div>

                  <Button
                    onClick={() =>
                      window.open(
                        "https://wa.me/5492926454421?text=Confirmo%20mi%20asistencia%20a%20los%2015%20de%20Azu",
                        "_blank",
                      )
                    }
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-base sm:text-lg py-3 sm:py-4 shadow-lg border border-blue-400"
                  >
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    ¡CONFIRMAR ASISTENCIA!
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          </section>

          {/* Sección Final */}
          <section className="py-12 sm:py-16 px-4 sm:px-8 bg-gradient-to-r from-slate-100/50 to-blue-100/50">
            <AnimatedSection>
              <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm border-2 border-blue-200 shadow-xl">
                <CardContent className="p-6 sm:p-8 text-center space-y-6">
                  <div className="relative">
                    <img
                      src="/assets/photos/foto-6.jpg"
                      alt="Azu"
                      className="w-full max-w-xs sm:max-w-sm mx-auto rounded-2xl shadow-lg border-4 border-blue-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=300&width=400&text=Foto+de+Azu"
                      }}
                    />
                    <div className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full opacity-40 animate-pulse" />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full opacity-50 animate-pulse delay-1000" />
                  </div>
                  <div className="space-y-4">
                    <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 mx-auto animate-pulse" />
                    <p className="text-lg sm:text-xl font-bold text-blue-900 leading-relaxed">
                      GRACIAS POR SER PARTE EN ESTE CAPÍTULO TAN IMPORTANTE DE MI VIDA
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </section>
        </main>
      </div>

      <MapModal isOpen={mapOpen} onClose={() => setMapOpen(false)} />
    </div>
  )
}
