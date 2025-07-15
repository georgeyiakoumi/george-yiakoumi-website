import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(Flip, ScrollTrigger);

// Used by PageTransition.js for smooth page transitions
export const pageTransition = {
  // Animate page entrance
  enter: (element, onComplete) => {
    if (!element) return;
    
    // Set initial state immediately to prevent flicker
    gsap.set(element, { opacity: 0 });
    
    gsap.to(element, { 
      opacity: 1, 
      duration: 0.5, 
      ease: 'power3.inOut',
      onComplete 
    });
  },
  
  // Animate page exit
  exit: (element, onComplete) => {
    if (!element) return;
    
    gsap.to(element, {
      opacity: 0,
      duration: 0.5,
      ease: 'power3.inOut',
      onComplete
    });
  }
};

// Used by Modal.js for modal enter/exit animations
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

// Used by About.js for seamless company logo carousel animation
export const companiesCarouselAnimation = () => {
  // Create seamless infinite loop - move by 1/3 since we have 3 sets
  return gsap.to(".companies-marquee", {
    x: "-33.333%",
    repeat: -1,
    duration: 20,
    ease: "linear"
  });
};

// Used by Portfolio.js for project cards entrance animation
export const projectCardsEntranceAnimation = (elements) => {
  // Animate project cards fading in with stagger effect
  return gsap.from(elements, { 
    duration: 0.5, 
    opacity: 0, 
    stagger: 0.25, 
    ease: 'power3.inOut' 
  });
};

// Used by Portfolio.js for smooth layout transitions between grid and list views
export const flipLayoutTransition = (elements, callback) => {
  // Capture current state of elements before layout change
  const state = Flip.getState(elements);
  
  // Execute the callback that changes the layout
  if (callback) callback();
  
  // Animate from previous state to new state on next frame
  requestAnimationFrame(() => {
    Flip.from(state, {
      duration: 0.3,
      ease: "power2.inOut",
      absolute: true, // Use absolute positioning during transition
      onComplete: () => {
        // Clear any transform properties after animation
        gsap.set(elements, { clearProps: "all" });
      }
    });
  });
};

