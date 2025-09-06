
import React, { useRef, useState, useEffect, useMemo, useLayoutEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import BenefitsSection from './components/BenefitsSection';
import FinancingSection from './components/FinancingSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import ContactFormModal from './components/ContactFormModal';
import Chatbot from './components/Chatbot';
import ChatbotButton from './components/ChatbotButton';
import WhatsAppButton from './components/WhatsAppButton';
import QuoteCalculator from './components/QuoteCalculator';
import NavigationHint from './components/NavigationHint';

const sectionsInfo = [
  { id: 'hero', Component: Hero },
  { id: 'nosotros', Component: AboutSection },
  { id: 'servicios', Component: ServicesSection },
  { id: 'proyectos', Component: ProjectsSection },
  { id: 'beneficios', Component: BenefitsSection },
  { id: 'financiamiento', Component: FinancingSection },
  { id: 'contacto', Component: CTASection },
];

const easeOutBounce = (x: number): number => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (x < 1 / d1) {
        return n1 * x * x;
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
};

const App: React.FC = () => {
  const mainContainerRef = useRef<HTMLElement>(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0 });
  const isAnimating = useRef(false);
  const animationFrameId = useRef<number | null>(null);
  const [activeSection, setActiveSection] = useState(sectionsInfo[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);
  const handleOpenChatbot = useCallback(() => setIsChatbotOpen(true), []);
  const handleCloseChatbot = useCallback(() => setIsChatbotOpen(false), []);
  const handleOpenQuote = useCallback(() => setIsQuoteOpen(true), []);
  const handleCloseQuote = useCallback(() => setIsQuoteOpen(false), []);

  const renderedSections = useMemo(() => {
    const allSections = [
      { ...sectionsInfo[sectionsInfo.length - 1], id: `${sectionsInfo[sectionsInfo.length - 1].id}-clone`, key: `${sectionsInfo[sectionsInfo.length - 1].id}-clone` },
      ...sectionsInfo.map(s => ({ ...s, key: s.id })),
      { ...sectionsInfo[0], id: `${sectionsInfo[0].id}-clone`, key: `${sectionsInfo[0].id}-clone` },
    ];
    
    return allSections.map(({ id, Component }) => (
      <section 
        key={id} 
        id={`${id}-section`} 
        className="flex-shrink-0 w-screen h-screen overflow-hidden relative"
      >
        {id === 'contacto' || id === 'contacto-clone' ? (
          <Component id={id} onOpenModal={handleOpenModal} onOpenQuote={handleOpenQuote} />
        ) : id === 'hero' || id === 'hero-clone' ? (
          <Component id={id} onCTAClick={handleOpenQuote} />
        ) : (
          <Component id={id} />
        )}
      </section>
    ));
  }, [handleOpenModal, handleOpenQuote]);

  const animateScroll = useCallback((target: number, duration: number, onComplete?: () => void) => {
    const mainEl = mainContainerRef.current;
    if (!mainEl) return;
    
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    isAnimating.current = true;
    const start = mainEl.scrollLeft;
    const change = target - start;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const easedProgress = easeOutBounce(progress);
        mainEl.scrollLeft = start + change * easedProgress;

        if (timeElapsed < duration) {
            animationFrameId.current = requestAnimationFrame(animation);
        } else {
            mainEl.scrollLeft = target;
            isAnimating.current = false;
            animationFrameId.current = null;
            if (onComplete) {
                onComplete();
            }
        }
    };
    animationFrameId.current = requestAnimationFrame(animation);
  }, []);

  const handleNavClick = (sectionId: string) => {
    const sectionIndex = sectionsInfo.findIndex(s => s.id === sectionId);
    if (sectionIndex !== -1 && mainContainerRef.current) {
        const targetScrollLeft = mainContainerRef.current.clientWidth * (sectionIndex + 1);
        animateScroll(targetScrollLeft, 800);
    }
  };
  
  useLayoutEffect(() => {
    const mainEl = mainContainerRef.current;
    if (mainEl) {
      mainEl.scrollLeft = mainEl.clientWidth;
    }
  }, []);

  useEffect(() => {
    const mainEl = mainContainerRef.current;
    if (!mainEl) return;

    const onMouseDown = (e: MouseEvent) => {
      if (isAnimating.current) return;

      const target = e.target as HTMLElement;
      const verticalSection = target.closest<HTMLElement>('.vertical-scroll-section');

      if (verticalSection) {
          const hasScrollbar = verticalSection.scrollHeight > verticalSection.clientHeight;
          if (hasScrollbar) {
              const scrollbarWidth = verticalSection.offsetWidth - verticalSection.clientWidth;
              const rect = verticalSection.getBoundingClientRect();
              if (e.clientX >= rect.right - scrollbarWidth) {
                  return;
              }
          }
      }

      dragState.current.isDown = true;
      mainEl.classList.add('active:cursor-grabbing');
      mainEl.style.userSelect = 'none';
      dragState.current.startX = e.pageX - mainEl.offsetLeft;
      dragState.current.scrollLeft = mainEl.scrollLeft;
      mainEl.style.scrollBehavior = 'auto';
    };

    const onMouseLeaveOrUp = () => {
      if (!dragState.current.isDown) return;
      
      dragState.current.isDown = false;
      mainEl.classList.remove('active:cursor-grabbing');
      mainEl.style.userSelect = 'auto';

      const { scrollLeft, clientWidth } = mainEl;
      const pageIndex = Math.round(scrollLeft / clientWidth);
      const targetScrollLeft = pageIndex * clientWidth;
      
      const onAnimationComplete = () => {
        const numRealSections = sectionsInfo.length;
        const currentPage = Math.round(mainEl.scrollLeft / clientWidth);

        if (currentPage === 0) {
            mainEl.style.scrollBehavior = 'auto';
            mainEl.scrollLeft = clientWidth * numRealSections;
            setTimeout(() => { mainEl.style.scrollBehavior = 'smooth'; }, 50);
        } else if (currentPage === numRealSections + 1) {
            mainEl.style.scrollBehavior = 'auto';
            mainEl.scrollLeft = clientWidth;
            setTimeout(() => { mainEl.style.scrollBehavior = 'smooth'; }, 50);
        }
      };
      
      animateScroll(targetScrollLeft, 800, onAnimationComplete);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragState.current.isDown) return;
      e.preventDefault();
      const x = e.pageX - mainEl.offsetLeft;
      const walk = (x - dragState.current.startX) * 2;
      mainEl.scrollLeft = dragState.current.scrollLeft - walk;
    };
    
    const onScroll = () => {
        const { scrollLeft, clientWidth } = mainEl;
        if (clientWidth === 0) return;

        const activePageIndex = Math.round(scrollLeft / clientWidth);
        const activeIndex = activePageIndex - 1;
        const safeIndex = Math.max(0, Math.min(activeIndex, sectionsInfo.length - 1));
        
        let currentSectionId = sectionsInfo[safeIndex].id;
        
        if (activePageIndex === 0) {
            currentSectionId = sectionsInfo[sectionsInfo.length - 1].id;
        } else if (activePageIndex === sectionsInfo.length + 1) {
            currentSectionId = sectionsInfo[0].id;
        }
        
        setActiveSection(currentSectionId);
    };

    mainEl.addEventListener('mousedown', onMouseDown);
    mainEl.addEventListener('mouseleave', onMouseLeaveOrUp);
    mainEl.addEventListener('mouseup', onMouseLeaveOrUp);
    mainEl.addEventListener('mousemove', onMouseMove);
    mainEl.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      mainEl.removeEventListener('mousedown', onMouseDown);
      mainEl.removeEventListener('mouseleave', onMouseLeaveOrUp);
      mainEl.removeEventListener('mouseup', onMouseLeaveOrUp);
      mainEl.removeEventListener('mousemove', onMouseMove);
      mainEl.removeEventListener('scroll', onScroll);
    };
  }, [animateScroll]);

  return (
    <div className="min-h-screen w-screen bg-neutral-950 font-sans flex flex-col relative overflow-hidden">
       <NavigationHint />
       <ContactFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
       <Chatbot isOpen={isChatbotOpen} onClose={handleCloseChatbot} />
       <QuoteCalculator isOpen={isQuoteOpen} onClose={handleCloseQuote} />
       <ChatbotButton onClick={handleOpenChatbot} />
       <WhatsAppButton phoneNumber="5532595798" />
       <div className="relative z-20">
         <Header onNavClick={handleNavClick} activeSection={activeSection} />
      </div>
      <main ref={mainContainerRef} id="main-container" className="flex-1 flex w-full overflow-x-auto cursor-grab relative z-10 touch-pan-x">
        {renderedSections}
      </main>
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
};

export default App;
