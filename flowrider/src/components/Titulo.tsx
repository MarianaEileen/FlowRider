import React from 'react';

interface TituloProps {
 eyebrow?: string;
 heading: string;
 as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
 size?: string;
 eyebrowSize?: string;
}

export function Titulo({ eyebrow, heading, as: Tag = 'h1', size = 'text-4xl', eyebrowSize = 'text-sm' }: TituloProps) {
 return (
  <header className="flex flex-col gap-1">
   {eyebrow && <span className={`uppercase text-gray-500 font-semibold tracking-wide ${eyebrowSize}`}>{eyebrow}</span>}
   <Tag className={`font-bold text-gray-900 ${size}`}>{heading}</Tag>
  </header>
 );
}
