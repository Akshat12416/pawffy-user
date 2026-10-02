import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowIcon, PawMark } from "../components/home/brand";
import { HeroScene } from "../components/home/hero-scene";
import { SiteHeader } from "../components/home/site-header";
import { SiteFooter } from "../components/home/SiteFooter";

const reveal = { initial: { y: 24 }, whileInView: { y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: .65 } };

const steps = [
  { n: "01", title: "Tell us their quirks", body: "Share your pet’s routine, personality, and the kind of care that makes their tail wag." },
  { n: "02", title: "Meet your match", body: "Browse caring local providers, compare profiles, and choose with confidence." },
  { n: "03", title: "Breathe easy", body: "Book, message, and stay close to every update—all in one thoughtful place." },
];

const legal = [
  { href: "/terms", tag: "For everyone", title: "Terms & Conditions", c: "bg-[#d7f26a]" },
  { href: "/privacy-policy", tag: "For everyone", title: "Privacy Policy", c: "bg-[#b9dfee]" },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <section className="grain relative min-h-[900px] bg-[#f7f3e8] pt-28 lg:min-h-screen">
        <SiteHeader />
        <div className="mx-auto grid max-w-[1440px] items-center gap-5 px-5 py-10 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-12 lg:py-14">
          <motion.div initial={{ y: 25 }} animate={{ y: 0 }} transition={{ duration: .8 }} className="relative z-10 pt-10 lg:pt-0">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#17231d]/15 bg-white/50 px-4 py-2 text-xs font-bold uppercase tracking-[.16em]"><span className="h-2 w-2 rounded-full bg-[#ff765d]"/>Thoughtful care, close to home</div>
            <h1 className="display max-w-[800px] font-bold">Their happy place, <span className="text-[#2e5d45]">found.</span></h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-[#17231d]/70 sm:text-xl">The Pawffy brings loving pet parents and trusted local caregivers together—so every walk, stay, and cuddle feels just right.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#how-it-works" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#17231d] px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:shadow-xl">See how it works <ArrowIcon /></a>
              <a href="#legal" className="inline-flex items-center justify-center rounded-full border border-[#17231d]/20 px-7 py-4 font-bold transition hover:bg-white">Visit trust center</a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-bold text-[#17231d]/65"><span>✓ Clear profiles</span><span>✓ Secure booking</span><span>✓ Real support</span></div>
          </motion.div>
          <HeroScene />
        </div>
        <div className="absolute bottom-0 left-1/2 hidden w-[calc(100%-6rem)] max-w-[1344px] -translate-x-1/2 border-t border-[#17231d]/15 py-5 lg:flex lg:justify-between">
          <span className="text-xs font-bold uppercase tracking-[.16em] text-[#17231d]/50">One community. Every kind of care.</span>
          <span className="text-xs font-bold uppercase tracking-[.16em] text-[#17231d]/50">Austin, Texas → everywhere pets are loved</span>
        </div>
      </section>

      <section id="how-it-works" className="bg-[#17231d] px-5 py-24 text-[#f7f3e8] sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1344px]">
          <motion.div {...reveal} className="grid gap-6 lg:grid-cols-2 lg:items-end"><div><p className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-[#d7f26a]">How The Pawffy works</p><h2 className="text-5xl font-bold leading-[.95] tracking-[-.06em] sm:text-7xl">Good care starts<br/>with a good fit.</h2></div><p className="max-w-lg text-lg leading-8 text-white/60 lg:justify-self-end">No guesswork. No endless tabs. Just a simple path from “I need a hand” to “they’re in wonderful hands.”</p></motion.div>
          <div className="mt-20 grid gap-px overflow-hidden rounded-[2rem] bg-white/15 lg:grid-cols-3">
            {steps.map((step, i) => <motion.article key={step.n} {...reveal} transition={{ duration: .6, delay: i * .08 }} className="group bg-[#17231d] p-8 sm:p-10"><div className="flex items-center justify-between"><span className="text-sm font-bold text-[#d7f26a]">{step.n}</span><span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-xl transition group-hover:rotate-12 group-hover:bg-[#d7f26a] group-hover:text-[#17231d]">{i === 0 ? "✦" : i === 1 ? "♥" : "✓"}</span></div><h3 className="mt-16 text-2xl font-bold tracking-[-.04em]">{step.title}</h3><p className="mt-4 leading-7 text-white/55">{step.body}</p></motion.article>)}
          </div>
        </div>
      </section>

      <section id="services" className="grain bg-[#eee8da] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1344px]">
          <motion.div {...reveal} className="mb-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-[#2e5d45]">Made for real pet life</p><h2 className="text-5xl font-bold tracking-[-.06em] sm:text-7xl">Care for every chapter.</h2></div><p className="max-w-sm leading-7 text-[#17231d]/60">From the everyday walk to a weekend away, find someone who gets them.</p></motion.div>
          <div className="grid auto-rows-[260px] gap-4 md:grid-cols-3">
            <motion.article {...reveal} className="relative overflow-hidden rounded-[2rem] bg-[#d7f26a] p-8 md:col-span-2 md:row-span-2"><p className="text-xs font-bold uppercase tracking-[.18em]">Most loved</p><h3 className="mt-3 max-w-md text-4xl font-bold tracking-[-.06em] sm:text-6xl">Walks that match their rhythm.</h3><div className="absolute -bottom-28 -right-16 h-96 w-96 rounded-full border-[52px] border-[#17231d]/10"/><PawMark className="absolute bottom-9 right-10 h-24 w-24 rotate-12 text-[#2e5d45] sm:h-36 sm:w-36"/></motion.article>
            <motion.article {...reveal} className="rounded-[2rem] bg-[#b9dfee] p-8"><span className="text-4xl">⌂</span><h3 className="mt-12 text-2xl font-bold tracking-[-.04em]">Cozy stays</h3><p className="mt-2 text-sm text-[#17231d]/60">A home away from home.</p></motion.article>
            <motion.article {...reveal} className="rounded-[2rem] bg-[#ff9a85] p-8"><span className="text-4xl">✦</span><h3 className="mt-12 text-2xl font-bold tracking-[-.04em]">Grooming</h3><p className="mt-2 text-sm text-[#17231d]/60">Fresh, fluffy, feeling good.</p></motion.article>
            <motion.article {...reveal} className="rounded-[2rem] bg-[#f7f3e8] p-8 md:col-span-2"><div className="flex h-full items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#2e5d45]">And then some</p><h3 className="mt-3 text-3xl font-bold tracking-[-.05em]">Training, veterinary care & more</h3></div><span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#17231d] text-[#d7f26a]">→</span></div></motion.article>
            <motion.article {...reveal} className="relative overflow-hidden rounded-[2rem] bg-[#2e5d45] p-8 text-white"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#d7f26a]">Built on trust</p><h3 className="mt-12 text-2xl font-bold tracking-[-.04em]">Clear choices.<br/>Kind people.</h3><div className="absolute -right-6 -top-6 h-24 w-24 rounded-full border-[18px] border-white/10"/></motion.article>
          </div>
        </div>
      </section>

      <section id="legal" className="bg-[#f7f3e8] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1344px]">
          <motion.div {...reveal} className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]"><div><p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-[#2e5d45]">Trust center</p><h2 className="text-5xl font-bold leading-[.95] tracking-[-.06em] sm:text-7xl">The fine print,<br/>made findable.</h2><p className="mt-7 max-w-md leading-7 text-[#17231d]/60">Clear relationships make for better care. Read the policies that keep our community informed.</p></div><div className="space-y-3">{legal.map((item, i) => <Link key={item.href + i} to={item.href} className={`group flex items-center justify-between rounded-[1.6rem] p-6 transition hover:-translate-x-2 sm:p-8 ${item.c}`}><div className="flex items-center gap-5 sm:gap-8"><span className="text-sm font-bold tabular-nums">0{i + 1}</span><div><p className="text-xs font-bold uppercase tracking-[.16em] opacity-60">{item.tag}</p><h3 className="mt-1 text-2xl font-bold tracking-[-.04em] sm:text-3xl">{item.title}</h3></div></div><span className="grid h-12 w-12 place-items-center rounded-full bg-[#17231d] text-white transition group-hover:rotate-[-8deg]"><ArrowIcon /></span></Link>)}</div></motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}