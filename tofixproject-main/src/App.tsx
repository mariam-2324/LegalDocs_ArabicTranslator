import React, { useState, useCallback } from 'react';
import { getInitialTranslation, getVerifiedTranslation } from './services/geminiService';
import { findSimilarTerms } from './services/vectorDBService';
import type { TranslationResult } from './types';
import { DEFAULT_LEGAL_TEXT } from './constants';
import Header from './components/Header';
import DocumentInput from './components/DocumentInput';
import TranslationView from './components/TranslationView';
import VerificationPanel from './components/VerificationPanel';
import Loader from './components/Loader';
import Placeholder from './components/Placeholder';
import { AlertTriangleIcon } from './components/Icon';

export default function App() {
  const [sourceText, setSourceText] = useState<string>(DEFAULT_LEGAL_TEXT);
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = useCallback(async () => {
    if (!sourceText.trim()) {
      setError("Please enter text to translate.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setTranslationResult(null);

    try {
      const initialTranslationText = await getInitialTranslation(sourceText);
      const usedTerms = await findSimilarTerms(sourceText);
      const verificationResult = await getVerifiedTranslation(
        sourceText,
        initialTranslationText,
        usedTerms
      );

      setTranslationResult({
        source: sourceText,
        initial: initialTranslationText,
        verified: verificationResult.finalTranslation,
        explanation: verificationResult.explanation,
        usedTerms: usedTerms,
      });
    } catch (e: unknown) {
      console.error(e);
      setError(e instanceof Error ? e.message : "An unknown error occurred during translation.");
    } finally {
      setIsLoading(false);
    }
  }, [sourceText]);

  const handleClear = useCallback(() => {
    setSourceText('');
    setTranslationResult(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <DocumentInput
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            onTranslate={handleTranslate}
            onClear={handleClear}
            isLoading={isLoading}
          />
        </div>

        {isLoading && <Loader />}

        {error && !isLoading && (
          <div className="bg-red-100 dark:bg-red-900/50 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 rounded-lg relative flex items-start space-x-3" role="alert" aria-live="assertive">
            <AlertTriangleIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
            <div>
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          </div>
        )}

        {!isLoading && !translationResult && !error && (
            <Placeholder />
        )}

        {translationResult && !isLoading && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TranslationView title="Source Document (English)" text={translationResult.source} lang="en" />
              <TranslationView title="Initial Translation (Primary Model)" text={translationResult.initial} lang="ar" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TranslationView title="Final Verified Translation (Gemini)" text={translationResult.verified} lang="ar" isVerified={true} />
                <VerificationPanel explanation={translationResult.explanation} usedTerms={translationResult.usedTerms} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}