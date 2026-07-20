import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: NextRequest) {
  try {
    const { action, prompt, payload } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not configured in the workspace secrets." },
        { status: 500 }
      );
    }

    let systemInstruction = "You are a helpful assistant.";
    let userPrompt = prompt;

    // Define instructions based on the action
    if (action === "summarize") {
      const length = payload?.length || "medium";
      const format = payload?.format || "paragraph";
      systemInstruction = `You are a premium AI text summarizer. 
Provide a high-quality summary of the given text.
Length constraints: ${length} (short: 1-2 sentences, medium: 1-2 paragraphs, long: detailed breakdown).
Output format: ${format === "bullets" ? "bulleted list of key points" : "flowing paragraphs"}.
Respond ONLY with the summary. Do not add any conversational intro or outro.`;
    } else if (action === "write") {
      const type = payload?.type || "article";
      const tone = payload?.tone || "professional";
      systemInstruction = `You are a highly skilled professional writer and content marketer.
Create a top-tier piece of writing based on the prompt description.
Content Type: "${type}" (e.g. email, blog post, social post, technical article).
Tone of voice: "${tone}" (e.g. professional, casual, creative, witty).
Make the structure clean, engaging, and directly useful. Do not add any greeting or post-completion conversation. Respond ONLY with the finalized writing contents.`;
    } else if (action === "translate") {
      const targetLang = payload?.targetLang || "Spanish";
      systemInstruction = `You are an expert real-time translator.
Translate the input text precisely into the target language: "${targetLang}".
Maintain the tone, style, and formatting of the original text.
Respond ONLY with the translated text. Do not add any explanation or greeting.`;
    } else if (action === "code-explain") {
      const language = payload?.language || "programming";
      systemInstruction = `You are an elite software architect and coding mentor.
Explain the following ${language} code snippet line-by-line in a highly readable, educational manner.
Break down key algorithms, complexity, and functions. 
Output your response in clean Markdown with appropriate headers, bullet points, and highlight terms.`;
    } else if (action === "regex") {
      systemInstruction = `You are a regex engineer.
Generate a valid regular expression based on the user's description.
Provide the regex pattern first in a single code block, followed by a brief bulleted explanation of how it works and 3 sample strings that match it.
Be precise and ensure the regex works standardly across programming languages.`;
    } else {
      systemInstruction = "You are a helpful utility assistant of Universal Aura Tools, providing smart outputs.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2, // low temperature for precise utilities
      }
    });

    const resultText = response.text || "No response received from Gemini AI.";

    return NextResponse.json({ success: true, text: resultText });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error?.message || "An unexpected error occurred during AI content generation." },
      { status: 500 }
    );
  }
}
