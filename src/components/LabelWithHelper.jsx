import React from 'react';

export default function LabelWithHelper({ title, helperText, color, textColor }) {
  // Use customizable text color if provided, fallback to slate-600 (light) or slate-300 (dark)
  const labelColor = textColor || "text-slate-600 dark:text-slate-300";
  // The 'color' prop was previously inline hex, we can leave it to override or just use standard classes
  const styleObj = color ? { color } : {};

  return (
    <div className="flex items-center gap-1.5 mb-1.5 relative group">
      <label className={`text-[11px] font-bold uppercase leading-tight ${labelColor}`} style={styleObj}>
        {title}
      </label>
      
      {/* Tooltip trigger icon */}
      <div className="flex items-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-help">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-[14px] h-[14px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
      </div>

      {/* Tooltip text bubble - Absolute positioned relying on parent 'group' */}
      <div className="
        absolute z-50 bottom-[150%] left-1/2 -ml-[110px] w-[220px] 
        opacity-0 invisible group-hover:opacity-100 group-hover:visible 
        translate-y-1 group-hover:translate-y-0
        transition-all duration-200 ease-out
        bg-slate-800 dark:bg-slate-700 text-slate-100 text-[11px] font-medium normal-case leading-snug text-left
        p-2.5 rounded-lg shadow-lg pointer-events-none
      ">
        {helperText}
        {/* Tooltip bottom arrow */}
        <div className="absolute top-100 left-1/2 -ml-1.5 border-[6px] border-solid border-slate-800 dark:border-slate-700 border-x-transparent border-b-transparent"></div>
      </div>
    </div>
  );
}
