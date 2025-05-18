export interface PeopleImportModule {
  id: string;
  title: string;
  description: string;
  type: 'people-import';
  documentationUrl?: string;
  recordTypes: {
    type: string;
    description: string;
    usage: string;
  }[];
  methods: {
    id: string;
    name: string;
    description: string;
    steps: string[];
    notes?: string[];
  }[];
  schedules: {
    [key: string]: {
      name: string;
      windows: {
        time: string;
        description: string;
      }[];
    };
  };
  limitations: {
    apiChanges: string[];
    generalNotes: string[];
  };
} 