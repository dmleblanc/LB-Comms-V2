/**
 * Tableau Manager Module
 * Handles Tableau Public data visualization embeds
 */

import { TABLEAU } from '../config/constants.js';

export class TableauManager {
  constructor() {
    this.scriptLoaded = false;
  }

  /**
   * Initialize all Tableau visualizations
   */
  init() {
    TABLEAU.VIZ_IDS.forEach((id) => {
      const divElement = document.getElementById(id);
      if (divElement) {
        this.initializeViz(id, TABLEAU.ASPECT_RATIO);
      }
    });
  }

  /**
   * Set visualization element size based on aspect ratio
   * @param {string} divId - Container element ID
   * @param {number} aspectRatio - Width/height aspect ratio
   */
  setVizElementSize(divId, aspectRatio) {
    const divElement = document.getElementById(divId);
    if (!divElement) return;

    const vizElement = divElement.getElementsByTagName('object')[0];
    if (!vizElement) return;

    const width = divElement.offsetWidth;
    vizElement.style.width = '100%';
    vizElement.style.height = width / aspectRatio + 'px';
  }

  /**
   * Initialize a single Tableau visualization
   * @param {string} divId - Container element ID
   * @param {number} aspectRatio - Width/height aspect ratio
   */
  initializeViz(divId, aspectRatio) {
    // Set initial size
    this.setVizElementSize(divId, aspectRatio);

    // Adjust size on window resize
    window.addEventListener('resize', () => {
      this.setVizElementSize(divId, aspectRatio);
    });

    // Load Tableau script only once
    if (!this.scriptLoaded) {
      this.loadTableauScript(divId);
      this.scriptLoaded = true;
    }
  }

  /**
   * Load Tableau JavaScript API
   * @param {string} divId - Container element ID
   */
  loadTableauScript(divId) {
    const divElement = document.getElementById(divId);
    if (!divElement) return;

    const vizElement = divElement.getElementsByTagName('object')[0];
    if (!vizElement) return;

    const scriptElement = document.createElement('script');
    scriptElement.src = TABLEAU.SCRIPT_SRC;
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
  }
}
