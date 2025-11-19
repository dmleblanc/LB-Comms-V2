/**
 * LB Communications Website
 * Main Application Entry Point
 *
 * This module initializes all application features when the DOM is ready.
 */

import { HeaderManager } from './modules/header.js';
import { CarouselManager } from './modules/carousel.js';
import { FormsManager } from './modules/forms.js';
import { AnimationsManager, BackToTopManager } from './modules/animations.js';
import { SpecialtiesManager } from './modules/specialties.js';
import { TableauManager } from './modules/tableau.js';
import { onReady } from './utils/dom.js';

/**
 * Initialize all application modules
 * Each module checks for element existence and gracefully handles missing elements
 */
function initApp() {
  // Header & Navigation
  const header = new HeaderManager();
  header.init();

  // Image Carousel (index.html only)
  const carousel = new CarouselManager();
  carousel.init();

  // Contact Forms
  const forms = new FormsManager();
  forms.init();

  // Scroll Animations
  const animations = new AnimationsManager();
  animations.init();

  // Back to Top Button
  const backToTop = new BackToTopManager();
  backToTop.init();

  // Expandable Specialty Cards
  const specialties = new SpecialtiesManager();
  specialties.init();

  // Tableau Visualizations (about.html only)
  const tableau = new TableauManager();
  tableau.init();

  // Log initialization in development mode
  if (import.meta.env.DEV) {
    console.log('✅ LB Comms application initialized');
  }
}

// Initialize when DOM is ready
onReady(initApp);
