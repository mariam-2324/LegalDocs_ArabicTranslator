import { GoogleGenAI, Type } from "@google/genai";
import type { Term, VerificationResult } from '../types';

if (!import.meta.env.VITE_API_KEY) {
  throw new Error("VITE_API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

export async function getInitialTranslation(text: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: `Translate the following legal English text to formal, legal Arabic. Provide only the translated text, without any preamble or explanation.\n\n---\n\n${text}`,
      config: {
        temperature: 0.2, // Lower temperature for more deterministic translation
      }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error in getInitialTranslation:", error);
    throw new Error("Failed to get initial translation from the model.");
  }
}

const verificationSchema = {
  type: Type.OBJECT,
  properties: {
    finalTranslation: {
      type: Type.STRING,
      description: "The final, corrected, and verified Arabic translation."
    },
    explanation: {
      type: Type.STRING,
      description: "A brief, bulleted list of key changes made and the reasoning, especially regarding approved terminology."
    }
  },
  required: ['finalTranslation', 'explanation']
};

export async function getVerifiedTranslation(
  sourceText: string,
  initialTranslation: string,
  consistentTerms: Term[]
): Promise<VerificationResult> {
  const terminologyList = consistentTerms.length > 0
    ? consistentTerms.map(t => `- ${t.english}: ${t.arabic}`).join('\n')
    : "No specific terminology provided for this text.";

  const prompt = `
    **Task**: Review, verify, and refine an initial Arabic translation of a legal English document.

    **Context**: You are an expert legal translator specializing in English-to-Arabic translations. Your goal is to produce a legally precise, accurate, and consistent final translation.

    **Instructions**:
    1.  **Review**: Carefully compare the original English text with the initial Arabic translation.
    2.  **Consistency Check**: You MUST use the provided 'Approved Terminology'. If the initial translation uses a different term for a concept listed below, replace it with the approved Arabic term to ensure consistency.
    3.  **Refine**: Correct any grammatical errors, stylistic issues, or mistranslations. The final output must be formal, professional, and suitable for a legal context.
    4.  **Explain**: Provide a brief, bulleted list (using '*' for bullets) of the most important changes you made and the reasoning behind them. Mention when you applied an 'Approved Terminology' term.

    ---
    **Original English Text:**
    \`\`\`
    ${sourceText}
    \`\`\`
    ---
    **Initial Arabic Translation (for review):**
    \`\`\`
    ${initialTranslation}
    \`\`\`
    ---
    **Approved Terminology (English: Arabic):**
    \`\`\`
    ${terminologyList}
    \`\`\`
    ---

    Provide your response strictly in the specified JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: verificationSchema,
        temperature: 0.3,
      }
    });
    
    const jsonString = response.text.trim();
    const parsedResponse = JSON.parse(jsonString);
    
    if (parsedResponse.finalTranslation && parsedResponse.explanation) {
        return parsedResponse as VerificationResult;
    } else {
        throw new Error("Invalid JSON structure in model response.");
    }

  } catch (error) {
    console.error("Error in getVerifiedTranslation:", error);
    throw new Error("Failed to get verified translation from the model.");
  }
}
