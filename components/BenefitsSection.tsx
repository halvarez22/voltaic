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


const BenefitsSection: React.FC<{ id?: string }> = ({ id = 'beneficios' }) => {
  // Mostrar solo el primer beneficio (Ahorro en tu Factura) permanentemente
  const currentBenefit = benefits[0]; // Siempre mostrar "Ahorro en tu Factura"

  return (
    <section 
      id={id}
      className="flex-shrink-0 w-screen h-full flex items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-neutral-900"
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
      
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <div className="md:flex">
            <div className="md:w-1/2 relative">
              <LazyImage
                src={currentBenefit.imageUrl}
                alt={currentBenefit.title}
                className="w-full h-64 md:h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:bg-gradient-to-r"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="w-16 h-16 rounded-xl bg-brand-yellow/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  <div className="text-brand-yellow">
                    {currentBenefit.icon}
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">{currentBenefit.title}</h3>
              </div>
            </div>
            
            <div className="p-6 md:p-8 md:w-1/2 bg-gradient-to-br from-neutral-900/90 to-neutral-800/90">
              <div className="h-full flex flex-col">
                <p className="text-neutral-300 leading-relaxed mb-6 sm:mb-8 flex-1 text-sm sm:text-base">
                  {currentBenefit.description}
                </p>
                
                {/* Información adicional sobre ahorro */}
                <div className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-lg p-4 mb-6">
                  <h4 className="text-brand-yellow font-bold text-lg mb-2">💰 Ahorro Garantizado</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-300">Ahorro mensual:</span>
                      <span className="text-brand-yellow font-bold">Hasta 90%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-300">Recuperación:</span>
                      <span className="text-brand-yellow font-bold">3-5 años</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-300">Garantía:</span>
                      <span className="text-brand-yellow font-bold">25 años</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-300">ROI:</span>
                      <span className="text-brand-yellow font-bold">300-500%</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-neutral-400 mb-2">
                    Beneficio Principal
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full">
                    <div className="h-full bg-brand-yellow rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;