/**
 * Application Constants
 * Centralized configuration for selectors, thresholds, and settings
 */

// DOM Selectors
export const SELECTORS = {
  HEADER: 'header',
  HAMBURGER: '.hamburger',
  SLIDE_MENU: '.slide-menu',
  MENU_OVERLAY: '.menu-overlay',
  CLOSE_MENU: '.close-menu',
  SWIPE_DOWN: '.swipe-down',
  CAROUSEL: '.carousel',
  CAROUSEL_IMAGES: '.carousel-images',
  LEFT_ARROW: '.left-arrow',
  RIGHT_ARROW: '.right-arrow',
  BACK_TO_TOP: '#back-to-top',
  CONTACT_FORM: '.contact-form-wrapper',
  SPECIALTY_TOGGLE: '.toggle-details',
  SPECIALTY_ITEM: '.specialty-item',
  SPECIALTY_DETAILS: '.specialty-details',
  SERVICES: '.service',
  LIST_ITEMS: 'ul li',
};

// Scroll Thresholds
export const SCROLL = {
  SWIPE_DOWN_HIDE: 100,
  BACK_TO_TOP_SHOW: 300,
};

// Carousel Configuration
export const CAROUSEL_CONFIG = {
  DRAG_THRESHOLD: 5,
  SCROLL_SPEED: 0.5,
  ARROW_SCROLL_AMOUNT: 200,
  DRAG_MULTIPLIER: 3,
  INERTIA_DECELERATION: 0.95,
  INERTIA_MIN_VELOCITY: 0.1,
  INERTIA_VELOCITY_MULTIPLIER: 20,
  IMAGE_BRIGHTNESS_HOVER: 'brightness(1)',
  IMAGE_BRIGHTNESS_DEFAULT: 'brightness(0.7)',
};

// Animation Timing
export const ANIMATION = {
  LIST_ITEM_DELAY: 200,
  INTERSECTION_THRESHOLD: 0.1,
  FORM_BLUR_DELAY: 100,
  BACK_TO_TOP_FADE_DURATION: 300,
};

// Tableau Configuration
export const TABLEAU = {
  VIZ_IDS: ['viz1723553823794', 'viz1723481853268'],
  ASPECT_RATIO: 16 / 9,
  SCRIPT_SRC: 'https://public.tableau.com/javascripts/api/viz_v1.js',
};

// CSS Classes
export const CSS_CLASSES = {
  LARGE: 'large',
  SMALL: 'small',
  ACTIVE: 'active',
  HIDDEN: 'hidden',
  VISIBLE: 'visible',
  EXPANDED: 'expanded',
  FOCUSED: 'focused',
};
