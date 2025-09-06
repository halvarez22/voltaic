import React from 'react';
import type { Service } from '../types';

// --- NEW ICONS ---

const BlueprintIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.17 16.83a1 1 0 0 0-1.17-1.17H12v-5h2a1 1 0 0 0 0-2H9.83a1 1 0 0 0-1.17 1.17v10Z"/>
        <path d="M12 11.5a2.5 2.5 0 0 1 5 0V13a1 1 0 0 0 1 1h1.5a1 1 0 0 0 1-1v-1.5a5.5 5.5 0 0 0-11 0V13a1 1 0 0 0 1 1h1.5a1 1 0 0 0 1-1z"/>
        <path d="M3.5 2.5a1 1 0 0 0-1 1v17a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-17a1 1 0 0 0-1-1zM19 19H5V5h14z"/>
    </svg>
);

const FactoryIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7-6H4a2 2 0 0 0-2 2Z"></path><path d="M12 18h-2v-4h2v4Z"></path><path d="M12 10V8"></path><path d="M16 18h-2v-2h2v2Z"></path>
    </svg>
);

const HardHatIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" /><path d="M12 12V7a2 2 0 0 1 4 0" /><path d="M4 19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
    </svg>
);

const DollarSignIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
);

const WrenchIcon: React.FC<{className: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
  </svg>
);

const ChartIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
    </svg>
);


const services: Service[] = [
  {
    icon: BlueprintIcon,
    title: 'Desarrollo de Proyectos Solares',
    description: 'Ofrecemos desarrollo de proyectos llave en mano de principio a fin, gestionando la adquisición de terrenos, permisos, interconexión y financiamiento.'
  },
  {
    icon: FactoryIcon,
    title: 'EPC Solar',
    description: 'Como contratista EPC (Ingeniería, Adquisiciones y Construcción), gestionamos su proyecto de forma integral, desde el diseño y la ingeniería hasta la puesta en marcha final.'
  },
  {
    icon: HardHatIcon,
    title: 'Instalación Solar',
    description: 'Nuestros equipos expertos se encargan de instalaciones de cualquier envergadura, ya sean residenciales o a gran escala, siempre con los más altos estándares de calidad y seguridad.'
  },
  {
    icon: DollarSignIcon,
    title: 'Financiamiento Solar',
    description: 'Ofrecemos múltiples opciones como PPA, arrendamientos y préstamos para reducir costos iniciales y maximizar el retorno de su inversión.'
  },
  {
    icon: WrenchIcon,
    title: 'Mantenimiento Solar',
    description: 'Brindamos servicios integrales de Operación y Mantenimiento (O&M) para monitorear, realizar mantenimiento preventivo y asegurar el máximo rendimiento de su sistema.'
  },
  {
      icon: ChartIcon,
      title: 'Consultoría y Viabilidad',
      description: 'Analizamos su sitio y sus necesidades energéticas para crear una estrategia solar a medida y garantizar la viabilidad del proyecto.'
  }
];

const ServicesSection: React.FC<{ id?: string; bgUrl?: string }> = ({ id = 'servicios', bgUrl }) => {
  return (
    <section 
      id={id} 
      className="flex-shrink-0 w-screen h-full flex flex-col items-center justify-center p-4 sm:p-6 relative bg-cover bg-center overflow-y-auto"
      style={{ backgroundImage: bgUrl ? `url('${bgUrl}')` : 'none' }}
    >
      <div className="absolute inset-0 bg-neutral-950/70 z-0"></div>
      <div className="container mx-auto text-center relative z-10 max-w-7xl px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
          Todos los Servicios de Energía Solar que tu Negocio Necesita
        </h2>
        <p className="max-w-3xl mx-auto text-neutral-300 text-base sm:text-lg mb-8 sm:mb-12 leading-relaxed">
          VOLTAIC provee todos los servicios que tu negocio necesita para capitalizar las ventajas de la energía solar.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="bg-neutral-800/50 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-lg flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:bg-neutral-800/80 cursor-pointer"
              >
                <Icon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-brand-yellow mb-3 sm:mb-4 lg:mb-5" />
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white leading-tight">{service.title}</h3>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;