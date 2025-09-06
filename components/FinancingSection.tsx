
import React from 'react';
import LazyImage from './LazyImage';

const CheckIcon: React.FC<{className: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const FinancingSection: React.FC<{ id?: string }> = ({ id = 'financiamiento' }) => {
  // Usar imagen local
  const financeImage = '/images/images (1).jpg';
  
  return (
    <section 
      id={id}
      className="flex-shrink-0 w-screen h-full flex items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Fondo con efecto de desenfoque */}
      <div className="absolute inset-0 w-full h-full">
        <LazyImage
          src={financeImage}
          alt="Fondo de financiamiento"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/90 to-neutral-800/90"></div>
      </div>
      
      <div className="container mx-auto relative z-10 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Financiamiento <span className="text-brand-yellow">a tu Medida</span>
          </h2>
          <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
            En Voltaic, diseñamos soluciones financieras personalizadas que se adaptan a tus necesidades y presupuesto.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tarjeta PPA */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-brand-yellow/30 transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-brand-yellow/10 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">PPA (Power Purchase Agreement)</h3>
            <p className="text-neutral-300 mb-6">
              Pague solo por la energía que produce su sistema, sin inversión inicial y con una tarifa fija por debajo de las tarifas de CFE.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-brand-yellow mt-1 mr-2 flex-shrink-0" />
                <span className="text-neutral-300">Sin inversión inicial</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-brand-yellow mt-1 mr-2 flex-shrink-0" />
                <span className="text-neutral-300">Ahorros desde el primer día</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-brand-yellow mt-1 mr-2 flex-shrink-0" />
                <span className="text-neutral-300">Mantenimiento incluido</span>
              </li>
            </ul>
          </div>
          
          {/* Tarjeta Arrendamiento */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-brand-yellow/30 transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-brand-yellow/10 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Arrendamiento Puro</h3>
            <p className="text-neutral-300 mb-6">
              Obtenga todos los beneficios de la energía solar con pagos mensuales fijos y la opción de compra al final del contrato.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-brand-yellow mt-1 mr-2 flex-shrink-0" />
                <span className="text-neutral-300">Pagos fijos predecibles</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-brand-yellow mt-1 mr-2 flex-shrink-0" />
                <span className="text-neutral-300">Mantenimiento incluido</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-brand-yellow mt-1 mr-2 flex-shrink-0" />
                <span className="text-neutral-300">Opción de compra al final</span>
              </li>
            </ul>
          </div>
          
          {/* Tarjeta Crédito */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-brand-yellow/30 transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-brand-yellow/10 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Crédito Verde</h3>
            <p className="text-neutral-300 mb-6">
              Adquiera su sistema solar con un crédito a tasa preferencial y sea dueño de su sistema desde el primer día.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-brand-yellow mt-1 mr-2 flex-shrink-0" />
                <span className="text-neutral-300">Tasas preferenciales</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-brand-yellow mt-1 mr-2 flex-shrink-0" />
                <span className="text-neutral-300">Plazos flexibles</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-brand-yellow mt-1 mr-2 flex-shrink-0" />
                <span className="text-neutral-300">Beneficios fiscales</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-neutral-300 mb-6">
            ¿No estás seguro de cuál opción es la mejor para ti? Nuestros asesores están listos para ayudarte.
          </p>
          <button className="bg-brand-yellow text-neutral-900 font-semibold py-3 px-8 rounded-full hover:bg-yellow-300 transition-colors duration-300">
            Solicitar asesoría
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinancingSection;