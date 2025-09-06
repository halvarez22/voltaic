import React from 'react';

interface CTASectionProps {
  id?: string;
  bgUrl?: string;
  onOpenModal?: () => void;
}

const LocationPinIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

const MailIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const PhoneIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
);

const CTASection: React.FC<CTASectionProps> = ({ id = 'contacto', bgUrl, onOpenModal }) => {
  return (
    <section 
      id={id} 
      className="flex-shrink-0 w-screen h-full flex items-center justify-center p-4 sm:p-6 relative bg-cover bg-center overflow-y-auto"
      style={{ backgroundImage: bgUrl ? `url('${bgUrl}')` : 'none' }}
    >
      <div className="absolute inset-0 bg-neutral-950/70 z-0"></div>
      <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-7xl px-4">
        
        <div className="text-center lg:text-left order-2 lg:order-1">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            ¿Listo para dar el siguiente paso?
          </h2>
          <p className="max-w-xl mx-auto lg:mx-0 text-neutral-300 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg leading-relaxed">
            Únete a la revolución solar. Contáctanos hoy mismo para una asesoría gratuita y descubre cómo la energía solar puede transformar tu futuro.
          </p>
          <button
            onClick={onOpenModal}
            className="bg-brand-yellow text-neutral-950 font-bold py-3 px-6 sm:px-8 rounded-full text-sm sm:text-base lg:text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 inline-block w-full sm:w-auto"
          >
            Solicitar Asesoría Gratuita
          </button>
        </div>

        <div className="bg-neutral-800/50 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-lg order-1 lg:order-2">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-brand-yellow uppercase tracking-wider">Oficina Matriz</h3>
            <address className="space-y-3 sm:space-y-4 text-neutral-300 not-italic">
                <div className="flex items-start">
                    <LocationPinIcon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-yellow mr-3 sm:mr-4 mt-1 flex-shrink-0" />
                    <p className="text-sm sm:text-base leading-relaxed">
                        Plaza Stadium<br/>
                        Blvd. Vasco de Quiroga 100 L13<br/>
                        esq. Blvd. López Mateos<br/>
                        Col. Martinica<br/>
                        León, Gto. C.P. 37500
                    </p>
                </div>
                <div className="flex items-center">
                    <MailIcon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-yellow mr-3 sm:mr-4 flex-shrink-0" />
                    <a href="mailto:contacto@ade-voltaic.mx" className="hover:text-brand-yellow transition-colors text-sm sm:text-base">
                        contacto@ade-voltaic.mx
                    </a>
                </div>
                <div className="flex items-center">
                    <PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-yellow mr-3 sm:mr-4 flex-shrink-0" />
                     <a href="tel:5532595798" className="hover:text-brand-yellow transition-colors text-sm sm:text-base">
                        55 3259 5798
                    </a>
                </div>
            </address>
        </div>

      </div>
    </section>
  );
};

export default CTASection;
