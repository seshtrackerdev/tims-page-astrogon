export type ComplianceStatus = 'aligned' | 'not_aligned';

export interface ComplianceStandard {
  id: string;
  name: string;
  shortName?: string;
  status: ComplianceStatus;
  notes?: string;
  documentationUrl?: string;
}

export const COMPLIANCE_STANDARDS = {
  id: 'compliance-standards',
  title: 'Compliance Standard Alignments',
  description: 'Details about different compliance standards, questionnaires, and how TeamDynamix complies.',
  type: 'compliance' as const,
  url: 'https://solutions.teamdynamix.com/compliance',
  tags: ['Compliance', 'Security', 'Standards'],
  standards: [
    {
      id: 'ccpa',
      name: 'California Consumer Privacy Act (CCPA)',
      shortName: 'CCPA',
      status: 'not_aligned',
      notes: 'Involve Pre-Sales when this is asked of us.'
    },
    {
      id: 'csa-star',
      name: 'Cloud Security Alliance (CSA) STAR self-assessment',
      shortName: 'CSA STAR',
      status: 'not_aligned'
    },
    {
      id: 'caiq',
      name: 'Consensus Assessment Initiative Questionnaire (CAIQ)',
      shortName: 'CAIQ',
      status: 'aligned'
    },
    {
      id: 'ferpa',
      name: 'Family Educational Rights and Privacy Act (FERPA)',
      shortName: 'FERPA',
      status: 'aligned',
      notes: 'Involve Pre-Sales when this is asked of us. FERPA does not require nor recognize audits or other certifications, so any institution that is subject to FERPA must assess for itself whether and how its use of various applications affects its ability to comply with these requirements. Our full FERPA statement is housed here.',
      documentationUrl: '#'
    },
    {
      id: 'fisma',
      name: 'Federal Information Security Management Act (FISMA)',
      shortName: 'FISMA',
      status: 'aligned',
      notes: 'Involve Pre-Sales when this is asked of us.'
    },
    {
      id: 'gdpr',
      name: 'General Data Protection Regulation (GDPR)',
      shortName: 'GDPR',
      status: 'aligned'
    },
    {
      id: 'glba',
      name: 'Gramm Leach Bliley Act (GLBA)',
      shortName: 'GLBA',
      status: 'not_aligned',
      notes: 'If this is asked of us we need to further analyze the RFP. This act applies to financial institutions and most likely indicates that we should not respond to the RFP.'
    },
    {
      id: 'hipaa',
      name: 'Health Insurance Portability and Accountability Act (HIPAA)',
      shortName: 'HIPAA',
      status: 'aligned',
      notes: 'Involve Pre-Sales when this is asked of us. HIPAA does not require nor recognize audits or other certifications, so any institution that is subject to HIPAA must assess for itself whether and how its use of various applications affects its ability to comply with these requirements. Our full HIPPA statement is housed here.',
      documentationUrl: '#'
    },
    {
      id: 'iso-27001',
      name: 'ISO/IEC 27001',
      shortName: 'ISO 27001',
      status: 'not_aligned'
    },
    {
      id: 'nist-800-53',
      name: 'NIST SP 800-53',
      shortName: 'NIST 800-53',
      status: 'aligned',
      notes: 'There are three classes: low, moderate, high. We are compliant for only low and moderate.'
    },
    {
      id: 'nist-800-128',
      name: 'NIST SP 800-128',
      shortName: 'NIST 800-128',
      status: 'not_aligned'
    },
    {
      id: 'nist-800-171',
      name: 'NIST SP 800-171',
      shortName: 'NIST 800-171',
      status: 'not_aligned'
    },
    {
      id: 'nist-800-204',
      name: 'NIST SP 800-204',
      shortName: 'NIST 800-204',
      status: 'not_aligned'
    },
    {
      id: 'nist-800-210',
      name: 'NIST SP 800-210',
      shortName: 'NIST 800-210',
      status: 'not_aligned'
    },
    {
      id: 'soc2-type2',
      name: 'SOC 2 Type II',
      shortName: 'SOC2 Type II',
      status: 'aligned',
      notes: 'TeamDynamix has completed its initial SOC2 (SOC 2; SOC II) audit and a report has been published with the auditor\'s (Schneider-Downs) findings. From time-to-time, customers and/or prospects may request access to the report. A conservative approach to sharing the report shall be taken. Read here for more information.',
      documentationUrl: '#'
    },
    {
      id: 'fedramp',
      name: 'The Federal Risk and Authorization Management Program (FedRAMP)',
      shortName: 'FedRAMP',
      status: 'not_aligned',
      notes: 'We do not meet this standard. We cannot present our SOC2 compliance as a replacement when we are asked for this.'
    },
    {
      id: 'wcag',
      name: 'Web Content Accessibility Guidelines (WCAG) 2.1',
      shortName: 'WCAG 2.1',
      status: 'aligned',
      notes: 'Our Client Portal is 100% WCAG 2.1 AA compliant. Many areas of TDNext and Admin are WCAG 2.0 compliant. Please refer to the VPAT for detailed compliance information'
    }
  ]
}; 