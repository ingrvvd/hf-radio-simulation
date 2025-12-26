// import React, { useState } from 'react';
// import Display from '@/components/radio/Display';
// import Knob from '@/components/radio/Knob';
// import Keypad from '@/components/radio/Keypad';
// import { Power, Menu, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, X, CornerDownLeft, GripVertical, Disc } from 'lucide-react';

// export default function Index() {
//    const [isBooting, setIsBooting] = useState(false);
//   const [isPowered, setIsPowered] = useState(false);
//   const [frequency, setFrequency] = useState(24.450);
//   const [volume, _setVolume] = useState(40);
//   const [inputBuffer, setInputBuffer] = useState('');

//   // Radio Settings State
//   const [settings, setSettings] = useState({
//     mode: 'F3E', // Modes: F3E (FM), A3E (AM), J3E (SSB)
//     bandwidth: '25k', // 12.5k, 25k
//     power: 'High', // Low, Med, High
//     scanning: false,
//     squelchState: 'Closed', // Open, Closed
//     encryption: 'Clear', // Clear, Secure
//     remote: false,
//     gps: true,
//   });

//   const MODES = ['F3E', 'A3E', 'J3E'];
//   const BW_OPTIONS = ['12.5k', '25k', '50k'];
//   const POWER_OPTIONS = ['Low', 'Med', 'High'];

//   // Dynamic Menu Labels
//   const leftMenuItems = [
//     { label: settings.remote ? 'Remote: ON' : 'Remote: OFF', active: settings.remote },
//     { label: settings.encryption, active: settings.encryption === 'Secure' },
//     { label: 'Disconnect', active: false },
//     { label: `Sql: ${settings.squelchState}`, active: settings.squelchState === 'Open' },
//     { label: 'Maintenance', active: false },
//     { label: 'Fill Gun', active: false },
//   ];

//   const rightMenuItems = [
//     { label: `Mode: ${settings.mode}`, active: true },
//     { label: `BW: ${settings.bandwidth}`, active: false },
//     { label: `Pwr: ${settings.power}`, active: false },
//     { label: settings.scanning ? 'Scan: RUN' : 'Scan: STOP', active: settings.scanning },
//     { label: settings.gps ? 'GPS: ON' : 'GPS: OFF', active: settings.gps },
//     { label: 'Radio Maint.', active: false },
//   ];

//   const handleSoftKey = (side, index) => {
//     if (!isPowered) return;

//     // Haptic feedback
//     if (navigator.vibrate) navigator.vibrate(10);

//     if (side === 'left') {
//       switch (index) {
//         case 0: // Remote
//           setSettings(s => ({ ...s, remote: !s.remote }));
//           break;
//         case 1: // Encryption
//           setSettings(s => ({ ...s, encryption: s.encryption === 'Clear' ? 'Secure' : 'Clear' }));
//           break;
//         case 3: // Squelch
//           setSettings(s => ({ ...s, squelchState: s.squelchState === 'Closed' ? 'Open' : 'Closed' }));
//           break;
//         default:
//           break;
//       }
//     } else if (side === 'right') {
//       switch (index) {
//         case 0: // Mode
//           setSettings(s => {
//             const currentIdx = MODES.indexOf(s.mode);
//             const nextIdx = (currentIdx + 1) % MODES.length;
//             return { ...s, mode: MODES[nextIdx] };
//           });
//           break;
//         case 1: // Bandwidth
//           setSettings(s => {
//             const currentIdx = BW_OPTIONS.indexOf(s.bandwidth);
//             const nextIdx = (currentIdx + 1) % BW_OPTIONS.length;
//             return { ...s, bandwidth: BW_OPTIONS[nextIdx] };
//           });
//           break;
//         case 2: // Power
//           setSettings(s => {
//             const currentIdx = POWER_OPTIONS.indexOf(s.power);
//             const nextIdx = (currentIdx + 1) % POWER_OPTIONS.length;
//             return { ...s, power: POWER_OPTIONS[nextIdx] };
//           });
//           break;
//         case 3: // Scan
//           setSettings(s => ({ ...s, scanning: !s.scanning }));
//           break;
//         case 4: // GPS
//           setSettings(s => ({ ...s, gps: !s.gps }));
//           break;
//         default:
//           break;
//       }
//     }
//   };

//   const handleKnobChange = (val) => {
//     setFrequency(val);
//   };

//   const handleKeypadPress = (key) => {
//     if (!isPowered) return;

//     // Stop scanning if active when typing starts
//     if (settings.scanning) {
//       setSettings(s => ({ ...s, scanning: false }));
//     }

//     if (key === '+/-') return; // Not implemented yet

//     // Limit length
//     if (inputBuffer.length > 9) return;

//     // Prevent multiple dots
//     if (key === '.' && inputBuffer.includes('.')) return;

//     setInputBuffer(prev => prev + key);
//   };

//   const handleEnter = () => {
//     if (!inputBuffer) return;

//     const newFreq = parseFloat(inputBuffer);
//     if (!isNaN(newFreq) && newFreq > 0) {
//       setFrequency(newFreq);
//     }
//     setInputBuffer('');
//   };

//   const handleEsc = () => {
//     setInputBuffer('');
//   };

//   const handlePowerToggle = () => {
//   if (isPowered) {
//     // Power OFF immediately
//     setIsPowered(false);
//     setIsBooting(false);
//   } else {
//     // Power ON with boot delay
//     setIsBooting(true);
//     setTimeout(() => {
//       setIsBooting(false);
//       setIsPowered(true);
//     }, 1200); // boot time (ms)
//   }
// };

//   return (
//     <div className="w-full max-w-400 mx-auto p-4 md:p-8 flex items-center justify-center">

//       {/* Rack Ears Container */}
//       <div className="relative flex w-full bg-white rounded-sm chassis-shadow">

//         {/* Left Rack Ear */}
//         <div className="w-20 bg-slate-200 border-r border-slate-300 flex flex-col items-center justify-between py-6 rounded-l-sm relative">
//             <div className="w-4 h-4 rounded-full bg-slate-300 shadow-inner border border-slate-400 " />
//             <div className="w-4 h-4 rounded-full bg-slate-300 shadow-inner border border-slate-400 gap-4" />
//             {/* Handle */}
//             <div className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-48 bg-slate-300 rounded border border-slate-400 shadow-lg" />
//         </div>

//         {/* Main Faceplate */}
//         <div className="grow flex flex-col md:flex-row bg-slate-50 relative gap-20">

//            {/* Branding Bar */}
//            <div className="absolute top-0 left-0 right-0 h-12 border-b border-slate-200 flex items-center px-8 gap-2 bg-white z-10">
//               <div className="w-8 h-8 border-2 border-blue-600 flex items-center justify-center transform rotate-45">
//                   <div className="w-4 h-4 bg-blue-600 transform -rotate-45" />
//               </div>
//               <span className="text-blue-600 font-bold text-xl tracking-wide ml-2">ROHDE&SCHWARZ</span>
//            </div>

//            {/* LEFT SECTION: Display & Soft Keys */}
//            <div className="w-full md:w-[55%] p-4 pt-16 border-r border-slate-200 flex flex-col gap-4">

//               {/* Screen Area */}
//               <div className="flex gap-2 justify-center">
//                  {/* Left Soft Keys */}
//                  <div className="flex flex-col gap-2 justify-center py-4">
//                     {[...Array(6)].map((_, i) => (
//                       <button key={`l-${i}`} onClick={() => handleSoftKey('left', i)} className="w-10 h-8 bg-slate-100 rounded-sm border border-slate-300 soft-key-shadow active:inset-shadow hover:bg-slate-50" />
//                     ))}
//                  </div>

//                  {/* LCD Display Frame */}
//                  <div className="w-130 h-75 bg-slate-200 p-2 rounded border border-slate-300 shadow-inner relative">
//                     <div className={`w-full h-full border-2 border-slate-300 rounded overflow-hidden bg-white
//       ${isPowered ? 'shadow-[0_0_25px_rgba(34,197,94,0.25)]' : ''}
//     `}>
//                        <Display
//                          frequency={frequency}
//                          mode={settings.mode}
//                          volume={volume}
//                          squelch={0}
//                          isPowered={isPowered}
//                          isBooting={isBooting}
//                          settings={settings}
//                          leftMenu={leftMenuItems}
//                          rightMenu={rightMenuItems}
//                          inputBuffer={inputBuffer}
//                        />
//                     </div>
//                  </div>

//                  {/* Right Soft Keys */}
//                  <div className="flex flex-col gap-2 justify-center py-4">
//                     {[...Array(6)].map((_, i) => (
//                       <button key={`r-${i}`} onClick={() => handleSoftKey('right', i)} className="w-10 h-8 bg-slate-100 rounded-sm border border-slate-300 soft-key-shadow active:inset-shadow hover:bg-slate-50" />
//                     ))}
//                  </div>
//               </div>

//               {/* Bottom Control Cluster */}
//               <div className="h-24 bg-blue-50 rounded border border-blue-100 p-2 flex items-center justify-between px-8">

//                  {/* Power Group */}
//                  <div className="flex flex-col items-center gap-1">
//                     <button onClick={handlePowerToggle} className="w-12 h-10 bg-slate-800 rounded shadow-md border-b-4 border-slate-950 active:border-b-0 active:translate-y-1 text-white text-[10px] font-bold flex flex-col items-center justify-center leading-none">
//                        <span>ON</span>
//                        <span className="text-slate-400">OFF</span>
//                     </button>
//                  </div>

//                  <div className="w-px h-12 bg-blue-200" />

//                  {/* Menu / Home */}
//                  <div className="grid grid-cols-2 gap-2">
//                     <button className="w-12 h-10 bg-slate-700 rounded shadow text-white text-[10px] font-bold flex flex-col items-center justify-center">
//                        MENU
//                     </button>
//                     <button className="w-12 h-10 bg-slate-700 rounded shadow text-white text-[10px] font-bold flex flex-col items-center justify-center">
//                        HOME
//                     </button>
//                  </div>

//                  {/* Navigation Pad */}
//                  <div className="flex items-center gap-1">
//                     <button className="w-8 h-10 bg-slate-300 rounded shadow text-slate-700 flex items-center justify-center active:translate-y-0.5"><ChevronLeft size={16}/></button>
//                     <button className="w-8 h-10 bg-slate-300 rounded shadow text-slate-700 flex items-center justify-center active:translate-y-0.5"><ChevronUp size={16}/></button>
//                     <button className="w-8 h-10 bg-slate-300 rounded shadow text-slate-700 flex items-center justify-center active:translate-y-0.5"><ChevronDown size={16}/></button>
//                     <button className="w-8 h-10 bg-slate-300 rounded shadow text-slate-700 flex items-center justify-center active:translate-y-0.5"><ChevronRight size={16}/></button>
//                  </div>

//                  {/* Enter/Esc */}
//                  <div className="flex gap-2">
//                     <button
//                       onClick={handleEsc}
//                       className="w-12 h-10 bg-slate-800 text-white text-[10px] font-bold rounded shadow flex flex-col items-center justify-center active:translate-y-0.5"
//                     >
//                        ESC
//                     </button>
//                     <button
//                       onClick={handleEnter}
//                       className="w-12 h-10 bg-slate-800 text-white text-[10px] font-bold rounded shadow flex flex-col items-center justify-center active:translate-y-0.5"
//                     >
//                        ENT
//                     </button>
//                  </div>

//               </div>
//            </div>

//            {/* RIGHT SECTION: Keypad & Hardware */}
//            <div className="w-full md:w-[45%] p-4 pt-16 flex flex-col relative">

//               {/* Speaker Grille / Vent Area */}
//               <div className="absolute top-4 right-4 bottom-32 left-4 z-0 flex flex-col gap-3 opacity-10 pointer-events-none">
//                  {[...Array(8)].map((_,i) => (
//                     <div key={i} className="w-full h-2 bg-black rounded-full" />
//                  ))}
//               </div>

//               <div className="flex gap-8 z-10 h-full">
//                  {/* Keypad and Knob Column */}
//                  <div className="flex flex-col items-center gap-8 mt-4">
//                     <div className="bg-slate-200 p-3 rounded border border-slate-300 shadow-sm">
//                        <Keypad onKeyPress={handleKeypadPress} className="w-48" />
//                     </div>

//                     <div className="relative">
//                        <Knob value={frequency} min={20} max={30} onChange={handleKnobChange} size="large" />
//                        {/* Knob guard decoration */}
//                        <div className="absolute -bottom-2 -right-2 text-[10px] text-slate-400 font-mono">TUNING</div>
//                     </div>
//                  </div>

//                  {/* Connectors Area */}
//                  <div className="grow flex flex-col justify-end pb-8 items-end">

//                      {/* Connector Panel */}
//                      <div className="w-full h-32 bg-slate-100 rounded-lg border border-slate-300 inset-panel p-4 flex items-center justify-around relative">
//                         <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] text-slate-400 font-bold tracking-widest">HEADPHONE / SPEAKER</span>

//                         {/* Fill Connector */}
//                         <div className="flex flex-col items-center gap-1">
//                            <div className="w-12 h-12 rounded-full bg-slate-300 border-4 border-slate-400 flex items-center justify-center shadow-md">
//                               <div className="w-8 h-8 rounded-full border-2 border-slate-500 bg-black" />
//                            </div>
//                            <span className="text-[9px] text-slate-500">FILL</span>
//                         </div>

//                         {/* Audio Connector */}
//                         <div className="flex flex-col items-center gap-1">
//                            <div className="w-10 h-10 rounded-full bg-red-900 border-4 border-slate-400 flex items-center justify-center shadow-md relative">
//                               <div className="grid grid-cols-2 gap-0.5">
//                                  {[...Array(4)].map((_,i)=><div key={i} className="w-1 h-1 bg-gold-500 rounded-full bg-yellow-600"/>)}
//                               </div>
//                               {/* Chain */}
//                               <div className="absolute top-8 left-8 w-16 h-16 border-b-2 border-r-2 border-slate-400 rounded-br-full opacity-50 pointer-events-none" />
//                            </div>
//                            <span className="text-[9px] text-slate-500">AUDIO</span>
//                         </div>

//                         {/* Switch */}
//                         <div className="flex flex-col items-center gap-1">
//                            <div className="w-8 h-12 bg-black rounded px-1 py-2 flex flex-col justify-between items-center">
//                               <div className="text-[8px] text-white">INT</div>
//                               <div className="w-4 h-6 bg-slate-700 rounded-sm border border-slate-600" />
//                               <div className="text-[8px] text-white">EXT</div>
//                            </div>
//                         </div>

//                      </div>

//                      {/* Status LEDs */}
//                      <div className="mt-4 flex gap-4 pr-4">
//                         <div className="flex items-center gap-1">
//                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
//                            <span className="text-[9px] font-bold text-slate-600">Tx</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                            <div className="w-2 h-2 rounded-full bg-slate-300" />
//                            <span className="text-[9px] font-bold text-slate-600">Rx</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                            <div className="w-2 h-2 rounded-full bg-green-500" />
//                            <span className="text-[9px] font-bold text-slate-600">BATT</span>
//                         </div>
//                      </div>

//                      {/* Model Label */}
//                      <div className="mt-2 text-right">
//                         <span className="font-serif italic text-slate-500 text-lg pr-2">M3SR</span>
//                         <span className="text-[10px] font-bold bg-slate-800 text-white px-1 py-0.5">SERIES 4100</span>
//                      </div>
//                  </div>
//               </div>
//            </div>

//         </div>

//         {/* Right Rack Ear */}
//         <div className="w-20 bg-slate-200 border-r border-slate-300 flex flex-col items-center justify-between py-6 rounded-l-sm relative">
//             <div className="w-4 h-4 rounded-full bg-slate-300 shadow-inner border border-slate-400" />
//             <div className="w-4 h-4 rounded-full bg-slate-300 shadow-inner border border-slate-400" />
//             {/* Handle */}
//             <div className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-48 bg-slate-300 rounded border border-slate-400 shadow-lg" />
//         </div>
//       </div>

//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import Display from "@/components/radio/Display";
import Knob from "@/components/radio/Knob";
import Keypad from "@/components/radio/Keypad";
import {
  Power,
  Menu,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  CornerDownLeft,
  GripVertical,
  Disc
} from "lucide-react";

export default function Index() {
  // --- State ---
  const [isBooting, setIsBooting] = useState(false);
  const [isPowered, setIsPowered] = useState(false);
  const [frequency, setFrequency] = useState(24.45);
  const [volume, _setVolume] = useState(40);
  const [inputBuffer, setInputBuffer] = useState("");

  const [settings, setSettings] = useState({
    mode: "F3E",
    bandwidth: "25k",
    power: "High",
    scanning: false,
    squelchState: "Closed",
    encryption: "Clear",
    remote: false,
    gps: true
  });

  const MODES = ["F3E", "A3E", "J3E"];
  const BW_OPTIONS = ["12.5k", "25k", "50k"];
  const POWER_OPTIONS = ["Low", "Med", "High"];

  // --- Refs for Noise ---
  const audioCtxRef = useRef(null);
  const noiseSourceRef = useRef(null);

  // --- Noise Effect ---
  useEffect(() => {
    if (!isPowered) {
      // Stop noise on power off
      if (noiseSourceRef.current) {
        noiseSourceRef.current.stop();
        noiseSourceRef.current.disconnect();
        noiseSourceRef.current = null;
      }
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
      return;
    }

    if (settings.squelchState === "Open") {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
      }

      const bufferSize = 2 * audioCtxRef.current.sampleRate;
      const noiseBuffer = audioCtxRef.current.createBuffer(
        1,
        bufferSize,
        audioCtxRef.current.sampleRate
      );
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1; // white noise
      }

      const whiteNoise = audioCtxRef.current.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const gainNode = audioCtxRef.current.createGain();
      gainNode.gain.value = 0.1; // volume

      whiteNoise.connect(gainNode).connect(audioCtxRef.current.destination);
      whiteNoise.start();

      noiseSourceRef.current = whiteNoise;
    } else {
      if (noiseSourceRef.current) {
        noiseSourceRef.current.stop();
        noiseSourceRef.current.disconnect();
        noiseSourceRef.current = null;
      }
    }

    return () => {
      if (noiseSourceRef.current) {
        noiseSourceRef.current.stop();
        noiseSourceRef.current.disconnect();
        noiseSourceRef.current = null;
      }
    };
  }, [settings.squelchState, isPowered]);

  // --- Menu Items ---
  const leftMenuItems = [
    {
      label: settings.remote ? "Remote: ON" : "Remote: OFF",
      active: settings.remote
    },
    { label: settings.encryption, active: settings.encryption === "Secure" },
    { label: "Disconnect", active: false },
    {
      label: `Sql: ${settings.squelchState}`,
      active: settings.squelchState === "Open"
    },
    { label: "Maintenance", active: false },
    { label: "Fill Gun", active: false }
  ];

  const rightMenuItems = [
    { label: `Mode: ${settings.mode}`, active: true },
    { label: `BW: ${settings.bandwidth}`, active: false },
    { label: `Pwr: ${settings.power}`, active: false },
    {
      label: settings.scanning ? "Scan: RUN" : "Scan: STOP",
      active: settings.scanning
    },
    { label: settings.gps ? "GPS: ON" : "GPS: OFF", active: settings.gps },
    { label: "Radio Maint.", active: false }
  ];

  // --- Handlers ---
  const handleSoftKey = (side, index) => {
    if (!isPowered) return;
    if (navigator.vibrate) navigator.vibrate(10);

    if (side === "left") {
      switch (index) {
        case 0:
          setSettings((s) => ({ ...s, remote: !s.remote }));
          break;
        case 1:
          setSettings((s) => ({
            ...s,
            encryption: s.encryption === "Clear" ? "Secure" : "Clear"
          }));
          break;
        case 3:
          setSettings((s) => ({
            ...s,
            squelchState: s.squelchState === "Closed" ? "Open" : "Closed"
          }));
          break;
        default:
          break;
      }
    } else if (side === "right") {
      switch (index) {
        case 0:
          setSettings((s) => {
            const nextIdx = (MODES.indexOf(s.mode) + 1) % MODES.length;
            return { ...s, mode: MODES[nextIdx] };
          });
          break;
        case 1:
          setSettings((s) => {
            const nextIdx =
              (BW_OPTIONS.indexOf(s.bandwidth) + 1) % BW_OPTIONS.length;
            return { ...s, bandwidth: BW_OPTIONS[nextIdx] };
          });
          break;
        case 2:
          setSettings((s) => {
            const nextIdx =
              (POWER_OPTIONS.indexOf(s.power) + 1) % POWER_OPTIONS.length;
            return { ...s, power: POWER_OPTIONS[nextIdx] };
          });
          break;
        case 3:
          setSettings((s) => ({ ...s, scanning: !s.scanning }));
          break;
        case 4:
          setSettings((s) => ({ ...s, gps: !s.gps }));
          break;
        default:
          break;
      }
    }
  };

  const handleKnobChange = (val) => setFrequency(val);

  const handleKeypadPress = (key) => {
    if (!isPowered) return;
    if (settings.scanning) setSettings((s) => ({ ...s, scanning: false }));
    if (key === "+/-") return;
    if (inputBuffer.length > 9) return;
    if (key === "." && inputBuffer.includes(".")) return;
    setInputBuffer((prev) => prev + key);
  };

  const handleEnter = () => {
    if (!inputBuffer) return;
    const newFreq = parseFloat(inputBuffer);
    if (!isNaN(newFreq) && newFreq > 0) setFrequency(newFreq);
    setInputBuffer("");
  };

  const handleEsc = () => setInputBuffer("");

  const handlePowerToggle = () => {
    if (isPowered) {
      setIsPowered(false);
      setIsBooting(false);
    } else {
      setIsBooting(true);
      setTimeout(() => {
        setIsBooting(false);
        setIsPowered(true);
      }, 1200);
    }
  };

  // --- JSX ---
  return (
    <div className="w-full max-w-400 mx-auto p-4 md:p-8 flex items-center justify-center">
      {/* Main radio chassis */}
      <div className="relative flex w-full bg-white rounded-sm chassis-shadow">
        {/* Left rack ear */}
        <div className="w-20 bg-slate-200 border-r border-slate-300 flex flex-col items-center justify-between py-6 rounded-l-sm relative">
          <div className="w-4 h-4 rounded-full bg-slate-300 shadow-inner border border-slate-400 " />
          <div className="w-4 h-4 rounded-full bg-slate-300 shadow-inner border border-slate-400 gap-4" />
          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-48 bg-slate-300 rounded border border-slate-400 shadow-lg" />
        </div>

        {/* Main Faceplate */}
        <div className="grow flex flex-col md:flex-row bg-slate-50 relative gap-20">
         {/* Branding Bar */}
            <div className="absolute top-0 left-0 right-0 h-12 border-b border-slate-200 flex items-center px-8 gap-2 bg-white z-10">
               <div className="w-8 h-8 border-2 border-blue-600 flex items-center justify-center transform rotate-45">
                   <div className="w-4 h-4 bg-blue-600 transform -rotate-45" />
               </div>
               <span className="text-blue-600 font-bold text-xl tracking-wide ml-2">ROHDE&SCHWARZ</span>
            </div>
          {/* LEFT SECTION */}
          <div className="w-full md:w-[55%] p-4 pt-16 border-r border-slate-200 flex flex-col gap-4">
            {/* Display Frame */}
            <div className="flex gap-2 justify-center">
              <div className="flex flex-col gap-2 justify-center py-4">
                {[...Array(6)].map((_, i) => (
                  <button
                    key={`l-${i}`}
                    onClick={() => handleSoftKey("left", i)}
                    className="w-10 h-8 bg-slate-100 rounded-sm border border-slate-300 soft-key-shadow active:inset-shadow hover:bg-slate-50"
                  />
                ))}
              </div>

              <div className="w-130 h-75 bg-slate-200 p-2 rounded border border-slate-300 shadow-inner relative">
                <div
                  className={`w-full h-full border-2 border-slate-300 rounded overflow-hidden bg-white
                  ${isPowered ? "shadow-[0_0_25px_rgba(34,197,94,0.25)]" : ""}`}
                >
                  <Display
                    frequency={frequency}
                    mode={settings.mode}
                    volume={volume}
                    squelch={0}
                    isPowered={isPowered}
                    isBooting={isBooting}
                    settings={settings}
                    leftMenu={leftMenuItems}
                    rightMenu={rightMenuItems}
                    inputBuffer={inputBuffer}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 justify-center py-4">
                {[...Array(6)].map((_, i) => (
                  <button
                    key={`r-${i}`}
                    onClick={() => handleSoftKey("right", i)}
                    className="w-10 h-8 bg-slate-100 rounded-sm border border-slate-300 soft-key-shadow active:inset-shadow hover:bg-slate-50"
                  />
                ))}
              </div>
            </div>

            {/* Bottom Control Cluster */}
            <div className="h-24 bg-blue-50 rounded border border-blue-100 p-2 flex items-center justify-between px-8">
              {/* Power Button */}
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={handlePowerToggle}
                  className="w-12 h-10 bg-slate-800 rounded shadow-md border-b-4 border-slate-950 active:border-b-0 active:translate-y-1 text-white text-[10px] font-bold flex flex-col items-center justify-center leading-none"
                >
                  <span>ON</span>
                  <span className="text-slate-400">OFF</span>
                </button>
              </div>
              <div className="w-px h-12 bg-blue-200" />
              <div className="grid grid-cols-2 gap-2">
                <button className="w-12 h-10 bg-slate-700 rounded shadow text-white text-[10px] font-bold flex flex-col items-center justify-center">
                  MENU
                </button>
                <button className="w-12 h-10 bg-slate-700 rounded shadow text-white text-[10px] font-bold flex flex-col items-center justify-center">
                  HOME
                </button>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-10 bg-slate-300 rounded shadow text-slate-700 flex items-center justify-center active:translate-y-0.5">
                  <ChevronLeft size={16} />
                </button>
                <button className="w-8 h-10 bg-slate-300 rounded shadow text-slate-700 flex items-center justify-center active:translate-y-0.5">
                  <ChevronUp size={16} />
                </button>
                <button className="w-8 h-10 bg-slate-300 rounded shadow text-slate-700 flex items-center justify-center active:translate-y-0.5">
                  <ChevronDown size={16} />
                </button>
                <button className="w-8 h-10 bg-slate-300 rounded shadow text-slate-700 flex items-center justify-center active:translate-y-0.5">
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="flex gap-2">
                     <button
                       onClick={handleEsc}
                       className="w-12 h-10 bg-slate-800 text-white text-[10px] font-bold rounded shadow flex flex-col items-center justify-center active:translate-y-0.5"
                     >
                        ESC
                     </button>
                     <button
                       onClick={handleEnter}
                       className="w-12 h-10 bg-slate-800 text-white text-[10px] font-bold rounded shadow flex flex-col items-center justify-center active:translate-y-0.5"
                     >
                        ENT
                     </button>
                  </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="w-full md:w-[45%] p-4 pt-16 flex flex-col relative">
            {/* Speaker Grille */}
            <div className="absolute top-4 right-4 bottom-32 left-4 z-0 flex flex-col gap-3 opacity-10 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-full h-2 bg-black rounded-full" />
              ))}
            </div>

            <div className="flex gap-8 z-10 h-full">
              {/* Keypad & Knob */}
              <div className="flex flex-col items-center gap-8 mt-4">
                <div className="bg-slate-200 p-3 rounded border border-slate-300 shadow-sm">
                  <Keypad onKeyPress={handleKeypadPress} className="w-48" />
                </div>
                <div className="relative">
                  <Knob
                    value={frequency}
                    min={20}
                    max={30}
                    onChange={handleKnobChange}
                    size="large"
                  />
                  <div className="absolute -bottom-2 -right-2 text-[10px] text-slate-400 font-mono">
                    TUNING
                  </div>
                </div>
              </div>
              {/* Connectors Area */}
                  <div className="grow flex flex-col justify-end pb-8 items-end">

                      {/* Connector Panel */}
                      <div className="w-full h-32 bg-slate-100 rounded-lg border border-slate-300 inset-panel p-4 flex items-center justify-around relative">
                         <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] text-slate-400 font-bold tracking-widest">HEADPHONE / SPEAKER</span>

                         {/* Fill Connector */}
                         <div className="flex flex-col items-center gap-1">
                            <div className="w-12 h-12 rounded-full bg-slate-300 border-4 border-slate-400 flex items-center justify-center shadow-md">
                               <div className="w-8 h-8 rounded-full border-2 border-slate-500 bg-black" />
                            </div>
                            <span className="text-[9px] text-slate-500">FILL</span>
                         </div>

                         {/* Audio Connector */}
                         <div className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-full bg-red-900 border-4 border-slate-400 flex items-center justify-center shadow-md relative">
                               <div className="grid grid-cols-2 gap-0.5">
                                  {[...Array(4)].map((_,i)=><div key={i} className="w-1 h-1 bg-gold-500 rounded-full bg-yellow-600"/>)}
                               </div>
                               {/* Chain */}
                               <div className="absolute top-8 left-8 w-16 h-16 border-b-2 border-r-2 border-slate-400 rounded-br-full opacity-50 pointer-events-none" />
                            </div>
                            <span className="text-[9px] text-slate-500">AUDIO</span>
                         </div>

                         {/* Switch */}
                         <div className="flex flex-col items-center gap-1">
                            <div className="w-8 h-12 bg-black rounded px-1 py-2 flex flex-col justify-between items-center">
                               <div className="text-[8px] text-white">INT</div>
                               <div className="w-4 h-6 bg-slate-700 rounded-sm border border-slate-600" />
                               <div className="text-[8px] text-white">EXT</div>
                            </div>
                         </div>

                      </div>

                      {/* Status LEDs */}
                      <div className="mt-4 flex gap-4 pr-4">
                         <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
                            <span className="text-[9px] font-bold text-slate-600">Tx</span>
                         </div>
                         <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-slate-300" />
                            <span className="text-[9px] font-bold text-slate-600">Rx</span>
                         </div>
                         <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-[9px] font-bold text-slate-600">BATT</span>
                         </div>
                      </div>

                      {/* Model Label */}
                      <div className="mt-2 text-right">
                         <span className="font-serif italic text-slate-500 text-lg pr-2">M3SR</span>
                         <span className="text-[10px] font-bold bg-slate-800 text-white px-1 py-0.5">SERIES 4100</span>
                      </div>
                  </div>
            </div>
          </div>
        </div>

        {/* Right Rack Ear */}
        <div className="w-20 bg-slate-200 border-r border-slate-300 flex flex-col items-center justify-between py-6 rounded-l-sm relative">
          <div className="w-4 h-4 rounded-full bg-slate-300 shadow-inner border border-slate-400" />
          <div className="w-4 h-4 rounded-full bg-slate-300 shadow-inner border border-slate-400" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-48 bg-slate-300 rounded border border-slate-400 shadow-lg" />
        </div>
      </div>
    </div>
  );
}
