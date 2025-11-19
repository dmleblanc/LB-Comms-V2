/**
 * Specialties Manager Module
 * Handles expandable specialty cards (Fire, Police, Dispatch)
 */

import { SELECTORS, CSS_CLASSES } from '../config/constants.js';
import { $, $$ } from '../utils/dom.js';

export class SpecialtiesManager {
  constructor() {
    this.toggleElements = $$(SELECTORS.SPECIALTY_TOGGLE);
  }

  /**
   * Initialize specialty card toggles
   */
  init() {
    if (this.toggleElements.length === 0) {
      return; // No specialty cards on this page
    }

    this.toggleElements.forEach((element) => {
      element.addEventListener('click', (event) => this.handleToggle(event));
    });
  }

  /**
   * Handle toggle click event
   * Expands/collapses specialty card details
   * @param {Event} event - Click event
   */
  handleToggle(event) {
    event.stopPropagation();

    const specialtyItem = event.target.closest(SELECTORS.SPECIALTY_ITEM);
    if (!specialtyItem) return;

    const details = specialtyItem.querySelector(SELECTORS.SPECIALTY_DETAILS);
    if (!details) return;

    if (specialtyItem.classList.contains(CSS_CLASSES.EXPANDED)) {
      // Collapse
      details.style.height = '0';
      specialtyItem.classList.remove(CSS_CLASSES.EXPANDED);
    } else {
      // Expand
      details.style.height = details.scrollHeight + 'px';
      specialtyItem.classList.add(CSS_CLASSES.EXPANDED);
    }
  }
}
