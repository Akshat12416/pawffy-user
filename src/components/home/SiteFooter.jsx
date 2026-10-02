import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './brand';

export const SiteFooter = () => {
  return (
    <footer className="bg-[#17231d] px-5 py-10 text-[#f7f3e8] sm:px-8 lg:px-12 mt-auto">
      <div className="mx-auto max-w-[1344px] border-t border-white/15 pt-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <Logo light/>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/70 font-bold">
              A pet services and community platform operated by Ganapati & Rani Investment LLC dba ThePawffy.
            </p>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Support: <a href="mailto:support@thepawffy.com" className="hover:text-white transition">support@thepawffy.com</a>
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm font-bold text-white/70">
            <Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link>
            <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
          </div>
        </div>
        <div className="text-xs text-white/40">
          ©️ 2026 Ganapati & Rani Investment LLC dba ThePawffy. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
