import type { GuideFaq, GuideLabels, GuideTocItem } from "@/components/guide-article";

export type GuideSection = {
  id: string;
  title: string;
  paragraphs: string[];
  formula?: string;
};

export type LocalizedGuideCopy = {
  title: string;
  description: string;
  readingTime: string;
  toolLabel: string;
  toc: GuideTocItem[];
  faq: GuideFaq[];
  lead: string;
  formulaLabel: string;
  formula: string;
  formulaBody: string;
  sections: GuideSection[];
  checklistTitle: string;
  checklist: string[];
};

export type GuidesIndexCopy = {
  metadataTitle: string;
  metadataDescription: string;
  kicker: string;
  heading: string;
  intro: string;
  listKicker: string;
  listHeading: string;
  listIntro: string;
  readGuide: string;
  cards: Array<{ category: string; title: string; description: string; time: string }>;
};

export type GuideUiCopy = GuideLabels;
