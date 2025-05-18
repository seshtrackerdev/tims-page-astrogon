export interface DiscoveryModule {
  name: string;
  key: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  categories?: DiscoveryCategory[];
  questions?: DiscoveryQuestion[]; // For modules that have direct questions
}

export interface DiscoveryCategory {
  name: string;
  description: string;
  questions: DiscoveryQuestion[];
}

export interface DiscoveryQuestion {
  label: string;
  questions: string[];
  cue: string;
  followUp: string;
  explanatoryFollowUps?: string[];
  category: string;
  insights?: {
    text: string;
    type: 'warning' | 'tip' | 'best_practice';
  }[];
  maturityCorrections?: {
    technical: string;
    nontechnical: string;
  };
  vertical_tags?: string[];
  relevantResources?: {
    title: string;
    url: string;
    type: string;
  }[];
  examples?: {
    scenario: string;
    response: string;
  }[];
} 