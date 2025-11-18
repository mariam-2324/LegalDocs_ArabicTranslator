import React from 'react';
import type { Term } from '../types';
import { DnaIcon, LightBulbIcon } from './Icon';

interface VerificationPanelProps {
  explanation: string;
  usedTerms: Term[];
}

const VerificationPanel: React.FC<VerificationPanelProps> = ({ explanation, usedTerms }) => {
    const formattedExplanation = explanation
      .split('\n')
      .map((line, index) => {
        line = line.trim();
        if (line.startsWith('* ')) {
          return <li key={index} className="mb-2">{line.substring(2)}</li>;
        }
        return null;
      })
      .filter(Boolean);


  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col h-full space-y-6">
      <div>
        <div className="flex items-center mb-3">
            <LightBulbIcon className="h-6 w-6 text-yellow-400 mr-2"/>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Verification & Refinement Notes</h3>
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 text-gray-700 dark:text-gray-300 h-40 overflow-y-auto">
          <ul className="list-inside pl-2">
            {formattedExplanation.length > 0 ? formattedExplanation : <li className="text-gray-500">No specific changes were noted.</li>}
          </ul>
        </div>
      </div>
      
      <div>
        <div className="flex items-center mb-3">
            <DnaIcon className="h-6 w-6 text-purple-500 mr-2"/>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Terminology Consistency</h3>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 h-48 overflow-y-auto">
          {usedTerms.length > 0 ? (
            <ul className="space-y-2">
              {usedTerms.map((term, index) => (
                <li key={index} className="grid grid-cols-2 gap-4 text-sm p-2 rounded-md bg-white dark:bg-gray-800/50">
                  <span className="text-gray-600 dark:text-gray-400 font-medium break-all">{term.english}</span>
                  <span className="text-gray-800 dark:text-gray-200 text-right font-semibold break-all" dir="rtl">{term.arabic}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center pt-10">No specific terminology from the database was found in this document.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationPanel;
