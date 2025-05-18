import type { PeopleImportModule } from '~/types/discovery/people-import';

export const PEOPLE_IMPORT_MODULE: PeopleImportModule = {
  id: 'people-import',
  title: 'People Import Process',
  description: 'A comprehensive guide to creating and importing users in TeamDynamix, including different methods, schedules, and best practices.',
  type: 'people-import',
  documentationUrl: 'https://solutions.teamdynamix.com/TDClient/1965/Portal/KB/ArticleDet?ID=17113',
  recordTypes: [
    {
      type: 'Users',
      description: 'Can authenticate into TeamDynamix and have full access based on security roles',
      usage: 'Most common for staff and active system users'
    },
    {
      type: 'Customers',
      description: 'Basic records for tracking individuals without system access',
      usage: 'Common for external contacts and inactive users'
    },
    {
      type: 'Contacts',
      description: 'Limited records that cannot be requestors or sponsors',
      usage: 'Rarely used due to limitations'
    }
  ],
  methods: [
    {
      id: 'manual',
      name: 'Manual Creation in TDAdmin',
      description: 'Create individual user records directly through the admin interface',
      steps: [
        'Navigate to TDAdmin > Users & Roles > Users',
        'Click the Users tab',
        'Click Create button',
        'Enter Username and select Next',
        'Select security role and set password',
        'Enter First Name, Last Name, and email (required)',
        'Add optional demographic details',
        'Grant necessary application access'
      ]
    },
    {
      id: 'import-utility',
      name: 'People Import Utility',
      description: 'Windows-based utility for automated file imports without API scripting',
      steps: [
        'Install utility on Windows server/VM',
        'Place data file (.csv, .xls, .xlsx) in monitored directory',
        'Utility converts to .xlsx if needed',
        'File is uploaded to TDX API endpoint',
        'Processing occurs on schedule'
      ],
      notes: [
        'Avoids API rate limiting',
        'Supports automated system of record updates',
        'Recommended for regular imports'
      ]
    },
    {
      id: 'bulk-api',
      name: 'Web API Bulk Import',
      description: 'API endpoint for bulk creation/updates via Excel file',
      steps: [
        'Prepare Excel file using template',
        'Include required columns',
        'Add custom attribute columns if needed',
        'Submit via API or manual upload',
        'Monitor import job status'
      ],
      notes: [
        'Runs during nightly batch process',
        'Has hard stop - may need multiple nights',
        'Check for errors after processing',
        'Test in Sandbox first'
      ]
    },
    {
      id: 'single-api',
      name: 'Web API Single User',
      description: 'API endpoint for individual user creation',
      steps: [
        'Write program to call API endpoint',
        'Include required user data',
        'Implement rate limiting pause',
        'Handle response/errors'
      ],
      notes: [
        'Rate limited to protect performance',
        'Best for real-time integration',
        'Requires programming'
      ]
    },
    {
      id: 'self-registration',
      name: 'Self-Registration',
      description: 'Automatic user creation from SSO/LDAP authentication',
      steps: [
        'Configure SSO/LDAP integration',
        'Enable self-registration',
        'Set up registration profiles',
        'Users authenticate with organizational credentials'
      ],
      notes: [
        'Great for automatic user provisioning',
        'Can upgrade customer records on login',
        'Requires SSO/LDAP setup'
      ]
    }
  ],
  schedules: {
    production: {
      name: 'Production',
      windows: [
        {
          time: '3 AM - 7 AM ET',
          description: 'Continuous processing of imports and queued items'
        }
      ]
    },
    sandbox: {
      name: 'Sandbox',
      windows: [
        {
          time: '3 AM - 7 AM ET',
          description: 'Continuous processing of imports and queued items'
        },
        {
          time: '9 AM ET',
          description: 'One-time processing of all pending imports'
        },
        {
          time: '12 PM ET',
          description: 'One-time processing of all pending imports'
        },
        {
          time: '3 PM ET',
          description: 'One-time processing of all pending imports'
        },
        {
          time: '6 PM ET',
          description: 'One-time processing of all pending imports'
        }
      ]
    }
  },
  limitations: {
    apiChanges: [
      'Converting between customer and user types',
      'Changing user passwords',
      'Changing TeamDynamix usernames'
    ],
    generalNotes: [
      'No way to permanently remove people records',
      'Can deactivate users or merge duplicate records',
      'Deactivated users don\'t count against license',
      'Test all imports in Sandbox first',
      'Monitor import jobs for errors'
    ]
  }
}; 