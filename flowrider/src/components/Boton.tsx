import React from 'react';

interface BotonProps {
 icon?: React.ReactNode;
 label: string;
 onClick?: () => void;
 type?: 'button' | 'submit' | 'reset';
 padY?: string;
 padX?: string;
 fontSize?: string;
}

export function Boton({ icon, label, onClick, type = 'button', padY = 'py-3', padX = 'px-5', fontSize = 'text-base' }: BotonProps) {
 return (
  <button
   type={type}
   onClick={onClick}
   className={`inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors font-medium ${padY} ${padX} ${fontSize}`}
  >
   {icon && <span>{icon}</span>}
   <span>{label}</span>
  </button>
 );
}
