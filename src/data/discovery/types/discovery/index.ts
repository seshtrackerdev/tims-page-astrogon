export * from './resources';
export * from './public-requestor';
export * from './people-import';

export interface Connector {
  id: string;
  name: string;
  description: string;
  type: string;
  category: string;
  status: string;
} 