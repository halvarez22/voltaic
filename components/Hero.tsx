
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
      className="flex-shrink-0 w-screen h-full flex items-center justify-center text-center text-white p-6 relative overflow-hidden"
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
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase">
          Energía Solar para un
          <br />
          <span className="text-brand-yellow">Futuro Sostenible</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-neutral-300">
          Transformamos la luz del sol en energía limpia y ahorros para tu hogar o negocio. Descubre el poder de la tecnología fotovoltaica con Voltaic.
        </p>
        <div className="mt-10">
          <button
            onClick={onCTAClick}
            className="bg-brand-yellow text-neutral-950 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105"
          >
            Cotiza tu Proyecto
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;