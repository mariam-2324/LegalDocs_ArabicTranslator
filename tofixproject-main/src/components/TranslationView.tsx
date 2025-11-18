import React, { useState, useCallback } from 'react';
import { CheckCircleIcon, DocumentIcon, ClipboardIcon, ClipboardCheckIcon } from './Icon';

interface TranslationViewProps {
  title: string;
  text: string;
  lang: 'en' | 'ar';
  isVerified?: boolean;
}

const TranslationView: React.FC<TranslationViewProps> = ({ title, text, lang, isVerified = false }) => {
  const direction = lang === 'ar' ? 'rtl' : 'ltr';
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
            {isVerified ? (
              <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
            ) : (
              <DocumentIcon className="h-6 w-6 text-blue-500 mr-2" />
            )}
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{title}</h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label={copied ? "Copied text" : "Copy text"}
          disabled={copied}
        >
          {copied ? (
            <>
              <ClipboardCheckIcon className="h-4 w-4 text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <ClipboardIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300">Copy</span>
            </>
          )}
        </button>
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
