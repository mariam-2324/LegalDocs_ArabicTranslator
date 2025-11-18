export interface Term {
  english: string;
  arabic: string;
}

export interface TranslationResult {
  source: string;
  initial: string;
  verified: string;
  explanation: string;
  usedTerms: Term[];
}

export interface VerificationResult {
  finalTranslation: string;
  explanation: string;
}
