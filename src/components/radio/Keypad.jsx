import React from "react";

export default function Keypad({ onKeyPress, className }) {
  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["+/-", "0", "."]
  ];

  return (
    <div className={`grid grid-cols-3 gap-2 ${className}`}>
      {keys.flat().map((key) => (
        <button
          key={key}
          onClick={() => onKeyPress(key)}
          className="w-full aspect-square bg-slate-800 rounded-sm shadow-sm border-b-2 border-slate-950 active:border-b-0 active:translate-y-0.5 flex items-center justify-center"
        >
          <span className="text-white font-bold font-mono text-lg">{key}</span>
        </button>
      ))}
    </div>
  );
}
