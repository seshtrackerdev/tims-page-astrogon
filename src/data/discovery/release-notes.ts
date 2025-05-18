import type { ReleaseNotesModule } from '../../types/discovery/release-notes';

export const RELEASE_NOTES: ReleaseNotesModule = {
  id: 'release-notes',
  title: 'TeamDynamix Release Notes',
  description: 'Comprehensive release notes for TeamDynamix platform updates',
  type: 'release-notes',
  url: '#',
  notes: [
    {
      id: '12.0',
      version: '12.0',
      releaseDate: new Date('2025-03-15'),
      title: 'March 2025 Release - Major UI Overhaul',
      description: 'Significant platform update featuring a new technician user interface, enhanced dashboard system, and major improvements to navigation and workflow',
      features: [
        {
          title: 'New Technician User Interface',
          description: 'Complete overhaul of the technician interface with improved navigation, reduced pop-ups, and a new side panel view for better workflow',
          category: 'New Feature',
          module: 'UI/UX',
          tags: ['ui', 'ux', 'navigation', 'side-panel']
        },
        {
          title: 'Enhanced Dashboard System',
          description: 'New dashboard editor with full layout customization, dynamic widgets, and improved filtering capabilities',
          category: 'Enhancement',
          module: 'Dashboards',
          tags: ['dashboard', 'widgets', 'customization']
        },
        {
          title: 'Side Panel Navigation',
          description: 'New side panel view for item details and actions, allowing multiple panels across different applications',
          category: 'New Feature',
          module: 'Navigation',
          tags: ['navigation', 'ui', 'workflow']
        },
        {
          title: 'Dynamic Dashboard Widgets',
          description: 'Rewritten dashboard widgets with advanced filtering, sorting, grouping, and column customization capabilities',
          category: 'Enhancement',
          module: 'Dashboards',
          tags: ['widgets', 'customization', 'filtering']
        },
        {
          title: 'API Updates for Dashboards',
          description: 'Enhanced API endpoints supporting the new dashboard system with backward compatibility for desktop IDs',
          category: 'Enhancement',
          module: 'API',
          tags: ['api', 'integration', 'dashboards']
        },
        {
          title: 'Mobile App Updates',
          description: 'New version of mobile app required to support new interface and dashboard system',
          category: 'Enhancement',
          module: 'Mobile',
          tags: ['mobile', 'app', 'compatibility']
        },
        {
          title: 'Windows Plan Manager Update',
          description: 'Required update for Windows Plan Manager to version 11.10.1 or newer',
          category: 'Enhancement',
          module: 'Desktop',
          tags: ['windows', 'plan-manager', 'compatibility']
        },
        {
          title: 'Legacy Desktop Interface',
          description: 'The previous technician interface will be deprecated in favor of the new UI system with side panel navigation.',
          category: 'Deprecated',
          module: 'UI/UX',
          tags: ['ui', 'desktop', 'legacy']
        }
      ],
      tags: ['major-release', '2025', 'ui-update', 'dashboard', 'api', 'mobile']
    },
    {
      id: '11.10',
      version: '11.10',
      releaseDate: new Date('2024-10-19'),
      title: 'October 2024 Release - AI & Integration Updates',
      description: 'Major platform updates including AI-powered features, Microsoft Intune integration, and significant client portal enhancements',
      features: [
        {
          title: 'Microsoft Intune Integration',
          description: 'New integration with Microsoft Intune to sync and manage device information, with direct access to Intune from asset detail pages',
          category: 'New Feature',
          module: 'Asset Management',
          tags: ['integration', 'microsoft', 'intune', 'assets']
        },
        {
          title: 'AI Ticket Summaries',
          description: 'AI-powered summaries of ticket details and recent feed activity, available through the View Ticket Summary panel',
          category: 'New Feature',
          module: 'Tickets',
          tags: ['ai', 'tickets', 'summary']
        },
        {
          title: 'Revise with AI',
          description: 'AI-powered text analysis for improving grammar, spelling, and conciseness in Rich Text Editors across TDNext and Client Portal',
          category: 'New Feature',
          module: 'UI/UX',
          tags: ['ai', 'text-editor', 'grammar']
        },
        {
          title: 'Enhanced SLA Management',
          description: 'New options for SLA evaluation using initial responded and initial resolved dates for more accurate tracking',
          category: 'Enhancement',
          module: 'SLA',
          tags: ['sla', 'tickets', 'tracking']
        },
        {
          title: 'Public Ticket Workflow Support',
          description: 'New ability to apply workflows to tickets created by public forms and tickets without full requestor records',
          category: 'Enhancement',
          module: 'Workflow',
          tags: ['workflow', 'public', 'tickets']
        },
        {
          title: 'Client Portal Enhancements',
          description: 'Multiple improvements including article subscriptions, module visibility controls, and private portal options',
          category: 'Enhancement',
          module: 'Client Portal',
          tags: ['portal', 'subscriptions', 'customization']
        },
        {
          title: 'Advanced Reporting Features',
          description: 'New reporting capabilities including group email delivery, hyperlink controls, and enhanced ticket metrics',
          category: 'Enhancement',
          module: 'Reporting',
          tags: ['reporting', 'email', 'metrics']
        },
        {
          title: 'Maintenance Activities API',
          description: 'New API endpoints for managing maintenance activities on tickets',
          category: 'Enhancement',
          module: 'API',
          tags: ['api', 'maintenance', 'integration']
        },
        {
          title: 'Multiple Ticket Merge',
          description: 'New ability to merge multiple tickets from the Ticket Search page',
          category: 'New Feature',
          module: 'Tickets',
          tags: ['tickets', 'merge', 'workflow']
        },
        {
          title: 'Manual Ticket Summarization',
          description: 'Manual ticket summary functionality will be deprecated in favor of AI-powered automatic summaries.',
          category: 'Deprecated',
          module: 'Tickets',
          tags: ['tickets', 'ai', 'legacy']
        }
      ],
      tags: ['major-release', '2024', 'ai', 'integration', 'client-portal', 'reporting']
    },
    {
      id: '11.9',
      version: '11.9',
      releaseDate: new Date('2024-05-11'),
      title: 'May 2024 Release - Service & Knowledge Management Updates',
      description: 'Significant platform update featuring enhanced communication tools, workflow improvements, and knowledge management features. On-premise release scheduled for July 11, 2024.',
      features: [
        {
          title: 'Communications Filter for the Feed',
          description: 'New Communications filter in Feed focusing on user communications and notes, with profile settings to set as default view. Includes updates, comments, replies, and public entries.',
          category: 'New Feature',
          module: 'Communications',
          tags: ['feed', 'communications', 'filtering', 'ui']
        },
        {
          title: 'Last Feed Entry Reporting',
          description: 'Added new reporting fields for Last Communication Comment, User, Email, Last Feed Entry, and Last Feed Entry User across multiple report sources.',
          category: 'Enhancement',
          module: 'Reporting',
          tags: ['reporting', 'feed', 'communications']
        },
        {
          title: 'Email Signature Images Management',
          description: 'New TDAdmin controls for managing common email signature images, including blocking and automatic duplicate detection.',
          category: 'New Feature',
          module: 'Email',
          tags: ['email', 'images', 'admin', 'attachments']
        },
        {
          title: 'Workflow Step Notification Reminders',
          description: 'New recurring notification reminders for workflow steps, with customizable templates for choice, approval, and task steps.',
          category: 'Enhancement',
          module: 'Workflow',
          tags: ['workflow', 'notifications', 'reminders']
        },
        {
          title: 'Personalized Signatures',
          description: 'Technicians can now set personal signatures through profile settings, with admin controls and API support for signature management.',
          category: 'New Feature',
          module: 'User Management',
          tags: ['signatures', 'personalization', 'profiles']
        },
        {
          title: 'Multiple Assets on Scheduled Tickets',
          description: 'Enhanced ticket scheduling to support multiple assets/CIs when creating and editing ticket schedules.',
          category: 'Enhancement',
          module: 'Asset Management',
          tags: ['assets', 'scheduling', 'tickets']
        },
        {
          title: 'Read-Only Card Wall',
          description: 'New read-only access to project plan card walls for users without direct project resource access.',
          category: 'Enhancement',
          module: 'Project Management',
          tags: ['projects', 'card-wall', 'access-control']
        },
        {
          title: 'Knowledge Base Article Review Reminders',
          description: 'New notification system for KB article review dates with customizable reminder intervals and owner notifications.',
          category: 'New Feature',
          module: 'Knowledge Management',
          tags: ['kb', 'notifications', 'reviews']
        },
        {
          title: 'Print View for Knowledge Base Articles',
          description: 'New print functionality for KB articles with section selection and formatted print view.',
          category: 'Enhancement',
          module: 'Knowledge Management',
          tags: ['kb', 'printing', 'formatting']
        },
        {
          title: 'Google Drive Integration Update',
          description: 'Updated Google Drive integration permissions to use drive.file scope instead of drive.readonly.',
          category: 'Enhancement',
          module: 'Integrations',
          tags: ['google-drive', 'permissions', 'integration']
        },
        {
          title: 'Legacy Google Drive Integration',
          description: 'Previous Google Drive integration using readonly scope will be deprecated in favor of the new file scope implementation.',
          category: 'Deprecated',
          module: 'Integrations',
          tags: ['google-drive', 'integration', 'legacy']
        }
      ],
      tags: ['service-management', 'knowledge-management', 'workflow', 'communications', '2024']
    },
    {
      id: '11.8',
      version: '11.8',
      releaseDate: new Date('2023-10-28'),
      title: 'October 2023 Release - Reporting & UI Improvements',
      description: 'Major platform update featuring enhanced reporting capabilities, improved charts and graphs, and significant client portal improvements. On-premise release scheduled for December 28, 2023.',
      features: [
        {
          title: 'Improved Charts and Graphs',
          description: 'Complete overhaul of charts and graphs throughout the system with modern styling and enhanced usability, affecting Report Builder, chart-based desktop modules, and built-in system charts.',
          category: 'Enhancement',
          module: 'Reporting',
          tags: ['charts', 'graphs', 'ui', 'reporting']
        },
        {
          title: 'Hour Display Format for Reports',
          description: 'New time-of-day formatting option for date/time values in reports, enabling analysis of event timing patterns.',
          category: 'New Feature',
          module: 'Reporting',
          tags: ['reporting', 'time-format', 'analytics']
        },
        {
          title: 'Report Folder Management',
          description: 'New TDAdmin page for managing report folders, allowing administrators to edit, delete, and change folder ownership.',
          category: 'New Feature',
          module: 'Admin',
          tags: ['reporting', 'folders', 'admin']
        },
        {
          title: 'Individual Report Sharing',
          description: 'Enhanced report sharing capabilities allowing users to share reports with individual people in addition to groups.',
          category: 'Enhancement',
          module: 'Reporting',
          tags: ['reporting', 'sharing', 'permissions']
        },
        {
          title: 'Ticket Assignment on Update',
          description: 'New ability for technicians to update and assign/reassign tickets in a single action.',
          category: 'Enhancement',
          module: 'Service Management',
          tags: ['tickets', 'assignment', 'workflow']
        },
        {
          title: 'Client Asset Detail Page',
          description: 'New dedicated Asset Details page for client users with configurable custom attribute visibility.',
          category: 'New Feature',
          module: 'Asset Management',
          tags: ['assets', 'client-portal', 'visibility']
        },
        {
          title: 'Enhanced Asset Selection',
          description: 'New Form Builder settings allowing client users to see and select assets they don\'t own.',
          category: 'Enhancement',
          module: 'Forms',
          tags: ['forms', 'assets', 'client-portal']
        },
        {
          title: 'Feed Entry Improvements',
          description: 'New feed entries for attachment and tag changes, with integrated logging for related actions.',
          category: 'Enhancement',
          module: 'Communications',
          tags: ['feed', 'attachments', 'tags', 'logging']
        },
        {
          title: 'Font Awesome Update',
          description: 'Added 1400+ new icons with updated Font Awesome integration and system-wide icon refresh.',
          category: 'Enhancement',
          module: 'UI/UX',
          tags: ['icons', 'ui', 'font-awesome']
        },
        {
          title: 'API Enhancements',
          description: 'New API endpoints for project management, service categories, and user management, including improved project creation and management capabilities.',
          category: 'Enhancement',
          module: 'API',
          tags: ['api', 'projects', 'services', 'users']
        },
        {
          title: 'Deprecated Charts and Reports',
          description: 'Removal of multiple chart-based features including Total Login History page, various desktop modules (Average Bill Rate, Chargeability, Profit by Month, etc.), and charts from standard reports (Bill Rate, Chargeability, Profit, Hours Summary, etc.).',
          category: 'Deprecated',
          module: 'Reporting',
          tags: ['charts', 'reports', 'desktop-modules', 'legacy']
        },
        {
          title: 'Removed Desktop Modules',
          description: 'Deprecated modules: Average Bill Rate by Month, Chargeability by Month, Profit by Month, Current Projects by Health/Status, Hours by Time Type, All/Open Tickets Chart, Approved Requests.',
          category: 'Deprecated',
          module: 'Desktop',
          tags: ['desktop-modules', 'charts', 'legacy']
        },
        {
          title: 'Standard Report Charts',
          description: 'Removed charts from standard reports including Bill Rate Report, Chargeability Report, Profit Report, Hours Summary Report, Projects vs. Tickets Report, and Issue Aging Report.',
          category: 'Deprecated',
          module: 'Reporting',
          tags: ['reports', 'charts', 'legacy']
        }
      ],
      tags: ['reporting', 'charts', 'client-portal', 'api', 'ui-update', '2023', 'deprecations']
    }
  ]
}; 