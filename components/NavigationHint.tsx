import React, { useState, useEffect, useRef } from 'react';

interface NavigationHintProps {
  onClose?: () => void;
}

const NavigationHint: React.FC<NavigationHintProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = () => {
    // Limpiar el timer de auto-ocultar si existe
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('voltaic-navigation-hint', 'true');
      onClose?.();
    }, 300);
  };

  useEffect(() => {
    // Verificar si ya se mostró el hint anteriormente
    const hasSeenHint = localStorage.getItem('voltaic-navigation-hint');
    
    if (!hasSeenHint) {
      // Mostrar el hint después de un pequeño delay
      const showTimer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
        
        // Auto-ocultar después de 5 segundos adicionales
        hideTimerRef.current = setTimeout(() => {
          handleClose();
        }, 5000);
      }, 3000);

      return () => {
        clearTimeout(showTimer);
        if (hideTimerRef.current) {
          clearTimeout(hideTimerRef.current);
        }
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-all duration-500 ${
      isAnimating ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className={`text-center transform transition-all duration-500 ${
        isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
      }`}>
        {/* Flecha Animada */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center space-x-2 text-brand-yellow">
            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Texto */}
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20">
          <p className="text-neutral-900 font-semibold text-sm sm:text-base">
            Desliza hacia la derecha para explorar
          </p>
        </div>

        {/* Botón de Cerrar (opcional) */}
        <div className="mt-4">
          <button
            onClick={handleClose}
            className="bg-white/20 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full hover:bg-white/30 transition-colors duration-200"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationHint;
