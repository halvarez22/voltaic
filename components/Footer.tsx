import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-neutral-950/80 backdrop-blur-sm border-t border-neutral-700/50 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <div className="mb-2 sm:mb-0">
            <div className="text-lg font-black text-white tracking-wider">
              <span className="text-brand-yellow">VOLTAIC</span>
            </div>
          </div>
          <div className="text-sm text-neutral-300">
            <p>Powered by pai-b &copy; 2025 Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;