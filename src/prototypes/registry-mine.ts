/**
 * My Registry — Designer-owned
 *
 * This file is YOURS. Add your own prototypes here.
 * Upstream (main repo) never touches this file — so it never conflicts when you sync.
 *
 * Usage:
 *   1. Run /new-prototype or ask Claude to create a prototype
 *   2. Claude will add the entry here automatically
 *   3. Your prototypes appear in the gallery under "My prototypes"
 */

import React from 'react';
import { ProjectMeta } from './registry-core';

const AdminPortal2 = React.lazy(() => import('./AdminPortal2'));
const NewUIAdmin2 = React.lazy(() => import('./NewUIAdmin2'));
const Admin2Vision = React.lazy(() => import('./Admin2Vision'));
const HomepageV4 = React.lazy(() => import('./HomepageV4'));

export const myRegistry: ProjectMeta[] = [
  {
    id: 'AdminPortal2',
    name: 'Admin Portal 2.0',
    description: 'Admin Portal 2.0 Groups tab with group listing, 2-step creation wizard, roles, parent groups, and user assignment.',
    author: 'Design Team',
    component: AdminPortal2,
    dsComponents: 10,
    customComponents: 7,
    section: 'mine',
  },
  {
    id: 'NewUIAdmin2',
    name: 'New UI Admin 2.0',
    description: 'Application Settings screen from Admin 2.0 — cluster settings, administration toggles, and downloads & schedules.',
    author: 'Design Team',
    component: NewUIAdmin2,
    dsComponents: 6,
    customComponents: 4,
    section: 'mine',
  },
  {
    id: 'Admin2Vision',
    name: 'Admin 2.0 Vision',
    description: 'Full Admin 2.0 portal — custom dark sidebar, 12+ pages, command palette (⌘K), and complete navigation across users, settings, AI stats, and infrastructure.',
    author: 'Design Team',
    component: Admin2Vision,
    dsComponents: 0,
    customComponents: 20,
    section: 'mine',
  },
  {
    id: 'HomepageV4',
    name: 'HOMEPAGE V4',
    description: 'ThoughtSpot homepage with animated Spotter prompt box, quick action chips, Recents, and Watchlist KPIs.',
    author: 'Design Team',
    lastModified: '2026-03-31',
    component: HomepageV4,
    dsComponents: 4,
    customComponents: 6,
    section: 'mine',
  },
];
