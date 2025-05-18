import React from 'react';
import type { DiscoveryModule } from '@/types/discovery';
import './ModuleList.css'; // We'll create this file next

interface ModuleListProps {
  modules: DiscoveryModule[];
  onModuleSelect?: (module: DiscoveryModule) => void;
  searchTerm?: string;
}

export const ModuleList: React.FC<ModuleListProps> = ({ 
  modules, 
  onModuleSelect,
  searchTerm = ''
}) => {
  const filteredModules = modules
    .filter(module => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      
      // Search in module name and description
      if (
        module.name.toLowerCase().includes(searchLower) ||
        module.description.toLowerCase().includes(searchLower)
      ) {
        return true;
      }

      // Search in categories and questions
      if (module.categories) {
        return module.categories.some(category =>
          category.questions.some(question =>
            question.label.toLowerCase().includes(searchLower) ||
            question.questions.some(q => q.toLowerCase().includes(searchLower))
          )
        );
      }

      // Search in direct questions
      if (module.questions) {
        return module.questions.some(question =>
          question.label.toLowerCase().includes(searchLower) ||
          question.questions.some(q => q.toLowerCase().includes(searchLower))
        );
      }

      return false;
    })
    .sort((a, b) => a.order - b.order);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
      {filteredModules.map((module, index) => (
        <button
          key={module.key}
          onClick={() => onModuleSelect?.(module)}
          className="module-card text-left glass p-6 rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transform"
          style={{ 
            borderLeft: `4px solid ${module.color}`,
            animationDelay: `${index * 0.1}s`
          }}
        >
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3 bg-gray-100 dark:bg-white/5 w-12 h-12 flex items-center justify-center rounded-full" style={{ color: module.color }}>
              {module.icon}
            </span>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{module.name}</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {module.description}
          </p>
          <div className="text-sm font-medium px-3 py-1 inline-block rounded-full bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-white">
            {module.categories ? (
              <span>{module.categories.length} Categories</span>
            ) : (
              <span>{module.questions?.length || 0} Questions</span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}; 