import type { PublicRequestorModule } from './public-requestor';
import type { PeopleImportModule } from './people-import';
import type { ReleaseNotesModule } from './release-notes';

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export interface FAQModule {
  id: string;
  title: string;
  description: string;
  type: 'faq';
  url?: string;
  tags: string[];
  faqs: FAQ[];
}

export interface ComplianceStandard {
  id: string;
  name: string;
  shortName?: string;
  status: 'aligned' | 'not_aligned';
  notes?: string;
  documentationUrl?: string;
}

export interface ComplianceStandardsModule {
  id: string;
  title: string;
  description: string;
  type: 'compliance';
  url?: string;
  tags: string[];
  standards: ComplianceStandard[];
}

export interface Connector {
  id: string;
  name: string;
  description: string;
  type: string;
  category: string;
  status: string;
}

export interface ConnectorsModule {
  id: string;
  title: string;
  description: string;
  type: 'connectors';
  url?: string;
  tags: string[];
  connectors: Connector[];
}

export type ResourceModule = 
  | FAQModule 
  | ComplianceStandardsModule 
  | PublicRequestorModule
  | PeopleImportModule
  | ReleaseNotesModule
  | ConnectorsModule;

export type ResourceType = ResourceModule['type']; 