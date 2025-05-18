import type { Connector } from '../../types/discovery/index';

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
  }
]; 