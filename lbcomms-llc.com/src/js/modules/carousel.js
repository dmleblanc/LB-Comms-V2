/**
 * Carousel Manager Module
 * Handles infinite-scroll image carousel with drag/swipe functionality
 */

import { SELECTORS, CAROUSEL_CONFIG, CSS_CLASSES } from '../config/constants.js';
import { $, $$ } from '../utils/dom.js';

export class CarouselManager {
  constructor() {
    this.carousel = $(SELECTORS.CAROUSEL);
    if (!this.carousel) return;

    this.carouselImages = $(SELECTORS.CAROUSEL_IMAGES, this.carousel);
    this.images = $$(SELECTORS.CAROUSEL_IMAGES + ' img', this.carousel);
    this.leftArrow = $(SELECTORS.LEFT_ARROW, this.carousel);
    this.rightArrow = $(SELECTORS.RIGHT_ARROW, this.carousel);
    this.progressIndicator = $('.carousel-progress', this.carousel);

    // Carousel state
    this.state = {
      isDragging: false,
      startX: 0,
      scrollLeft: 0,
      isClicking: false,
      dragDistance: 0,
      velocity: 0,
      lastX: 0,
      lastTime: 0,
    };
  }

  /**
   * Initialize carousel functionality
   */
  init() {
    if (!this.carousel || !this.carouselImages) {
      return; // Element doesn't exist on this page
    }

    this.duplicateImagesForInfiniteScroll();
    this.setupImageBehavior();
    this.setupEventListeners();
    this.setupProgressIndicator();
    this.startContinuousScroll();
  }

  /**
   * Duplicate carousel images for seamless infinite scroll
   */
  duplicateImagesForInfiniteScroll() {
    this.carouselImages.innerHTML += this.carouselImages.innerHTML;
  }

  /**
   * Setup image drag prevention and hover effects
   */
  setupImageBehavior() {
    this.images.forEach((img) => {
      // Prevent default drag behavior
      img.addEventListener('dragstart', (e) => e.preventDefault());

      // Hover brightness effects
      img.addEventListener('mouseenter', () => {
        img.style.filter = CAROUSEL_CONFIG.IMAGE_BRIGHTNESS_HOVER;
      });
      img.addEventListener('mouseleave', () => {
        img.style.filter = CAROUSEL_CONFIG.IMAGE_BRIGHTNESS_DEFAULT;
      });
    });
  }

  /**
   * Setup all carousel event listeners
   */
  setupEventListeners() {
    // Mouse events
    this.carousel.addEventListener('mousedown', (e) => this.startDrag(e.pageX));
    this.carousel.addEventListener('mouseleave', () => this.endDrag());
    this.carousel.addEventListener('mouseup', () => this.endDrag());
    this.carousel.addEventListener('mousemove', (e) => {
      if (!this.state.isDragging) return;
      e.preventDefault();
      this.moveDrag(e.pageX);
    });

    // Touch events
    this.carousel.addEventListener('touchstart', (e) => this.startDrag(e.touches[0].pageX));
    this.carousel.addEventListener('touchend', () => this.endDrag());
    this.carousel.addEventListener('touchmove', (e) => {
      if (!this.state.isDragging) return;
      this.moveDrag(e.touches[0].pageX);
    });

    // Wheel event for horizontal scrolling
    this.carousel.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (e.deltaY !== 0) {
        this.carouselImages.scrollLeft += e.deltaY;
      } else if (e.deltaX !== 0) {
        this.carouselImages.scrollLeft += e.deltaX;
      }
    });

    // Infinite scroll reset
    this.carouselImages.addEventListener('scroll', () => this.handleInfiniteScroll());

    // Arrow button navigation
    if (this.leftArrow) {
      this.leftArrow.addEventListener('click', () => {
        this.carouselImages.scrollLeft -= CAROUSEL_CONFIG.ARROW_SCROLL_AMOUNT;
      });
    }
    if (this.rightArrow) {
      this.rightArrow.addEventListener('click', () => {
        this.carouselImages.scrollLeft += CAROUSEL_CONFIG.ARROW_SCROLL_AMOUNT;
      });
    }
  }

  /**
   * Start drag operation
   * @param {number} x - X coordinate
   */
  startDrag(x) {
    this.state.isDragging = true;
    this.state.startX = x - this.carousel.offsetLeft;
    this.state.scrollLeft = this.carouselImages.scrollLeft;
    this.state.dragDistance = 0;
    this.state.velocity = 0;
    this.state.lastX = x;
    this.state.lastTime = Date.now();
    this.carousel.classList.add(CSS_CLASSES.ACTIVE);
  }

  /**
   * End drag operation
   */
  endDrag() {
    this.state.isDragging = false;
    if (this.state.dragDistance < CAROUSEL_CONFIG.DRAG_THRESHOLD) {
      this.state.isClicking = true;
    }
    setTimeout(() => {
      this.state.isClicking = false;
    }, 0);
    this.carousel.classList.remove(CSS_CLASSES.ACTIVE);
    this.applyInertia();
  }

  /**
   * Handle drag movement
   * @param {number} x - Current X coordinate
   */
  moveDrag(x) {
    if (!this.state.isDragging) return;

    const now = Date.now();
    const deltaX = x - this.state.lastX;
    const deltaTime = now - this.state.lastTime;
    this.state.velocity = deltaX / deltaTime;
    this.state.lastX = x;
    this.state.lastTime = now;

    const walk = (x - this.state.startX) * CAROUSEL_CONFIG.DRAG_MULTIPLIER;
    this.carouselImages.scrollLeft = this.state.scrollLeft - walk;
    this.state.dragDistance = Math.abs(x - this.state.startX);
    this.state.isClicking = this.state.dragDistance < CAROUSEL_CONFIG.DRAG_THRESHOLD;
  }

  /**
   * Apply inertia scrolling after drag ends
   */
  applyInertia() {
    const step = () => {
      if (Math.abs(this.state.velocity) < CAROUSEL_CONFIG.INERTIA_MIN_VELOCITY) return;
      this.carouselImages.scrollLeft -=
        this.state.velocity * CAROUSEL_CONFIG.INERTIA_VELOCITY_MULTIPLIER;
      this.state.velocity *= CAROUSEL_CONFIG.INERTIA_DECELERATION;
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /**
   * Start continuous auto-scroll animation
   */
  startContinuousScroll() {
    const scroll = () => {
      if (!this.state.isDragging) {
        this.carouselImages.scrollLeft += CAROUSEL_CONFIG.SCROLL_SPEED;
      }
      requestAnimationFrame(scroll);
    };
    requestAnimationFrame(scroll);
  }

  /**
   * Handle infinite scroll loop reset
   */
  handleInfiniteScroll() {
    const maxScrollLeft = this.carouselImages.scrollWidth / 2;
    if (this.carouselImages.scrollLeft >= maxScrollLeft) {
      this.carouselImages.scrollLeft -= maxScrollLeft;
    } else if (this.carouselImages.scrollLeft <= 0) {
      this.carouselImages.scrollLeft += maxScrollLeft;
    }
  }

  /**
   * Setup progress indicator showing project count
   */
  setupProgressIndicator() {
    if (!this.progressIndicator) return;

    // Count unique carousel sections (text + images groups)
    const textElements = $$('.carousel-text', this.carousel);
    const projectCount = textElements.length / 2; // Divide by 2 because of duplication

    this.progressIndicator.textContent = `${Math.floor(projectCount)} Projects`;
  }
}
