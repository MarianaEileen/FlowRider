import React from 'react';
import { Titulo } from '../components/Titulo';
import { Parrafo } from '../components/Parrafo';
import { Imagen } from '../components/Imagen';
import './Variant.css';
import type { ComponentSpec } from './layoutTypes';
import { str } from './propUtils';

interface VariantProps {
  components: ComponentSpec[];
  stageClass?: string;
}

export const VariantA: React.FC<VariantProps> = ({ components, stageClass = '' }) => {
  const titulos = components.filter((c) => c.type === 'Titulo');
  const parrafos = components.filter((c) => c.type === 'Parrafo');

  return (
    <div className={`variant-panel ${stageClass}`}>
      <div className="variant-anim-content flex flex-col gap-6">
        <Titulo heading={str(titulos[0]?.props.heading, 'Este es el título')} as="h1" size="text-3xl sm:text-4xl" />

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Imagen alt="Vehículo asegurado" width="w-full md:w-2/5" aspect="aspect-[4/5]" />
          <div className="flex flex-col gap-4 w-full md:w-3/5">
            <Titulo heading={str(titulos[1]?.props.heading, 'Este es el subtítulo')} as="h2" size="text-2xl" />
            <Parrafo>
              {str(
                parrafos[0]?.props.children,
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet libero mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum egestas volutpat. Nunc pulvinar pretium ex nec consectetur. Suspendisse dolor augue, finibus eget elit sit amet, porttitor sollicitudin risus. Curabitur euismod neque molestie, gravida metus nec, luctus dolor. Suspendisse vestibulum velit purus, a consequat elit ornare ac. Nulla sit amet diam elit. Aenean libero urna, scelerisque at elit eget, volutpat blandit nulla. Mauris in erat nec nisi commodo lacinia.',
              )}
            </Parrafo>
            <Parrafo>
              {str(
                parrafos[1]?.props.children,
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet libero mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum egestas volutpat. Nunc pulvinar pretium ex nec consectetur. Suspendisse dolor augue, finibus eget elit sit amet, porttitor sollicitudin risus.',
              )}
            </Parrafo>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantA;
