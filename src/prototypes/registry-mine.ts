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
import EmailCustomisationThumbnail from './thumbnails/EmailCustomisation.svg';

const SpotterHome = React.lazy(() => import('./SpotterHome'));
const MobileWidgets = React.lazy(() => import('./MobileWidgets'));
const AdminPortal2 = React.lazy(() => import('./AdminPortal2'));
const NewUIAdmin2 = React.lazy(() => import('./NewUIAdmin2'));
const Admin2Vision = React.lazy(() => import('./Admin2Vision'));
const HomepageV4 = React.lazy(() => import('./HomepageV4'));
const HomepageV5 = React.lazy(() => import('./HomepageV5'));
const EmailCustomisation = React.lazy(() => import('./EmailCustomisation'));
const ImpersonationFlow = React.lazy(() => import('./ImpersonationFlow'));
const RBAC = React.lazy(() => import('./RBAC'));

export const myRegistry: ProjectMeta[] = [
  {
    id: 'SpotterHome',
    name: 'Spotter Home',
    description: 'Spotter AI analyst home page — centered hero with gradient-border search bar, datasource chip, Recents panel, and Watchlist KPIs.',
    author: 'Simran Pandit',
    lastModified: '2026-05-13',
    component: SpotterHome,
    dsComponents: 0,
    customComponents: 4,
    section: 'mine',
  },
  {
    id: 'MobileWidgets',
    name: 'KPI Widget Explorer — iOS & Android',
    description: 'ThoughtSpot KPI watchlist widget prototype with iOS WidgetKit and Android App Widget guidelines. Side-by-side platform comparison, 3 KPI types, 3 layout iterations, light/dark/tinted themes, all standard widget sizes.',
    author: 'Simran Pandit',
    lastModified: '2026-05-06',
    component: MobileWidgets,
    dsComponents: 0,
    customComponents: 8,
    section: 'mine',
  },
  {
    id: 'RBAC',
    name: 'RBAC — Privilege Transparency',
    description: 'Admin portal user management with granular privilege visibility — groups table, users table, user detail card with Groups/Privileges tabs, and group detail card with privilege breakdown.',
    author: 'Simran Pandit',
    lastModified: '2026-04-29',
    component: RBAC,
    dsComponents: 4,
    customComponents: 5,
    section: 'mine',
  },
  {
    id: 'ImpersonationFlow',
    name: 'Impersonation flow',
    description: 'Admin impersonation (act as) flow — user profile preference toggle, access-request email, approve/decline with animated feedback states.',
    author: 'Simran Pandit',
    lastModified: '2026-04-24',
    component: ImpersonationFlow,
    dsComponents: 0,
    customComponents: 5,
    section: 'mine',
  },
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
    id: 'HomepageV5',
    name: 'HOMEPAGE V5',
    description: 'ThoughtSpot homepage — Spotter prompt bar, chip dropdowns, Recents with hover 3-dot, Watchlist with animated KPI dots, Add KPI modal, and SpotterViz liveboard creation flow.',
    author: 'Simran Pandit',
    lastModified: '2026-04-17',
    component: HomepageV5,
    dsComponents: 2,
    customComponents: 9,
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
  {
    id: 'EmailCustomisation',
    name: 'Email customisation',
    description: 'Iterative explorations of email customisation UX — preview modal, full-page property editor, and iteration switcher.',
    author: 'Simran Pandit',
    lastModified: '2026-04-17',
    thumbnail: EmailCustomisationThumbnail,
    component: EmailCustomisation,
    dsComponents: 0,
    customComponents: 4,
    section: 'mine',
  },
];
