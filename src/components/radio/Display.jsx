import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { Battery } from "lucide-react";

export default function Display({
  frequency,
  mode,
  volume,
  squelch,
  isPowered,
  isBooting,
  settings,
  leftMenu,
  rightMenu,
  inputBuffer,
}) {
  /* =========================
     State for impure/random values
     ========================= */

  // Initialize RSSI once on mount
  const [rssi] = useState(() => Math.floor(Math.random() * 3 + 7)); // S7–S9

  // RF meter level
  const [rfLevel, setRfLevel] = useState(50);

  // Update RF meter periodically for dynamic effect
  useEffect(() => {
    const interval = setInterval(() => {
      const noise = Math.random() * 20;
      const squelchBoost = settings.squelchState === "Open" ? 10 : 0;
      const squelchPenalty = (100 - squelch) * 0.1;
      setRfLevel(Math.min(100, noise + squelchBoost + 40 - squelchPenalty));
    }, 500); // updates every 0.5s

    return () => clearInterval(interval);
  }, [settings.squelchState, squelch]);

  /* =========================
     Power-off screen
     ========================= */
  // if (!isPowered) {
  //   return (
  //     <div className="w-full h-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
  //       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-slate-800 to-slate-950" />
  //       <div className="text-slate-700 font-bold tracking-widest animate-pulse z-10">
  //         STANDBY
  //       </div>
  //     </div>
  //   );
  // }
  if (!isPowered && !isBooting) {
  return (
    <div className="w-full h-full bg-black" />
  );
}

if (isBooting) {
  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <div className="text-green-500 font-mono text-sm tracking-widest animate-pulse">
        ROHDE & SCHWARZ
      </div>
    </div>
  );
}


  /* =========================
     Main display
     ========================= */
  return (
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden">
      {/* Top Status Bar */}
      <div className="h-6 bg-slate-100 border-b border-slate-200 flex items-center justify-between px-2 text-[10px] font-bold text-slate-600 uppercase">
        <div className="flex items-center gap-2">
          <span>Remote: {settings.remote ? "ON" : "OFF"}</span>
          <span>Clock: INT</span>
          <span>GPS: {settings.gps ? "FIX" : "NO FIX"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <Battery className="w-3 h-3 text-green-600" />
            100%
          </span>
          <span>12:45:30</span>
        </div>
      </div>

      <div className="grow flex">
        {/* Left Menu */}
        <div className="w-24 bg-slate-50 border-r border-slate-200 flex flex-col justify-between py-2">
          {leftMenu.map((item, i) => (
            <div
              key={i}
              className="px-2 py-1 flex items-center gap-1 cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <div
                className={`w-1 h-1 rounded-full ${
                  item.active ? "bg-green-500" : "bg-blue-600"
                }`}
              />
              <span
                className={`text-[9px] leading-tight ${
                  item.active
                    ? "text-blue-700 font-bold"
                    : "text-slate-600 font-semibold"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Center Display */}
        <div className="grow p-4 flex flex-col bg-white relative">
          {/* Scan Indicator */}
          {settings.scanning && (
            <div className="absolute top-2 right-2 flex items-center gap-1 animate-pulse">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-[10px] font-bold text-green-600 uppercase">
                SCANNING
              </span>
            </div>
          )}

          {/* Frequency Block */}
          <div className="w-full flex justify-between items-start mb-2">
            <div>
              <span className="text-xs font-bold text-slate-400">
                Rx Frequency
              </span>

              {inputBuffer ? (
                <span className="text-4xl font-digital font-bold text-amber-600 tracking-tighter animate-pulse">
                  {inputBuffer}_
                  <span className="text-lg text-slate-500 ml-1">MHz</span>
                </span>
              ) : (
                <span className="text-4xl font-digital font-bold text-blue-600 tracking-tighter">
                  {frequency.toFixed(3)}
                  <span className="text-lg text-slate-500 ml-1">MHz</span>
                </span>
              )}

              <div className="flex gap-2 mt-1">
                <span className="text-[10px] px-1 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200">
                  BW: {settings.bandwidth}
                </span>
                <span className="text-[10px] px-1 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200">
                  PWR: {settings.power}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold text-slate-800 tracking-tight">
                {mode}
              </div>
              <div
                className={`text-[10px] font-bold uppercase px-1 rounded mt-1 ${
                  settings.encryption === "Secure"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {settings.encryption}
              </div>
            </div>
          </div>

          {/* Meters */}
          <div className="w-full space-y-3 mt-auto mb-2">
            {/* AF Level */}
            <div>
              <div className="flex justify-between text-[9px] text-slate-400 mb-1 uppercase font-bold">
                <span>AF Level (Vol)</span>
                <span>{Math.round(volume)}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-sm overflow-hidden border border-slate-200">
                <Motion.div
                  className="h-full bg-blue-500"
                  animate={{ width: `${volume}%` }}
                />
              </div>
            </div>

            {/* RF Level */}
            <div>
              <div className="flex justify-between text-[9px] text-slate-400 mb-1 uppercase font-bold">
                <span>RF Level (RSSI)</span>
                <span>S{rssi}</span>
              </div>

              <div className="h-2 w-full bg-slate-100 rounded-sm overflow-hidden border border-slate-200 relative">
                {/* Scale */}
                <div className="absolute inset-0 flex justify-between px-px">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-px h-full bg-white opacity-50" />
                  ))}
                </div>

                <Motion.div
                  className="h-full bg-linear-to-r from-green-500 via-yellow-400 to-red-500"
                  animate={{ width: `${rfLevel}%` }}
                  transition={{ duration: 0.15 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Menu */}
        <div className="w-24 bg-slate-50 border-l border-slate-200 flex flex-col justify-between py-2 items-end text-right">
          {rightMenu.map((item, i) => (
            <div
              key={i}
              className="px-2 py-1 flex flex-row-reverse items-center gap-1 cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <div
                className={`w-1 h-1 rounded-full ${
                  item.active ? "bg-green-500" : "bg-blue-600"
                }`}
              />
              <span
                className={`text-[9px] leading-tight ${
                  item.active
                    ? "text-blue-700 font-bold"
                    : "text-slate-600 font-semibold"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
