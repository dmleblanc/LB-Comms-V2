# LB Comms Website - Project Context

## Repository Overview
**Project**: LB Communications LLC Website (V2)
**Type**: Static website for emergency communications consulting company
**Tech Stack**: Vanilla HTML, CSS, JavaScript ES6 Modules + Vite Build System
**Branch**: master
**Last Updated**: Nov 19, 2025 (Migrated to Modular Architecture)

## Project Structure (✨ NEW MODULAR ARCHITECTURE)
```
LB-Comms-V2/
├── src/
│   └── js/                         # 🆕 Modular JavaScript
│       ├── main.js                 # Application entry point
│       ├── config/
│       │   └── constants.js        # All configuration & magic numbers
│       ├── modules/
│       │   ├── header.js           # Header & navigation (~70 lines)
│       │   ├── carousel.js         # Image carousel (~175 lines)
│       │   ├── forms.js            # Contact forms (~35 lines)
│       │   ├── animations.js       # Scroll animations (~80 lines)
│       │   ├── specialties.js      # Expandable cards (~40 lines)
│       │   └── tableau.js          # Data visualizations (~60 lines)
│       └── utils/
│           └── dom.js              # DOM helper functions
├── index.html          (445 lines) - Main landing page
├── about.html          (113 lines) - About page
├── styles.css          (1,791 lines) - All styling
├── scripts.js          (397 lines) - ⚠️ DEPRECATED - replaced by src/js/
├── package.json                    # 🆕 Dependencies & npm scripts
├── vite.config.js                  # 🆕 Build configuration
├── .eslintrc.js                    # 🆕 Code quality rules
├── .prettierrc                     # 🆕 Code formatting
├── README.md                       # 🆕 Development documentation
└── assets/
    ├── images/
    │   ├── logos/                  # Company branding
    │   ├── sprites/                # UI icons
    │   └── projects/               # Client project photos (30+)
    ├── videos/                     # Background videos
    └── articles/                   # Publication images
```

## 🎯 Key Improvements (Nov 2025 Migration)

### Before → After
- ❌ Single 397-line `scripts.js` → ✅ 6 focused modules (460 total lines)
- ❌ 7 separate `DOMContentLoaded` listeners → ✅ 1 centralized initialization
- ❌ Duplicate code (Tableau, form handlers) → ✅ Removed ~70 lines
- ❌ No error handling for missing elements → ✅ Graceful degradation
- ❌ Magic numbers scattered → ✅ Centralized in constants.js
- ❌ No build process → ✅ Vite with minification & tree-shaking
- ❌ Global scope pollution → ✅ ES6 modules with proper encapsulation

### Build System Benefits
- **Development**: Hot reload with `npm run dev`
- **Production**: Optimized bundle (9.4KB JS + 21.9KB CSS gzipped)
- **Code Quality**: ESLint + Prettier integration
- **Browser Compat**: ES6+ with automatic polyfills if needed

## Key Features

### 1. **Landing Page (index.html)**
- **Hero Section**: Video background with company logo and service icons
- **Company Info**: 37 years of emergency services experience messaging
- **Specialties**: Fire, Police, and Dispatch services with expandable details
- **Image Carousel**: Infinite scroll showcase of client projects (30+ images)
- **Services Grid**: Project Management, Technical Consulting, Consultations
- **Training Section**: Employee radio training with video
- **Publications**: Scrollable articles from PSC Magazine
- **Contact Form**: Formspree integration with suggestion box (desktop only)

### 2. **About Page (about.html)**
- Split-screen design (landscape tablets+)
- Company description and mission
- Service icons linking back to index.html sections

### 3. **Navigation**
- Fixed header with responsive logo
- Hamburger menu (mobile) / horizontal nav (tablet+)
- Slide-out menu on mobile
- Back-to-top button

### 4. **Interactive Elements**
- Expandable specialty cards with arrow indicators
- Drag-to-scroll image carousel with auto-scroll
- Contact form with sliding suggestion box (desktop)
- Scroll animations and fade-ins
- Responsive video embeds

## Technical Implementation

### JavaScript Architecture (ES6 Modules)

#### **Entry Point** (`main.js`)
- Single initialization function
- Imports and initializes all modules
- Each module handles its own existence checks

#### **Configuration** (`config/constants.js`)
- DOM selectors
- Scroll thresholds
- Carousel settings
- Animation timings
- Tableau configuration
- CSS class names

#### **Utilities** (`utils/dom.js`)
- `$()` - Safe querySelector
- `$$()` - Safe querySelectorAll
- `ifExists()` - Conditional execution
- `onReady()` - DOM ready handler
- `on()` - Safe event listener attachment

#### **Modules** (Feature-based)
1. **HeaderManager** - Header resize, hamburger menu, swipe-down arrow
2. **CarouselManager** - Infinite scroll, drag/swipe, auto-scroll, inertia
3. **FormsManager** - Focus effects, suggestion box animation
4. **AnimationsManager** - Intersection Observer for services
5. **BackToTopManager** - Scroll-triggered back-to-top button
6. **SpecialtiesManager** - Expandable service cards
7. **TableauManager** - Responsive data visualizations

### CSS Architecture
- **Mobile-first responsive design**
- CSS custom properties (`:root` variables)
- Breakpoints:
  - Mobile: < 600px
  - Tablet Portrait: 600-899px
  - Tablet Landscape: 900-1199px
  - Laptop: 1200-1439px
  - Desktop: 1440px+
- Animations: fade-in, pop-out, bounce, scroll

### Build Process (Vite)
```bash
npm run dev      # Development server on :3000
npm run build    # Production build to dist/
npm run preview  # Preview production build
npm run lint     # ESLint check
npm run format   # Prettier formatting
```

### External Integrations
- **Google Analytics**: Tracking ID `G-9R23W2PX54`
- **Font Awesome**: Icons
- **Google Fonts**: Goldman font family
- **Formspree**: Contact form (`xvgprabl`)
- **CloudFront CDN**: Video hosting (`d3b5jmwslwfsc6.cloudfront.net`)
- **Tableau Public**: Data visualizations
- **reCAPTCHA**: Commented out, not active

## Client Projects Featured
**Locations**: Auburn, Charlton (3 depts), Clinton, Lexington, Mendon, Northampton, Paxton, Pepperell, Rutland, Southbridge
**Types**: Dispatch centers, police departments, fire departments, radio towers

## Recent Changes (Git History)
- **Nov 19, 2025**: JavaScript modularization migration (Vite + ES6 modules)
- Fixed landscape tablet layout for About page
- Mark's requested updates (11/20)
- About page map fixes
- Added About LB Comms text
- Tableau Public integration
- Header/footer link fixes
- Mobile contact form fixes
- Training section spacing adjustments

## Development Notes

### Code Organization
✅ **Now**: Modular ES6 with clear separation of concerns
✅ **Now**: Single initialization point in main.js
✅ **Now**: Centralized configuration
✅ **Now**: Reusable utility functions
✅ **Now**: Error handling for missing DOM elements
❌ **Still**: All styles in single CSS file (future improvement opportunity)

### Performance
- ✅ Videos served from CloudFront CDN
- ✅ Production bundle minified (9.4KB JS gzipped)
- ✅ Code splitting by page (index/about)
- ⚠️ Images could benefit from lazy loading
- ⚠️ Large JPG files (up to 3.8MB) could be optimized

### Browser Compatibility
- Modern browsers (ES6+)
- Intersection Observer API
- CSS Flexbox layout
- CSS custom properties
- Touch events for mobile

### Accessibility
- Alt text on images
- ARIA labels on buttons
- Semantic HTML structure
- Keyboard navigation support

## Design Patterns
- **Color Scheme**:
  - Primary: `#163962` (dark blue)
  - Accent: `#007BFF` (bright blue)
  - Background: `#f9f9f9` (light gray)
- **Typography**: Goldman (headings), Arial (body)
- **Layout**: Flexbox-based responsive design

## Business Context
**Target Audience**: Police, Fire, and Dispatch centers in Massachusetts
**Services**: Radio/telecommunications consulting, training, project management
**Key Differentiator**: 37 years of Fire and EMS experience
**Training Platform**: jbcomms-trainings.com

## Known Issues/Future Improvements

### ✅ Resolved
- ~~Multiple `DOMContentLoaded` listeners~~ → Consolidated
- ~~Duplicate Tableau code~~ → Single implementation
- ~~Duplicate form handlers~~ → Removed
- ~~No error handling~~ → Added graceful degradation
- ~~No build process~~ → Vite configured

### 🔄 Future Opportunities
1. Split CSS into modules (following JS pattern)
2. Image lazy loading implementation
3. Optimize large JPG files (compression/WebP)
4. Add automated tests (Vitest)
5. Consider CSS-in-JS or CSS modules
6. Add TypeScript for better IDE support
7. Implement service worker for offline support

## Maintenance Areas
- **Content Updates**: Client project images, publications, training videos
- **Form Endpoint**: Formspree integration
- **Analytics**: Google Analytics tracking
- **CDN**: CloudFront video hosting
- **External Links**: Training platform, PSC Magazine articles
- **Dependencies**: Run `npm audit` regularly for security updates

## Deployment

### Development
```bash
npm install
npm run dev
```

### Production
```bash
npm run build
# Deploy contents of dist/ folder
```

### Deployment Targets
- Static hosting (Netlify, Vercel, GitHub Pages)
- Traditional web hosting
- CDN distribution

---

*Last assessed: November 19, 2025*
*Migration to modular ES6 architecture completed*
*Repository is clean with no uncommitted changes*
