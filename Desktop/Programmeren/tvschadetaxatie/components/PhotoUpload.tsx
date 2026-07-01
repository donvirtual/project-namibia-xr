"use client"
import { useState, useRef, DragEvent, ChangeEvent } from "react"

interface PhotoUploadProps {
  onUpload: (urls: string[]) => void
  onUploadingChange?: (uploading: boolean) => void
  maxPhotos?: number
}

export default function PhotoUpload({ onUpload, onUploadingChange, maxPhotos = 8 }: PhotoUploadProps) {
  const [previews, setPreviews] = useState<{ file: File; preview: string; url?: string }[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const uploadedUrlsRef = useRef<string[]>([])

  async function handleFiles(files: FileList) {
    if (previews.length >= maxPhotos) return

    setUploadError("")
    const newFiles = Array.from(files).slice(0, maxPhotos - previews.length)
    const newPreviews = newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setPreviews((prev) => [...prev, ...newPreviews])

    setUploading(true)
    onUploadingChange?.(true)

    let failCount = 0
    for (const { file } of newPreviews) {
      const formData = new FormData()
      formData.append("file", file)

      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData })
        const data = await res.json()
        if (data.url) {
          uploadedUrlsRef.current = [...uploadedUrlsRef.current, data.url]
        } else {
          failCount++
        }
      } catch {
        failCount++
      }
    }

    setUploading(false)
    onUploadingChange?.(false)
    if (failCount > 0) {
      setUploadError(`${failCount} foto(${failCount > 1 ? "'s" : ""}) kon niet worden geüpload. Probeer opnieuw.`)
    }
    onUpload([...uploadedUrlsRef.current])
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files)
  }

  function removePhoto(index: number) {
    setPreviews((prev) => {
      const updated = prev.filter((_, i) => i !== index)
      uploadedUrlsRef.current = uploadedUrlsRef.current.filter((_, i) => i !== index)
      onUpload([...uploadedUrlsRef.current])
      return updated
    })
  }

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragOver ? "border-sky-500 bg-sky-50" : "border-gray-300 hover:border-sky-400 bg-gray-50"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-gray-700 font-medium">Sleep foto&apos;s hierheen of klik om te uploaden</p>
        <p className="text-gray-400 text-sm mt-1">JPG, PNG, HEIC — max. 15 MB per foto — max. {maxPhotos} foto&apos;s</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/heic"
          multiple
          className="hidden"
          onChange={(e: ChangeEvent<HTMLInputElement>) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {uploading && (
        <p className="text-sm text-sky-700 mt-2 text-center font-medium">Foto&apos;s worden geüpload... even wachten</p>
      )}
      {uploadError && (
        <p className="text-sm text-red-600 mt-2 text-center">{uploadError}</p>
      )}

      {previews.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
          {previews.map((p, i) => (
            <div key={i} className="relative group aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.preview}
                alt={`Foto ${i + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removePhoto(i) }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-semibold mb-1">Maak foto&apos;s van:</p>
        <ol className="list-decimal ml-4 space-y-0.5">
          <li>De volledige voorkant van de tv</li>
          <li>De schade van dichtbij</li>
          <li>Het typeplaatje/serienummer achterop</li>
          <li>Eventuele andere schade</li>
        </ol>
      </div>
    </div>
  )
}
