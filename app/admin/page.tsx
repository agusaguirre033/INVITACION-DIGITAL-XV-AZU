"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Music, Lock, Unlock, Download } from 'lucide-react'
import { APP_CONFIG } from '@/lib/config'

interface Song {
  id: number
  family: string
  song: string
  artist: string | null
  created_at: string
}

// Función para formatear la fecha y restar 3 horas
const formatAdjustedDate = (dateString: string) => {
  const date = new Date(dateString)
  date.setHours(date.getHours() - 3) // Resta 3 horas
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Formato 24 horas
  })
}

export default function AdminPage() {
  const [accessCode, setAccessCode] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(false)
  const tableRef = useRef<HTMLDivElement>(null) // Referencia para el contenido a exportar

  const ADMIN_CODE = APP_CONFIG.ACCESS_CODES.ADMIN // Código de acceso desde configuración

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (accessCode === ADMIN_CODE) {
      setIsAuthenticated(true)
      setError('')
      fetchSongs() // Cargar canciones al autenticarse
    } else {
      setError('Código de administrador incorrecto.')
    }
  }

  const fetchSongs = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/songs')
      if (response.ok) {
        const data = await response.json()
        setSongs(data.songs)
      } else {
        setError('Error al cargar las canciones.')
      }
    } catch (err) {
      console.error('Error fetching songs:', err)
      setError('Error de conexión al cargar las canciones.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPdf = async () => {
    if (tableRef.current) {
      // Importación dinámica para funcionar correctamente en Next.js
      const html2pdf = (await import('html2pdf.js')).default
      
      const element = tableRef.current
      const opt = {
        margin: 1,
        filename: 'canciones_sugeridas.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }
      html2pdf().set(opt).from(element).save()
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-blue-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm relative z-10 bg-white/95 backdrop-blur-sm border-2 border-slate-300 shadow-2xl">
          <CardContent className="p-6 sm:p-8 text-center space-y-6">
            <div className="space-y-3">
              <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-blue-900 mx-auto" />
              <h2 className="text-lg sm:text-xl font-playfair font-bold text-blue-900 leading-tight">
                Panel de Administración
              </h2>
            </div>
            <p className="text-slate-700 text-sm sm:text-base">Ingresa el código de administrador:</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Código de administrador"
                className="text-center font-bold tracking-widest text-blue-900 border-2 border-slate-300 focus:border-blue-500 bg-gradient-to-r from-slate-50 to-white"
                required
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 hover:from-slate-300 hover:via-slate-400 hover:to-slate-500 text-blue-900 font-bold shadow-lg border border-slate-300"
              >
                Acceder <Unlock className="ml-2 w-4 h-4" />
              </Button>
              {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 font-inter p-4 sm:p-8">
      <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm border-2 border-slate-200 shadow-xl">
        <CardHeader className="text-center p-6 sm:p-8">
          <CardTitle className="text-2xl sm:text-3xl font-playfair font-bold text-blue-900 flex items-center justify-center gap-3">
            <Music className="w-8 h-8 sm:w-10 sm:h-10" />
            Canciones Sugeridas
          </CardTitle>
          <p className="text-slate-700 mt-2">Lista de canciones enviadas por los invitados.</p>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {loading ? (
            <div className="text-center text-blue-800 font-medium">Cargando canciones...</div>
          ) : error ? (
            <div className="text-center text-red-600 font-medium">{error}</div>
          ) : songs.length === 0 ? (
            <div className="text-center text-slate-600">No hay canciones sugeridas aún.</div>
          ) : (
            <>
              <div className="flex justify-end mb-4">
                <Button
                  onClick={handleDownloadPdf}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar PDF
                </Button>
              </div>
              <div ref={tableRef} className="overflow-x-auto p-2 bg-white rounded-lg shadow-inner"> {/* Contenido a exportar */}
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-100">
                      <TableHead className="text-blue-900 font-bold">Familia</TableHead>
                      <TableHead className="text-blue-900 font-bold">Canción</TableHead>
                      <TableHead className="text-blue-900 font-bold">Artista</TableHead>
                      <TableHead className="text-blue-900 font-bold text-right">Fecha</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {songs.map((song) => (
                      <TableRow key={song.id} className="hover:bg-slate-50">
                        <TableCell className="font-medium text-slate-800">{song.family}</TableCell>
                        <TableCell className="text-slate-700">{song.song}</TableCell>
                        <TableCell className="text-slate-700">{song.artist || 'N/A'}</TableCell>
                        <TableCell className="text-right text-slate-600 text-sm">
                          {formatAdjustedDate(song.created_at)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
          <div className="mt-6 text-center">
            <Button
              onClick={() => setIsAuthenticated(false)}
              className="bg-slate-600 hover:bg-slate-700 text-white"
            >
              Cerrar Sesión
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}