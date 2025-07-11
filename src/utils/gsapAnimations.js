import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animation utilities for GSAP
export const pageTransition = {
  // Animate page entrance
  enter: (element, onComplete) => {
    if (!element) return;
    
    // Set initial state immediately to prevent flicker
    gsap.set(element, { opacity: 0 });
    
    gsap.to(element, { 
      opacity: 1, 
      duration: 0.5, 
      ease: 'power2.inOut',
      onComplete 
    });
  },
  
  // Animate page exit
  exit: (element, onComplete) => {
    if (!element) return;
    
    gsap.to(element, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete
    });
  }
};

export const modalAnimations = {
  // Animate modal entrance
  enter: (overlay, content) => {
    if (!overlay || !content) return;
    
    gsap.fromTo(overlay, 
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    
    gsap.fromTo(content,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
    );
  },
  
  // Animate modal exit
  exit: (overlay, content, onComplete) => {
    if (!overlay || !content) return;
    
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    });
    
    gsap.to(content, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: 'power2.in',
      onComplete
    });
  }
};

export const fadeInUp = (element, delay = 0) => {
  if (!element) return;
  
  // Set initial state immediately to prevent flicker
  gsap.set(element, { opacity: 0, y: 20 });
  
  gsap.to(element, { 
    opacity: 1, 
    y: 0, 
    duration: 0.6, 
    delay,
    ease: 'power2.out' 
  });
};

export const fadeIn = (element, delay = 0) => {
  if (!element) return;
  
  // Set initial state immediately to prevent flicker
  gsap.set(element, { opacity: 0 });
  
  gsap.to(element, { 
    opacity: 1, 
    duration: 0.4, 
    delay,
    ease: 'power2.out' 
  });
};

export const createStickyHeaderAnimation = (headerElement, triggerElement) => {
  if (!headerElement || !triggerElement) {
    console.log('Missing elements:', { headerElement, triggerElement });
    return;
  }

  console.log('Setting up sticky header animation');
  console.log('Header element:', headerElement);
  console.log('Trigger element:', triggerElement);

  // Create the scroll trigger animation - use trigger element's bottom edge
  const scrollTrigger = ScrollTrigger.create({
    trigger: triggerElement,
    start: 'bottom top+=100',
    end: 'bottom top+=100',
    markers: true, // Add markers for debugging
    onEnter: () => {
      console.log('Header becoming sticky');
      
      // Add sticky class and use !important styles
      headerElement.classList.add('sticky-header');
      headerElement.style.setProperty('position', 'sticky', 'important');
      headerElement.style.setProperty('grid-column', '1 / -1', 'important');
      headerElement.style.setProperty('padding-top', 'var(--gap)', 'important');
      headerElement.style.setProperty('background', 'var(--colour-background-raised)', 'important');
      headerElement.style.setProperty('z-index', '31', 'important');
      headerElement.style.setProperty('width', '100%', 'important');
      headerElement.style.setProperty('gap', '0', 'important');
      headerElement.style.setProperty('border-bottom', '0.0613rem solid var(--colour-stroke-strong)', 'important');
      headerElement.style.setProperty('top', '0', 'important');
      
      // Animate h2 font size
      const h1 = headerElement.querySelector('h1');
      if (h1) {
        h1.style.setProperty('font-size', '2rem', 'important');
      }
      
      // Hide p elements
      const pElements = headerElement.querySelectorAll('p');
      pElements.forEach(p => {
        p.style.setProperty('display', 'none', 'important');
      });
    },
    onLeave: () => {
      console.log('Header reverting to normal');
      
      // Remove sticky class and clear all styles
      headerElement.classList.remove('sticky-header');
      headerElement.style.removeProperty('position');
      headerElement.style.removeProperty('grid-column');
      headerElement.style.removeProperty('padding-top');
      headerElement.style.removeProperty('background');
      headerElement.style.removeProperty('z-index');
      headerElement.style.removeProperty('width');
      headerElement.style.removeProperty('gap');
      headerElement.style.removeProperty('border-bottom');
      headerElement.style.removeProperty('top');
      
      // Revert h2 font size
      const h2 = headerElement.querySelector('h2');
      if (h2) {
        h2.style.removeProperty('font-size');
      }
      
      // Show p elements
      const pElements = headerElement.querySelectorAll('p');
      pElements.forEach(p => {
        p.style.removeProperty('display');
      });
    }
  });

  return scrollTrigger;
};