/**
 * Project Registry
 * 
 * Central registry for discovering and managing playground projects.
 * Projects are folders in src/prototypes/ that export a default component.
 */

import React from 'react';

// Import thumbnail images
import CmdkThumbnail from './thumbnails/Cmdk.svg';
import AdminGroupsThumbnail from './thumbnails/AdminGroups.svg';
import SpotterMemoryThumbnail from './thumbnails/SpotterMemory.svg';
import LiveboardThumbnail from './thumbnails/Liveboard.svg';

/**
 * Metadata for a playground project
 */
export interface ProjectMeta {
  /** Unique identifier (folder name) */
  id: string;
  /** Display name */
  name: string;
  /** Project description */
  description?: string;
  /** Project author/designer */
  author?: string;
  /** Last modified date */
  lastModified?: string;
  /** Thumbnail image path */
  thumbnail?: string;
  /** Project component */
  component: React.ComponentType;
  /** Number of shared Radiant design system components used */
  dsComponents?: number;
  /** Number of custom/local components created for this prototype */
  customComponents?: number;
}

/**
 * Project registry
 * 
 * Projects are auto-registered by `npm run new-prototype`.
 * To add a thumbnail later, import an SVG and add it to the entry.
 */

// Import project components (lazy-loaded for code splitting)
const Liveboard = React.lazy(() => import('./Liveboard'));
const Cmdk = React.lazy(() => import('./Cmdk'));
const SpotterMemory = React.lazy(() => import('./SpotterMemory'));
const AdminGroups = React.lazy(() => import('./AdminGroups'));
const ImpersonationV2 = React.lazy(() => import('./ImpersonationV2'));
const MuseChat = React.lazy(() => import('./MuseChat'));
const SpotterModelProto = React.lazy(() => import('./SpotterModel'));
const AdminPortal2 = React.lazy(() => import('./AdminPortal2'));
const NewUIAdmin2 = React.lazy(() => import('./NewUIAdmin2'));
const Customisation = React.lazy(() => import('./Customisation'));
const Admin2Vision = React.lazy(() => import('./Admin2Vision'));

/**
 * All registered projects
 */
export const projectRegistry: ProjectMeta[] = [
  {
    id: 'Liveboard',
    name: 'Liveboard',
    description: 'TSE Business Overview dashboard with KPIs, charts, and regional data visualization.',
    author: 'Design Team',
    thumbnail: LiveboardThumbnail,
    component: Liveboard,
    dsComponents: 10,
    customComponents: 10,
  },
  {
    id: 'Cmdk',
    name: 'Command Palette',
    description: 'Command-K interface for quick navigation and actions with keyboard shortcuts and context-aware filtering.',
    author: 'Design Team',
    thumbnail: CmdkThumbnail,
    component: Cmdk,
    dsComponents: 12,
    customComponents: 11,
  },
  {
    id: 'SpotterMemory',
    name: 'Spotter Memory',
    description: 'Memory Sources object table experience with search, filtering, and pagination.',
    author: 'Design Team',
    thumbnail: SpotterMemoryThumbnail,
    component: SpotterMemory,
    dsComponents: 6,
    customComponents: 5,
  },
  {
    id: 'AdminGroups',
    name: 'Admin Groups',
    description: 'Group creation wizard with bulk org assignment and role management.',
    author: 'Design Team',
    thumbnail: AdminGroupsThumbnail,
    component: AdminGroups,
    dsComponents: 9,
    customComponents: 10,
  },
  {
    id: 'ImpersonationV2',
    name: 'Admin Impersonation',
    description: 'Admin palette impersonation — blue viewport border, GlobalHeader icon, session timer popup, and Toast notification.',
    author: 'Design Team',
    component: ImpersonationV2,
    dsComponents: 11,
    customComponents: 3,
  },
  {
    id: 'MuseChat',
    name: 'MuseChat',
    description: 'Spotter AI chat interface with conversational data exploration, embedded charts, and animated typing indicators.',
    author: 'Design Team',
    component: MuseChat,
    dsComponents: 4,
    customComponents: 6,
  },
  {
    id: 'SpotterModel',
    name: 'Spotter Model',
    description: 'SpotterModel agent edit flow — onboarding, table/join recommendations, columns editing, and impact-aware delete.',
    author: 'Design Team',
    component: SpotterModelProto,
    dsComponents: 5,
    customComponents: 14,
  },
  {
    id: 'AdminPortal2',
    name: 'Admin Portal 2.0',
    description: 'Admin Portal 2.0 Groups tab with group listing, 2-step creation wizard, roles, parent groups, and user assignment.',
    author: 'Design Team',
    component: AdminPortal2,
    dsComponents: 10,
    customComponents: 7,
  },
  {
    id: 'NewUIAdmin2',
    name: 'New UI Admin 2.0',
    description: 'Application Settings screen from Admin 2.0 — cluster settings, administration toggles, and downloads & schedules.',
    author: 'Design Team',
    component: NewUIAdmin2,
    dsComponents: 6,
    customComponents: 4,
  },
  {
    id: 'Customisation',
    name: 'Admin 2.0 — Customisation',
    description: 'Customisation page from Admin 2.0 — Style tab with logo upload, font selection, theme colour, chart palettes, and footer text.',
    author: 'Design Team',
    component: Customisation,
    dsComponents: 6,
    customComponents: 8,
  },
  {
    id: 'Admin2Vision',
    name: 'Admin 2.0 Vision',
    description: 'Full Admin 2.0 portal — custom dark sidebar, 12+ pages, command palette (⌘K), and complete navigation across users, settings, AI stats, and infrastructure.',
    author: 'Design Team',
    component: Admin2Vision,
    dsComponents: 0,
    customComponents: 20,
  },
  // Add more projects here as they are created
  // {
  //   id: 'my-project',
  //   name: 'My Project',
  //   description: 'Description of my project',
  //   author: 'Designer Name',
  //   thumbnail: MyProjectThumbnail,
  //   component: React.lazy(() => import('./my-project')),
  //   dsComponents: 0,
  //   customComponents: 0,
  // },
];

/**
 * Get a project by ID
 */
export function getProject(id: string): ProjectMeta | undefined {
  return projectRegistry.find(p => p.id === id);
}

/**
 * Get all projects (excluding templates and examples)
 */
export function getAllProjects(): ProjectMeta[] {
  return projectRegistry;
}

/**
 * Check if a project exists
 */
export function projectExists(id: string): boolean {
  return projectRegistry.some(p => p.id === id);
}

export default projectRegistry;
