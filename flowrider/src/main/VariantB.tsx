import React from 'react';
import { Titulo } from '../components/Titulo';
import { Parrafo } from '../components/Parrafo';
import { ListaSimple } from '../components/ListaSimple';
import './Variant.css';
import type { ComponentSpec } from './layoutTypes';
import { str } from './propUtils';

interface VariantProps {
  components: ComponentSpec[];
  stageClass?: string;
}

const DEFAULT_ITEMS = [
  { label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { label: 'Sed sit amet libero mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { label: 'Integer fermentum egestas volutpat.' },
  { label: 'Nunc pulvinar pretium ex nec consectetur.' },
  { label: 'Suspendisse dolor augue, finibus eget elit sit amet, porttitor sollicitudin risus.' },
  { label: 'Curabitur euismod neque molestie, gravida metus nec, luctus dolor.' },
];

export const VariantB: React.FC<VariantProps> = ({ components, stageClass = '' }) => {
  const titulos = components.filter((c) => c.type === 'Titulo');
  const lista = components.find((c) => c.type === 'ListaSimple');
  const parrafo = components.find((c) => c.type === 'Parrafo');

  const items = Array.isArray(lista?.props.items) ? (lista.props.items as { label: string; meta?: string }[]) : DEFAULT_ITEMS;

  return (
    <div className={`variant-panel variant-panel-center gap-6 ${stageClass}`}>
      <div className="variant-anim-content flex flex-col items-center gap-6 w-full">
        <Titulo heading={str(titulos[0]?.props.heading, 'Este es el título')} as="h1" size="text-3xl sm:text-4xl" />
        <Titulo heading={str(titulos[1]?.props.heading, 'Este es el subtítulo')} as="h2" size="text-2xl" />

        <ListaSimple items={items} width="w-full max-w-2xl text-left" />

        <Parrafo width="w-full max-w-3xl" size="text-base text-left">
          {str(
            parrafo?.props.children,
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet libero mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum egestas volutpat. Nunc pulvinar pretium ex nec consectetur. Suspendisse dolor augue, finibus eget elit sit amet, porttitor sollicitudin risus. Curabitur euismod neque molestie, gravida metus nec, luctus dolor. Suspendisse vestibulum velit purus, a consequat elit ornare ac. Nulla sit amet diam elit. Aenean libero urna, scelerisque at elit eget, volutpat blandit nulla. Mauris in erat nec nisi commodo lacinia. Maecenas aliquam eget mi vitae feugiat.',
          )}
        </Parrafo>
      </div>
    </div>
  );
};

export default VariantB;
