import type { Term } from '../types';

// This mock database simulates a Qdrant vector database of legal terms.
// In a real application, this would involve embedding and similarity search.
const terminologyDatabase: Term[] = [
  { english: 'Agreement', arabic: 'اتفاقية' },
  { english: 'Licensor', arabic: 'المرخِّص' },
  { english: 'Licensee', arabic: 'المرخَّص له' },
  { english: 'Effective Date', arabic: 'تاريخ السريان' },
  { english: 'proprietary software', arabic: 'برنامج مملوك' },
  { english: 'documentation', arabic: 'الوثائق' },
  { english: 'license', arabic: 'رخصة' },
  { english: 'terms and conditions', arabic: 'الأحكام والشروط' },
  { english: 'mutual covenants', arabic: 'التعهدات المتبادلة' },
  { english: 'Grant of License', arabic: 'منح الرخصة' },
  { english: 'non-exclusive', arabic: 'غير حصرية' },
  { english: 'non-transferable', arabic: 'غير قابلة للتحويل' },
  { english: 'internal business purposes', arabic: 'لأغراض العمل الداخلية' },
  { english: 'Term and Termination', arabic: 'المدة والإنهاء' },
  { english: 'written notice', arabic: 'إشعار خطي' },
  { english: 'Confidentiality', arabic: 'السرية' },
  { english: 'third party', arabic: 'طرف ثالث' },
  { english: 'Governing Law', arabic: 'القانون الحاكم' },
  { english: 'conflict of law principles', arabic: 'مبادئ تنازع القوانين' }
];

/**
 * Simulates a similarity search against a vector database.
 * It finds which terms from our database exist in the source text.
 * @param sourceText The English legal text.
 * @returns A promise that resolves to an array of matching terms.
 */
export const findSimilarTerms = async (sourceText: string): Promise<Term[]> => {
  console.log("Searching for consistent terms in the database...");
  const foundTerms: Term[] = [];
  const lowercasedText = sourceText.toLowerCase();

  terminologyDatabase.forEach(term => {
    // Use a regex for whole word matching to avoid partial matches (e.g., "term" in "terminate")
    const regex = new RegExp(`\\b${term.english.toLowerCase()}\\b`);
    if (regex.test(lowercasedText)) {
      foundTerms.push(term);
    }
  });

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  console.log(`Found ${foundTerms.length} matching terms.`);
  return foundTerms;
};
