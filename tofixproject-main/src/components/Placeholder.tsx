import React from 'react';
import { BalanceIcon } from './Icon';

const Placeholder: React.FC = () => {
  return (
    <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-fade-in">
      <BalanceIcon className="h-16 w-16 text-blue-500 mx-auto mb-6" />
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Your AI-Powered Legal Translation Assistant
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
        Translate and verify legal documents with confidence. LexiVerse uses a multi-step process to ensure accuracy, consistency, and legal precision for your English-to-Arabic translations.
      </p>
      <div className="grid md:grid-cols-3 gap-6 text-left">
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-1">Step 1: Initial Translation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">A powerful base model provides an initial, high-quality translation of your source document.</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-1">Step 2: Terminology Check</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">We cross-reference the text with our legal terminology database to enforce consistency.</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-600 dark:text-green-400 mb-1">Step 3: Gemini Verification</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Gemini reviews, refines, and verifies the translation, applying the consistent terms to produce a final, accurate document.</p>
        </div>
      </div>
    </div>
  );
};

export default Placeholder;
