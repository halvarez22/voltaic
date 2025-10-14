import React, { useRef, useEffect } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title?: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoSrc, title = "Video" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Pausar video cuando se cierra el modal
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      // Auto-play en móvil cuando sea posible
      videoRef.current.play().catch(() => {
        // Si auto-play falla, no hacer nada (comportamiento esperado en móvil)
      });
    }
  }, [isOpen]);

  // Función para manejar el fin del video
  const handleVideoEnded = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-1 sm:p-4">
      <div className="relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] bg-black rounded-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-2 sm:p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-semibold text-sm sm:text-lg md:text-xl">{title}</h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 active:text-gray-300 transition-colors p-2 -m-2 touch-manipulation"
              aria-label="Cerrar video"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Video */}
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 aspect ratio */}
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-contain"
            controls
            preload="metadata"
            playsInline
            webkit-playsinline="true"
            poster=""
            onEnded={handleVideoEnded}
          >
            <source src={videoSrc} type="video/mp4" />
            Tu navegador no soporta la reproducción de video.
          </video>
        </div>

        {/* Controles personalizados para móvil */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-4">
          <div className="flex justify-center space-x-3 sm:space-x-4">
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.pause();
                }
              }}
              className="text-white hover:text-gray-300 active:text-gray-300 transition-colors p-2 touch-manipulation"
              aria-label="Pausar"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            </button>
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.play();
                }
              }}
              className="text-white hover:text-gray-300 active:text-gray-300 transition-colors p-2 touch-manipulation"
              aria-label="Reproducir"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 active:text-gray-300 transition-colors p-2 touch-manipulation"
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
