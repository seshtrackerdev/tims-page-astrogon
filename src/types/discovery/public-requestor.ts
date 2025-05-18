export interface PublicRequestorModule {
  id: string;
  title: string;
  description: string;
  type: 'public-requestor';
  formFields: {
    name: string;
    required: boolean;
    notes: string;
  }[];
  matchingOptions: {
    title: string;
    description: string;
    note?: string;
  }[];
} 