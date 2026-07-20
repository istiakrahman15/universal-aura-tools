"use client";

import React from "react";
import { JsonFormatter } from "./JsonFormatter";
import { Base64 } from "./Base64";
import { JwtInspector } from "./JwtInspector";
import { UuidGenerator } from "./UuidGenerator";
import { HashGenerator } from "./HashGenerator";
import { ColorPicker } from "./ColorPicker";
import { WordCounter } from "./WordCounter";
import { CaseConverter } from "./CaseConverter";
import { TextCompare } from "./TextCompare";
import { TextCleaner } from "./TextCleaner";
import { Calculator } from "./Calculator";
import { UnitConverter } from "./UnitConverter";
import { PercentageCalculator } from "./PercentageCalculator";
import { AgeCalculator } from "./AgeCalculator";
import { AiSummarizer } from "./AiSummarizer";
import { AiTranslator } from "./AiTranslator";
import { CodeExplainer } from "./CodeExplainer";
import { RegexGenerator } from "./RegexGenerator";
import { ImageCompressor } from "./ImageCompressor";
import { ImageResizer } from "./ImageResizer";
import { PaletteExtractor } from "./PaletteExtractor";

interface ToolRendererProps {
  id: string;
}

export function ToolRenderer({ id }: ToolRendererProps) {
  switch (id) {
    case "json-formatter":
      return <JsonFormatter />;
    case "base64":
      return <Base64 />;
    case "jwt-inspector":
      return <JwtInspector />;
    case "uuid-generator":
      return <UuidGenerator />;
    case "hash-generator":
      return <HashGenerator />;
    case "color-picker":
      return <ColorPicker />;
    case "word-counter":
      return <WordCounter />;
    case "case-converter":
      return <CaseConverter />;
    case "text-compare":
      return <TextCompare />;
    case "text-cleaner":
      return <TextCleaner />;
    case "calculator":
      return <Calculator />;
    case "unit-converter":
      return <UnitConverter />;
    case "percentage-calculator":
      return <PercentageCalculator />;
    case "age-calculator":
      return <AgeCalculator />;
    case "ai-summarizer":
      return <AiSummarizer />;
    case "ai-translator":
      return <AiTranslator />;
    case "ai-code-explainer":
      return <CodeExplainer />;
    case "ai-regex":
      return <RegexGenerator />;
    case "image-compressor":
      return <ImageCompressor />;
    case "image-resizer":
      return <ImageResizer />;
    case "palette-extractor":
      return <PaletteExtractor />;
    default:
      return (
        <div className="p-8 text-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
          <h3 className="font-bold text-neutral-800 dark:text-neutral-200">Tool Not Found</h3>
          <p className="text-sm text-neutral-500 mt-1">The requested tool ID &quot;{id}&quot; does not exist in the registry.</p>
        </div>
      );
  }
}
