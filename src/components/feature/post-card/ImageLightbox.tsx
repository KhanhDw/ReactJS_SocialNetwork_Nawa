"use client"

// XEM ẢNH CHI TIẾT CỦA POSTCARD

import type React from "react"

import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, RotateCw } from "lucide-react"

interface ImageLightboxProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function ImageLightbox({ images, currentIndex, isOpen, onClose, onNavigate }: ImageLightboxProps) {
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })

  // Reset zoom and position when image changes
  useEffect(() => {
    setZoom(1)
    setRotation(0)
    setImagePosition({ x: 0, y: 0 })
  }, [currentIndex])

// Memoize handlePrevious and handleNext
   const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1)
    }
  }

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          handlePrevious()
          break
        case "ArrowRight":
          handleNext()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex]) // eslint-disable-line react-hooks/exhaustive-deps


  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])



  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 0.5))
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = images[currentIndex]
    link.download = `image-${currentIndex + 1}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const resetImage = () => {
    setZoom(1)
    setRotation(0)
    setImagePosition({ x: 0, y: 0 })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full h-full flex flex-col">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 0.5}
                className="p-2 rounded-full bg-black/30 hover:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                title="Thu nhỏ"
              >
                <ZoomOut className="w-5 h-5" />
              </button>

              <span className="text-sm px-2">{Math.round(zoom * 100)}%</span>

              <button
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                className="p-2 rounded-full bg-black/30 hover:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                title="Phóng to"
              >
                <ZoomIn className="w-5 h-5" />
              </button>

              <button
                onClick={handleRotate}
                className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all"
                title="Xoay ảnh"
              >
                <RotateCw className="w-5 h-5" />
              </button>

              <button
                onClick={handleDownload}
                className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all"
                title="Tải xuống"
              >
                <Download className="w-5 h-5" />
              </button>

              <button
                onClick={resetImage}
                className="px-3 py-2 text-sm rounded-full bg-black/30 hover:bg-black/50 transition-all"
                title="Đặt lại"
              >
                Reset
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all"
                title="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Image Container */}
        <div className="flex-1 flex items-center justify-center p-4 pt-20 pb-16">
          <div
            className="relative max-w-full max-h-full overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`Image ${currentIndex + 1}`}
              className={`max-w-full max-h-full object-contain transition-transform duration-200 ${
                zoom > 1 ? "cursor-grab" : "cursor-default"
              } ${isDragging ? "cursor-grabbing" : ""}`}
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg) translate(${imagePosition.x / zoom}px, ${imagePosition.y / zoom}px)`,
                transformOrigin: "center center",
              }}
              draggable={false}
            />
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all z-10"
              title="Ảnh trước"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === images.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all z-10"
              title="Ảnh tiếp theo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-black/30 rounded-full backdrop-blur-sm">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => onNavigate(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                  }`}
                  title={`Ảnh ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Loading indicator */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin opacity-0 transition-opacity" />
        </div>
      </div>
    </div>
  )
}
