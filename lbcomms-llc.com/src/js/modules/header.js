/**
 * Header Manager Module
 * Handles header resize on scroll, hamburger menu, and swipe-down arrow
 */

import { SELECTORS, SCROLL, CSS_CLASSES } from '../config/constants.js';
import { $, $$, ifExists } from '../utils/dom.js';

export class HeaderManager {
  constructor() {
    this.header = $(SELECTORS.HEADER);
    this.hamburgers = $$(SELECTORS.HAMBURGER);
    this.slideMenu = $(SELECTORS.SLIDE_MENU);
    this.menuOverlay = $(SELECTORS.MENU_OVERLAY);
    this.closeMenu = $(SELECTORS.CLOSE_MENU);
    this.swipeDownArrow = $(SELECTORS.SWIPE_DOWN);
  }

  /**
   * Initialize all header functionality
   */
  init() {
    if (!this.header) {
      console.warn('Header element not found');
      return;
    }

    this.setupScrollListener();
    this.setupHamburgerMenu();
    this.setupSwipeDownArrow();
    this.adjustHeader(); // Set initial state
  }

  /**
   * Adjust header size based on scroll position
   */
  adjustHeader() {
    if (window.scrollY === 0) {
      this.header.classList.add(CSS_CLASSES.LARGE);
      this.header.classList.remove(CSS_CLASSES.SMALL);
    } else {
      this.header.classList.add(CSS_CLASSES.SMALL);
      this.header.classList.remove(CSS_CLASSES.LARGE);
    }
  }

  /**
   * Setup scroll event listener for header resize
   */
  setupScrollListener() {
    window.addEventListener('scroll', () => this.adjustHeader());
  }

  /**
   * Setup hamburger menu toggle functionality
   */
  setupHamburgerMenu() {
    if (!this.slideMenu) {
      console.warn('Slide menu element not found');
      return;
    }

    // Open menu
    this.hamburgers.forEach((button) => {
      button.addEventListener('click', () => {
        this.openMenu();
      });
    });

    // Close menu with close button
    ifExists(this.closeMenu, (btn) => {
      btn.addEventListener('click', () => {
        this.closeMenuHandler();
      });
    });

    // Close menu with overlay click
    ifExists(this.menuOverlay, (overlay) => {
      overlay.addEventListener('click', () => {
        this.closeMenuHandler();
      });
    });
  }

  /**
   * Open the mobile menu
   */
  openMenu() {
    this.slideMenu.classList.add(CSS_CLASSES.ACTIVE);
    if (this.menuOverlay) {
      this.menuOverlay.classList.add(CSS_CLASSES.ACTIVE);
    }
  }

  /**
   * Close the mobile menu
   */
  closeMenuHandler() {
    this.slideMenu.classList.remove(CSS_CLASSES.ACTIVE);
    if (this.menuOverlay) {
      this.menuOverlay.classList.remove(CSS_CLASSES.ACTIVE);
    }
  }

  /**
   * Setup swipe-down arrow hide/show on scroll
   */
  setupSwipeDownArrow() {
    ifExists(this.swipeDownArrow, (arrow) => {
      window.addEventListener('scroll', () => {
        if (window.scrollY > SCROLL.SWIPE_DOWN_HIDE) {
          arrow.classList.add(CSS_CLASSES.HIDDEN);
        } else {
          arrow.classList.remove(CSS_CLASSES.HIDDEN);
        }
      });
    });
  }
}
