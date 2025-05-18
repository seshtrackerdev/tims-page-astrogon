import React, { useState, useEffect } from 'react';
import type { DiscoveryModule, DiscoveryQuestion } from '@/types/discovery';
import { ModuleList } from './ModuleList';
import { QuestionDetail } from './QuestionDetail';

interface QuestionBankProps {
  modules: DiscoveryModule[];
}

export const QuestionBank: React.FC<QuestionBankProps> = ({ modules }) => {
  const [selectedModule, setSelectedModule] = useState<DiscoveryModule | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<DiscoveryQuestion | null>(null);

  const handleModuleSelect = (module: DiscoveryModule) => {
    setSelectedModule(module);
    setSelectedQuestion(null);
  };

  const handleQuestionSelect = (question: DiscoveryQuestion) => {
    setSelectedQuestion(question);
  };

  const handleBack = () => {
    if (selectedQuestion) {
      setSelectedQuestion(null);
    } else if (selectedModule) {
      setSelectedModule(null);
    }
  };

  // Listen for search selection events
  useEffect(() => {
    const handleSearchSelection = (e: CustomEvent<{moduleKey: string, questionLabel: string}>) => {
      const { moduleKey, questionLabel } = e.detail;
      
      // Find the module
      const foundModule = modules.find(module => module.key === moduleKey);
      if (!foundModule) return;
      
      setSelectedModule(foundModule);
      
      // Find the question
      let foundQuestion: DiscoveryQuestion | null = null;
      
      // Check in categories
      if (foundModule.categories) {
        for (const category of foundModule.categories) {
          const question = category.questions.find(q => q.label === questionLabel);
          if (question) {
            foundQuestion = question;
            break;
          }
        }
      }
      
      // Check in direct questions
      if (!foundQuestion && foundModule.questions) {
        foundQuestion = foundModule.questions.find(q => q.label === questionLabel) || null;
      }
      
      if (foundQuestion) {
        setSelectedQuestion(foundQuestion);
      }
    };

    document.addEventListener('selectQuestionFromSearch', handleSearchSelection as EventListener);
    
    return () => {
      document.removeEventListener('selectQuestionFromSearch', handleSearchSelection as EventListener);
    };
  }, [modules]);

  return (
    <div className="h-[calc(100vh-20rem)] overflow-y-auto">
      {/* Navigation Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm mb-4 px-2">
        <button 
          onClick={() => setSelectedModule(null)} 
          className={`hover:text-txt-p dark:hover:text-darkmode-txt-p ${!selectedModule ? 'text-txt-p dark:text-darkmode-txt-p font-semibold' : ''}`}
        >
          Modules
        </button>
        {selectedModule && (
          <>
            <span>/</span>
            <button 
              onClick={() => setSelectedQuestion(null)}
              className={`hover:text-txt-p dark:hover:text-darkmode-txt-p ${!selectedQuestion ? 'text-txt-p dark:text-darkmode-txt-p font-semibold' : ''}`}
            >
              {selectedModule.name}
            </button>
          </>
        )}
        {selectedQuestion && (
          <>
            <span>/</span>
            <span className="text-txt-p dark:text-darkmode-txt-p font-semibold">{selectedQuestion.label}</span>
          </>
        )}
      </div>

      {/* Content Area */}
      <div className="space-y-4">
        {!selectedModule && (
          <ModuleList 
            modules={modules} 
            onModuleSelect={handleModuleSelect}
          />
        )}
        
        {selectedModule && !selectedQuestion && (
          <div className="space-y-4">
            {/* Module Header with Back Button */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-txt-p dark:text-darkmode-txt-p">
                {selectedModule.name}
              </h2>
              <button
                onClick={handleBack}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-txt-p dark:text-darkmode-txt-p flex items-center gap-2"
              >
                <span>←</span> Back to Modules
              </button>
            </div>
            
            {/* Handle modules with categories */}
            {selectedModule.categories && selectedModule.categories.map((category) => (
              <div key={category.name} className="glass p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-txt-p dark:text-darkmode-txt-p">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {category.description}
                </p>
                <div className="space-y-2">
                  {category.questions.map((question) => (
                    <button
                      key={question.label}
                      onClick={() => handleQuestionSelect(question)}
                      className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <h4 className="font-medium text-txt-p dark:text-darkmode-txt-p">
                        {question.label}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {question.questions[0]}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Handle modules with direct questions */}
            {selectedModule.questions && (
              <div className="glass p-4 rounded-lg">
                <div className="space-y-2">
                  {selectedModule.questions.map((question) => (
                    <button
                      key={question.label}
                      onClick={() => handleQuestionSelect(question)}
                      className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <h4 className="font-medium text-txt-p dark:text-darkmode-txt-p">
                        {question.label}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {question.questions[0]}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedQuestion && (
          <QuestionDetail question={selectedQuestion} onBack={handleBack} />
        )}
      </div>
    </div>
  );
}; 