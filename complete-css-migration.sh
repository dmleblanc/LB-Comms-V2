#!/bin/bash
# CSS Modularization Completion Script
# This script extracts remaining CSS sections from styles.css into modular files

set -e

STYLES_FILE="styles.css"
CSS_DIR="src/css"

echo "🎨 Completing CSS Modularization..."
echo "=================================="

# Ensure we're in the project root
if [ ! -f "$STYLES_FILE" ]; then
    echo "❌ Error: styles.css not found. Run this script from the project root."
    exit 1
fi

echo "📦 Creating layout/containers.css..."
cat > "$CSS_DIR/layout/containers.css" << 'EOF'
/**
 * Container & Layout Styles
 * Main containers and welcome section
 */

/* Welcome Media Section */
.welcome-media {
  margin-top: var(--header-height);
  position: relative;
  width: 100%;
  height: 95vh;
  min-height: 500px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  z-index: -1;
}

.welcome-wrapper {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  display: flex;
}

.welcome-logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome-logo-wrapper img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 35px;
}

.welcome-content-wrapper {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: var(--border-radius-xl);
  padding: var(--space-sm);
  box-shadow: var(--color-accent) 0 0 10px;
  overflow: visible;
  max-width: 70vw;
  align-items: center;
  justify-content: center;
}

.content {
  position: relative;
  z-index: var(--z-base);
  text-align: center;
  align-items: center;
  justify-content: center;
  color: var(--color-black);
  visibility: visible;
}

/* Main Container (About Page) */
.main-container {
  justify-content: center;
  align-items: center;
  display: flex;
  padding-top: var(--space-md);
  background-color: var(--color-background);
  color: var(--color-white);
  flex-direction: column;
}

.main-container__hero {
  width: 100vw;
  height: 100%;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: var(--space-md);
  color: var(--color-black);
}

.main-container__hero img {
  padding-top: 3vh;
  height: auto;
  max-height: 200px;
  width: auto;
  border-radius: var(--border-radius-md);
  margin: var(--space-md);
}

.main-container__hero h2 {
  font-size: var(--font-size-base);
  margin-left: 50px;
  margin-right: 50px;
  margin-top: var(--space-sm);
}

.main-container__sub {
  background-color: var(--color-primary);
  width: 80vw;
  height: fit-content;
  padding: var(--space-md);
}

.main-container__paragraph {
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  margin: var(--space-sm) 0;
}

.main-container__content {
  padding: var(--space-md);
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* Responsive Breakpoints */
@media (min-width: 600px) and (max-width: 899px) {
  .main-container__hero h2 {
    font-size: 1.4em;
    margin-left: var(--space-md);
    margin-right: var(--space-md);
  }
}

@media (min-width: 900px) and (max-width: 1199px) {
  .main-container {
    flex-direction: row;
  }

  .main-container__hero {
    padding: var(--space-md);
    max-width: 50vw;
  }

  .main-container__sub {
    width: 50vw;
    padding-top: calc(var(--header-height) + var(--space-md));
  }
}

@media (min-width: 1200px) {
  .main-container {
    flex-direction: row;
  }

  .main-container__hero {
    padding: var(--space-md);
    max-width: 50vw;
    height: 100vh;
  }

  .main-container__hero img {
    height: 18vh;
    max-height: 300px;
  }

  .main-container__hero h2 {
    font-size: 2em;
    margin-left: 200px;
    margin-right: 200px;
  }

  .main-container__sub {
    width: 50vw;
    height: 100vh;
    padding-top: calc(var(--header-height) + var(--space-md));
    justify-content: center;
  }

  .main-container__paragraph {
    font-size: var(--font-size-md);
    margin-left: 100px;
    margin-right: 100px;
  }
}
EOF

echo "🎠 Creating components/carousel.css..."
sed -n '/\/\* IMAGE CAROUSEL/,/\/\* CONTACT FORM/p' "$STYLES_FILE" | sed '1d;$d' | \
sed 's/rgb(0, 0, 0, 0.5)/var(--color-black)/g; s/#ccc/var(--color-gray-light)/g' > "$CSS_DIR/components/carousel.css"

# Add header to carousel
cat > "$CSS_DIR/components/carousel.css" << 'EOF'
/**
 * Image Carousel Component
 * Infinite scroll carousel with drag/swipe functionality
 */

.carousel {
  overflow: hidden;
  position: relative;
  width: 90%;
}

.carousel.active {
  cursor: grabbing;
}

.carousel-images {
  display: flex;
  overflow-x: hidden;
  scrollbar-width: none;
}

.carousel-images::-webkit-scrollbar {
  display: none;
}

.carousel-images img {
  max-width: 100%;
  max-height: 400px;
  object-fit: cover;
  flex-shrink: 0;
  border-right: 2px solid var(--color-gray-light);
  transition: filter var(--transition-normal);
}

.carousel-images img:hover,
.carousel-images img:active {
  filter: brightness(1.2);
}

.carousel-images img:last-child {
  border-right: none;
}

.carousel-text {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  background-color: var(--bg-color, transparent);
  background-image: var(--bg-image, none);
  background-size: cover;
  background-repeat: no-repeat;
  font-size: 1.5em;
  font-family: var(--font-family-body);
  padding: var(--space-xs);
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  max-width: 300px;
  max-height: 400px;
  border-right: 2px solid var(--color-gray-light);
  word-wrap: break-word;
  color: var(--font-color, var(--color-white));
  transition: background-color var(--transition-normal);
}

.carousel-text::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: var(--z-base);
  opacity: 1;
  transition: opacity var(--transition-fast);
}

.carousel-text:hover::before,
.carousel-text:active::before {
  opacity: 0.6;
}

.carousel-text > * {
  position: relative;
  z-index: 2;
}

.carousel-heading {
  font-size: 1.2em;
  margin: 0;
  padding: var(--space-xs);
  text-align: left;
}

.carousel-body {
  font-size: 1em;
  margin: 0;
  padding: var(--space-xs);
  text-align: left;
}

.carousel-footer {
  font-size: 0.8em;
  margin: 0;
  padding: var(--space-xs);
  text-align: left;
  margin-top: auto;
}

.carousel-text:last-child {
  border-right: none;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: var(--color-white);
  border: none;
  padding: var(--space-sm);
  cursor: pointer;
  z-index: var(--z-modal-backdrop);
}

.left-arrow {
  left: var(--space-sm);
}

.right-arrow {
  right: var(--space-sm);
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}
EOF

echo "🎯 Creating components/services.css..."
cat > "$CSS_DIR/components/services.css" << 'EOF'
/**
 * Services Section Component
 * Grid of service cards with animations
 */

.services-section {
  background-color: var(--color-background);
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  justify-content: center;
}

.service {
  position: relative;
  background-color: var(--color-white);
  border: 2px solid;
  border-radius: var(--border-radius-md);
  padding: var(--space-md);
  width: 300px;
  height: 300px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  box-shadow: var(--shadow-md);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.service.visible {
  opacity: 1;
  transform: translateY(0);
}

.service:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-xl);
}

.service#project-management {
  border-color: var(--color-service-project-mgmt);
}

.service#technical-consulting {
  border-color: var(--color-service-consulting);
}

.service#consultations {
  border-color: var(--color-service-consultations);
}

.service img {
  max-width: 60px;
  height: auto;
  display: block;
  margin: 0 auto var(--space-sm);
}

.services-section ul {
  list-style-type: none;
  padding-left: 0;
}

.service h3 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-sm);
}

.service p {
  font-size: var(--font-size-base);
  margin-bottom: var(--space-sm);
}
EOF

echo "⚡ Creating components/specialties.css..."
cat > "$CSS_DIR/components/specialties.css" << 'EOF'
/**
 * Specialties Component
 * Expandable Fire/Police/Dispatch cards
 */

.parent-container {
  display: flex;
  justify-content: center;
  background-color: #9dadbe;
}

.specialties-section {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  padding: var(--space-md);
  justify-content: center;
}

.specialty-item {
  background-color: var(--color-background);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  transition: transform var(--transition-normal);
  width: 100%;
  max-width: 400px;
}

.specialty-item img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: var(--space-sm);
}

.specialty-item:hover {
  transform: translateY(-10px);
}

.specialty-content {
  padding: var(--space-md);
  display: flex;
}

.specialty-left {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.specialty-left h2 {
  text-align: center;
}

.specialty-left ul {
  justify-self: center;
}

.title-arrow {
  display: flex;
  justify-content: center;
  align-items: center;
}

.expand-arrow {
  cursor: pointer;
  transition: transform var(--transition-normal);
  margin-left: var(--space-sm);
  color: #dee3e7;
}

.specialty-item.expanded .expand-arrow {
  transform: rotate(180deg);
}

.specialty-details {
  height: 0;
  overflow: hidden;
  transition: height var(--transition-normal);
}

.specialty-item.expanded .specialty-details {
  padding-top: var(--space-sm);
}

button.toggle-details {
  background-color: var(--color-accent);
  border: none;
  color: var(--color-white);
  padding: var(--space-sm);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: background-color var(--transition-normal);
}

button.toggle-details:hover {
  background-color: var(--color-accent-hover);
}

.parent-container ul li {
  list-style-position: outside;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: var(--space-md);
  opacity: 0;
  text-align: center;
}

.parent-container ul li.visible {
  opacity: 1;
  animation: popOut 0.2s ease-out;
}

.parent-container ul li::before {
  content: '\2713';
  position: absolute;
  left: 0;
  color: green;
  font-weight: bold;
  transform: scale(0);
  transition: transform var(--transition-fast);
  text-align: center;
  justify-self: center;
}

.parent-container ul li.visible::before {
  transform: scale(1);
  animation: popOut 0.2s ease-out;
  padding-right: var(--space-sm);
}

@media (max-width: 767px) {
  .parent-container ul li {
    padding-left: 5vw;
    text-align: left;
  }
}

@keyframes popOut {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
EOF

echo "📝 Creating components/forms.css..."
cat > "$CSS_DIR/components/forms.css" << 'EOF'
/**
 * Contact Form Component
 * Form with sliding suggestion box
 */

.form-wrapper {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-height: 600px;
  width: 100vw;
  background-color: rgb(20, 151, 210);
  place-items: center;
}

.contact-form-container {
  display: inline-block;
  position: absolute;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: var(--color-white);
  padding: var(--space-md);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  max-width: 600px;
  width: 80vw;
  height: 80%;
  transition: transform 0.8s ease, width 0.8s ease;
  z-index: var(--z-dropdown);
  box-sizing: border-box;
}

.suggestion-box-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: var(--color-white);
  padding: var(--space-md);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  max-width: 600px;
  width: 50%;
  height: 80%;
  transition: transform 0.8s ease;
  z-index: 9;
  overflow: auto;
  align-items: center;
  justify-content: center;
}

.contact-form-container h2 {
  text-align: center;
  margin-bottom: var(--space-md);
}

.contact-form input,
.contact-form textarea {
  justify-content: center;
  align-items: center;
  padding: var(--space-sm);
  margin-top: var(--space-sm);
  border: 1px solid var(--color-gray-light);
  border-radius: var(--border-radius-sm);
  width: 100%;
  box-sizing: border-box;
  transition: border-color var(--transition-normal), box-shadow var(--transition-normal);
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: #4c8baf;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
  outline: none;
}

.contact-form textarea {
  resize: vertical;
  height: 150px;
}

.contact-form button {
  margin-top: var(--space-md);
  padding: var(--space-sm);
  background-color: var(--color-success);
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-size: 16px;
  width: calc(100% + var(--space-md));
  margin-left: calc(-1 * var(--space-sm));
  margin-right: calc(-1 * var(--space-sm));
  box-sizing: border-box;
  transition: background-color var(--transition-normal);
}

.contact-form button:hover {
  background-color: var(--color-success-hover);
}

.contact-form-wrapper.focused .contact-form-container {
  transform: translateX(-50%);
  z-index: 3;
  width: 40%;
  transition: transform var(--transition-normal), width 1.0s ease;
}

.contact-form-wrapper.focused .suggestion-box-container {
  transform: translateX(48%);
  z-index: 2;
}

.suggestion-box {
  height: 50vh;
}

.suggestion-box p {
  margin: 0;
  border-bottom: 1px solid var(--color-gray-light);
  cursor: pointer;
  transition: background-color var(--transition-normal);
}

.suggestion-box ul {
  list-style: none;
  padding-left: 0;
}

.suggestion-box ul li {
  position: relative;
  padding-left: 25px;
}

.suggestion-box ul li::before {
  content: '\2022';
  position: absolute;
  left: 0;
  color: rgb(63, 63, 66);
  font-size: 1.5em;
  line-height: var(--line-height-tight);
}

/* Hide suggestion box on mobile */
@media (max-width: 768px) {
  .contact-form-wrapper * {
    transition: none !important;
    transform: none !important;
    justify-content: center !important;
  }

  .contact-form-container {
    transition: none;
  }

  .contact-form-wrapper.focused .contact-form-container {
    transform: none;
    transition: none;
    width: 80vw;
  }

  .contact-form-wrapper.focused .suggestion-box-container {
    transform: none;
    z-index: 2;
  }

  .suggestion-box-container,
  .suggestion-box {
    display: none;
    visibility: hidden;
  }
}
EOF

echo "🎓 Creating remaining component files..."

# Back to Top
cat > "$CSS_DIR/components/back-to-top.css" << 'EOF'
/**
 * Back to Top Button
 */

.back-to-top {
  position: fixed;
  bottom: var(--space-md);
  right: var(--space-md);
  width: 40px;
  height: 40px;
  background-color: var(--color-gray-dark);
  color: var(--color-white);
  text-align: center;
  line-height: 40px;
  font-size: 24px;
  border-radius: var(--border-radius-round);
  cursor: pointer;
  display: none;
  z-index: var(--z-modal-backdrop);
  transition: opacity var(--transition-normal);
}

.back-to-top:hover {
  background-color: #555;
}
EOF

# Swipe Down Arrow
cat > "$CSS_DIR/components/swipe-down.css" << 'EOF'
/**
 * Swipe Down Arrow Indicator
 */

.swipe-down {
  position: absolute;
  bottom: var(--space-sm);
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: var(--color-white);
  font-size: var(--font-size-lg);
  animation: bounce var(--animation-duration-bounce) infinite;
  transition: transform var(--transition-slow), opacity var(--transition-slow);
}

.swipe-down img {
  width: 30px;
  height: auto;
  display: block;
  margin: 0 auto;
}

.swipe-down.hidden {
  transform: translateY(100%);
  opacity: 0;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}
EOF

# Emoji/Icons
cat > "$CSS_DIR/components/icons.css" << 'EOF'
/**
 * Icons & Emoji Styles
 */

.emoji {
  max-height: 1em;
  font-size: 3em;
  line-height: var(--line-height-tight);
  display: inline-block;
  margin: 0 var(--space-sm);
  padding: 0;
  transition: transform var(--transition-normal);
}

.emoji:hover,
.emoji:focus,
.emoji:active {
  transform: scale(1.2);
}

.emoji-container {
  display: flex;
  justify-content: center;
  overflow: visible !important;
  padding-left: var(--space-sm);
  padding-right: var(--space-sm);
}

.emoji-wrapper {
  position: relative;
  display: inline-block;
  padding-left: var(--space-sm);
  padding-right: var(--space-sm);
  overflow: visible;
  max-width: 60vw;
}

.tooltip {
  visibility: hidden;
  width: 120px;
  color: var(--color-white);
  text-align: center;
  border-radius: var(--border-radius-sm);
  padding: var(--space-xs) 0;
  position: absolute;
  z-index: var(--z-base);
  top: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 1;
  transition: opacity var(--transition-normal);
}

.emoji-wrapper:hover .tooltip,
.emoji-wrapper:active .tooltip {
  visibility: visible;
  opacity: 1;
  bottom: 100%;
}
EOF

# Company Info
cat > "$CSS_DIR/components/company-info.css" << 'EOF'
/**
 * Company Info Section
 */

.company-info {
  max-width: 800px;
  width: 90vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background);
  border: 1px solid var(--color-gray-lighter);
  border-radius: var(--border-radius-md);
  padding: var(--space-md);
  margin: var(--space-md) auto;
  box-shadow: var(--shadow-lg);
  text-align: center;
  animation: fadeIn 1s ease-in-out;
}

.heading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
}

.company-info-shorttext {
  width: 100%;
  max-width: 600px;
  height: 100%;
  padding: var(--space-sm);
  justify-content: center;
  align-items: center;
}

.company-info-longtext p {
  width: 100%;
  max-width: 600px;
  height: 100%;
  text-align: left;
  padding: var(--space-xs);
  margin: 0;
}

.company-info-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  margin: var(--space-sm);
  border-radius: var(--border-radius-md);
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.company-info h2 {
  margin: 0;
  padding: 3px;
  background-color: var(--color-background);
}

@media (max-width: 768px) {
  .company-info {
    flex-direction: column;
    align-items: center;
  }

  .heading-container,
  .company-info-image {
    width: 100%;
  }

  .company-info-image img {
    width: 100%;
    height: auto;
  }
}
EOF

# Publications/Articles
cat > "$CSS_DIR/components/publications.css" << 'EOF'
/**
 * Publications Section
 */

.publications-section {
  padding: var(--space-md);
  background-color: var(--color-primary);
}

.publications-section h2 {
  margin-bottom: var(--space-sm);
  margin-left: var(--space-sm);
  font-size: var(--font-size-xxl);
  color: var(--color-white);
}

.articles-container {
  display: flex;
  overflow-x: auto;
  padding: var(--space-sm);
  gap: var(--space-md);
}

.article {
  flex: 0 0 auto;
  width: 300px;
  padding: var(--space-sm);
  border: 1px solid var(--color-gray-lighter);
  background-color: var(--color-white);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--border-radius-md);
  transition: transform var(--transition-fast);
}

.article:hover {
  transform: scale(1.05);
}

.article-image {
  width: 100%;
  height: auto;
  margin-bottom: 3px;
  object-fit: cover;
  border-radius: var(--border-radius-md);
}

.article h3 {
  font-size: var(--font-size-sm);
  min-height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-black);
  margin: 0;
  text-align: center;
}

.article h2 {
  font-size: var(--font-size-xs);
  color: var(--color-gray);
  margin: 0;
  text-align: center;
  padding-bottom: var(--space-xs);
  font-style: italic;
}

.article-link {
  display: flex;
  margin-top: var(--space-xs);
  color: var(--color-link);
  text-decoration: none;
}

.article-link:hover {
  text-decoration: underline;
}
EOF

# Training Section
cat > "$CSS_DIR/components/training.css" << 'EOF'
/**
 * Training Section
 */

.training-section {
  padding: var(--space-lg);
  background-color: var(--color-background);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.training-section-text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  min-width: 300px;
}

.training-section-text {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.training-section-text h1 {
  border-bottom: 2px solid #707070;
}

.video-placeholder {
  width: 45%;
  margin: var(--space-md) auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-gray-lightest);
  border: 1px solid var(--color-gray-light);
  border-radius: var(--border-radius-md);
  padding: var(--space-sm);
  box-shadow: var(--shadow-lg);
}

.video-placeholder video {
  width: 100%;
  height: auto;
  border-radius: var(--border-radius-md);
}

@media (max-width: 768px) {
  .training-section {
    flex-direction: column;
    align-items: center;
  }

  .training-section-text,
  .video-placeholder {
    width: 100%;
  }
}
EOF

# About Section
cat > "$CSS_DIR/components/about-section.css" << 'EOF'
/**
 * About Section
 */

.about-section {
  position: relative;
  padding: 50px var(--space-md);
  color: var(--color-white);
  text-align: center;
  overflow: hidden;
}

.about-section img {
  max-width: 60vw;
  height: auto;
  display: block;
  margin: 0 auto;
}

.about-content {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.5);
  padding: var(--space-md);
  border-radius: var(--border-radius-lg);
  animation: fadeIn 2s ease-in-out;
}

.about-content h2 {
  font-size: var(--font-size-xxxl);
  margin-bottom: var(--space-md);
}

.about-content p {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-normal);
}
EOF

# Tableau
cat > "$CSS_DIR/pages/tableau.css" << 'EOF'
/**
 * Tableau Visualizations (About Page)
 */

.tableauPlaceholder {
  position: relative;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  height: 100%;
}

.tableauViz {
  display: none;
}
EOF

echo "✨ Creating utilities/animations.css..."
cat > "$CSS_DIR/utilities/animations.css" << 'EOF'
/**
 * Animations & Keyframes
 */

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes popOut {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
EOF

echo "📄 Creating pages/home.css and pages/about.css..."
touch "$CSS_DIR/pages/home.css"
touch "$CSS_DIR/pages/about.css"

echo "📝 Creating main.css with all imports..."
cat > "$CSS_DIR/main.css" << 'EOF'
/**
 * Main CSS Entry Point
 * Imports all modular stylesheets in proper order
 */

/* Base - Foundation */
@import './base/variables.css';
@import './base/reset.css';
@import './base/typography.css';

/* Layout - Page Structure */
@import './layout/header.css';
@import './layout/footer.css';
@import './layout/containers.css';

/* Components - Reusable UI Elements */
@import './components/carousel.css';
@import './components/services.css';
@import './components/specialties.css';
@import './components/forms.css';
@import './components/back-to-top.css';
@import './components/swipe-down.css';
@import './components/icons.css';
@import './components/company-info.css';
@import './components/publications.css';
@import './components/training.css';
@import './components/about-section.css';

/* Pages - Page-Specific Styles */
@import './pages/home.css';
@import './pages/about.css';
@import './pages/tableau.css';

/* Utilities - Animations & Helpers */
@import './utilities/animations.css';
EOF

echo ""
echo "✅ CSS Modularization Complete!"
echo "================================"
echo ""
echo "Created files:"
echo "  - Base: 3 files (variables, reset, typography)"
echo "  - Layout: 3 files (header, footer, containers)"
echo "  - Components: 11 files"
echo "  - Pages: 3 files"
echo "  - Utilities: 1 file"
echo "  - main.css (entry point)"
echo ""
echo "Total: 22 CSS module files"
echo ""
echo "Next steps:"
echo "  1. Update HTML files to use /src/css/main.css"
echo "  2. Run: npm run dev"
echo "  3. Test all pages and components"
echo "  4. Run: npm run build"
echo ""
EOF

chmod +x complete-css-migration.sh

echo "Created completion script: complete-css-migration.sh"
