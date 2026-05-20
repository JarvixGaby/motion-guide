// Page type taxonomy - comprehensive list of common page types
export const PAGE_TYPES = [
  'Dashboard',
  'Landing Page',
  'E-commerce',
  'Social Feed',
  'Chat Interface',
  'Blog',
  'Admin Panel',
  'Portfolio',
  'SaaS App',
  'Mobile App',
  'Documentation',
  'Form/Survey'
] as const;

export type PageType = typeof PAGE_TYPES[number];

// Use case taxonomy - derived from whenToUse fields, categorized by user intent
export const USE_CASES = [
  'Data Loading',        // Initial page/component data fetch
  'Form Submission',     // Processing user input
  'Content Refresh',     // Updating existing content
  'Search Results',      // Searching/filtering operations
  'File Upload',         // Uploading files/media
  'Authentication',      // Login/signup flows
  'Content Reveal',      // Progressive disclosure/animations
  'List Population',     // Loading lists/grids of items
  'Brand Expression',    // Brand-forward expressive moments
  'Product Storytelling',// Narrative/showcase moments
  'System Visualization',// Agent/data/system process explanation
  'Creative Motion'      // 2D/3D/WebGL expressive motion
] as const;

export type UseCase = typeof USE_CASES[number];

// Category taxonomy - the main domains of animation as defined in the PRD
export const CATEGORIES = [
  'Waiting & Loading',
  'Action Feedback',
  'Page & View Transitions',
  'Empty & Error States',
  'Status & Confirmation',
  'Data & Content Visualization',
  'Scroll & Navigation',
  'Onboarding & Tours',
  'Creative Motion'
] as const;

export type Category = typeof CATEGORIES[number];
