import React from 'react';

interface DocumentoProps {
 icon: React.ReactNode;
 name: string;
 info?: string;
 actionLabel?: string;
 actionHref?: string;
 width?: string;
}

export function Documento({ icon, name, info, actionLabel = 'Descargar', actionHref = '#', width = 'w-full max-w-sm' }: DocumentoProps) {
 return (
  <div className={`flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm ${width}`}>
   <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-rose-100 text-rose-600 font-bold rounded-md">
    {icon}
   </div>
   <div className="flex flex-col flex-grow overflow-hidden">
    <span className="text-sm font-semibold text-gray-900 truncate">{name}</span>
    {info && <span className="text-xs text-gray-500 truncate">{info}</span>}
   </div>
   <a href={actionHref} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex-shrink-0">
    {actionLabel}
   </a>
  </div>
 );
}
