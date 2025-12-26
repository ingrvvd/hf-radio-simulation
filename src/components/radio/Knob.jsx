import React, { useMemo } from "react";

export default function Knob({ value, onChange, min = 0, max = 100, size = "large" }) {
  // Derive rotation directly from props (no state, no effect)
  const rotation = useMemo(() => {
    const percentage = (value - min) / (max - min);
    return -140 + percentage * 280;
  }, [value, min, max]);

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = -Math.sign(e.deltaY);
    const newValue = Math.min(max, Math.max(min, value + delta));
    onChange(newValue);
  };

  const knobSize = size === "large" ? 120 : 80;

  return (
    <div
      className="relative rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center cursor-ns-resize group"
      style={{ width: knobSize, height: knobSize }}
      onWheel={handleWheel}
    >
      <div className="absolute inset-0 rounded-full border-2 border-slate-100" />

      <div
        className="w-3/4 h-3/4 rounded-full bg-linear-to-br from-white to-slate-100 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border border-slate-200 relative transition-transform duration-100 ease-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1/4 h-1/4 rounded-full bg-linear-to-b from-slate-200 to-white shadow-inner" />
      </div>
    </div>
  );
}
