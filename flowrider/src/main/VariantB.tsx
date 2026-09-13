import React from 'react';
import { Titulo } from '../components/Titulo';
import { Parrafo } from '../components/Parrafo';
import { ListaSimple } from '../components/ListaSimple';
import './Variant.css';

interface VariantProps {
  data: string;
  stageClass?: string;
}

const items = [
  { label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { label: 'Sed sit amet libero mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { label: 'Integer fermentum egestas volutpat.' },
];

export const VariantB: React.FC<VariantProps> = ({ data, stageClass = '' }) => {
  return (
    <div className={`variant-panel variant-panel-center gap-6 ${stageClass}`}>
      <div className="variant-anim-content flex flex-col items-center gap-6 w-full">
        <Titulo heading="Este es el título" as="h1" size="text-3xl sm:text-4xl" />
        <Titulo heading="Este es el subtítulo" as="h2" size="text-2xl" />

        <ListaSimple items={items} width="w-full max-w-2xl text-left" />

        <Parrafo width="w-full max-w-3xl" size="text-base text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet libero mi. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum egestas volutpat.
        </Parrafo>

        {data.trim() && (
          <p className="variant-caption">Basado en tu entrada: “{data}”</p>
        )}
      </div>
    </div>
  );
};

export default VariantB;