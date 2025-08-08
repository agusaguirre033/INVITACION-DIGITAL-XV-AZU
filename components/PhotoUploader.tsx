"use client"

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, Camera, ExternalLink, Check, AlertCircle } from 'lucide-react'
import { APP_CONFIG } from '@/lib/config'

interface PhotoUploaderProps {
  familyName?: string
}

export default function PhotoUploader({ familyName }: PhotoUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const isValidType = APP_CONFIG.GOOGLE_DRIVE.ALLOWED_TYPES.includes(file.type)
      const isValidSize = file.size <= APP_CONFIG.GOOGLE_DRIVE.MAX_FILE_SIZE_MB * 1024 * 1024
      return isValidType && isValidSize
    })

    setSelectedFiles(validFiles)
    if (validFiles.length > 0) {
      setUploadStatus('success')
    }
  }

  const onButtonClick = () => {
    fileInputRef.current?.click()
  }

  const openGoogleDrive = () => {
    window.open(APP_CONFIG.GOOGLE_DRIVE.FOLDER_URL, '_blank')
  }

  const clearFiles = () => {
    setSelectedFiles([])
    setUploadStatus('idle')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm border-2 border-blue-200 shadow-xl">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-playfair font-bold text-blue-900 flex items-center justify-center gap-2">
          <Camera className="w-6 h-6" />
          Comparte tus Fotos
        </CardTitle>
        <p className="text-slate-600 text-sm">
          Sube tus fotos del evento a nuestro álbum compartido
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Área de Drag & Drop */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-3">
            {uploadStatus === 'success' && selectedFiles.length > 0 ? (
              <>
                <Check className="w-12 h-12 text-green-600 mx-auto" />
                <div>
                  <p className="text-green-600 font-medium">
                    {selectedFiles.length} archivo(s) seleccionado(s)
                  </p>
                  <p className="text-slate-500 text-sm">
                    Ahora abre Google Drive para subirlas
                  </p>
                </div>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-slate-400 mx-auto" />
                <div>
                  <p className="text-slate-600 font-medium">
                    Arrastra tus fotos aquí
                  </p>
                  <p className="text-slate-500 text-sm">
                    o haz clic para seleccionar
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Lista de archivos seleccionados */}
        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">Archivos seleccionados:</p>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-50 rounded p-2">
                  <span className="text-sm text-slate-600 truncate">{file.name}</span>
                  <span className="text-xs text-slate-400">
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Información sobre límites */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-700">
              <p className="font-medium">Formatos aceptados:</p>
              <p>JPG, PNG, GIF, WEBP (máx. {APP_CONFIG.GOOGLE_DRIVE.MAX_FILE_SIZE_MB}MB)</p>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-2">
          <Button
            onClick={openGoogleDrive}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Abrir Google Drive para Subir
          </Button>
          
          {selectedFiles.length > 0 && (
            <Button
              onClick={clearFiles}
              variant="outline"
              className="w-full"
            >
              Limpiar Selección
            </Button>
          )}
        </div>

        {familyName && (
          <p className="text-center text-xs text-slate-500">
            Fotos de: <span className="font-medium">{familyName}</span>
          </p>
        )}
      </CardContent>
    </Card>
  )
}
