import React, { useState } from 'react';
import type { CSSProperties } from 'react';
import type { ResourceModule } from '../../types/discovery/resources';
import { FaChevronDown, FaChevronUp, FaExternalLinkAlt, FaTag } from 'react-icons/fa';

interface ResourceCardProps {
  resource: ResourceModule;
  style?: CSSProperties;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, style }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
          <div className="mt-4 space-y-4">
            {faqResource.faqs.map((faq: any, index: number) => (
              <div key={index} className="p-3 glass rounded-lg transform transition-all duration-200 hover:translate-x-1">
                <h4 className="font-medium text-txt-p dark:text-darkmode-txt-p mb-2">
                  {faq.question}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                  {faq.answer}
                </p>
                {faq.category && (
                  <div className="mt-2">
                    <span className="inline-block bg-white/10 text-xs px-2 py-1 rounded-full">
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
          <div className="mt-4 space-y-4">
            <div className="overflow-x-auto rounded-lg glass">
              <table className="min-w-full">
                <thead>
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
          <div className="mt-4 space-y-4">
            <h4 className="font-medium text-txt-p dark:text-darkmode-txt-p">Form Fields</h4>
            <div className="overflow-x-auto rounded-lg glass">
              <table className="min-w-full">
                <thead>
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
            
            <h4 className="font-medium text-txt-p dark:text-darkmode-txt-p mt-6">Matching Options</h4>
            <div className="space-y-3">
              {requestorResource.matchingOptions.map((option: any, index: number) => (
                <div key={index} className="p-3 glass rounded-lg transform transition-all duration-200 hover:translate-x-1">
                  <h5 className="font-medium">{option.title}</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {option.description}
                  </p>
                  {option.note && (
                    <p className="text-xs italic text-gray-500 mt-2">{option.note}</p>
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
          <div className="mt-4 space-y-6">
            <div>
              <h4 className="font-medium text-txt-p dark:text-darkmode-txt-p mb-3">Record Types</h4>
              <div className="space-y-3">
                {importResource.recordTypes.map((record: any, index: number) => (
                  <div key={index} className="p-3 glass rounded-lg transform transition-all duration-200 hover:translate-x-1">
                    <h5 className="font-medium">{record.type}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {record.description}
                    </p>
                    <p className="text-xs italic text-gray-500 mt-2">Usage: {record.usage}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-txt-p dark:text-darkmode-txt-p mb-3">Import Methods</h4>
              <div className="space-y-3">
                {importResource.methods.map((method: any) => (
                  <div key={method.id} className="p-3 glass rounded-lg transform transition-all duration-200 hover:translate-x-1">
                    <h5 className="font-medium">{method.name}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {method.description}
                    </p>
                    
                    <div className="mt-3">
                      <h6 className="text-sm font-medium mb-1">Steps:</h6>
                      <ol className="text-sm text-gray-600 dark:text-gray-400 pl-5 list-decimal">
                        {method.steps.map((step: string, stepIndex: number) => (
                          <li key={stepIndex} className="mb-1">{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    {method.notes && method.notes.length > 0 && (
                      <div className="mt-3">
                        <h6 className="text-sm font-medium mb-1">Notes:</h6>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 pl-5 list-disc">
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
          <div className="mt-4 space-y-6">
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
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
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
      
      default:
        // Just show title and description for unknown resource types
        return (
          <div className="mt-4">
            <p className="text-gray-600 dark:text-gray-400">
              No detailed view available for this resource type.
            </p>
          </div>
        );
    }
  };

  return (
    <div 
      className="p-4 glass rounded-lg border border-white/5 shadow-md hover:shadow-lg transition-all duration-300" 
      style={style}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <span className="text-xl mr-3 bg-white/5 w-10 h-10 flex items-center justify-center rounded-full">{getTypeIcon()}</span>
          <div>
            <h3 className="text-lg font-semibold text-txt-p dark:text-darkmode-txt-p">{resource.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{resource.type.replace(/_/g, ' ')}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {'url' in resource && resource.url && (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              title="Open in new tab"
            >
              <FaExternalLinkAlt className="text-gray-400 hover:text-primary-500" />
            </a>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            title={isExpanded ? "Collapse" : "Expand"}
            aria-expanded={isExpanded}
          >
            {isExpanded ? (
              <FaChevronUp className="text-gray-400" />
            ) : (
              <FaChevronDown className="text-gray-400" />
            )}
          </button>
        </div>
      </div>
      
      {!isExpanded && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {resource.description}
        </p>
      )}
      
      {'tags' in resource && resource.tags && resource.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {resource.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white/5 text-gray-400"
            >
              <FaTag className="mr-1 text-xs" /> {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[9999px] opacity-100' : 'max-h-0 opacity-0'}`}>
        {renderContent()}
      </div>
    </div>
  );
}; 