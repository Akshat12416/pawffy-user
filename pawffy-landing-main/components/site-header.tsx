"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Logo } from "./brand";

export function SiteHeader() {
  return (
    <motion.header initial={{ y: -24 }} animate={{ y: 0 }} transition={{ duration: .6 }} className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-bold md:flex" aria-label="Main navigation">
          <Link className="transition-opacity hover:opacity-55" href="#how-it-works">How it works</Link>
          <Link className="transition-opacity hover:opacity-55" href="#services">Services</Link>
          <Link className="transition-opacity hover:opacity-55" href="#legal">Trust center</Link>
        </nav>
        <Link href="#legal" className="rounded-full border border-[#17231d]/20 bg-white/55 px-5 py-3 text-sm font-bold backdrop-blur transition hover:-translate-y-0.5 hover:bg-white">Our promise</Link>
      </div>
    </motion.header>
  );
}
