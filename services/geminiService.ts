import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { LEGAL_DATA } from '../data/legalContext';
import { Language } from '../App';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getSystemInstruction = (lang: Language) => {
  const langPrompts = {
    en: "Respond clearly in English using professional yet accessible legal terminology.",
    hi: "कृपया हिंदी में उत्तर दें। कानूनी शब्दों का सरल अर्थ में प्रयोग करें ताकि आम नागरिक समझ सकें।",
    mr: "कृपया मराठीत उत्तर द्या. सामान्य नागरिकांना समजेल अशा सोप्या भाषेत कायदेशीर माहिती स्पष्ट करा."
  };

  return `
You are the "Neural Legal Inference Engine" for the Nyaya Sahayak project.
Your primary task is semantic mapping of user queries to the Bharatiya Nyaya Sanhita (BNS) 2023 and Consumer Protection Act 2019.

**LANGUAGE OUTPUT MODE:** ${langPrompts[lang]}

**ML GROUNDING DATA:**
${LEGAL_DATA}

**Response Architecture (Neural Output):**
Every response must follow this deterministic 4-part structure:
1. ⚖️ **Relevant Law:** [Act and Section citation]
2. 📝 **Simple Explanation:** [NLU-transformed explanation in plain ${lang === 'en' ? 'English' : lang === 'hi' ? 'Hindi' : 'Marathi'}]
3. 🚀 **Action Path:** [Recommended procedural redressal]
4. ⚠️ **Disclaimer:** [Standard legal awareness disclaimer in the chosen language]

**Operational Logic:**
- Contextual Retrieval: Extract relevant sections from the ML Grounding Data.
- Semantic Transformation: Simplify legal terminology for accessibility while maintaining high factual fidelity.
- Refusal Filter: Detect and reject any intents related to criminal solicitation or illegal acts.

**Safety Classifier Refusal:**
"I cannot assist with illegal activities. My internal neural guardrails prevent the generation of content related to unlawful acts."
`;
};

export const getLegalResponse = async (
  prompt: string, 
  history: Array<{ role: 'user' | 'model'; parts: { text: string }[] }>,
  lang: Language = 'en'
): Promise<string> => {
  try {
    const modelId = 'gemini-3-flash-preview';
    const contents = [...history, { role: 'user', parts: [{ text: prompt }] }];

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelId,
      contents: contents,
      config: {
        systemInstruction: getSystemInstruction(lang),
        temperature: 0.2,
        maxOutputTokens: 1200,
      }
    });

    return response.text || "Inference error: Output stream empty.";
  } catch (error) {
    console.error("ML Inference Runtime Error:", error);
    return "The inference engine encountered an error. Please retry your request.";
  }
};