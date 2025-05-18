import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { ResourceModule } from '../../types/discovery/resources';
import { ResourceCard } from './ResourceCard';

interface ResourceBankProps {
  resources: ResourceModule[];
}

export const ResourceBank: React.FC<ResourceBankProps> = ({ resources }) => {
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);
  const resourceRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const fromSearchRef = useRef<boolean>(false);

  // Create a memoized event handler
  const handleResourceSelect = useCallback((e: CustomEvent<{resourceId: string}>) => {
    const { resourceId } = e.detail;
    setSelectedResourceId(resourceId);
    fromSearchRef.current = true;
    
    // Find the resource
    const selectedResource = resources.find(r => r.id === resourceId);
    
    // If resource has a URL, open it in a new tab
    if (selectedResource && 'url' in selectedResource && selectedResource.url) {
      window.open(selectedResource.url, '_blank', 'noopener,noreferrer');
    }
    
    // Scroll to the selected resource
    setTimeout(() => {
      if (resourceRefs.current[resourceId]) {
        resourceRefs.current[resourceId]?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        });
        
        // Add highlight animation
        resourceRefs.current[resourceId]?.classList.add('highlight-resource');
        
        // Remove highlight after animation completes
        setTimeout(() => {
          resourceRefs.current[resourceId]?.classList.remove('highlight-resource');
        }, 2000);
      }
    }, 100);
  }, [resources]);
  
  // Register for search results
  useEffect(() => {
    document.addEventListener('selectResourceFromSearch', handleResourceSelect as EventListener);
    
    return () => {
      document.removeEventListener('selectResourceFromSearch', handleResourceSelect as EventListener);
    };
  }, [handleResourceSelect]);

  // Create a memoized ref callback
  const setResourceRef = useCallback((el: HTMLDivElement | null, id: string) => {
    if (resourceRefs.current) {
      resourceRefs.current[id] = el;
    }
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Resources list */}
      <div 
        ref={containerRef}
        className="flex-1 p-3 overflow-y-auto custom-scrollbar"
        style={{ height: 'calc(100vh - 14rem)', maxHeight: 'unset' }}
      >
        <div className="grid grid-cols-1 gap-3 animate-fadeIn pb-8">
          {resources.length > 0 ? (
            resources.map((resource, index) => (
              <div 
                key={resource.id}
                ref={(el) => setResourceRef(el, resource.id)}
                className={`resource-card-container ${selectedResourceId === resource.id ? 'selected-resource' : ''}`}
              >
                <ResourceCard 
                  resource={resource} 
                  forceExpanded={selectedResourceId === resource.id && fromSearchRef.current}
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