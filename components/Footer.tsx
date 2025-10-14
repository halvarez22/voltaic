import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-neutral-950/80 backdrop-blur-sm border-t border-neutral-700/50 z-50">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left space-y-1 sm:space-y-0">
          <div className="mb-1 sm:mb-0">
            <div className="text-base sm:text-lg font-black text-white tracking-wider">
              <span className="text-brand-yellow">VOLTAIC</span>
            </div>
          </div>
          <div className="text-xs sm:text-sm text-neutral-300">
            <p>Powered by pai-b &copy; 2025 Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;