# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm start` - Runs the development server on http://localhost:3000
- `npm run build` - Builds the production version to the `build` folder
- `npm test` - Runs the test suite in watch mode
- `npm run lint` - Runs ESLint to check code quality
- `npm run type-check` - Runs TypeScript type checking
- `npm run lhci` - Runs Lighthouse CI for performance auditing

### Custom Scripts
- `npm run prebuild` - Automatically sets version environment variable before build
- The version is set via `scripts/set-version-env.js` and used in App.js console message

## Architecture Overview

### Project Structure
This is a React-based portfolio website built with Create React App. Key architectural patterns:

**Theme System**: Uses React Context (`src/context/ThemeContext.js`) for light/dark theme management with automatic system preference detection

**Routing**: React Router DOM with animated page transitions using Framer Motion's AnimatePresence

**Content Management**: Fetches SEO data from a Strapi CMS API (`https://portfolio-cms-n9hb.onrender.com/api/global-seo`)

**Component Architecture**: 
- UI components in `src/components/ui/` follow a modular pattern with paired JS/SCSS files
- Pages in `src/pages/` handle main routes
- Utility functions in `src/utils/`

### Styling System
- **SCSS Architecture**: Modular SCSS with design tokens in `src/styles/base/`
- **Design Tokens**: Organized into semantic categories (colors, spacing, typography, breakpoints)
- **Theme Implementation**: CSS custom properties with `data-theme` attribute switching

### Key Dependencies
- **Animation**: Framer Motion for page transitions and component animations
- **Carousel**: Swiper.js for interactive content carousels
- **Smooth Scrolling**: Lenis for enhanced scroll behavior
- **Icons**: Custom SVG icon system with utility mapper
- **Lottie**: Lottie React for animated illustrations

### Performance & Quality
- **Lighthouse CI**: Configured with strict performance thresholds (90% minimum)
- **ESLint**: Modern flat config with React and accessibility rules
- **Deployment**: Netlify with custom redirects and functions support

## Important Notes

### CMS Integration
The site pulls SEO metadata from a Strapi CMS. The API endpoint is hardcoded in App.js:15.

### Version Display
The app displays a version number in the browser console (App.js:38-41) using an environment variable set during build.

### Theme System
The theme context automatically detects user's system preference and applies the appropriate theme on initial load.