import React, { useState, useEffect, useRef } from 'react';
import type { DiscoveryModule, DiscoveryQuestion } from '@/types/discovery';
import type { ResourceModule } from '@/types/discovery/resources';
import Fuse from 'fuse.js';

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
  const allSearchData = [...questionSearchData, ...resourceSearchData];

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
      ...(resourceSearchData.length > 0 && resourceSearchData[0].item.type === 'faq' 
        ? ['item.faqs.question', 'item.faqs.answer', 'item.faqs.category'] 
        : []),
      ...(resourceSearchData.length > 0 && resourceSearchData[0].item.type === 'compliance' 
        ? ['item.standards.name', 'item.standards.description', 'item.standards.controls.title', 'item.standards.controls.description'] 
        : []),
      ...(resourceSearchData.length > 0 && resourceSearchData[0].item.type === 'release-notes' 
        ? ['item.notes.title', 'item.notes.description', 'item.notes.features.title', 'item.notes.features.description'] 
        : [])
    ],
    threshold: 0.4,
    includeMatches: true,
  };

  const fuse = new Fuse(allSearchData, fuseOptions);

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

    const searchResults = fuse.search(searchQuery).map(result => result.item);
    setResults(searchResults);
    setSelectedIndex(0);
  }, [searchQuery]);

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div 
        className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden animate-slideDown"
        style={{ maxHeight: 'calc(100vh - 150px)' }}
      >
        {/* Search Input */}
        <div className="relative">
          <div className="flex items-center border-b border-gray-200 dark:border-gray-700 p-4">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Search for questions or resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">↑</kbd>
              <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">↓</kbd>
              <span className="text-xs text-gray-500 dark:text-gray-400">to navigate</span>
              <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">Enter</kbd>
              <span className="text-xs text-gray-500 dark:text-gray-400">to select</span>
              <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">Esc</kbd>
              <span className="text-xs text-gray-500 dark:text-gray-400">to close</span>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div 
          ref={resultsContainerRef}
          className="overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 250px)' }}
        >
          {searchQuery.length < 2 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Start typing to search...
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No results found for "{searchQuery}"
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {results.map((result, index) => (
                <div
                  id={`search-result-${index}`}
                  key={index}
                  className={`p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    index === selectedIndex ? 'bg-gray-100 dark:bg-gray-700' : ''
                  }`}
                  onClick={() => handleResultSelect(result)}
                >
                  {result.type === 'question' ? (
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Question
                        </span>
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                          {result.module.name}
                        </span>
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                        {result.item.label}
                      </h4>
                      {result.item.questions && result.item.questions[0] && (
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          {result.item.questions[0]}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Resource
                        </span>
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          {result.item.type.charAt(0).toUpperCase() + result.item.type.slice(1)}
                        </span>
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                        {result.item.title}
                      </h4>
                      {result.item.description && (
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          {result.item.description}
                        </p>
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