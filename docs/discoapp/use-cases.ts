export interface UseCase {
  id: string;
  title: string;
  description: string;
  category?: string;
}

export interface UseCaseCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  useCases: UseCase[];
}

export const CAI_USE_CASES = {
  id: 'cai-use-cases',
  title: 'Conversational AI Use Case Playbook',
  description: 'Common use cases for implementing Conversational AI across different departments.',
  type: 'use-cases' as const,
  url: 'https://solutions.teamdynamix.com/TDClient/1965/Portal/KB/PrintArticle?ID=152229',
  categories: [
    {
      id: 'it',
      name: 'IT Groups',
      description: 'Optimize IT support efficiency and enhance customer experience by leveraging Conversational AI.',
      icon: 'M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm4 3a1 1 0 011-1h6a1 1 0 110 2H9a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H9a1 1 0 01-1-1zm-3 4a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1z',
      useCases: [
        {
          id: 'password-reset',
          title: 'Password Reset',
          description: 'Assist employees in resetting their passwords securely and efficiently.'
        },
        {
          id: 'permission-changes',
          title: 'Permission Changes',
          description: 'Allow employees to request and manage changes to access permissions for various systems, applications, and files.'
        },
        {
          id: 'software-license',
          title: 'Software License Management',
          description: 'Assist employees in understanding and managing software licenses, including providing information on available licenses and renewal processes.'
        },
        {
          id: 'kb-access',
          title: 'Knowledge Base Access',
          description: 'Provide quick access to the organization\'s knowledge base for self-help and troubleshooting guides.'
        },
        {
          id: 'system-status',
          title: 'System Status Updates',
          description: 'Share real-time updates on system outages, maintenance schedules, and other IT-related notifications.'
        },
        {
          id: 'onboarding-it',
          title: 'Onboarding and Offboarding Support',
          description: 'Provide guidance and assistance during the onboarding and offboarding processes, including setting up accounts, access privileges, and equipment.'
        },
        {
          id: 'software-updates',
          title: 'Software Updates and Patching',
          description: 'Notify employees about software updates, security patches, and schedule automated installations.'
        },
        {
          id: 'hardware-inventory',
          title: 'Hardware Inventory and Requests',
          description: 'Help employees with hardware inventory queries, asset tracking, and placing requests for new equipment.'
        },
        {
          id: 'it-policies',
          title: 'IT Policies and Guidelines',
          description: 'Share information on IT policies, guidelines, and acceptable use of technology within the organization.'
        },
        {
          id: 'vpn-setup',
          title: 'VPN Setup',
          description: 'Guide users through the process of setting up and using a virtual private network (VPN) for secure remote access.'
        },
        {
          id: 'mobile-support',
          title: 'Mobile Device Support',
          description: 'Users can receive assistance with mobile device configuration, troubleshooting, or access to corporate resources.'
        },
        {
          id: 'license-renewals',
          title: 'License Renewals',
          description: 'Assist users with license renewal processes, ensuring their software remains up-to-date and valid.'
        },
        {
          id: 'network-troubleshooting',
          title: 'Network Troubleshooting',
          description: 'Users can receive step-by-step instructions on how to troubleshoot common network issues, such as slow connections or Wi-Fi problems.'
        },
        {
          id: 'printer-setup',
          title: 'Printer Setup and Configuration',
          description: 'Assist users in setting up and configuring printers, resolving common printing issues, and providing maintenance tips.'
        },
        {
          id: 'ticket-status',
          title: 'Checking Ticket Status',
          description: 'Users can check ticket statuses, and provide updates to their requests.'
        }
      ]
    },
    {
      id: 'hr',
      name: 'HR Groups',
      description: 'Streamline HR tasks, provide personalized support, and handle routine inquiries effortlessly.',
      icon: 'M12 4.354a4 4 0 110 5.292V14H9a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1v-6a1 1 0 00-1-1h-3V9.646a4 4 0 110-5.292zM9.354 8a2 2 0 100-4 2 2 0 000 4zm9.292 0a2 2 0 100-4 2 2 0 000 4zM5.354 8a2 2 0 100-4 2 2 0 000 4z',
      useCases: [
        {
          id: 'employee-onboarding',
          title: 'Employee Onboarding',
          description: 'Provide information and answer questions regarding the onboarding process, forms, policies, and procedures for new hires.'
        },
        {
          id: 'employee-offboarding',
          title: 'Employee Offboarding',
          description: 'Guide departing employees through the offboarding process, providing information on exit interviews, return of company assets, and final payments.'
        },
        {
          id: 'leave-management',
          title: 'Leave Management',
          description: 'Employees can check their PTO balances, submit leave requests, and receive updates on the status of their requests.'
        },
        {
          id: 'employee-self-service',
          title: 'Employee Self-service',
          description: 'Employees can find and access information related to their benefits, payroll, policies, and company resources.'
        },
        {
          id: 'hr-policy',
          title: 'HR Policy and Procedure Inquiries',
          description: 'Provide instant answers to questions about HR policies, procedures, and guidelines, ensuring consistent and accurate information is available to employees.'
        },
        {
          id: 'benefits-enrollment',
          title: 'Benefits Enrollment',
          description: 'Employees can ask questions to understand available benefits, compare options, and enroll in benefits programs.'
        },
        {
          id: 'payroll-assistance',
          title: 'Payroll Assistance',
          description: 'Assist employees with payroll-related queries, such as understanding pay stubs, tax withholding, or direct deposit setup.'
        },
        {
          id: 'employee-recognition',
          title: 'Employee Recognition and Rewards',
          description: 'Provide information on employee recognition programs, nominations, and rewards, boosting employee morale and engagement.'
        },
        {
          id: 'job-applications',
          title: 'Job Applications',
          description: 'Answer questions about the application requirements, and guide applicants through the submission process.'
        },
        {
          id: 'holiday-schedule',
          title: 'Holiday Schedule',
          description: 'Employees can inquire about upcoming holidays, check the designated days off, and clarify any confusion regarding holiday policies.'
        },
        {
          id: 'retirement-plans',
          title: 'Retirement Plans',
          description: 'Employees can seek guidance on available retirement plans, contribution options, and eligibility requirements.'
        },
        {
          id: 'healthcare-policy',
          title: 'Health Care Policy',
          description: 'Inquire about available health care coverage, understand the enrollment process, and obtain details about benefits, including medical, dental, and vision plans.'
        }
      ]
    },
    {
      id: 'facilities',
      name: 'Facilities Groups',
      description: 'Faster response times for facilities, streamlined work orders, and improved communication.',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      useCases: [
        {
          id: 'building-maintenance',
          title: 'Reporting Building Maintenance Issues',
          description: 'Report maintenance issues, such as broken equipment or faulty lighting, directly to the facilities group.'
        },
        {
          id: 'access-requests',
          title: 'Access Requests',
          description: 'Employees can request access to restricted areas or special facilities, streamlining the process and reducing administrative work.'
        },
        {
          id: 'parking-assistance',
          title: 'Parking Assistance',
          description: 'Inquire about available parking spaces, request parking permits, or get directions to parking lots.'
        },
        {
          id: 'equipment-reservations',
          title: 'Equipment Reservations',
          description: 'Employees can request and reserve equipment, such as projectors or laptops for their meetings or presentations.'
        },
        {
          id: 'lawn-care',
          title: 'Lawn Care Requests',
          description: 'Employees can submit lawn care requests for their specific areas within the organization\'s premises.'
        },
        {
          id: 'room-reservation',
          title: 'Room Reservation',
          description: 'Check room availability and reserve conference rooms or other facilities for meetings or events.'
        },
        {
          id: 'facility-booking',
          title: 'Facility Booking Status',
          description: 'Provide updates on the status of facility bookings, including confirmation, cancellation, or any changes made.'
        },
        {
          id: 'janitorial-requests',
          title: 'Janitorial Requests',
          description: 'Employees can submit janitorial requests for cleaning services within the organization\'s premises.'
        },
        {
          id: 'wayfinding',
          title: 'Way Finding Assistance',
          description: 'Employees, visitors, or clients can receive assistance with navigation and way finding within the organization\'s premises.'
        },
        {
          id: 'facility-tours',
          title: 'Facility Tours',
          description: 'Schedule and provide information about guided facility tours for new employees or visitors.'
        },
        {
          id: 'facilities-faqs',
          title: 'Facilities FAQs',
          description: 'Provide instant answers to frequently asked questions about facilities, such as parking information, building policies, or facility hours.'
        }
      ]
    }
  ]
}; 