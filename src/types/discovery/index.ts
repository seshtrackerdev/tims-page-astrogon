export * from './resources';
export * from './public-requestor';
export * from './people-import';
export * from './release-notes';

export interface Connector {
  id: string;
  name: string;
  description: string;
  type: string;
  category: string;
  status: string;
} 