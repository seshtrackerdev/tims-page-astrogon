export interface ReleaseNoteFeature {
  title: string;
  description: string;
  category: 'New Feature' | 'Enhancement' | 'Bug Fix' | 'Security' | 'Deprecated';
  module?: string;
  tags: string[];
}

export interface ReleaseNote {
  id: string;
  version: string;
  releaseDate: Date;
  title: string;
  description: string;
  features: ReleaseNoteFeature[];
  tags: string[];
}

export interface ReleaseNotesModule {
  id: string;
  title: string;
  description: string;
  type: 'release-notes';
  url?: string;
  notes: ReleaseNote[];
} 