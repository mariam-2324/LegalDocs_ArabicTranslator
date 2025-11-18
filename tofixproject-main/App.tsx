
import React, { useState, useCallback } from 'react';
import { getInitialTranslation, getVerifiedTranslation } from './services/geminiService';
import { findSimilarTerms } from './services/vectorDBService';
import type { TranslationResult, Term, VerificationResult } from './types';
import { DEFAULT_LEGAL_TEXT } from './constants';
import Header from './components/Header';
import DocumentInput from './components/DocumentInput';
import TranslationView from './components/TranslationView';
import VerificationPanel from './components/VerificationPanel';
import Loader from './components/Loader';

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
      // Step 1: Get initial translation (simulating OPUS model)
      const initialTranslationText = await getInitialTranslation(sourceText);

      // Step 2: Find consistent terms from vector DB (simulating Qdrant)
      const usedTerms = await findSimilarTerms(sourceText);

      // Step 3: Get verified translation and explanation from Gemini
      const verificationResult: VerificationResult = await getVerifiedTranslation(
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <DocumentInput
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            onTranslate={handleTranslate}
            isLoading={isLoading}
          />
        </div>

        {isLoading && <Loader />}

        {error && (
          <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {translationResult && !isLoading && (
          <div className="space-y-6">
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
