import Link from "next/link";
import { Logo, PawMark } from "@/components/brand";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-[#eee8da] p-6"><div className="text-center"><div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-[#17231d] text-[#d7f26a]"><PawMark className="h-12 w-12" /></div><p className="mt-8 text-xs font-bold uppercase tracking-[.2em] text-[#2e5d45]">404 · Trail gone cold</p><h1 className="mt-4 text-5xl font-bold tracking-[-.06em]">This page wandered off.</h1><Link href="/" className="mt-8 inline-block rounded-full bg-[#17231d] px-7 py-4 font-bold text-white">Take me home</Link><div className="mt-12 flex justify-center"><Logo /></div></div></main>;
}
