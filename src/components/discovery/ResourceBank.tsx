import React from 'react';
import type { ResourceModule } from '../../types/discovery/resources';
import { ResourceCard } from './ResourceCard';

interface ResourceBankProps {
  resources: ResourceModule[];
}

export const ResourceBank: React.FC<ResourceBankProps> = ({ resources }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Resources list */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 gap-4 animate-fadeIn">
          {resources.length > 0 ? (
            resources.map((resource, index) => (
              <ResourceCard 
                key={resource.id} 
                resource={resource} 
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: `slideUp 0.4s ease-out ${index * 0.1}s forwards`
                }}
              />
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              No resources available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 