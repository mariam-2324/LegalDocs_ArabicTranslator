
import React from 'react';
import { CheckCircleIcon, DocumentIcon } from './Icon';

interface TranslationViewProps {
  title: string;
  text: string;
  lang: 'en' | 'ar';
  isVerified?: boolean;
}

const TranslationView: React.FC<TranslationViewProps> = ({ title, text, lang, isVerified = false }) => {
  const direction = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col h-full">
      <div className="flex items-center mb-4">
        {isVerified ? (
          <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
        ) : (
          <DocumentIcon className="h-6 w-6 text-blue-500 mr-2" />
        )}
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{title}</h3>
      </div>
      <div 
        dir={direction}
        className="prose prose-sm dark:prose-invert max-w-none flex-grow bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 h-96 overflow-y-auto"
      >
        <pre className="whitespace-pre-wrap break-words font-sans bg-transparent p-0 m-0">{text}</pre>
      </div>
    </div>
  );
};

export default TranslationView;
