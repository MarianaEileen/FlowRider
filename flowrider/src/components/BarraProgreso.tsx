import { useEffect, useRef } from 'react';

interface BarraProgresoProps {
 label: string;
 value: number;
 height?: string;
 width?: string;
}

export function BarraProgreso({ label, value, height = 'h-2.5', width = 'w-full max-w-xs' }: BarraProgresoProps) {
 const fillRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  const id = requestAnimationFrame(() => {
   setTimeout(() => {
    if (fillRef.current) fillRef.current.style.width = `${value}%`;
   }, 50);
  });
  return () => cancelAnimationFrame(id);
 }, [value]);

 return (
  <div className={`flex flex-col gap-1.5 ${width}`}>
   <div className="flex justify-between text-sm font-semibold text-gray-700">
    <span>{label}</span>
    <span>{value}%</span>
   </div>
   <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${height}`}>
    <div
     ref={fillRef}
     className="bg-blue-600 h-full rounded-full transition-all duration-300 w-0"
    />
   </div>
  </div>
 );
}
