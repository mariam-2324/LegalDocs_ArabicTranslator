
import React from 'react';
import { BalanceIcon } from './Icon';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BalanceIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Lexi<span className="text-blue-600 dark:text-blue-400">Verse</span> Legal Translator
          </h1>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 hidden md:block">AI-Powered Translation & Verification</p>
      </div>
    </header>
  );
};

export default Header;
