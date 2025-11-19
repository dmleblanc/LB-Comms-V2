/**
 * Forms Manager Module
 * Handles contact form focus effects and suggestion box animation
 */

import { SELECTORS, ANIMATION, CSS_CLASSES } from '../config/constants.js';
import { $, $$ } from '../utils/dom.js';

export class FormsManager {
  constructor() {
    this.formContainer = $(SELECTORS.CONTACT_FORM);
    this.inputs = this.formContainer ? $$('input, textarea', this.formContainer) : [];
  }

  /**
   * Initialize form functionality
   */
  init() {
    if (!this.formContainer || this.inputs.length === 0) {
      return; // Form doesn't exist on this page
    }

    this.setupFocusHandlers();
  }

  /**
   * Setup focus/blur handlers for form inputs
   * Shows suggestion box on desktop when form is focused
   */
  setupFocusHandlers() {
    this.inputs.forEach((input) => {
      input.addEventListener('focus', () => {
        this.formContainer.classList.add(CSS_CLASSES.FOCUSED);
      });

      input.addEventListener('blur', () => {
        // Check if any input is still focused after a short delay
        setTimeout(() => {
          if (!this.formContainer.querySelector('input:focus, textarea:focus')) {
            this.formContainer.classList.remove(CSS_CLASSES.FOCUSED);
          }
        }, ANIMATION.FORM_BLUR_DELAY);
      });
    });
  }
}
