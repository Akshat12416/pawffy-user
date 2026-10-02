import React from "react";
import { Link } from "react-router-dom";

export function PawMark({ className = "h-8 w-8" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M17.5 28.4c4.1-1.4 5.4-7.4 2.9-13.3S12.5 5.4 8.4 6.9 3 14.2 5.5 20.2s7.9 9.6 12 8.2Zm29 0c-4.1-1.4-5.4-7.4-2.9-13.3s7.9-9.7 12-8.2 5.4 7.3 2.9 13.3-7.9 9.6-12 8.2ZM30.8 25c4.7-.4 8-5.8 7.4-12.2S33.4 1.6 28.7 2 20.8 7.8 21.3 14s4.8 11.4 9.5 11Zm1.4 8.1c-10.8 0-23.6 9.5-22.6 18.4.7 6.3 7.6 9.3 14 7.5 5.7-1.6 11.5-1.6 17.2 0 6.4 1.8 13.3-1.2 14-7.5 1-8.9-11.8-18.4-22.6-18.4Z" fill="currentColor"/>
    </svg>
  );
}

export function Logo({ light = false }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2 text-xl font-bold tracking-[-.04em] ${light ? "text-[#f7f3e8]" : "text-[#17231d]"}`}>
      <span className={`grid h-10 w-10 place-items-center rounded-full ${light ? "bg-[#d7f26a] text-[#17231d]" : "bg-[#17231d] text-[#d7f26a]"}`}>
        <PawMark className="h-5 w-5" />
      </span>
      The Pawffy
    </Link>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }) {
  return <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
