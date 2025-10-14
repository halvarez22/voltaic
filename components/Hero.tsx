
import React, { useState, useEffect } from 'react';
import LazyImage from './LazyImage';

interface HeroProps {
  id?: string;
  bgUrl?: string;
  onCTAClick?: () => void;
}

// Rutas de las imágenes en la carpeta pública
const backgroundImages = [
  '/images/modulos-fotovoltaicos-planta-solar.webp',
  '/images/images (6).jpg',
  '/images/images (3).jpg',
  '/images/images (4).jpg'
];

const Hero: React.FC<HeroProps> = ({ id = 'hero', onCTAClick }) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Cambiar la imagen de fondo cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
      setIsImageLoaded(false);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <section 
      id={id} 
      className="flex-shrink-0 w-screen h-full flex items-center justify-center text-center text-white p-4 sm:p-6 relative overflow-hidden"
    >
      {/* Imagen de fondo con lazy loading */}
      <div className="absolute inset-0 w-full h-full">
        <LazyImage
          src={backgroundImages[currentBgIndex]}
          alt="Panel solar"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
        />
      </div>
      <div className="absolute inset-0 bg-neutral-950/60 z-0"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Logo Corporativo */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <img 
            src="/images/logo-voltaic.png?v=1" 
            alt="Logo Voltaic" 
            className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain drop-shadow-lg"
          />
        </div>
        
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-tight px-2">
          Energía Solar para un
          <br />
          <span className="text-brand-yellow">Futuro Sostenible</span>
        </h1>
        <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-sm xs:text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed px-4">
          Transformamos la luz del sol en energía limpia y ahorros para tu hogar o negocio. Descubre el poder de la tecnología fotovoltaica con Voltaic.
        </p>
        <div className="mt-8 sm:mt-10">
          <button
            onClick={onCTAClick}
            className="bg-brand-yellow text-neutral-950 font-bold py-3 px-6 sm:px-8 rounded-full text-sm xs:text-base sm:text-lg hover:bg-yellow-300 active:bg-yellow-400 transition-all duration-300 transform hover:scale-105 active:scale-95 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto sm:mx-0 touch-manipulation"
          >
            Cotiza tu Proyecto
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;