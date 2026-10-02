"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { LegalDocument as LegalDocumentType } from "@/lib/legal";
import { ArrowIcon, Logo } from "./brand";

export function LegalDocument({ document }: { document: LegalDocumentType }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 24, restDelta: .001 });
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const hits: { id: string; title: string; preview: string }[] = [];
    let current = { id: "document-start", title: document.title };
    for (const block of document.blocks) {
      if (block.type === "heading") current = { id: block.id, title: block.text };
      const haystack = block.type === "list" ? block.items.join(" ") : block.text;
      if (haystack.toLowerCase().includes(q) && !hits.some((hit) => hit.id === current.id)) {
        hits.push({ ...current, preview: haystack.slice(0, 150) });
      }
      if (hits.length >= 6) break;
    }
    return hits;
  }, [query, document]);

  return (
    <main className="min-h-screen bg-[#f7f3e8]">
      <motion.div className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-[#ff765d]" style={{ scaleX }} />
      <header className="sticky top-0 z-50 border-b border-[#17231d]/10 bg-[#f7f3e8]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Logo />
          <Link href="/#legal" className="inline-flex items-center gap-2 text-sm font-bold transition hover:opacity-55"><span className="rotate-180"><ArrowIcon /></span> Back to trust center</Link>
        </div>
      </header>

      <section id="document-start" className="grain border-b border-[#17231d]/10 bg-[#eee8da] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1344px]">
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="grid gap-10 lg:grid-cols-[1fr_.55fr] lg:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#2e5d45]">{document.eyebrow}</p><h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[.92] tracking-[-.065em] sm:text-7xl lg:text-8xl">{document.title}</h1></div>
            <div><p className="text-lg leading-8 text-[#17231d]/65">{document.summary}</p><p className="mt-6 inline-flex rounded-full bg-[#17231d] px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-white">{document.effective}</p></div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1344px] gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[280px_minmax(0,760px)] lg:justify-between lg:px-12 lg:py-20">
        <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-5">
          <div className="relative">
            <label htmlFor="legal-search" className="sr-only">Search this document</label>
            <input id="legal-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search this document" className="w-full rounded-full border border-[#17231d]/15 bg-white/65 px-5 py-3 text-sm outline-none transition placeholder:text-[#17231d]/45 focus:border-[#2e5d45] focus:ring-4 focus:ring-[#2e5d45]/10" />
            {query.length >= 2 && <div className="absolute left-0 right-0 top-14 z-20 rounded-2xl border border-[#17231d]/10 bg-white p-2 shadow-2xl">{results.length ? results.map((result) => <a key={result.id} href={`#${result.id}`} onClick={() => setQuery("")} className="block rounded-xl p-3 transition hover:bg-[#eee8da]"><strong className="block text-xs">{result.title}</strong><span className="mt-1 line-clamp-2 block text-[11px] leading-4 text-[#17231d]/55">{result.preview}</span></a>) : <p className="p-3 text-xs text-[#17231d]/50">No matching sections found.</p>}</div>}
          </div>
          <details className="group mt-5 lg:hidden"><summary className="cursor-pointer list-none rounded-full border border-[#17231d]/15 px-5 py-3 text-sm font-bold">Jump to a section <span className="float-right">＋</span></summary><nav className="mt-3 rounded-2xl bg-white/60 p-4">{document.toc.map((item) => <a key={item.id} href={`#${item.id}`} className="block border-b border-[#17231d]/10 py-3 text-xs leading-5 last:border-0">{item.text}</a>)}</nav></details>
          <nav className="mt-8 hidden lg:block" aria-label="Document sections"><p className="mb-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#17231d]/45">On this page</p>{document.toc.map((item) => <a key={item.id} href={`#${item.id}`} className="block border-l border-[#17231d]/15 py-2 pl-4 text-[11px] leading-4 text-[#17231d]/55 transition hover:border-[#ff765d] hover:text-[#17231d]">{item.text}</a>)}</nav>
        </aside>

        <article className="legal-copy min-w-0 text-[15px] leading-7 text-[#17231d]/78 sm:text-base sm:leading-8">
          {document.intro.length > 0 && <div className="mb-14 rounded-[1.75rem] bg-[#d7f26a] p-7 text-[#17231d] sm:p-9">{document.intro.map((p, i) => <p key={i} className={i === 0 ? "text-lg font-bold leading-8" : ""}>{p}</p>)}</div>}
          {document.sourceContents.length > 0 && <section className="mb-14 rounded-[1.75rem] border border-[#17231d]/12 bg-white/55 p-7 sm:p-9" aria-label="Contents as provided in the source document">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[.18em] text-[#2e5d45]">Contents as provided</p>
            <div className="space-y-2 text-sm leading-6 text-[#17231d]/70">
              {document.sourceContents.map((item, index) => <p key={`${item.text}-${index}`} className={`m-0 ${/^\d+\.\d+/.test(item.text) ? "pl-6" : ""} ${index === 0 && !/^[•\d]/.test(item.text) ? "font-bold text-[#17231d]" : ""}`}>
                {item.href ? <a href={item.href} className="font-bold text-[#2e5d45] underline decoration-[#2e5d45]/25 underline-offset-4 transition hover:decoration-[#2e5d45]">{item.text}</a> : item.text}
              </p>)}
            </div>
          </section>}
          {document.blocks.map((block, index) => {
            if (block.type === "heading") return block.level === 2
              ? <h2 key={`${block.id}-${index}`} id={block.id} className="scroll-mt-28 border-t border-[#17231d]/12 pt-12 text-3xl font-bold leading-tight tracking-[-.045em] text-[#17231d] first:border-0 first:pt-0 sm:text-4xl">{block.text}</h2>
              : <h3 key={`${block.id}-${index}`} id={block.id} className="scroll-mt-28 pt-5 text-xl font-bold leading-tight tracking-[-.03em] text-[#2e5d45]">{block.text}</h3>;
            if (block.type === "list") return <ul key={index}>{block.items.map((item, i) => <li key={i}>{item}</li>)}</ul>;
            const isCaps = block.text.length > 80 && block.text === block.text.toUpperCase();
            return <p key={index} className={isCaps ? "rounded-2xl bg-[#17231d] p-6 font-bold text-white sm:p-7" : ""}>{block.text}</p>;
          })}
          <div className="mt-16 flex flex-col gap-4 rounded-[1.75rem] bg-[#eee8da] p-7 sm:flex-row sm:items-center sm:justify-between"><div><p className="m-0 text-xs font-bold uppercase tracking-[.16em] text-[#2e5d45]">End of document</p><p className="m-0 mt-2 text-sm text-[#17231d]/60">Looking for another policy?</p></div><Link href="/#legal" className="inline-flex items-center gap-2 font-bold">View trust center <ArrowIcon /></Link></div>
        </article>
      </div>
    </main>
  );
}
