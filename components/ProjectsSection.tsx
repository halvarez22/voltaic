
import React, { useState } from 'react';
import LazyImage from './LazyImage';
import type { Project } from '../types';

// Importar imágenes locales
const projectImages = {
  industrial1: '/images/images (3).jpg',
  industrial2: '/images/images (4).jpg',
  municipal: '/images/images (6).jpg',
  government: '/images/modulos-fotovoltaicos-planta-solar.webp',
  commercial: '/images/images (1).jpg',
  commercial2: '/images/images.jpg'
};

const projects: Project[] = [
  {
    image: projectImages.industrial1,
    title: 'Andrea',
    location: 'León, Gto.',
    capacity: '1.5 MWp',
    type: 'Industrial',
    description: 'Instalación de paneles solares para fábrica de calzado',
    year: '2023'
  },
  {
    image: projectImages.industrial2,
    title: 'KIA Motors',
    location: 'Pesquería, N.L.',
    capacity: '2.3 MWp',
    type: 'Industrial',
    description: 'Sistema solar para planta de ensamblaje automotriz',
    year: '2022'
  },
  {
    image: projectImages.municipal,
    title: 'SAPAL',
    location: 'León, Gto.',
    capacity: '1.2 MWp',
    type: 'Municipal',
    description: 'Energía limpia para planta de tratamiento de aguas',
    year: '2023'
  },
  {
    image: projectImages.government,
    title: 'Fondos Guanajuato',
    location: 'Guanajuato, Gto.',
    capacity: '480 KWp',
    type: 'Gubernamental',
    description: 'Sistema fotovoltaico para edificios gubernamentales',
    year: '2022'
  },
  {
    image: projectImages.commercial,
    title: 'Gobierno de El Salvador',
    location: 'San Salvador, El Salvador',
    capacity: '3.0 MWp',
    type: 'Gubernamental',
    description: 'Proyecto de energía renovable a gran escala',
    year: '2023'
  },
  {
    image: projectImages.commercial2,
    title: 'Club Necaxa',
    location: 'Aguascalientes, Ags.',
    capacity: '600 KWp',
    type: 'Comercial',
    description: 'Estadio sustentable con energía solar',
    year: '2023'
  },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="h-80 sm:h-96 rounded-xl overflow-hidden shadow-lg bg-neutral-800 group transition-all duration-300 hover:shadow-2xl hover:shadow-brand-yellow/20">
    <div className="h-32 sm:h-48 overflow-hidden">
      <LazyImage
        src={project.image}
        alt={`Proyecto ${project.title}`}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">{project.title}</h3>
        <span className="bg-brand-yellow/20 text-brand-yellow text-xs font-semibold px-2 sm:px-3 py-1 rounded-full ml-2">
          {project.year}
        </span>
      </div>
      
      <p className="text-neutral-400 text-xs sm:text-sm mb-3 sm:mb-4">{project.location}</p>
      
      <p className="text-neutral-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
        {project.description}
      </p>
      
      <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-neutral-700">
        <div>
          <span className="text-xs text-neutral-400 block">Capacidad</span>
          <span className="text-brand-yellow font-bold text-sm sm:text-base">{project.capacity}</span>
        </div>
        <div className="bg-neutral-700/50 px-2 sm:px-3 py-1 rounded-full">
          <span className="text-xs text-neutral-300">{project.type}</span>
        </div>
      </div>
    </div>
  </div>
);


const ProjectsSection: React.FC<{ id?: string }> = ({ id = 'proyectos' }) => {
  const [filter, setFilter] = useState<string>('todos');
  
  // Filtrar proyectos según la categoría seleccionada
  const filteredProjects = filter === 'todos' 
    ? projects 
    : projects.filter(project => 
        project.type.toLowerCase() === filter.toLowerCase()
      );
  
  // Obtener categorías únicas para los filtros
  const categories = ['todos', ...new Set(projects.map(p => p.type))];
  
  return (
    <section 
      id={id} 
      className="flex-shrink-0 w-screen h-full flex flex-col items-center p-4 sm:p-6 relative overflow-hidden"
    >
      {/* Fondo con efecto de desenfoque */}
      <div className="absolute inset-0 w-full h-full">
        <LazyImage
          src="/images/modulos-fotovoltaicos-planta-solar.webp"
          alt="Fondo de proyectos"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-neutral-950/70"></div>
      </div>
      
      <div className="container mx-auto text-center relative z-10 flex flex-col h-full pt-16 sm:pt-20 md:pt-28 max-w-7xl px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight">
          Nuestros <span className="text-brand-yellow">Proyectos</span>
        </h2>
        
        <p className="max-w-3xl mx-auto text-neutral-300 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 px-4 leading-relaxed">
          Soluciones energéticas eficientes que demuestran nuestra capacidad y experiencia con clientes líderes en diversas industrias.
        </p>
        
        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                filter.toLowerCase() === category.toLowerCase()
                  ? 'bg-brand-yellow text-neutral-900'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Lista de proyectos */}
        <div className="flex-1 min-h-0 pb-8 sm:pb-12">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 h-full overflow-y-auto pr-2 sm:pr-4 vertical-scroll-section">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-neutral-400 text-sm sm:text-base">No hay proyectos en esta categoría.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
