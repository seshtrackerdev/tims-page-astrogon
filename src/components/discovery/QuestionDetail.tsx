import React from 'react';
import type { DiscoveryQuestion } from '@/types/discovery';

interface QuestionDetailProps {
  question: DiscoveryQuestion;
  onBack: () => void;
}

export const QuestionDetail: React.FC<QuestionDetailProps> = ({ question, onBack }) => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {question.label}
        </h3>
        <button
          onClick={onBack}
          className="dropdown-button flex items-center gap-2"
        >
          <span>←</span> Back
        </button>
      </div>
      
      <div className="glass p-4 rounded-lg border border-gray-200 dark:border-white/10">
        <h4 className="font-medium text-lg mb-4 text-gray-800 dark:text-white">Questions</h4>
        <ul className="space-y-2 mb-6">
          {question.questions.map((q, idx) => (
            <li key={idx} className="p-3 bg-gray-100 dark:bg-white/5 rounded-lg text-gray-700 dark:text-gray-300">
              {q}
            </li>
          ))}
        </ul>
        
        {question.cue && (
          <div className="mb-6">
            <h4 className="font-medium mb-2 text-gray-800 dark:text-white">Cue</h4>
            <p className="p-3 bg-gray-100 dark:bg-white/5 rounded-lg text-gray-700 dark:text-gray-300">{question.cue}</p>
          </div>
        )}
        
        {question.followUp && (
          <div className="mb-6">
            <h4 className="font-medium mb-2 text-gray-800 dark:text-white">Follow-up Question</h4>
            <p className="p-3 bg-gray-100 dark:bg-white/5 rounded-lg text-gray-700 dark:text-gray-300">{question.followUp}</p>
          </div>
        )}
        
        {question.explanatoryFollowUps && question.explanatoryFollowUps.length > 0 && (
          <div>
            <h4 className="font-medium mb-2 text-gray-800 dark:text-white">Additional Follow-ups</h4>
            <ul className="space-y-2">
              {question.explanatoryFollowUps.map((q, idx) => (
                <li key={idx} className="p-3 bg-gray-100 dark:bg-white/5 rounded-lg text-gray-700 dark:text-gray-300">
                  {q}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}; 