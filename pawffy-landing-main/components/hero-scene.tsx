"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { PawMark } from "./brand";

export function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18 });
  const sy = useSpring(my, { stiffness: 90, damping: 18 });
  const rotateY = useTransform(sx, [-.5, .5], [-10, 10]);
  const rotateX = useTransform(sy, [-.5, .5], [9, -9]);

  return (
    <div ref={ref} className="relative h-[520px] w-full max-w-[620px] [perspective:1200px] lg:h-[650px]" onPointerMove={(e) => {
      const box = ref.current?.getBoundingClientRect();
      if (!box) return;
      mx.set((e.clientX - box.left) / box.width - .5);
      my.set((e.clientY - box.top) / box.height - .5);
    }} onPointerLeave={() => { mx.set(0); my.set(0); }}>
      <motion.div className="absolute left-[8%] top-[10%] h-[74%] w-[82%] rounded-[50%] border border-[#17231d]/10" animate={{ rotate: 360 }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }} />
      <motion.div className="absolute left-[18%] top-[20%] h-[54%] w-[62%] rounded-[50%] border border-dashed border-[#17231d]/20" animate={{ rotate: -360 }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }} />
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="absolute left-[11%] top-[9%] h-[76%] w-[76%] rounded-[2.7rem] bg-[#2e5d45] p-5 shadow-[0_45px_90px_rgba(23,35,29,.28)] sm:p-7" initial={{ y: 30 }} animate={{ y: 0 }} transition={{ duration: .9, delay: .15 }}>
        <div className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-[#f7f3e8] p-5 sm:p-7" style={{ transform: "translateZ(22px)" }}>
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[.18em] text-[#2e5d45]">
            <span>Great match</span><span className="rounded-full bg-[#d7f26a] px-3 py-2 text-[#17231d]">Available</span>
          </div>
          <div className="relative my-5 min-h-0 flex-1 overflow-hidden rounded-[1.5rem] bg-[#b9dfee] sm:my-7">
            <div className="absolute -bottom-14 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#ff765d]" />
            <motion.div className="absolute left-1/2 top-1/2 grid h-44 w-44 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#17231d] text-[#d7f26a] shadow-2xl sm:h-52 sm:w-52" animate={{ y: [0, -9, 0], rotateZ: [-2, 2, -2] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
              <PawMark className="h-24 w-24 sm:h-28 sm:w-28" />
            </motion.div>
            <span className="absolute left-5 top-5 rounded-full bg-white/80 px-3 py-2 text-xs font-bold backdrop-blur">★ 4.9</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#2e5d45]">Care by Maya</p><h3 className="mt-1 text-2xl font-bold tracking-[-.05em] sm:text-3xl">Safe paws.<br/>Happy hearts.</h3></div>
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#17231d] text-[#d7f26a]">→</div>
          </div>
        </div>
      </motion.div>

      <motion.div className="absolute right-[1%] top-[7%] rounded-2xl bg-[#d7f26a] px-4 py-3 text-sm font-bold shadow-xl" style={{ translateZ: 70 }} animate={{ y: [0, -12, 0], rotate: [4, 7, 4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>Background checked ✓</motion.div>
      <motion.div className="absolute bottom-[7%] left-[0%] rounded-2xl bg-white px-5 py-4 shadow-xl" animate={{ y: [0, 10, 0], rotate: [-5, -2, -5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><span className="text-xl">🐾</span><p className="mt-1 text-xs font-bold uppercase tracking-[.14em] text-[#2e5d45]">Walk complete</p></motion.div>
      <motion.div className="absolute bottom-[15%] right-[2%] grid h-20 w-20 place-items-center rounded-full bg-[#ff765d] text-3xl shadow-xl" animate={{ rotate: [0, 10, -7, 0], scale: [1, 1.07, 1] }} transition={{ duration: 5.5, repeat: Infinity }}>♥</motion.div>
    </div>
  );
}
