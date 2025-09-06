import React, { useRef, useState, useEffect } from 'react';
import LazyImage from './LazyImage';

// Importar imágenes locales
const benefitImages = {
  savings: '/images/images (2).jpg',
  cleanEnergy: '/images/images (5).jpg',
  propertyValue: '/images/images (6).jpg',
  background: '/images/modulos-fotovoltaicos-planta-solar.webp'
};

const benefits = [
  {
    title: "Ahorro en tu Factura",
    description: "Reduce drásticamente tus gastos en electricidad desde el primer día. Los paneles solares generan energía gratuita del sol, disminuyendo tu dependencia de la red eléctrica y protegiéndote contra el aumento de tarifas.",
    imageUrl: benefitImages.savings,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Energía Limpia y Sostenible",
    description: "Contribuye a la lucha contra el cambio climático reduciendo tu huella de carbono. La energía solar no produce emisiones de gases de efecto invernadero, ayudando a proteger el medio ambiente para las futuras generaciones.",
    imageUrl: benefitImages.cleanEnergy,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Incrementa el Valor de tu Propiedad",
    description: "Una instalación solar es una inversión inteligente que aumenta el valor de mercado de tu hogar o negocio. Las propiedades con sistemas fotovoltaicos son más atractivas para los compradores conscientes del ahorro y la sostenibilidad.",
    imageUrl: benefitImages.propertyValue,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  }
];

const VerticalNavDots: React.FC<{ count: number, activeIndex: number, onDotClick: (index: number) => void }> = ({ count, activeIndex, onDotClick }) => (
  <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 z-30">
    {Array.from({ length: count }).map((_, index) => (
      <button
        key={index}
        onClick={() => onDotClick(index)}
        className={`w-4 h-4 rounded-full transition-all duration-300 flex items-center justify-center ${
          activeIndex === index 
            ? 'bg-brand-yellow scale-125 ring-2 ring-offset-2 ring-brand-yellow/50' 
            : 'bg-white/50 hover:bg-white/80'
        }`}
        aria-label={`Ir al beneficio ${index + 1}`}
      >
        <span className={`w-2 h-2 rounded-full ${activeIndex === index ? 'bg-neutral-900' : 'bg-transparent'}`}></span>
      </button>
    ))}
  </div>
);

const BenefitCard: React.FC<{ 
  title: string; 
  description: string; 
  imageUrl: string; 
  isVisible: boolean;
  icon: React.ReactNode;
  index: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
}> = ({ 
  title, 
  description, 
  imageUrl, 
  isVisible, 
  icon,
  index,
  total,
  onNext,
  onPrev
}) => {
  const contentClasses = `transition-all duration-700 ease-out ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
  }`;
  
  return (
    <div className="h-full w-full flex-shrink-0 flex items-center justify-center p-4 md:p-8">
      <div className={`w-full max-w-6xl mx-auto ${contentClasses}`}>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <div className="md:flex">
            <div className="md:w-1/2 relative">
              <LazyImage
                src={imageUrl}
                alt={title}
                className="w-full h-64 md:h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:bg-gradient-to-r"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="w-16 h-16 rounded-xl bg-brand-yellow/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  <div className="text-brand-yellow">
                    {icon}
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
              </div>
            </div>
            
            <div className="p-8 md:w-1/2 bg-gradient-to-br from-neutral-900/90 to-neutral-800/90">
              <div className="h-full flex flex-col">
                <p className="text-neutral-300 leading-relaxed mb-8 flex-1">{description}</p>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="text-sm text-neutral-400">
                    {index + 1} / {total} Beneficios
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={onPrev}
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                      aria-label="Beneficio anterior"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      onClick={onNext}
                      className="w-10 h-10 rounded-full bg-brand-yellow hover:bg-yellow-400 text-neutral-900 flex items-center justify-center transition-colors"
                      aria-label="Siguiente beneficio"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BenefitsSection: React.FC<{ id?: string }> = ({ id = 'beneficios' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number>();
  const isScrolling = useRef(false);
  const startY = useRef(0);
  const touchStartY = useRef(0);

  const goToIndex = (index: number) => {
    if (index < 0) index = benefits.length - 1;
    if (index >= benefits.length) index = 0;
    setCurrentIndex(index);
    resetAutoScroll();
  };

  const nextSlide = () => goToIndex(currentIndex + 1);
  const prevSlide = () => goToIndex(currentIndex - 1);

  const resetAutoScroll = () => {
    if (autoScrollRef.current) {
      clearTimeout(autoScrollRef.current);
    }
    autoScrollRef.current = window.setTimeout(() => {
      nextSlide();
    }, 10000); // 10 segundos para cada diapositiva
  };

  const handleWheel = (e: WheelEvent) => {
    if (isScrolling.current) {
      e.preventDefault();
      return;
    }
    
    isScrolling.current = true;
    
    if (e.deltaY > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
    
    setTimeout(() => {
      isScrolling.current = false;
    }, 1000);
    
    e.preventDefault();
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isScrolling.current) return;
    
    const touchY = e.touches[0].clientY;
    const diff = touchStartY.current - touchY;
    
    if (Math.abs(diff) > 30) { // Umbral de desplazamiento reducido
      isScrolling.current = true;
      
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    }
    
    e.preventDefault();
  };

  // Efecto para manejar eventos de navegación
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    // Configurar listeners para navegación táctil y con rueda
    const options: AddEventListenerOptions = { passive: false };
    
    // Función auxiliar para manejar el evento de rueda
    const wheelHandler = (e: Event) => {
      const wheelEvent = e as WheelEvent;
      handleWheel(wheelEvent);
    };
    
    // Función auxiliar para manejar el evento táctil de inicio
    const touchStartHandler = (e: Event) => {
      const touchEvent = e as TouchEvent;
      handleTouchStart(touchEvent);
    };
    
    // Función auxiliar para manejar el evento táctil de movimiento
    const touchMoveHandler = (e: Event) => {
      const touchEvent = e as TouchEvent;
      handleTouchMove(touchEvent);
    };
    
    // Agregar event listeners
    section.addEventListener('wheel', wheelHandler, options);
    section.addEventListener('touchstart', touchStartHandler, options);
    section.addEventListener('touchmove', touchMoveHandler, options);
    
    // Iniciar auto-desplazamiento
    resetAutoScroll();
    
    // Limpieza al desmontar
    return () => {
      section.removeEventListener('wheel', wheelHandler);
      section.removeEventListener('touchstart', touchStartHandler);
      section.removeEventListener('touchmove', touchMoveHandler);
      
      if (autoScrollRef.current) {
        clearTimeout(autoScrollRef.current);
      }
    };
  }, [currentIndex]);

  // Efecto para actualizar el título de la pestaña
  useEffect(() => {
    document.title = `${benefits[currentIndex].title} | Voltaic Energía Solar`;
  }, [currentIndex]);

  return (
    <section 
      ref={sectionRef}
      id={id}
      className="flex-shrink-0 w-screen h-full relative overflow-hidden bg-neutral-900"
    >
      {/* Fondo con efecto de desenfoque */}
      <div className="absolute inset-0 w-full h-full">
        <LazyImage
          src={benefitImages.background}
          alt="Fondo de beneficios"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/95 to-neutral-800/95"></div>
      </div>
      
      <div className="relative z-10 h-full">
        <div className="h-full">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.title}
              title={benefit.title}
              description={benefit.description}
              imageUrl={benefit.imageUrl}
              isVisible={index === currentIndex}
              icon={benefit.icon}
              index={index}
              total={benefits.length}
              onNext={nextSlide}
              onPrev={prevSlide}
            />
          ))}
          
          <VerticalNavDots 
            count={benefits.length} 
            activeIndex={currentIndex} 
            onDotClick={goToIndex} 
          />
        </div>
        
        {/* Indicador de progreso */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div 
            className="h-full bg-brand-yellow transition-all duration-1000 ease-out"
            style={{
              width: `${((currentIndex + 1) / benefits.length) * 100}%`,
              transitionProperty: 'width'
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;