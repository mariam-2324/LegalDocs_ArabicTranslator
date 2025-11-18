
import React from 'react';

interface DocumentInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onTranslate: () => void;
  isLoading: boolean;
}

const DocumentInput: React.FC<DocumentInputProps> = ({ value, onChange, onTranslate, isLoading }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
        Enter Legal Text
      </h2>
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Paste your legal document here..."
        className="w-full h-48 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-y"
        disabled={isLoading}
      />
      <div className="mt-4 flex justify-end">
        <button
          onClick={onTranslate}
          disabled={isLoading || !value.trim()}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 flex items-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </>
          ) : (
            'Translate & Verify'
          )}
        </button>
      </div>
    </div>
  );
};

export default DocumentInput;
