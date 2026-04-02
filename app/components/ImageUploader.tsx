'use client'

import { useRef, useState, useCallback } from 'react'

interface ImageUploaderProps {
  onFileChange?: (file: File | null) => void
  label?: string
}

export default function ImageUploader({ onFileChange, label }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFile = useCallback(
    (file: File | null) => {
      if (!file) return
      const url = URL.createObjectURL(file)
      setPreview(url)
      onFileChange?.(file)
    },
    [onFileChange]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file && file.type.startsWith('image/')) {
        handleFile(file)
      }
    },
    [handleFile]
  )

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    handleFile(file)
  }

  const handleClear = () => {
    setPreview(null)
    if (inputRef.current) inputRef.current.value = ''
    onFileChange?.(null)
  }

  return (
    <div className="w-full">
      {label && (
        <p className="text-xs font-semibold uppercase tracking-wider text-[#E11D48] mb-2">
          {label}
        </p>
      )}

      {preview ? (
        <div className="relative w-full rounded-lg overflow-hidden border border-[#E5E7EB]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="업로드된 이미지" className="w-full object-cover max-h-56" />
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-[#111827] rounded-full w-7 h-7 flex items-center justify-center text-sm shadow-sm transition-colors"
            aria-label="이미지 삭제"
          >
            ✕
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`w-full cursor-pointer rounded-lg border-2 border-dashed flex flex-col items-center justify-center py-8 px-4 transition-colors ${
            isDragging
              ? 'border-[#E11D48] bg-[#FFF1F2]'
              : 'border-[#E5E7EB] bg-[#F9FAFB] hover:border-[#E11D48] hover:bg-[#FFF1F2]'
          }`}
        >
          <span className="text-3xl mb-2">📷</span>
          <p className="text-sm font-medium text-[#111827] mb-1">시술 사진을 끌어다 놓으세요</p>
          <p className="text-xs text-[#9CA3AF]">또는 클릭하여 파일 선택</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />
    </div>
  )
}
