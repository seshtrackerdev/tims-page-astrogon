import type { Connector } from '~/types/discovery';

export const IPAAS_CONNECTORS: Connector[] = [
  // Authentication & Identity
  {
    id: 'active-directory',
    name: 'Active Directory',
    description: 'Connect and manage Microsoft Active Directory services',
    type: 'api',
    category: 'authentication',
    status: 'active'
  },
  {
    id: 'azure-ad',
    name: 'Azure Active Directory',
    description: 'Cloud-based identity and access management',
    type: 'api',
    category: 'authentication',
    status: 'active'
  },
  {
    id: 'okta',
    name: 'Okta',
    description: 'Identity and access management platform',
    type: 'api',
    category: 'authentication',
    status: 'active'
  },
  {
    id: 'onelogin',
    name: 'OneLogin',
    description: 'Unified access management platform',
    type: 'api',
    category: 'authentication',
    status: 'active'
  },

  // Cloud Services
  {
    id: 'aws-lambda',
    name: 'AWS Lambda',
    description: 'Serverless compute service',
    type: 'api',
    category: 'cloud',
    status: 'active'
  },
  {
    id: 'aws-s3',
    name: 'Amazon Simple Storage Service',
    description: 'Object storage service',
    type: 'api',
    category: 'cloud',
    status: 'active'
  },
  {
    id: 'aws-sns',
    name: 'Amazon Simple Notification Service',
    description: 'Managed messaging service',
    type: 'api',
    category: 'cloud',
    status: 'active'
  },
  {
    id: 'aws-sqs',
    name: 'Amazon Simple Queue Service',
    description: 'Managed message queuing service',
    type: 'api',
    category: 'cloud',
    status: 'active'
  },

  // Communication
  {
    id: 'slack',
    name: 'Slack',
    description: 'Real-time messaging and collaboration platform',
    type: 'oauth',
    category: 'communication',
    status: 'active'
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    description: 'Team collaboration and communication platform',
    type: 'api',
    category: 'communication',
    status: 'active'
  },
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Email service by Google',
    type: 'api',
    category: 'communication',
    status: 'active'
  },
  {
    id: 'twilio',
    name: 'Twilio',
    description: 'Cloud communications platform',
    type: 'api',
    category: 'communication',
    status: 'active'
  },

  // Data & Analytics
  {
    id: 'snowflake',
    name: 'Snowflake',
    description: 'Cloud data platform',
    type: 'api',
    category: 'data',
    status: 'active'
  },
  {
    id: 'power-bi',
    name: 'Power BI',
    description: 'Business analytics service',
    type: 'api',
    category: 'data',
    status: 'active'
  },
  {
    id: 'tableau',
    name: 'Tableau',
    description: 'Visual analytics platform',
    type: 'api',
    category: 'data',
    status: 'active'
  },

  // Education
  {
    id: 'canvas',
    name: 'Canvas',
    description: 'Learning management system',
    type: 'api',
    category: 'education',
    status: 'active'
  },
  {
    id: 'ellucian-banner',
    name: 'Ellucian Banner',
    description: 'Higher education ERP system',
    type: 'api',
    category: 'education',
    status: 'active'
  },
  {
    id: 'ellucian-colleague',
    name: 'Ellucian Colleague',
    description: 'Higher education management system',
    type: 'api',
    category: 'education',
    status: 'active'
  },

  // Enterprise Systems
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Customer relationship management platform',
    type: 'api',
    category: 'enterprise',
    status: 'active'
  },
  {
    id: 'servicenow',
    name: 'ServiceNow',
    description: 'Enterprise service management platform',
    type: 'api',
    category: 'enterprise',
    status: 'active'
  },
  {
    id: 'workday',
    name: 'Workday',
    description: 'Enterprise management cloud solutions',
    type: 'api',
    category: 'enterprise',
    status: 'active'
  },

  // File Storage
  {
    id: 'box',
    name: 'Box',
    description: 'Cloud content management',
    type: 'api',
    category: 'file',
    status: 'active'
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'File hosting service',
    type: 'api',
    category: 'file',
    status: 'active'
  },
  {
    id: 'onedrive',
    name: 'Microsoft OneDrive',
    description: 'File hosting service by Microsoft',
    type: 'api',
    category: 'file',
    status: 'active'
  },

  // HR & Workforce
  {
    id: 'workday-hr',
    name: 'Workday Human Resources',
    description: 'Human capital management solution',
    type: 'api',
    category: 'hr',
    status: 'active'
  },
  {
    id: 'ceridian-dayforce',
    name: 'Ceridian Dayforce',
    description: 'Human capital management platform',
    type: 'api',
    category: 'hr',
    status: 'active'
  },
  {
    id: 'ukg-pro',
    name: 'UKG Pro',
    description: 'HR and workforce management solution',
    type: 'api',
    category: 'hr',
    status: 'active'
  },

  // IT Management
  {
    id: 'freshservice',
    name: 'Freshservice',
    description: 'IT service management platform',
    type: 'api',
    category: 'it',
    status: 'active'
  },
  {
    id: 'jamf-pro',
    name: 'JAMF Pro',
    description: 'Apple device management',
    type: 'api',
    category: 'it',
    status: 'active'
  },
  {
    id: 'microsoft-intune',
    name: 'Microsoft Intune',
    description: 'Cloud-based device management',
    type: 'api',
    category: 'it',
    status: 'active'
  },

  // Productivity
  {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    description: 'Productivity and collaboration suite',
    type: 'api',
    category: 'productivity',
    status: 'active'
  },
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    description: 'Business productivity and collaboration tools',
    type: 'api',
    category: 'productivity',
    status: 'active'
  },
  {
    id: 'asana',
    name: 'Asana',
    description: 'Project management and collaboration tool',
    type: 'api',
    category: 'productivity',
    status: 'active'
  },

  // Project Management
  {
    id: 'jira',
    name: 'Jira',
    description: 'Project and issue tracking software',
    type: 'api',
    category: 'integration',
    status: 'active'
  },
  {
    id: 'azure-devops',
    name: 'Azure DevOps',
    description: 'Development and project management platform',
    type: 'api',
    category: 'integration',
    status: 'active'
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Code hosting and collaboration platform',
    type: 'oauth',
    category: 'integration',
    status: 'active'
  },
  {
    id: 'confluence',
    name: 'Confluence',
    description: 'Team collaboration and documentation',
    type: 'api',
    category: 'integration',
    status: 'active'
  }
]; 