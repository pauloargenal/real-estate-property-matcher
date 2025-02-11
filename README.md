## Project structure

- src - Application source code
  - app - Routes (e.g. src/app/home/page.tsx). Any code that is specific to a route may live in the route directory (e.g. src/app/home/widgets/welcome.tsx).
  - components - JSX elements that are reusable and application-specific
  - locales - JSON files that contain strings for use in pages, widgets and components
  - services - Structures that contain fetch logic
  - types - Shared TypeScript types
  - utils - Generic utility functions used across the application
  - widgets - Reusable features that can contain components and make use of services

## Guidelines

- All source files must be in kebab case to avoid case sensitivity issues when using git
- Used named exports for everything that is not a function component so they are easily searchable
- Namespace child components and widgets of pages (e.g. page PageA and widget PageAWidget)
- Raw strings belong in locale JSON files and should never be elsewhere in the codebase
- Pages should not be React client components (have the 'use client' directive)
  - Functionality that requires client APIs should be moved to separate widgets or components
  - Locale strings may only be loaded in server components, so if a client component requires locales strings they must be passed in as props
- Function components should use JSX as the primary means of abstraction and not render functions

## Usage

1. Clone this repo
2. `npm install` to install dependencies

### Develop

1. `npm run dev` to run a local development server and view in the browser

### Build

1. `npm run build` to build the application for production
2. `npm run start` to serve the production build
