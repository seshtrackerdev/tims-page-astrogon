import React, { useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import type { ResourceModule } from '../../types/discovery/resources';
import { FaChevronDown, FaChevronUp, FaExternalLinkAlt, FaTag } from 'react-icons/fa';

interface ResourceCardProps {
  resource: ResourceModule;
  style?: CSSProperties;
  forceExpanded?: boolean;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, style, forceExpanded }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Effect to handle forceExpanded prop changes
  useEffect(() => {
    if (forceExpanded !== undefined) {
      setIsExpanded(forceExpanded);
    }
  }, [forceExpanded]);

  // Function to get icon based on resource type
  const getTypeIcon = () => {
    switch (resource.type) {
      case 'faq':
        return '❓';
      case 'compliance':
        return '🔒';
      case 'public-requestor':
        return '👤';
      case 'people-import':
        return '📥';
      case 'release-notes':
        return '📝';
      case 'connectors':
        return '🔌';
      default:
        return '📄';
    }
  };

  // Function to render content based on resource type
  const renderContent = () => {
    if (!isExpanded) return null;

    switch (resource.type) {
      case 'faq': {
        const faqResource = resource as any; // Using any as a temporary workaround
        return (
          <div className="mt-3 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
            {faqResource.faqs.map((faq: any, index: number) => (
              <div key={index} className="p-2 glass rounded-lg transform transition-all duration-200 hover:translate-x-1">
                <h4 className="font-medium text-sm text-txt-p dark:text-darkmode-txt-p mb-1">
                  {faq.question}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
                  {faq.answer}
                </p>
                {faq.category && (
                  <div className="mt-1">
                    <span className="inline-block bg-white/10 text-sm px-2 py-0.5 rounded-full">
                      {faq.category}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }
      
      case 'compliance': {
        const complianceResource = resource as any;
        return (
          <div className="mt-4 space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
            <div className="overflow-x-auto rounded-lg glass">
              <table className="min-w-full">
                <thead className="sticky top-0 bg-white dark:bg-gray-800 z-10">
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-3 font-medium">Standard</th>
                    <th className="text-left py-2 px-3 font-medium">Status</th>
                    <th className="text-left py-2 px-3 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {complianceResource.standards.map((standard: any) => (
                    <tr key={standard.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="py-2 px-3">
                        {standard.name}
                        {standard.shortName && <span className="ml-2 text-xs text-gray-400">({standard.shortName})</span>}
                      </td>
                      <td className="py-2 px-3">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          standard.status === 'aligned' 
                            ? 'bg-green-500/20 text-green-500' 
                            : 'bg-red-500/20 text-red-500'
                        }`}>
                          {standard.status === 'aligned' ? 'Aligned' : 'Not Aligned'}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-sm text-gray-600 dark:text-gray-400">
                        {standard.notes || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
      
      case 'public-requestor': {
        const requestorResource = resource as any;
        return (
          <div className="mt-3 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
            <h4 className="font-medium text-sm text-txt-p dark:text-darkmode-txt-p sticky top-0 bg-white dark:bg-gray-800 py-1 z-10">Form Fields</h4>
            <div className="overflow-x-auto rounded-lg glass">
              <table className="min-w-full">
                <thead className="sticky top-10 bg-white dark:bg-gray-800 z-10">
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-3 font-medium">Field</th>
                    <th className="text-left py-2 px-3 font-medium">Required</th>
                    <th className="text-left py-2 px-3 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {requestorResource.formFields.map((field: any, index: number) => (
                    <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="py-2 px-3">{field.name}</td>
                      <td className="py-2 px-3">
                        {field.required ? (
                          <span className="text-green-500">Required</span>
                        ) : (
                          <span className="text-gray-400">Optional</span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-sm text-gray-600 dark:text-gray-400">
                        {field.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <h4 className="font-medium text-sm text-txt-p dark:text-darkmode-txt-p mt-4 sticky top-0 bg-white dark:bg-gray-800 py-1 z-10">Matching Options</h4>
            <div className="space-y-2">
              {requestorResource.matchingOptions.map((option: any, index: number) => (
                <div key={index} className="p-2 glass rounded-lg transform transition-all duration-200 hover:translate-x-1">
                  <h5 className="font-medium text-sm">{option.title}</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {option.description}
                  </p>
                  {option.note && (
                    <p className="text-sm italic text-gray-500 mt-1">{option.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }
      
      case 'people-import': {
        const importResource = resource as any;
        return (
          <div className="mt-3 space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
            <div>
              <h4 className="font-medium text-sm text-txt-p dark:text-darkmode-txt-p mb-2 sticky top-0 bg-white dark:bg-gray-800 py-1 z-10">Record Types</h4>
              <div className="space-y-2">
                {importResource.recordTypes.map((record: any, index: number) => (
                  <div key={index} className="p-2 glass rounded-lg transform transition-all duration-200 hover:translate-x-1">
                    <h5 className="font-medium text-sm">{record.type}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {record.description}
                    </p>
                    <p className="text-sm italic text-gray-500 mt-1">Usage: {record.usage}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-txt-p dark:text-darkmode-txt-p mb-2 sticky top-0 bg-white dark:bg-gray-800 py-1 z-10">Import Methods</h4>
              <div className="space-y-2">
                {importResource.methods.map((method: any) => (
                  <div key={method.id} className="p-2 glass rounded-lg transform transition-all duration-200 hover:translate-x-1">
                    <h5 className="font-medium text-sm">{method.name}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {method.description}
                    </p>
                    
                    <div className="mt-2">
                      <h6 className="text-sm font-medium mb-1">Steps:</h6>
                      <ol className="text-sm text-gray-600 dark:text-gray-400 pl-4 list-decimal">
                        {method.steps.map((step: string, stepIndex: number) => (
                          <li key={stepIndex} className="mb-1">{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    {method.notes && method.notes.length > 0 && (
                      <div className="mt-2">
                        <h6 className="text-sm font-medium mb-1">Notes:</h6>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 pl-4 list-disc">
                          {method.notes.map((note: string, noteIndex: number) => (
                            <li key={noteIndex} className="mb-1">{note}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
      
      case 'release-notes': {
        const releaseNotesResource = resource as any;
        return (
          <div className="mt-4 space-y-6 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
            {releaseNotesResource.notes.map((note: any) => (
              <div key={note.id} className="p-4 glass rounded-lg">
                <h4 className="font-medium text-txt-p dark:text-darkmode-txt-p flex items-center">
                  <span className="mr-2">Version {note.version}</span>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                    {new Date(note.releaseDate).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </h4>
                <h3 className="font-semibold text-lg mt-2">{note.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{note.description}</p>
                
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {note.tags.map((tag: string) => (
                      <span key={tag} className="text-xs bg-white/5 px-2 py-1 rounded-full text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {isExpanded && (
                  <div className="mt-4">
                    <h5 className="font-medium text-sm border-b border-white/10 pb-2 mb-3">
                      Features and Updates
                    </h5>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                      {note.features.map((feature: any, fIndex: number) => (
                        <div key={fIndex} className="p-3 glass rounded-lg transform transition-all duration-200 hover:translate-x-1">
                          <div className="flex justify-between items-start">
                            <h6 className="font-medium">{feature.title}</h6>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              feature.category === 'New Feature' 
                                ? 'bg-green-500/20 text-green-500' 
                                : feature.category === 'Enhancement'
                                  ? 'bg-blue-500/20 text-blue-500'
                                  : feature.category === 'Bug Fix'
                                    ? 'bg-yellow-500/20 text-yellow-500'
                                    : feature.category === 'Security'
                                      ? 'bg-purple-500/20 text-purple-500'
                                      : 'bg-red-500/20 text-red-500'
                            }`}>
                              {feature.category}
                            </span>
                          </div>
                          {feature.module && (
                            <div className="text-xs mt-1 text-gray-400">
                              Module: {feature.module}
                            </div>
                          )}
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            {feature.description}
                          </p>
                          {feature.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {feature.tags.map((tag: string) => (
                                <span key={tag} className="text-xs bg-white/5 px-2 py-0.5 rounded-full text-gray-400">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }
      
      case 'connectors': {
        const connectorsResource = resource as any;
        return (
          <div className="mt-4 space-y-4">
            <div className="overflow-x-auto rounded-lg glass">
              <table className="min-w-full table-fixed">
                <thead className="sticky top-0 bg-white dark:bg-gray-800 z-10">
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-3 font-medium w-2/5">Name</th>
                    <th className="text-left py-2 px-3 font-medium w-1/5">Type</th>
                    <th className="text-left py-2 px-3 font-medium w-1/5">Category</th>
                    <th className="text-left py-2 px-3 font-medium w-1/5">Status</th>
                  </tr>
                </thead>
                <tbody className="max-h-64 overflow-y-auto">
                  {connectorsResource.connectors.map((connector: any) => (
                    <tr key={connector.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="py-2 px-3">
                        <div className="font-medium text-sm">{connector.name}</div>
                        <div className="text-xs text-gray-500 mt-1 line-clamp-2">{connector.description}</div>
                      </td>
                      <td className="py-2 px-3">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          connector.type === 'oauth' 
                            ? 'bg-blue-500/20 text-blue-500' 
                            : 'bg-green-500/20 text-green-500'
                        }`}>
                          {connector.type}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <span className="inline-block px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs">
                          {connector.category}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          connector.status === 'active' 
                            ? 'bg-green-500/20 text-green-500' 
                            : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {connector.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
      
      default:
        return (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-800 dark:text-gray-200">
              This resource type doesn't have a detailed view.
            </p>
          </div>
        );
    }
  };

  return (
    <div 
      className={`p-3 glass rounded-lg border ${isExpanded ? 'border-blue-200 dark:border-blue-900' : 'border-gray-200 dark:border-white/5'} shadow-md hover:shadow-lg transition-all duration-300`}
      style={style}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <span className="text-lg mr-2 bg-gray-100 dark:bg-white/5 w-8 h-8 flex items-center justify-center rounded-full">{getTypeIcon()}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{resource.title}</h3>
            <div className="flex items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">{resource.type.replace(/_/g, ' ')}</p>
              <div className="text-sm text-gray-500 dark:text-gray-400 border-l border-gray-200 dark:border-gray-700 ml-2 pl-2 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Last verified <span className="font-medium ml-1">5/18/2025</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          {'url' in resource && resource.url && (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="interactive-button btn-with-tooltip"
              data-tooltip="Open in new tab"
            >
              <FaExternalLinkAlt className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-primary-500" />
            </a>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="interactive-button relative btn-with-tooltip"
            data-tooltip={isExpanded ? "Collapse" : "Expand"}
            aria-expanded={isExpanded}
          >
            <div className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`}>
              <FaChevronDown className="text-gray-600 dark:text-gray-400" />
            </div>
          </button>
        </div>
      </div>
      
      {!isExpanded ? (
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {resource.description}
        </p>
      ) : (
        <div className="mt-1">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {resource.description}
          </p>
        </div>
      )}
      
      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[800px] opacity-100 overflow-y-auto custom-scrollbar' : 'max-h-0 opacity-0'}`}>
        {renderContent()}
      </div>
    </div>
  );
}; 