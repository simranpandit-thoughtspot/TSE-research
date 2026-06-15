/**
 * Mock data for VariablesDataType prototype
 *
 * Variables list as shown in the admin section — matches the Figma reference.
 */

export type VariableType = 'Table Mapping' | 'Formula';

export interface VariableRow {
  id: string;
  name: string;
  type: VariableType;
  sensitiveValues: boolean;
  valuesAssigned: number;
  /** Minutes since last modification — used for sorting */
  modifiedMins: number;
  /** Human-readable relative time shown in the table */
  modifiedLabel: string;
}

export const variables: VariableRow[] = [
  {
    id: 'var-1',
    name: 'publish_demo_schema_var',
    type: 'Table Mapping',
    sensitiveValues: false,
    valuesAssigned: 2,
    modifiedMins: 12,
    modifiedLabel: '12 minutes ago',
  },
  {
    id: 'var-2',
    name: 'publish_demo_schema_demo',
    type: 'Table Mapping',
    sensitiveValues: false,
    valuesAssigned: 5,
    modifiedMins: 24,
    modifiedLabel: '24 minutes ago',
  },
  {
    id: 'var-3',
    name: 'demo_table_mapping',
    type: 'Table Mapping',
    sensitiveValues: false,
    valuesAssigned: 36,
    modifiedMins: 60,
    modifiedLabel: '1 hour ago',
  },
  {
    id: 'var-4',
    name: 'demo_user_profile',
    type: 'Table Mapping',
    sensitiveValues: false,
    valuesAssigned: 3,
    modifiedMins: 120,
    modifiedLabel: '2 hours ago',
  },
  {
    id: 'var-5',
    name: 'Conversion Rates',
    type: 'Table Mapping',
    sensitiveValues: false,
    valuesAssigned: 50,
    modifiedMins: 180,
    modifiedLabel: '3 hours ago',
  },
  {
    id: 'var-6',
    name: 'Bounce Rate',
    type: 'Table Mapping',
    sensitiveValues: false,
    valuesAssigned: 50,
    modifiedMins: 300,
    modifiedLabel: '5 hours ago',
  },
  {
    id: 'var-7',
    name: 'Session Duration',
    type: 'Table Mapping',
    sensitiveValues: false,
    valuesAssigned: 50,
    modifiedMins: 1440,
    modifiedLabel: '1 day ago',
  },
  {
    id: 'var-8',
    name: 'Session Duration',
    type: 'Table Mapping',
    sensitiveValues: false,
    valuesAssigned: 50,
    modifiedMins: 2880,
    modifiedLabel: '2 days ago',
  },
  {
    id: 'var-9',
    name: 'Session Duration',
    type: 'Table Mapping',
    sensitiveValues: false,
    valuesAssigned: 50,
    modifiedMins: 4320,
    modifiedLabel: '3 days ago',
  },
];
