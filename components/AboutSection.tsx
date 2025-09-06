
import React from 'react';
import LazyImage from './LazyImage';

const AboutSection: React.FC<{ id?: string }> = ({ id = 'nosotros' }) => {
  // Imágenes para la sección
  const teamImage = '/images/images (5).jpg';
  const bgImage = '/images/images (2).jpg';

  return (
    <section 
      id={id} 
      className="flex-shrink-0 w-screen h-full flex items-center justify-center p-4 sm:p-6 relative overflow-hidden"
    >
      {/* Imagen de fondo con efecto de desenfoque */}
      <div className="absolute inset-0 w-full h-full">
        <LazyImage
          src={bgImage}
          alt="Fondo de la sección Nosotros"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-neutral-950/60"></div>
      </div>
      
      <div className="container mx-auto grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center p-4 sm:p-6 lg:p-10 relative z-10 max-w-7xl">
        <div className="w-full h-64 sm:h-80 lg:h-[500px] rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105 order-2 lg:order-1">
          <LazyImage
            src={teamImage}
            alt="Equipo de Voltaic"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-xl border border-white/10 shadow-xl order-1 lg:order-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">
            Sobre <span className="text-brand-yellow">VOLTAIC</span>
          </h2>
          
          <div className="space-y-3 sm:space-y-4">
            <p className="text-neutral-200 leading-relaxed text-sm sm:text-base">
              En <span className="font-semibold text-brand-yellow">VOLTAIC</span>, lideramos la revolución de la energía solar fotovoltaica con un compromiso inquebrantable con la sostenibilidad y la innovación tecnológica. Nuestro equipo altamente calificado combina experiencia técnica con pasión por las energías renovables.
            </p>
            
            <p className="text-neutral-200 leading-relaxed text-sm sm:text-base">
              Desde nuestros inicios, nos hemos dedicado a diseñar e implementar soluciones energéticas personalizadas que no solo satisfacen las necesidades de nuestros clientes, sino que también contribuyen positivamente al medio ambiente.
            </p>
            
            <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-brand-yellow/10 p-3 sm:p-4 rounded-lg border-l-4 border-brand-yellow">
                <h3 className="font-bold text-brand-yellow text-base sm:text-lg">+10 Años</h3>
                <p className="text-xs sm:text-sm text-neutral-300">De experiencia en el sector</p>
              </div>
              <div className="bg-brand-yellow/10 p-3 sm:p-4 rounded-lg border-l-4 border-brand-yellow">
                <h3 className="font-bold text-brand-yellow text-base sm:text-lg">+500</h3>
                <p className="text-xs sm:text-sm text-neutral-300">Proyectos completados</p>
              </div>
            </div>
            
            <button className="mt-4 sm:mt-6 bg-brand-yellow text-neutral-900 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-yellow-300 transition-colors duration-300 text-sm sm:text-base w-full sm:w-auto">
              Conoce más sobre nosotros
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;