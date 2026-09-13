import React from 'react';
import { Titulo } from '../components/Titulo';
import { Imagen } from '../components/Imagen';
import { Carrusel } from '../components/Carrusel';
import './Variant.css';

interface VariantProps {
  data: string;
  stageClass?: string;
}

const carruselItems = [
  { title: 'Elemento 1', description: 'Lorem ipsum dolor sit amet.' },
  { title: 'Elemento 2', description: 'Sed sit amet libero mi.' },
  { title: 'Elemento 3', description: 'Suspendisse vestibulum velit purus.' },
];

export const VariantC: React.FC<VariantProps> = ({ data, stageClass = '' }) => {
  return (
    <div className={`variant-panel variant-panel-center gap-6 ${stageClass}`}>
      <div className="variant-anim-content flex flex-col items-center gap-6 w-full">
        <Titulo heading="Este es el título" as="h1" size="text-3xl sm:text-4xl" />
        <Titulo heading="Este es el subtítulo" as="h2" size="text-2xl" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full items-center">
          <Imagen width="w-full" aspect="aspect-[3/4]" />

          <div className="aspect-[3/4] w-full rounded-lg border border-white/50 bg-white/40 backdrop-blur-sm flex items-center p-4">
            <Carrusel items={carruselItems} cardWidth="w-full" />
          </div>

          <Imagen width="w-full" aspect="aspect-[3/4]" />
        </div>

        {data.trim() && (
          <p className="variant-caption">Basado en tu entrada: “{data}”</p>
        )}
      </div>
    </div>
  );
};

export default VariantC;