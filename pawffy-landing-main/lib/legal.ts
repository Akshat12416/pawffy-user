import fs from "node:fs";
import path from "node:path";

export type LegalSlug = "user-terms" | "vendor-terms" | "privacy-policy";
export type LegalBlock =
  | { type: "heading"; text: string; id: string; level: 2 | 3 }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type LegalDocument = {
  slug: LegalSlug;
  eyebrow: string;
  title: string;
  effective: string;
  summary: string;
  intro: string[];
  sourceContents: { text: string; href?: string }[];
  blocks: LegalBlock[];
  toc: { id: string; text: string }[];
};

const docs: Record<LegalSlug, { file: string; eyebrow: string; title: string; summary: string; start: string; occurrence: number; tocMarker: string }> = {
  "user-terms": {
    file: "user-terms.txt",
    eyebrow: "For pet parents",
    title: "User Terms & Conditions",
    summary: "The ground rules for finding, booking, and receiving pet care through The Pawffy.",
    start: "1. The Pawffy's Role.",
    occurrence: 1,
    tocMarker: "Links to be added of these sections",
  },
  "vendor-terms": {
    file: "vendor-terms.txt",
    eyebrow: "For care providers",
    title: "Vendor Terms & Conditions",
    summary: "The terms that shape a clear, professional relationship between The Pawffy and independent providers.",
    start: "1. The Pawffy's Role.",
    occurrence: 1,
    tocMarker: "\t•\tThe Pawffy's Role",
  },
  "privacy-policy": {
    file: "privacy-policy.txt",
    eyebrow: "For everyone",
    title: "Privacy Policy",
    summary: "How The Pawffy collects, uses, protects, and respects personal and business information.",
    start: "Who This Policy Applies To?",
    occurrence: 2,
    tocMarker: "Table of Contents",
  },
};

const privacyMainHeadings = new Set([
  "Who This Policy Applies To?",
  "Information We Collect",
  "How We Collect Your Information?",
  "How We Use Your Information?",
  "Legal Basis for Processing",
  "Data Sharing and Disclosure",
  "Cookies and Tracking Technologies",
  "Your Rights Your Choices",
  "Your Rights and Choices",
  "Exercising Your Rights",
  "Data Security Measures",
  "Data Retention and Deletion",
  "State Privacy Notice",
  "Children's Privacy",
  "Updates To This Privacy Policy",
  "Contact Us",
]);

function clean(value: string) {
  return value.replace(/\u000b/g, "\n").replace(/\u00a0/g, " ").replace(/[ \t]+$/gm, "").trim();
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function linkWords(value: string) {
  const stopWords = new Set(["a", "an", "and", "for", "of", "the", "to"]);
  return value
    .toLowerCase()
    .replace(/^[•\s]*/, "")
    .replace(/^[a-z]\.|^\d+(?:\.\d+)*\.?/, "")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((word) => word.replace(/ies$/, "y").replace(/s$/, ""))
    .filter((word) => word && !stopWords.has(word));
}

function nthIndex(lines: string[], needle: string, occurrence: number) {
  let seen = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === needle) {
      seen++;
      if (seen === occurrence) return i;
    }
  }
  return -1;
}

function headingInfo(line: string, slug: LegalSlug): { level: 2 | 3; text: string } | null {
  const text = line.trim().replace(/\s+/g, " ");
  if (slug !== "privacy-policy") {
    const match = text.match(/^(\d+)(?:\.(\d+))?\.?\s+(.+)$/);
    if (!match) return null;
    return { level: match[2] ? 3 : 2, text };
  }

  const normalized = text.replace(/[?.]?$/, (end) => end).trim();
  const main = [...privacyMainHeadings].find((heading) => normalized.startsWith(heading));
  if (main && (normalized.length === main.length || normalized.startsWith(`${main} `))) {
    return { level: 2, text };
  }
  if (/^[A-G]\.\s+/.test(text)) return { level: 3, text };
  if (/^\d+\.\s+/.test(text) && text.length < 78) return { level: 3, text };
  if (/^(Users|Vendors|Both|Personal Identifiers|Pet-Profile Data|User-Generated Content|Verification Data|Important Note|Biometric Information|Citizenship Status|Location Information|Device Information, Usage Behavior and Technical Data|Financial and Transactional Data|Communication Logs)$/i.test(text)) {
    return { level: 3, text };
  }
  return null;
}

function parseBlocks(lines: string[], slug: LegalSlug): LegalBlock[] {
  const blocks: LegalBlock[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  const ids = new Map<string, number>();

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", text: paragraph.join(" ").replace(/\s+/g, " ").trim() });
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) blocks.push({ type: "list", items: list });
    list = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flushParagraph(); flushList(); continue; }
    const heading = headingInfo(line, slug);
    if (heading) {
      flushParagraph(); flushList();
      const base = slugify(heading.text);
      const count = ids.get(base) ?? 0;
      ids.set(base, count + 1);
      blocks.push({ type: "heading", ...heading, id: count ? `${base}-${count + 1}` : base });
      continue;
    }
    if (/^[•●▪◦]\s*/.test(line)) {
      flushParagraph();
      list.push(line.replace(/^[•●▪◦]\s*/, "").trim());
      continue;
    }
    flushList();
    paragraph.push(line);
  }
  flushParagraph(); flushList();
  return blocks.filter((block) => block.type !== "paragraph" || block.text.length > 0);
}

export function getLegalDocument(slug: LegalSlug): LegalDocument {
  const config = docs[slug];
  const raw = clean(fs.readFileSync(path.join(process.cwd(), "content", "legal", config.file), "utf8"));
  const lines = raw.split(/\r?\n/);
  const effective = lines.find((line) => line.trim().startsWith("Effective"))?.trim() ?? "Effective date not specified";
  const tocIndex = lines.findIndex((line) => line.trim() === config.tocMarker.trim());
  const startIndex = nthIndex(lines, config.start, config.occurrence);
  const dateIndex = lines.findIndex((line) => line.trim().startsWith("Effective"));
  if (tocIndex < 0 || startIndex < 0 || dateIndex < 0) {
    throw new Error(`The source structure for ${slug} could not be read completely.`);
  }
  const introEnd = tocIndex > dateIndex ? tocIndex : startIndex;
  const intro = lines.slice(dateIndex + 1, introEnd).join("\n").split(/\n\s*\n/).map((p) => p.replace(/\s+/g, " ").trim()).filter(Boolean);
  const blocks = parseBlocks(lines.slice(startIndex), slug);
  const headings = blocks.filter((block): block is Extract<LegalBlock, { type: "heading" }> => block.type === "heading");
  const sourceContents = lines.slice(tocIndex, startIndex).map((line) => line.trim()).filter(Boolean).map((text, index) => {
    if (index === 0 && !/^[•\d]/.test(text)) return { text };
    const number = text.match(/^(\d+(?:\.\d+)*)\.?\s+/)?.[1];
    if (number) {
      const heading = headings.find((item) => item.text.startsWith(`${number}.`) || item.text.startsWith(`${number} `));
      return { text, href: heading ? `#${heading.id}` : undefined };
    }
    if (/^[abc]\.\s+/i.test(text)) {
      const informationSection = headings.find((item) => item.text.toLowerCase().startsWith("information we collect"));
      return { text, href: informationSection ? `#${informationSection.id}` : undefined };
    }
    const words = new Set(linkWords(text));
    let best: { id: string; score: number } | undefined;
    for (const heading of headings.filter((item) => item.level === 2)) {
      const headingWords = linkWords(heading.text);
      const overlap = headingWords.filter((word) => words.has(word)).length;
      const score = overlap / Math.max(words.size, headingWords.length, 1);
      if (!best || score > best.score) best = { id: heading.id, score };
    }
    return { text, href: best && best.score >= .34 ? `#${best.id}` : undefined };
  });
  const toc = blocks.filter((block): block is Extract<LegalBlock, { type: "heading" }> => block.type === "heading" && block.level === 2).map(({ id, text }) => ({ id, text }));
  const sourceTitle = lines.find((line) => line.trim())?.trim() ?? config.title;
  return { slug, eyebrow: config.eyebrow, title: sourceTitle, effective, summary: config.summary, intro, sourceContents, blocks, toc };
}

export function getLegalSlugs(): LegalSlug[] {
  return Object.keys(docs) as LegalSlug[];
}

export function isLegalSlug(value: string): value is LegalSlug {
  return value in docs;
}
