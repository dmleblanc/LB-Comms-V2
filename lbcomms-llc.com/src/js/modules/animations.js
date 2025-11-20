/**
 * Animations Manager Module
 * Handles scroll-based animations and back-to-top button
 */

import { SELECTORS, ANIMATION, SCROLL, CSS_CLASSES } from '../config/constants.js';
import { $, $$, ifExists } from '../utils/dom.js';

/**
 * Manages scroll-triggered animations for services and list items
 */
export class AnimationsManager {
  constructor() {
    this.services = $$(SELECTORS.SERVICES);
    this.listItems = $$(SELECTORS.LIST_ITEMS);
  }

  /**
   * Initialize all animations
   */
  init() {
    this.setupIntersectionObserver();
    this.setupListItemAnimations();
  }

  /**
   * Setup Intersection Observer for service cards
   * Adds 'visible' class when elements enter viewport
   */
  setupIntersectionObserver() {
    if (this.services.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(CSS_CLASSES.VISIBLE);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: ANIMATION.INTERSECTION_THRESHOLD,
      }
    );

    this.services.forEach((service) => observer.observe(service));
  }

  /**
   * Setup staggered animations for list items
   * Excludes footer list items
   */
  setupListItemAnimations() {
    this.listItems.forEach((item, index) => {
      if (!item.closest('footer')) {
        setTimeout(() => {
          item.classList.add(CSS_CLASSES.VISIBLE);
        }, index * ANIMATION.LIST_ITEM_DELAY);
      }
    });
  }
}

/**
 * Manages back-to-top button functionality
 */
export class BackToTopManager {
  constructor() {
    this.button = $(SELECTORS.BACK_TO_TOP);
  }

  /**
   * Initialize back-to-top button
   */
  init() {
    ifExists(this.button, (btn) => {
      window.addEventListener('scroll', () => this.handleScroll());
      btn.addEventListener('click', () => this.scrollToTop());
    });
  }

  /**
   * Show/hide button based on scroll position
   */
  handleScroll() {
    if (window.scrollY > SCROLL.BACK_TO_TOP_SHOW) {
      this.button.style.display = 'block';
      this.button.style.opacity = '1';
    } else {
      this.button.style.opacity = '0';
      setTimeout(() => {
        this.button.style.display = 'none';
      }, ANIMATION.BACK_TO_TOP_FADE_DURATION);
    }
  }

  /**
   * Smooth scroll to top of page
   */
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
