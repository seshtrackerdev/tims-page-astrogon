import type { DiscoveryModule } from '@/types/discovery';

export const DISCOVERY_MODULES: DiscoveryModule[] = [
  {
    name: 'Rapport Building',
    key: 'rapport',
    description: 'Open-ended questions to build connection and understand core needs',
    icon: '🤝',
    color: '#22C55E', // Emerald Green
    order: 1,
    categories: [
      {
        name: 'Vision & Goals',
        description: 'Understanding ideal outcomes and aspirations',
        questions: [
          {
            label: 'Magic Wand Question',
            questions: [
              'If you could wave a magic wand and have three things in your new tool, what would they be?'
            ],
            cue: 'Understanding ideal solution and priorities',
            followUp: 'What makes these features particularly important to you?',
            explanatoryFollowUps: [
              'How would these capabilities impact your daily operations?',
              'Who would benefit most from these improvements?'
            ],
            category: 'vision'
          }
        ]
      },
      {
        name: 'Current State',
        description: 'Understanding existing strengths and processes',
        questions: [
          {
            label: 'Current Strengths',
            questions: [
              'What is working well for you today?',
              'What aspects of your current processes would you want to preserve?'
            ],
            cue: 'Understanding successful elements to maintain',
            followUp: 'How did you achieve these successes?',
            category: 'assessment'
          }
        ]
      }
    ]
  },
  {
    name: 'General Discovery',
    key: 'general',
    description: 'High-level questions to understand current state and goals',
    icon: '🔎',
    color: '#2563EB', // Royal Blue
    order: 2,
    categories: [
      {
        name: 'Strategic Objectives',
        description: 'Understanding goals and priorities',
        questions: [
          {
            label: 'Solution Goals',
            questions: [
              'What are you looking for in a new solution?',
              'What are you looking to improve?'
            ],
            cue: 'Understanding primary objectives and pain points',
            followUp: 'How would you prioritize these improvements?',
            explanatoryFollowUps: [
              'What impact would these improvements have on your organization?',
              'How are these challenges affecting your team currently?'
            ],
            category: 'objectives'
          },
          {
            label: 'Stakeholders',
            questions: [
              'Who are the stakeholders of the evaluation?',
              'Who will participate in the sales engagements (demos, sandboxes)?'
            ],
            cue: 'Understanding decision-making process and participants',
            followUp: 'What are their primary concerns or interests?',
            category: 'stakeholders'
          }
        ]
      },
      {
        name: 'Current Operations',
        description: 'Understanding day-to-day activities and challenges',
        questions: [
          {
            label: 'Top Requests',
            questions: [
              'What are your top three most frequently requested items?',
              'Which services or requests consume most of your team\'s time?'
            ],
            cue: 'Understanding service demand and priorities',
            followUp: 'How do you currently handle these requests?',
            category: 'volume'
          },
          {
            label: 'Information Sharing',
            questions: [
              'How do you share information within your team and with those you support?',
              'What tools or channels do you use for communication?'
            ],
            cue: 'Understanding communication and collaboration patterns',
            followUp: 'What challenges do you face with current information sharing?',
            category: 'collaboration'
          }
        ]
      },
      {
        name: 'Technology & Tools',
        description: 'Understanding current technology landscape',
        questions: [
          {
            label: 'Current Toolset',
            questions: [
              'What current tools are you using to manage different areas?',
              'How integrated are these different solutions?'
            ],
            cue: 'Understanding current technology landscape',
            followUp: 'What are the main pain points with your current tools?',
            explanatoryFollowUps: [
              'Are there any "can\'t live without features" in your current solutions?',
              'What integration challenges are you facing?'
            ],
            maturityCorrections: {
              technical: 'Multiple disconnected tools suggest opportunity for consolidation',
              nontechnical: 'Siloed tools may indicate process fragmentation'
            },
            vertical_tags: ['enterprise', 'education', 'healthcare'],
            category: 'technology'
          },
          {
            label: 'Additional Needs',
            questions: [
              'Is there something you\'d like to see that we haven\'t discussed?',
              'Are there any other areas of concern we should explore?'
            ],
            cue: 'Catching missed requirements or concerns',
            followUp: 'Could you tell me more about that need?',
            category: 'requirements'
          }
        ]
      }
    ]
  },
  {
    name: 'ITSM Fundamentals',
    key: 'itsm',
    description: 'Core IT Service Management processes and practices',
    icon: '⚙️',
    color: '#F59E0B', // Amber
    order: 3,
    categories: [
      {
        name: 'Service Delivery Foundation',
        description: 'Core service delivery and operational processes',
        questions: [
          {
            label: 'ITIL Alignment',
            questions: [
              'Are you familiar with ITIL, and if so, how aligned are your processes to ITIL?',
              'How do you manage routine processes and workflows?'
            ],
            cue: 'Understanding process maturity and ITIL adoption',
            followUp: 'Which ITIL processes are most important to your organization?',
            explanatoryFollowUps: [
              'What challenges do you face in following ITIL practices?',
              'How do you balance ITIL best practices with practical needs?'
            ],
            category: 'process_maturity'
          },
          {
            label: 'Service Request Management',
            questions: [
              'How do you currently manage support requests?',
              'Who are your clients (internal/external) and what are their characteristics?',
              'What is your typical ticket volume?'
            ],
            cue: 'Understanding service desk operations and scale',
            followUp: 'What types of requests do you typically handle?',
            explanatoryFollowUps: [
              'How do different client groups needs vary?',
              'What are your peak periods for requests?'
            ],
            category: 'service_requests'
          },
          {
            label: 'SLA Management',
            questions: [
              'Are you utilizing SLAs currently?',
              'How do you ensure issues are addressed in a timely fashion?'
            ],
            cue: 'Understanding service level management maturity',
            followUp: 'What challenges do you face with meeting service levels?',
            explanatoryFollowUps: [
              'Do clients feel like requests are going unanswered?',
              'Is communication a pain point around request status?'
            ],
            category: 'sla'
          }
        ]
      },
      {
        name: 'Incident & Problem Management',
        description: 'Handling of incidents, problems, and major incidents',
        questions: [
          {
            label: 'Major Incident Management',
            questions: [
              'Do you have a major incident process? What does it look like?',
              'How do you manage major outages or issues that cause work to stop?'
            ],
            cue: 'Understanding critical incident handling',
            followUp: 'How do you communicate during major incidents?',
            explanatoryFollowUps: [
              'How do you determine if something is a major incident?',
              'What roles are involved in major incident management?'
            ],
            difficulty: 'hard',
            category: 'major_incidents'
          },
          {
            label: 'Problem Management',
            questions: [
              'Do you have a problem management process? What does it look like?',
              'How do you analyze root causes of recurring issues?'
            ],
            cue: 'Understanding problem management maturity',
            followUp: 'How do you track and manage known errors?',
            explanatoryFollowUps: [
              'How do you identify trends in incidents?',
              'What tools do you use for root cause analysis?'
            ],
            category: 'problem_management'
          }
        ]
      },
      {
        name: 'Change & Release Management',
        description: 'Managing changes and releases effectively',
        questions: [
          {
            label: 'Change Management Process',
            questions: [
              'What is your current change management process?',
              'How do you categorize and assess changes?'
            ],
            cue: 'Understanding change control maturity',
            followUp: 'How do you handle emergency changes?',
            explanatoryFollowUps: [
              'What is your change approval process?',
              'How do you assess change risk?'
            ],
            category: 'change_management'
          },
          {
            label: 'Release Management',
            questions: [
              'How do you manage and coordinate releases?',
              'What is your release planning process?'
            ],
            cue: 'Understanding release management practices',
            followUp: 'How do you handle release dependencies?',
            explanatoryFollowUps: [
              'How do you communicate release schedules?',
              'What tools do you use for release tracking?'
            ],
            category: 'release_management'
          }
        ]
      }
    ]
  },
  {
    name: 'Asset & Configuration Management',
    key: 'asset_config',
    description: 'Managing IT assets and configuration items throughout their lifecycle',
    icon: '💾',
    color: '#4F46E5', // Deep Indigo
    order: 3.5,
    categories: [
      {
        name: 'Asset Management',
        description: 'Tracking and managing IT assets throughout their lifecycle',
        questions: [
          {
            label: 'Asset Lifecycle Management',
            questions: [
              'How do you currently track and manage your IT assets?',
              'What is your process for asset procurement and retirement?'
            ],
            cue: 'Understanding asset management maturity',
            followUp: 'How do you handle asset maintenance and updates?',
            explanatoryFollowUps: [
              'What information do you track for each asset?',
              'How do you manage software licenses?'
            ],
            category: 'asset_lifecycle'
          },
          {
            label: 'Asset Relationships',
            questions: [
              'How do you track relationships between assets?',
              'How do you manage dependencies between systems?'
            ],
            cue: 'Understanding asset relationship management',
            followUp: 'How do you visualize asset relationships?',
            explanatoryFollowUps: [
              'How do you track impact of changes across related assets?',
              'What tools do you use for dependency mapping?'
            ],
            category: 'asset_relationships'
          }
        ]
      },
      {
        name: 'Configuration Management',
        description: 'Managing and tracking configuration items and their relationships',
        questions: [
          {
            label: 'CMDB Strategy',
            questions: [
              'How do you maintain your configuration management database (CMDB)?',
              'What types of CIs do you track?'
            ],
            cue: 'Understanding CMDB maturity',
            followUp: 'How do you ensure CMDB accuracy?',
            explanatoryFollowUps: [
              'How often do you audit your CMDB?',
              'What automation do you use for CI discovery?'
            ],
            category: 'cmdb'
          },
          {
            label: 'Configuration Control',
            questions: [
              'How do you manage configuration changes?',
              'What is your process for configuration baseline management?'
            ],
            cue: 'Understanding configuration control practices',
            followUp: 'How do you track configuration drift?',
            explanatoryFollowUps: [
              'How do you validate configuration changes?',
              'What tools do you use for configuration management?'
            ],
            category: 'config_control'
          }
        ]
      }
    ]
  },
  {
    name: 'Enterprise Service Management',
    key: 'esm',
    description: 'Extended service management beyond IT',
    icon: '🏢',
    color: '#EC4899', // Hot Pink
    order: 4,
    categories: [
      {
        name: 'Departmental Adoption',
        description: 'Understanding cross-department service management needs',
        questions: [
          {
            label: 'ESM Adoption',
            questions: [
              'Are there other groups using your existing platform that need migration?',
              'What other work management tools are in place across your organization?'
            ],
            cue: 'Understanding enterprise-wide service management',
            followUp: 'What departments could benefit from service management?',
            explanatoryFollowUps: [
              'What unique needs do different departments have?',
              'How do you handle cross-department service delivery?'
            ],
            difficulty: 'hard',
            insights: [
              {
                text: 'Multiple department involvement increases implementation complexity',
                type: 'warning'
              },
              {
                text: 'Look for common processes across departments',
                type: 'best_practice'
              }
            ],
            category: 'esm_adoption'
          }
        ]
      },
      {
        name: 'Process & Standards',
        description: 'Standardizing processes across departments',
        questions: [
          {
            label: 'ESM Process Standardization',
            questions: [
              'How do different departments handle their service requests?',
              'What opportunities exist for process standardization across departments?'
            ],
            cue: 'Understanding cross-department process alignment',
            followUp: 'What common services exist across departments?',
            explanatoryFollowUps: [
              'How do you handle shared services between departments?',
              'What challenges exist in standardizing processes?'
            ],
            difficulty: 'hard',
            category: 'esm_process'
          },
          {
            label: 'ESM Reporting',
            questions: [
              'How do you track and report on services across departments?',
              'What cross-department metrics would be valuable?'
            ],
            cue: 'Understanding enterprise reporting needs',
            followUp: 'How do you measure service quality across the organization?',
            difficulty: 'medium',
            category: 'esm_reporting'
          }
        ]
      }
    ]
  },
  {
    name: 'Project Management',
    key: 'ppm',
    description: 'Project and portfolio management practices',
    icon: '📊',
    color: '#7C3AED', // Vivid Purple
    order: 5,
    categories: [
      {
        name: 'Project Framework',
        description: 'Understanding project definition and methodology',
        questions: [
          {
            label: 'Project Definition',
            questions: [
              'What types of work do you typically classify as projects?',
              'How do you distinguish between operational work and project work?'
            ],
            cue: 'Understanding if work management or project management is more appropriate',
            followUp: 'What criteria do you use to determine if something should be a project?',
            explanatoryFollowUps: [
              'How do you handle work that falls between operational and project categories?',
              'What is your project approval process?'
            ],
            category: 'project_definition'
          }
        ]
      }
    ]
  },
  {
    name: 'Automation & Integration',
    key: 'automation',
    description: 'Understanding automation needs and opportunities',
    icon: '⚡',
    color: '#0284C7', // Ocean Blue
    order: 6,
    categories: [
      {
        name: 'Current State',
        description: 'Understanding existing automation and integration landscape',
        questions: [
          {
            label: 'Existing Automation',
            questions: [
              'What processes do you currently have automated?',
              'What tools or systems are involved in your automations?'
            ],
            cue: 'Understanding current automation maturity',
            followUp: 'How effective are your current automations?',
            explanatoryFollowUps: [
              'What benefits have you seen from automation?',
              'What challenges have you encountered?'
            ],
            difficulty: 'medium',
            category: 'current-state'
          }
        ]
      }
    ]
  },
  {
    name: 'Conversational AI',
    key: 'ai',
    description: 'Chatbot and virtual assistant capabilities for self-service',
    icon: '🤖',
    color: '#648901', // Teal
    order: 7,
    questions: [
      {
        label: 'Current Self-Service',
        questions: [
          'Does your organization currently utilize a chatbot, FAQ section, client portal, or knowledgebase?',
          'What self-service capabilities are you currently offering to your end users?'
        ],
        cue: 'Understanding existing self-service landscape',
        followUp: 'Does your organization have a strategy in place to improve self service?',
        explanatoryFollowUps: [
          'What has worked well with your current self-service options?',
          'What challenges have you faced with self-service adoption?'
        ],
        category: 'self-service'
      },
      {
        label: 'Automation Opportunities',
        questions: [
          'What is the low hanging fruit that we could automate when someone reaches out to ask for it?',
          'How much time are your agents spending answering repetitive questions each day?'
        ],
        cue: 'Identifying immediate automation opportunities',
        followUp: 'How is your organization currently keeping record of frequent / common questions?',
        explanatoryFollowUps: [
          'What are your most common requests for information?',
          'Which requests take the most time to handle?'
        ],
        category: 'automation'
      },
      {
        label: 'Service Channels',
        questions: [
          'What are the entry points you envision your end users use to reach out?',
          'How does your organization tackle service across multiple channels (voice, social, text, email, forms, etc)?'
        ],
        cue: 'Understanding service channel strategy',
        followUp: 'Which channels generate the most volume?',
        explanatoryFollowUps: [
          'Would you want chatbot integration with Teams?',
          'Are there specific channels you want to prioritize for automation?'
        ],
        vertical_tags: ['enterprise', 'education', 'healthcare'],
        category: 'channels'
      },
      {
        label: 'Support Hours',
        questions: [
          'Is your organization interested in providing around the clock support to end users?',
          'How is your organization currently handling user questions that come in when no one is in office?'
        ],
        cue: 'Understanding after-hours support needs',
        followUp: 'Would it be helpful at anytime for it to kick over to a live person if they can\'t get the assistance they need?',
        explanatoryFollowUps: [
          'What types of issues need immediate response?',
          'How do you prioritize after-hours requests?'
        ],
        category: 'hours'
      },
      {
        label: 'Service Capacity',
        questions: [
          'About how many questions per day do you think an agent can tackle?',
          'How much time per week do your teams spend responding to customer service requests?'
        ],
        cue: 'Understanding service volume and capacity',
        followUp: 'On average how long are end users waiting from start to finish to receive service?',
        explanatoryFollowUps: [
          'What impacts your response times?',
          'How do you manage peak periods?'
        ],
        category: 'capacity'
      }
    ]
  },
  {
    name: 'Freshservice Competitor Analysis',
    key: 'freshservice',
    description: 'Questions to highlight TeamDynamix differentiators against Freshservice',
    icon: '🎯',
    color: '#A855F7', // Bright Purple
    order: 8,
    questions: [
      {
        label: 'Form Flexibility and Customization',
        questions: [
          'Do you currently track different types of incidents, requests, or changes? Would you need to track different types of fields or information for these?',
          'Have you had feedback from clients that they don\'t want to submit tickets because the forms are too cumbersome?',
          'Is it important for you to tailor the data you capture for different elements beyond what is available out of the box?'
        ],
        cue: 'Highlighting TDX\'s superior form customization capabilities',
        followUp: 'On a scale of 1-5, how important is having complete control over form fields and layouts?',
        explanatoryFollowUps: [
          'How many different types of forms do you anticipate needing?',
          'What are some examples of custom fields you\'d need that might not be standard?',
          'How often do you need to modify your forms based on feedback?'
        ],
        category: 'forms'
      },
      {
        label: 'Data Security and Access Control',
        questions: [
          'Do you collect sensitive data or have data you want to restrict to specific individuals within a team?',
          'How do you currently handle security-sensitive tickets or PII data?'
        ],
        cue: 'Emphasizing TDX\'s granular security controls',
        followUp: 'On a scale of 1-5, how critical is having fine-grained access control for sensitive data?',
        explanatoryFollowUps: [
          'What types of sensitive data do you need to protect?',
          'Which teams need special data access restrictions?',
          'How do you currently manage access to sensitive information?'
        ],
        category: 'security'
      },
      {
        label: 'Workflow Complexity',
        questions: [
          'What sort of processes are you managing today?',
          'Do you find that you may need to manage processes with some tasks that happen simultaneously but others that may need to happen in series?',
          'Do you leverage ticket data to conditionally determine if some steps need to be done?'
        ],
        cue: 'Highlighting TDX\'s advanced workflow capabilities',
        followUp: 'On a scale of 1-5, how important is having flexible, parallel workflow capabilities?',
        explanatoryFollowUps: [
          'Can you describe a complex workflow you\'d like to automate?',
          'How do you handle parallel tasks in your current processes?',
          'What kind of conditional logic do you need in your workflows?'
        ],
        category: 'workflow'
      },
      {
        label: 'Reporting Capabilities',
        questions: [
          'Is there data specific to your processes that you\'d like to collect and report on?',
          'Do you find it difficult to create custom reports in your systems today?',
          'Are there non-technical individuals who would like to be able to build their reports but don\'t know SQL?'
        ],
        cue: 'Emphasizing TDX\'s real-time, user-friendly reporting',
        followUp: 'On a scale of 1-5, how important is having real-time, easy-to-build custom reports?',
        explanatoryFollowUps: [
          'What are your most important reporting needs?',
          'Who needs to be able to create and modify reports?',
          'How quickly do you need to see new data reflected in reports?'
        ],
        category: 'reporting'
      },
      {
        label: 'Asset Management Capabilities',
        questions: [
          'Do you currently or would it be beneficial to track assets by location?',
          'Do you have multiple groups, like building operations, or facilities, who would like to track asset information?',
          'Do you collect different types of information for different types of assets?'
        ],
        cue: 'Highlighting TDX\'s comprehensive asset management',
        followUp: 'On a scale of 1-5, how valuable would it be to have customizable asset tracking for different departments?',
        explanatoryFollowUps: [
          'What types of assets do different departments need to track?',
          'How do you currently manage asset locations and relationships?',
          'What asset-related reporting do you need?'
        ],
        category: 'asset_management'
      },
      {
        label: 'Project Portfolio Management',
        questions: [
          'How do you manage projects today?',
          'Have you run into issues where your resources are over-scheduled?',
          'Are you running project requests through an approval process?'
        ],
        cue: 'Emphasizing TDX\'s integrated PPM capabilities',
        followUp: 'On a scale of 1-5, how important is having unified service and project management?',
        explanatoryFollowUps: [
          'How do you currently balance operational and project work?',
          'What challenges do you face with resource allocation?',
          'How do you prioritize and approve project requests?'
        ],
        category: 'ppm'
      }
    ]
  },
  {
    name: 'HaloITSM Competitor Analysis',
    key: 'haloitsm',
    description: 'Questions to highlight TeamDynamix differentiators against HaloITSM',
    icon: '🎪',
    color: '#EA580C', // Burnt Orange
    order: 9,
    questions: [
      {
        label: 'Enterprise Service Management',
        questions: [
          'Are there departments outside of IT that would benefit from or are currently using your service management tool?',
          'Would groups outside of IT need unique configurations? Would they mind having their data co-mingled with IT?',
          'Is it important that groups outside of IT can update their settings and configurations in a codeless manner?'
        ],
        cue: 'Highlighting TDX\'s superior multi-department capabilities',
        followUp: 'On a scale of 1-5, how important is departmental separation and configuration flexibility?',
        explanatoryFollowUps: [
          'Which departments would need their own service applications?',
          'How are these departments managing their work today?',
          'What level of IT involvement would be ideal for managing these department-specific configurations?'
        ],
        category: 'esm',
        maturityCorrections: {
          technical: 'Limited departmental separation indicates basic ESM maturity',
          nontechnical: 'Departments need autonomy while maintaining governance'
        }
      },
      {
        label: 'Conversational AI Integration',
        questions: [
          'Is providing integrated conversational AI or chatbot features important for your self-service initiatives?',
          'How do you envision AI enhancing your service delivery?'
        ],
        cue: 'Emphasizing TDX\'s native CAI capabilities',
        followUp: 'On a scale of 1-5, how important is having native AI capabilities versus third-party integrations?',
        explanatoryFollowUps: [
          'What self-service processes would you want to automate with AI?',
          'How do you measure the success of your self-service initiatives?',
          'What challenges have you faced with current self-service options?'
        ],
        category: 'cai'
      },
      {
        label: 'Knowledge Management Integration',
        questions: [
          'How do you currently manage and create knowledge?',
          'Do you find that knowledge creation is often an afterthought or gets lost?',
          'Have you considered solutions that ensure knowledge creation can be part of ticket management?'
        ],
        cue: 'Highlighting TDX\'s integrated knowledge management',
        followUp: 'On a scale of 1-5, how valuable would it be to create knowledge articles directly from ticket resolutions?',
        explanatoryFollowUps: [
          'How do you currently share knowledge with end users during ticket updates?',
          'What challenges do you face with knowledge article creation and maintenance?',
          'How do you ensure knowledge stays current and relevant?'
        ],
        category: 'knowledge'
      },
      {
        label: 'Integration and Automation Capabilities',
        questions: [
          'What integrations do you have in place today?',
          'How important is integration for your strategies moving forward?',
          'What automation capabilities are you looking for beyond out-of-the-box options?'
        ],
        cue: 'Emphasizing TDX\'s enterprise automation capabilities',
        followUp: 'On a scale of 1-5, how important is having flexible, no-code automation tools?',
        explanatoryFollowUps: [
          'What are your most critical integration needs?',
          'What processes would you like to automate?',
          'How do you currently handle custom automation requirements?'
        ],
        category: 'integration'
      },
      {
        label: 'Mobile and Field Service',
        questions: [
          'How do your technicians in the field currently manage tickets or assets?',
          'Is mobile functionality important to you?',
          'What mobile capabilities would most benefit your field staff?'
        ],
        cue: 'Highlighting TDX\'s comprehensive mobile capabilities',
        followUp: 'On a scale of 1-5, how important is having robust mobile asset and ticket management?',
        explanatoryFollowUps: [
          'What percentage of your work is done in the field?',
          'What specific tasks do field technicians need to perform?',
          'How do you currently track asset updates in the field?'
        ],
        category: 'mobile'
      },
      {
        label: 'Accessibility and Compliance',
        questions: [
          'Who are your customers/clients?',
          'Do any of them require accessibility features to submit tickets or interact with your portal?',
          'What accessibility standards do you need to meet?'
        ],
        cue: 'Emphasizing TDX\'s commitment to accessibility',
        followUp: 'On a scale of 1-5, how critical is having WCAG 2.1 AA compliant interfaces?',
        explanatoryFollowUps: [
          'What specific accessibility requirements do you need to meet?',
          'How do you currently accommodate users with accessibility needs?',
          'What accessibility challenges have you encountered?'
        ],
        category: 'accessibility'
      },
      {
        label: 'Reporting and Analytics',
        questions: [
          'Do you find it difficult to create custom reports in your systems today?',
          'Are there non-technical individuals who would like to be able to build their reports but don\'t know SQL?',
          'What kind of real-time analytics do you need?'
        ],
        cue: 'Highlighting TDX\'s user-friendly reporting capabilities',
        followUp: 'On a scale of 1-5, how important is having no-code report building capabilities?',
        explanatoryFollowUps: [
          'Who needs to be able to create and modify reports?',
          'What are your most important reporting needs?',
          'How quickly do you need to see data updates in reports?'
        ],
        category: 'reporting'
      },
      {
        label: 'Project and Work Management',
        questions: [
          'How do you manage projects today?',
          'Do you find it challenging to get a holistic picture of all work being performed?',
          'How do you balance project work with operational work?'
        ],
        cue: 'Emphasizing TDX\'s unified work management platform',
        followUp: 'On a scale of 1-5, how valuable would it be to manage all work types in a single platform?',
        explanatoryFollowUps: [
          'What types of work do you need to manage beyond service requests?',
          'How do you currently prioritize different types of work?',
          'What challenges do you face with work visibility across teams?'
        ],
        category: 'ppm'
      },
      {
        label: 'Portfolio Management',
        questions: [
          'How do you currently manage your project portfolio?',
          'What metrics do you use to evaluate portfolio health?',
          'How do you prioritize and select projects for your portfolio?'
        ],
        cue: 'Understanding portfolio management maturity',
        followUp: 'What portfolio-level insights would be most valuable to your organization?',
        explanatoryFollowUps: [
          'How do you track portfolio alignment with strategic goals?',
          'What challenges do you face with portfolio optimization?',
          'How do you manage resource constraints across the portfolio?'
        ],
        category: 'portfolio'
      },
      {
        label: 'Resource Management',
        questions: [
          'How do you track resource utilization across projects?',
          'What challenges do you face with capacity planning?',
          'How do you handle resource conflicts between projects?'
        ],
        cue: 'Understanding resource management needs',
        followUp: 'What resource management capabilities would most benefit your organization?',
        explanatoryFollowUps: [
          'How do you forecast resource needs?',
          'What visibility do you need into resource availability?',
          'How do you balance resource allocation between projects and operations?'
        ],
        category: 'resources'
      },
      {
        label: 'Change Management',
        questions: [
          'How do you manage and track changes across your organization?',
          'What is your current change approval process?',
          'How do you assess and mitigate change risks?'
        ],
        cue: 'Understanding change management maturity',
        followUp: 'What aspects of change management need the most improvement?',
        explanatoryFollowUps: [
          'How do you handle emergency changes?',
          'What challenges do you face with change communication?',
          'How do you measure change success?'
        ],
        category: 'change'
      },
      {
        label: 'Asset Management',
        questions: [
          'How do you currently track and manage IT assets?',
          'What is your process for asset lifecycle management?',
          'How do you handle software license management?'
        ],
        cue: 'Understanding asset management needs',
        followUp: 'What asset management capabilities are most important to you?',
        explanatoryFollowUps: [
          'How do you track asset relationships and dependencies?',
          'What challenges do you face with asset tracking?',
          'How do you manage asset maintenance and updates?'
        ],
        category: 'assets'
      }
    ]
  }
];