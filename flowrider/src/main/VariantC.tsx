import React from 'react';
import { Titulo } from '../components/Titulo';
import { Imagen } from '../components/Imagen';
import { Carrusel } from '../components/Carrusel';

interface VariantProps {
  data: string;
}

const carruselItems = [
  { title: 'Elemento 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { title: 'Elemento 2', description: 'Sed sit amet libero mi, integer fermentum egestas volutpat.' },
  { title: 'Elemento 3', description: 'Suspendisse vestibulum velit purus, a consequat elit ornare ac.' },
];

export const VariantC: React.FC<VariantProps> = ({ data }) => {
  return (
    <div className="h-full overflow-y-auto flex flex-col items-center gap-6 p-2 text-center">
      <Titulo heading="Este es el título" as="h1" size="text-3xl sm:text-4xl" />
      <Titulo heading="Este es el subtítulo" as="h2" size="text-2xl" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
        <Imagen width="w-full" aspect="aspect-[3/4]" />

        <div className="aspect-[3/4] w-full rounded-lg border border-gray-200 bg-white flex items-center p-4">
          <Carrusel items={carruselItems} cardWidth="w-full" />
        </div>

        <Imagen width="w-full" aspect="aspect-[3/4]" />
      </div>

      {data.trim() && (
        <p className="text-xs text-gray-400">Basado en tu entrada: “{data}”</p>
      )}
    </div>
  );
};

export default VariantC;
