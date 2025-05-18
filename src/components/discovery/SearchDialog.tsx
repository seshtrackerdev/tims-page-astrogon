import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { DiscoveryModule, DiscoveryQuestion } from '@/types/discovery';
import type { ResourceModule } from '@/types/discovery/resources';
import Fuse from 'fuse.js';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface SearchDialogProps {
  modules: DiscoveryModule[];
  resources: ResourceModule[];
  onSelectQuestion?: (module: DiscoveryModule, question: DiscoveryQuestion) => void;
  onSelectResource?: (resource: ResourceModule) => void;
}

// Create a type for search results
type SearchResult = 
  | { type: 'question'; module: DiscoveryModule; item: DiscoveryQuestion; }
  | { type: 'resource'; item: ResourceModule; };

export const SearchDialog: React.FC<SearchDialogProps> = ({ 
  modules, 
  resources, 
  onSelectQuestion,
  onSelectResource
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Prepare search data with useMemo to avoid recreating on every render
  const { allSearchData, fuseInstance } = useMemo(() => {
    // Prepare questions data for search
    const questionSearchData = modules.flatMap(module => {
      // Handle modules with categories
      if (module.categories) {
        return module.categories.flatMap(category => 
          category.questions.map(question => ({
            type: 'question' as const,
            module,
            item: question
          }))
        );
      }
      // Handle modules with direct questions
      if (module.questions) {
        return module.questions.map(question => ({
          type: 'question' as const,
          module,
          item: question
        }));
      }
      return [];
    });

    // Prepare resources data for search
    const resourceSearchData = resources.map(resource => ({
      type: 'resource' as const,
      item: resource
    }));

    // Combine all search data
    const allData = [...questionSearchData, ...resourceSearchData];

    // Initialize Fuse search
    const fuseOptions = {
      keys: [
        // Question search keys
        'item.label',
        'item.questions',
        'item.cue',
        'item.followUp',
        'item.explanatoryFollowUps',
        'item.category',
        'module.name',
        'module.description',
        // Resource search keys
        'item.title',
        'item.description',
        'item.tags',
        // Individual resource types
        ...(resourceSearchData.length > 0 && resourceSearchData[0]?.item.type === 'faq' 
          ? ['item.faqs.question', 'item.faqs.answer', 'item.faqs.category'] 
          : []),
        ...(resourceSearchData.length > 0 && resourceSearchData[0]?.item.type === 'compliance' 
          ? ['item.standards.name', 'item.standards.description', 'item.standards.controls.title', 'item.standards.controls.description'] 
          : []),
        ...(resourceSearchData.length > 0 && resourceSearchData[0]?.item.type === 'release-notes' 
          ? ['item.notes.title', 'item.notes.description', 'item.notes.features.title', 'item.notes.features.description'] 
          : []),
        // Connectors - enhanced to search each connector individually
        'item.connectors.name',
        'item.connectors.description',
        'item.connectors.type',
        'item.connectors.category',
        'item.connectors.id'
      ],
      threshold: 0.4,
      includeMatches: true,
    };

    return { 
      allSearchData: allData, 
      fuseInstance: new Fuse(allData, fuseOptions) 
    };
  }, [modules, resources]);

  // Get matching connectors from search query - wrapped in useMemo
  const getConnectorMatches = useMemo(() => (searchQuery: string, resource: ResourceModule) => {
    if (resource.type !== 'connectors' || !searchQuery || searchQuery.length < 2) {
      return [];
    }
    
    const module = resource as any;
    const connectorsFuse = new Fuse(module.connectors, {
      keys: ['name', 'description', 'type', 'category', 'id'],
      threshold: 0.4
    });
    
    return connectorsFuse.search(searchQuery).map(result => ({
      item: result.item as {
        id: string;
        name: string;
        description: string;
        type: string;
        category: string;
        status: string;
      }
    }));
  }, []);

  // Listen for custom toggle event from Astro
  useEffect(() => {
    const handleToggleEvent = (e: CustomEvent<{isOpen: boolean}>) => {
      setIsOpen(e.detail.isOpen);
    };

    // Add event listener
    document.addEventListener('toggleSearchDialog', handleToggleEvent as EventListener);
    
    // Cleanup
    return () => {
      document.removeEventListener('toggleSearchDialog', handleToggleEvent as EventListener);
    };
  }, []);

  // Update search results when query changes
  useEffect(() => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    const searchResults = fuseInstance.search(searchQuery).map(result => result.item);
    setResults(searchResults);
    setSelectedIndex(0);
  }, [searchQuery, fuseInstance]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % results.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
          break;
        case 'Enter':
          e.preventDefault();
          if (results.length > 0) {
            handleResultSelect(results[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          handleClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Scroll to selected item
  useEffect(() => {
    if (results.length > 0 && resultsContainerRef.current) {
      const selectedElement = document.getElementById(`search-result-${selectedIndex}`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex, results.length]);

  const handleClose = () => {
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleResultSelect = (result: SearchResult) => {
    if (result.type === 'question') {
      // Dispatch event for question selection
      const event = new CustomEvent('questionSelected', {
        detail: { module: result.module, question: result.item }
      });
      document.dispatchEvent(event);
    } else if (result.type === 'resource') {
      // Dispatch event for resource selection
      const event = new CustomEvent('resourceSelected', {
        detail: { resource: result.item }
      });
      document.dispatchEvent(event);
    }
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 search-dialog-overlay z-50 flex items-start justify-center pt-16 sm:pt-20 px-4">
      <div 
        className="w-full max-w-3xl search-dialog rounded-xl overflow-hidden animate-slideDown shadow-2xl border border-gray-200 dark:border-gray-700"
        style={{ maxHeight: 'calc(100vh - 120px)' }}
      >
        {/* Search Input */}
        <div className="relative">
          <div className="flex items-center border-b border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 rounded-full mr-3">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              ref={searchInputRef}
              type="text"
              className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg"
              placeholder="Search for questions or resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              onClick={handleClose}
              className="interactive-button ml-2" 
              aria-label="Close search"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Keyboard shortcuts */}
          <div className="flex items-center justify-between text-xs px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 mr-1">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 mr-1">↓</kbd>
                <span className="text-gray-500 dark:text-gray-400">to navigate</span>
              </div>
              <div className="flex items-center">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 mr-1">Enter</kbd>
                <span className="text-gray-500 dark:text-gray-400">to select</span>
              </div>
            </div>
            <div className="flex items-center">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 mr-1">Esc</kbd>
              <span className="text-gray-500 dark:text-gray-400">to close</span>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div 
          ref={resultsContainerRef}
          className="overflow-y-auto bg-white dark:bg-gray-900 custom-scrollbar"
          style={{ maxHeight: 'calc(100vh - 250px)' }}
        >
          {searchQuery.length < 2 ? (
            <div className="p-8 text-center h-full bg-white dark:bg-gray-900">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800">
                <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Start typing to search</h3>
              <p className="text-gray-500 dark:text-gray-400">Search across questions, modules, resources, and documentation</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center h-full bg-white dark:bg-gray-900">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800">
                <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No results found</h3>
              <p className="text-gray-500 dark:text-gray-400">No matching results for "{searchQuery}"</p>
            </div>
          ) : (
            <div>
              <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/60 sticky top-0 z-10">
                {results.length} {results.length === 1 ? 'result' : 'results'} found
              </div>
              
              {results.map((result, index) => (
                <div
                  id={`search-result-${index}`}
                  key={index}
                  className={`search-result-item ${
                    index === selectedIndex ? 'active dark:bg-gray-700/50' : 'dark:hover:bg-gray-800/70'
                  }`}
                  onClick={() => handleResultSelect(result)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleResultSelect(result);
                    }
                  }}
                >
                  {result.type === 'question' ? (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="badge badge-question">
                          Question
                        </span>
                        <span className="badge badge-module">
                          {result.module.name}
                        </span>
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                        {result.item.label}
                      </h4>
                      {result.item.questions && result.item.questions[0] && (
                        <p className="text-gray-600 dark:text-gray-300">
                          {result.item.questions[0]}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="badge badge-resource">
                          Resource
                        </span>
                        <span className="badge badge-module">
                          {result.item.type.charAt(0).toUpperCase() + result.item.type.slice(1)}
                        </span>
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                        {result.item.title}
                      </h4>
                      {result.item.description && (
                        <p className="text-gray-600 dark:text-gray-300">
                          {result.item.description}
                        </p>
                      )}
                      
                      {/* Display matching connectors if searching for a connector */}
                      {result.item.type === 'connectors' && searchQuery.length >= 2 && (
                        <div className="mt-2">
                          {getConnectorMatches(searchQuery, result.item).slice(0, 3).map((match, idx) => (
                            <div key={idx} className="text-sm bg-gray-50 dark:bg-gray-800/70 px-3 py-2 mt-1 rounded-md border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-blue-600 dark:text-blue-400">
                                  {match.item.name.toLowerCase().includes('github') && (
                                    <span className="mr-1">🐙</span>
                                  )}
                                  {match.item.name}
                                </span>
                                {'url' in match.item && typeof match.item.url === 'string' && match.item.url.length > 0 && (
                                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                    <FaExternalLinkAlt className="w-3 h-3 mr-1" />
                                    opens in new tab
                                  </span>
                                )}
                              </div>
                              <span className="text-xs mr-1 px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-300">
                                {match.item.category}
                              </span>
                              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                match.item.type === 'oauth' 
                                  ? 'bg-blue-500/20 text-blue-500' 
                                  : 'bg-green-500/20 text-green-500'
                              }`}>
                                {match.item.type}
                              </span>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">{match.item.description}</p>
                            </div>
                          ))}
                          {getConnectorMatches(searchQuery, result.item).length > 3 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                              +{getConnectorMatches(searchQuery, result.item).length - 3} more matching connectors
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 