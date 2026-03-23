/**
 * Project Configuration
 *
 * Fill this out when you fork Radiant Play.
 * This metadata provides context for AI tools and developer handoff.
 *
 * Usage:
 *   import { projectConfig } from './project.config';
 */

export const projectConfig = {
  // --- Project Info ---
  name: 'Radiant Play',
  description: 'AI-assisted interactive prototype builder using ThoughtSpot\'s Radiant design system',

  // --- Team ---
  designer: 'Faris',
  productManager: '',
  developers: [] as string[],

  // --- Links ---
  figmaFile: '',
  jiraEpic: '',
  confluenceDocs: '',

  // --- Context ---
  designSystem: 'Radiant v1.0',
  targetRelease: '',
  status: 'active' as 'planning' | 'active' | 'ready-for-dev' | 'handed-off',

  // --- Prototypes ---
  // Add your prototypes here as you create them.
  prototypes: [
    {
      id: 'admin-groups',
      name: 'Admin Groups Management',
      status: 'in-progress' as 'planning' | 'in-progress' | 'ready-for-dev' | 'handed-off',
      figmaFrame: '',
      priority: 'high' as 'high' | 'medium' | 'low',
    },
    {
      id: 'cmdk',
      name: 'Command Palette (Cmd+K)',
      status: 'in-progress' as 'planning' | 'in-progress' | 'ready-for-dev' | 'handed-off',
      figmaFrame: '',
      priority: 'high' as 'high' | 'medium' | 'low',
    },
    {
      id: 'liveboard',
      name: 'Liveboard Dashboard',
      status: 'in-progress' as 'planning' | 'in-progress' | 'ready-for-dev' | 'handed-off',
      figmaFrame: '',
      priority: 'medium' as 'high' | 'medium' | 'low',
    },
    {
      id: 'spotter-memory',
      name: 'Spotter Memory Sources',
      status: 'in-progress' as 'planning' | 'in-progress' | 'ready-for-dev' | 'handed-off',
      figmaFrame: '',
      priority: 'medium' as 'high' | 'medium' | 'low',
    },
    {
      id: 'impersonation-v2',
      name: 'Admin Impersonation',
      status: 'in-progress' as 'planning' | 'in-progress' | 'ready-for-dev' | 'handed-off',
      figmaFrame: '',
      priority: 'medium' as 'high' | 'medium' | 'low',
    },
    {
      id: 'modal-patterns',
      name: 'Modal Patterns',
      status: 'in-progress' as 'planning' | 'in-progress' | 'ready-for-dev' | 'handed-off',
      figmaFrame: '',
      priority: 'low' as 'high' | 'medium' | 'low',
    },
    {
      id: 'muse-chat',
      name: 'MuseChat',
      status: 'in-progress' as 'planning' | 'in-progress' | 'ready-for-dev' | 'handed-off',
      figmaFrame: '',
      priority: 'high' as 'high' | 'medium' | 'low',
    },
    {
      id: 'spotter-model',
      name: 'Spotter Model',
      status: 'in-progress' as 'planning' | 'in-progress' | 'ready-for-dev' | 'handed-off',
      figmaFrame: '',
      priority: 'high' as 'high' | 'medium' | 'low',
    },
  ],
};

export type ProjectConfig = typeof projectConfig;
export default projectConfig;
