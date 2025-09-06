
import React from 'react';
import LazyImage from './LazyImage';

const AboutSection: React.FC<{ id?: string }> = ({ id = 'nosotros' }) => {
  // Imágenes para la sección
  const teamImage = '/images/images (5).jpg';
  const bgImage = '/images/images (2).jpg';

  return (
    <section 
      id={id} 
      className="flex-shrink-0 w-screen h-full flex items-center justify-center p-6 relative overflow-hidden"
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
      
      <div className="container mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center p-4 md:p-10 relative z-10">
        <div className="w-full h-80 md:h-[500px] rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105">
          <LazyImage
            src={teamImage}
            alt="Equipo de Voltaic"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/10 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Sobre <span className="text-brand-yellow">VOLTAIC</span>
          </h2>
          
          <div className="space-y-4">
            <p className="text-neutral-200 leading-relaxed">
              En <span className="font-semibold text-brand-yellow">VOLTAIC</span>, lideramos la revolución de la energía solar fotovoltaica con un compromiso inquebrantable con la sostenibilidad y la innovación tecnológica. Nuestro equipo altamente calificado combina experiencia técnica con pasión por las energías renovables.
            </p>
            
            <p className="text-neutral-200 leading-relaxed">
              Desde nuestros inicios, nos hemos dedicado a diseñar e implementar soluciones energéticas personalizadas que no solo satisfacen las necesidades de nuestros clientes, sino que también contribuyen positivamente al medio ambiente.
            </p>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-brand-yellow/10 p-4 rounded-lg border-l-4 border-brand-yellow">
                <h3 className="font-bold text-brand-yellow text-lg">+10 Años</h3>
                <p className="text-sm text-neutral-300">De experiencia en el sector</p>
              </div>
              <div className="bg-brand-yellow/10 p-4 rounded-lg border-l-4 border-brand-yellow">
                <h3 className="font-bold text-brand-yellow text-lg">+500</h3>
                <p className="text-sm text-neutral-300">Proyectos completados</p>
              </div>
            </div>
            
            <button className="mt-6 bg-brand-yellow text-neutral-900 font-semibold py-3 px-6 rounded-full hover:bg-yellow-300 transition-colors duration-300">
              Conoce más sobre nosotros
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;