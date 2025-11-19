# LB Communications Website

Emergency services radio and telecommunications consulting website for LB Communications LLC.

## Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript (ES6 Modules)
- **Build Tool**: Vite 5.x
- **Code Quality**: ESLint, Prettier
- **Deployment**: Static site (dist/)

## Development

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development Server

Start the development server with hot reload:

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Production Build

Build optimized production bundle:

```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Code Quality

Lint JavaScript:

```bash
npm run lint
```

Auto-fix linting issues:

```bash
npm run lint:fix
```

Format code with Prettier:

```bash
npm run format
```

## Project Structure

```
LB-Comms-V2/
├── src/
│   └── js/
│       ├── main.js                # Application entry point
│       ├── config/
│       │   └── constants.js       # Configuration & constants
│       ├── modules/
│       │   ├── header.js          # Header & navigation
│       │   ├── carousel.js        # Image carousel
│       │   ├── forms.js           # Contact forms
│       │   ├── animations.js      # Scroll animations
│       │   ├── specialties.js     # Expandable cards
│       │   └── tableau.js         # Data visualizations
│       └── utils/
│           └── dom.js             # DOM utility functions
├── assets/                        # Static assets
│   ├── images/
│   ├── videos/
│   └── articles/
├── index.html                     # Main landing page
├── about.html                     # About page
├── styles.css                     # Global styles
├── vite.config.js                 # Vite configuration
└── package.json                   # Dependencies & scripts
```

## Module Architecture

The JavaScript codebase uses ES6 modules for better organization:

- **Header Module**: Responsive header, hamburger menu, scroll effects
- **Carousel Module**: Infinite-scroll image gallery with drag/swipe support
- **Forms Module**: Contact form with focus effects and suggestion box
- **Animations Module**: Intersection Observer for scroll animations
- **Specialties Module**: Expandable service cards (Fire, Police, Dispatch)
- **Tableau Module**: Responsive data visualization embeds

All modules check for element existence and gracefully handle missing DOM elements, making them page-agnostic.

## Key Features

- **Responsive Design**: Mobile-first with 5 breakpoints
- **Infinite Carousel**: Auto-scrolling project showcase with drag/swipe
- **Scroll Animations**: Intersection Observer-based animations
- **Contact Form**: Formspree integration with desktop suggestion box
- **Performance**: Optimized builds with code splitting and minification

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS Flexbox and Grid
- Intersection Observer API

## Deployment

The `dist/` folder contains the production-ready static site. Deploy the contents to any static hosting provider:

- Netlify
- Vercel
- GitHub Pages
- Traditional web hosting

## External Integrations

- **Google Analytics**: `G-9R23W2PX54`
- **Formspree**: Contact form endpoint
- **CloudFront CDN**: Video hosting
- **Tableau Public**: Data visualizations
- **Font Awesome**: Icon library
- **Google Fonts**: Goldman font family

## Contributing

1. Create a feature branch
2. Make changes and test with `npm run dev`
3. Run linting: `npm run lint`
4. Build production: `npm run build`
5. Submit pull request

## License

Private/Proprietary - LB Communications LLC
