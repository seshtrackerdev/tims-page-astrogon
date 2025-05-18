import React, { useState, useEffect, useRef } from 'react';
import type { ResourceModule } from '../../types/discovery/resources';
import { ResourceCard } from './ResourceCard';

interface ResourceBankProps {
  resources: ResourceModule[];
}

export const ResourceBank: React.FC<ResourceBankProps> = ({ resources }) => {
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);
  const resourceRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Register for search results
  useEffect(() => {
    const handleResourceSelect = (e: CustomEvent<{resourceId: string}>) => {
      const { resourceId } = e.detail;
      setSelectedResourceId(resourceId);
      
      // Scroll to the selected resource
      setTimeout(() => {
        if (resourceRefs.current[resourceId]) {
          resourceRefs.current[resourceId]?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
          
          // Add highlight animation
          resourceRefs.current[resourceId]?.classList.add('highlight-resource');
          
          // Remove highlight after animation completes
          setTimeout(() => {
            resourceRefs.current[resourceId]?.classList.remove('highlight-resource');
          }, 2000);
        }
      }, 100);
    };
    
    document.addEventListener('selectResourceFromSearch', handleResourceSelect as EventListener);
    
    return () => {
      document.removeEventListener('selectResourceFromSearch', handleResourceSelect as EventListener);
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Resources list */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 gap-4 animate-fadeIn">
          {resources.length > 0 ? (
            resources.map((resource, index) => (
              <div 
                key={resource.id}
                ref={el => resourceRefs.current[resource.id] = el}
                className={`resource-card-container ${selectedResourceId === resource.id ? 'selected-resource' : ''}`}
              >
                <ResourceCard 
                  resource={resource} 
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animation: `slideUp 0.4s ease-out ${index * 0.1}s forwards`
                  }}
                />
              </div>
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