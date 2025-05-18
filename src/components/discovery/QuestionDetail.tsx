import React from 'react';
import type { DiscoveryQuestion } from '@/types/discovery';

interface QuestionDetailProps {
  question: DiscoveryQuestion;
  onBack: () => void;
}

export const QuestionDetail: React.FC<QuestionDetailProps> = ({ question, onBack }) => {
  return (
    <div className="glass p-6 rounded-lg border border-white/5 shadow-lg animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-txt-p dark:text-darkmode-txt-p">{question.label}</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-txt-p dark:text-darkmode-txt-p hover:translate-x-1 transform duration-200"
        >
          Back
        </button>
      </div>

      {/* Main Questions */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-txt-p dark:text-darkmode-txt-p flex items-center">
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary-500/20 text-primary-500 mr-2 text-sm">Q</span>
          Primary Questions
        </h3>
        <ul className="space-y-4">
          {question.questions.map((q, index) => (
            <li key={index} className="p-4 rounded-lg bg-white/5 text-txt-p dark:text-darkmode-txt-p hover:bg-white/8 transition-colors border border-white/5">
              {q}
            </li>
          ))}
        </ul>
      </div>

      {/* Follow-up Questions */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-txt-p dark:text-darkmode-txt-p flex items-center">
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-500 mr-2 text-sm">F</span>
          Follow-up Questions
        </h3>
        <div className="p-4 rounded-lg bg-white/5 mb-4 text-txt-p dark:text-darkmode-txt-p border border-white/5 hover:bg-white/8 transition-colors">
          <p>{question.followUp}</p>
        </div>
        {question.explanatoryFollowUps && (
          <div className="space-y-2">
            {question.explanatoryFollowUps.map((followUp, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 text-txt-p dark:text-darkmode-txt-p border border-white/5 hover:bg-white/8 transition-colors">
                {followUp}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Additional Information - Now a single column */}
      <div className="space-y-6">
        {/* Maturity Corrections */}
        {question.maturityCorrections && (
          <div className="p-4 glass rounded-lg border border-white/5 hover:shadow-md transition-all duration-300">
            <h3 className="text-lg font-medium mb-3 text-txt-p dark:text-darkmode-txt-p flex items-center">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-500/20 text-purple-500 mr-2 text-sm">M</span>
              Maturity Corrections
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <h4 className="text-sm font-medium mb-1 text-blue-500">Technical Teams</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{question.maturityCorrections.technical}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <h4 className="text-sm font-medium mb-1 text-purple-500">Non-Technical Teams</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{question.maturityCorrections.nontechnical}</p>
              </div>
            </div>
          </div>
        )}

        {/* Insights */}
        {question.insights && question.insights.length > 0 && (
          <div className="p-4 glass rounded-lg border border-white/5 hover:shadow-md transition-all duration-300">
            <h3 className="text-lg font-medium mb-3 text-txt-p dark:text-darkmode-txt-p flex items-center">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500 mr-2 text-sm">I</span>
              Insights
            </h3>
            <div className="space-y-3">
              {question.insights.map((insight, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg ${
                    insight.type === 'warning' ? 'bg-red-500/10 border border-red-500/20' : 
                    insight.type === 'tip' ? 'bg-green-500/10 border border-green-500/20' : 
                    'bg-blue-500/10 border border-blue-500/20'
                  }`}
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Relevant Resources */}
        {question.relevantResources && question.relevantResources.length > 0 && (
          <div className="p-4 glass rounded-lg border border-white/5 hover:shadow-md transition-all duration-300">
            <h3 className="text-lg font-medium mb-3 text-txt-p dark:text-darkmode-txt-p flex items-center">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-teal-500/20 text-teal-500 mr-2 text-sm">R</span>
              Relevant Resources
            </h3>
            <div className="space-y-2">
              {question.relevantResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 transform hover:translate-x-1 duration-200"
                >
                  <h4 className="font-medium text-txt-p dark:text-darkmode-txt-p">{resource.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{resource.type}</p>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Vertical Tags */}
        {question.vertical_tags && (
          <div className="p-4 glass rounded-lg border border-white/5 hover:shadow-md transition-all duration-300">
            <h3 className="text-lg font-medium mb-3 text-txt-p dark:text-darkmode-txt-p flex items-center">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500/20 text-gray-500 mr-2 text-sm">V</span>
              Relevant Verticals
            </h3>
            <div className="flex flex-wrap gap-2">
              {question.vertical_tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-gray-500/10 text-gray-500 border border-gray-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 