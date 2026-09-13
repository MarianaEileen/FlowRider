import React from 'react';
import { Titulo } from '../components/Titulo';
import { Parrafo } from '../components/Parrafo';
import { Imagen } from '../components/Imagen';
import './Variant.css';

interface VariantProps {
  data: string;
  stageClass?: string;
}

export const VariantA: React.FC<VariantProps> = ({ data, stageClass = '' }) => {
  return (
    <div className={`variant-panel ${stageClass}`}>
      <div className="variant-anim-content flex flex-col gap-6">
        <Titulo heading="Este es el título" as="h1" size="text-3xl sm:text-4xl" />

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Imagen
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80"
            alt="Imagen del elemento"
            width="w-full md:w-2/5"
            aspect="aspect-[4/5]"
          />
          <div className="flex flex-col gap-4 w-full md:w-3/5">
            <Titulo heading="Este es el subtítulo" as="h2" size="text-2xl" />
            <Parrafo>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet libero mi. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum egestas volutpat.
            </Parrafo>
            <Parrafo>
              Nunc pulvinar pretium ex nec consectetur. Suspendisse dolor augue, finibus eget elit
              sit amet, porttitor sollicitudin risus.
            </Parrafo>
          </div>
        </div>

        {data.trim() && (
          <p className="variant-caption">Basado en tu entrada: “{data}”</p>
        )}
      </div>
    </div>
  );
};

export default VariantA;