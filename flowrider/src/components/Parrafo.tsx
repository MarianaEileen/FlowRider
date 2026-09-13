import React from 'react';

interface ParrafoProps {
 label?: string;
 width?: string;
 size?: string;
 children: React.ReactNode;
}

export function Parrafo({ label, width = 'w-full max-w-2xl', size = 'text-base', children }: ParrafoProps) {
 return (
  <div className={`flex flex-col gap-1.5 ${width}`}>
   {label && <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</span>}
   <p className={`text-gray-700 leading-relaxed ${size}`}>
    {children}
   </p>
  </div>
 );
}
