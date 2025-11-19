/**
 * DOM Utility Functions
 * Helpers for safe DOM manipulation and element queries
 */

/**
 * Safely query a single element
 * @param {string} selector - CSS selector
 * @param {Element|Document} context - Parent element (default: document)
 * @returns {Element|null}
 */
export function $(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * Safely query multiple elements
 * @param {string} selector - CSS selector
 * @param {Element|Document} context - Parent element (default: document)
 * @returns {NodeList}
 */
export function $$(selector, context = document) {
  return context.querySelectorAll(selector);
}

/**
 * Check if element exists before executing callback
 * @param {string|Element} element - Selector or element
 * @param {Function} callback - Function to execute if element exists
 * @returns {boolean} - Whether the element exists
 */
export function ifExists(element, callback) {
  const el = typeof element === 'string' ? $(element) : element;
  if (el) {
    callback(el);
    return true;
  }
  return false;
}

/**
 * Wait for DOM to be ready and execute callback
 * @param {Function} callback - Function to execute when DOM is ready
 */
export function onReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

/**
 * Check if an element has a specific ancestor
 * @param {Element} element - The element to check
 * @param {string} selector - CSS selector for the ancestor
 * @returns {Element|null} - The ancestor element or null
 */
export function closest(element, selector) {
  return element.closest(selector);
}

/**
 * Safely add event listener with existence check
 * @param {string|Element} element - Selector or element
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 * @param {Object} options - Event listener options
 * @returns {boolean} - Whether the listener was added
 */
export function on(element, event, handler, options = {}) {
  return ifExists(element, (el) => {
    el.addEventListener(event, handler, options);
  });
}
