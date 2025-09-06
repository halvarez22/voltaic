
import React, { useState, useEffect } from 'react';

const navLinks = [
  { name: 'Inicio', id: 'hero' },
  { name: 'Nosotros', id: 'nosotros' },
  { name: 'Servicios', id: 'servicios' },
  { name: 'Proyectos', id: 'proyectos' },
  { name: 'Beneficios', id: 'beneficios' },
  { name: 'Financiamiento', id: 'financiamiento' },
  { name: 'Contacto', id: 'contacto' },
];

interface HeaderProps {
    onNavClick: (sectionId: string) => void;
    activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ onNavClick, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // A simple effect to add background on initial interaction, assuming any scroll is a scroll.
    // In our horizontal layout, any scrollLeft > 0 means we've moved from the start.
    const mainContainer = document.getElementById('main-container');
    const handleScroll = () => {
      if (mainContainer) {
        setHasScrolled(mainContainer.scrollLeft > 20);
      }
    };
    
    mainContainer?.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => mainContainer?.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
    hasScrolled ? 'bg-neutral-950/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
  }`;

  const handleLinkClick = (id: string) => {
    onNavClick(id);
    setIsMenuOpen(false);
  }

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button onClick={() => handleLinkClick('hero')} className="focus:outline-none">
          <img 
            src="/images/logo-voltaic.png?v=1" 
            alt="Voltaic - Energía Solar" 
            className="h-8 sm:h-10 w-auto object-contain hover:opacity-80 transition-opacity duration-300"
          />
        </button>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name} 
              onClick={() => handleLinkClick(link.id)}
              className={`transition-colors duration-300 font-semibold ${
                activeSection === link.id
                  ? 'text-brand-yellow'
                  : 'text-neutral-300 hover:text-brand-yellow'
              }`}
              aria-current={activeSection === link.id ? 'page' : undefined}
            >
              {link.name}
            </button>
          ))}
        </nav>
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-white focus:outline-none" 
            aria-label="Abrir menú" 
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-neutral-800">
          <nav className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              <button
                key={link.name} 
                onClick={() => handleLinkClick(link.id)}
                className={`text-neutral-300 hover:text-brand-yellow transition-colors duration-300 font-semibold text-lg ${
                  activeSection === link.id ? 'text-brand-yellow' : ''
                }`}
                 aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
