import React from 'react';

interface ChartData {
 value: number;
 display: string;
 label: string;
}

interface GraficaProps {
 title: string;
 data: ChartData[];
 height?: string;
 barWidth?: string;
}

export function Grafica({ title, data, height = 'h-40', barWidth = 'w-7' }: GraficaProps) {
 return (
  <section className="flex flex-col gap-3">
   <h3 className="text-sm font-bold text-gray-700">{title}</h3>
   <div className={`flex items-end gap-3 border-b-2 border-gray-200 pb-1 ${height}`}>
    {data.map((d, i) => (
     <div key={i} className="flex flex-col items-center justify-end h-full gap-1">
      <span className="text-xs font-medium text-gray-500">{d.display}</span>
      <div
       className={`bg-indigo-500 rounded-t-sm transition-all duration-500 ${barWidth}`}
       style={{ height: `${d.value}%` }}
      />
     </div>
    ))}
   </div>
   <div className="flex gap-3 mt-1">
    {data.map((d, i) => (
     <span key={i} className={`text-xs text-center text-gray-600 font-medium ${barWidth}`}>
      {d.label}
     </span>
    ))}
   </div>
  </section>
 );
}
