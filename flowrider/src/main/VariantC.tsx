import React from 'react';
import { Titulo } from '../components/Titulo';
import { Carrusel } from '../components/Carrusel';
import type { ComponentSpec } from './layoutTypes';
import { str } from './propUtils';

interface VariantProps {
  components: ComponentSpec[];
}

const DEFAULT_ITEMS = [
  { title: 'Elemento 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { title: 'Elemento 2', description: 'Sed sit amet libero mi, integer fermentum egestas volutpat.' },
  { title: 'Elemento 3', description: 'Suspendisse vestibulum velit purus, a consequat elit ornare ac.' },
  { title: 'Elemento 4', description: 'Nulla sit amet diam elit, aenean libero urna scelerisque.' },
  { title: 'Elemento 5', description: 'Curabitur euismod neque molestie, gravida metus nec luctus dolor.' },
];

export const VariantC: React.FC<VariantProps> = ({ components }) => {
  const titulos = components.filter((c) => c.type === 'Titulo');
  const carrusel = components.find((c) => c.type === 'Carrusel');

  const items = Array.isArray(carrusel?.props.items)
    ? (carrusel.props.items as { title: string; description: string }[])
    : DEFAULT_ITEMS;

  return (
    <div className="h-full overflow-y-auto flex flex-col items-center gap-6 p-2 text-center">
      <Titulo heading={str(titulos[0]?.props.heading, 'Este es el título')} as="h1" size="text-3xl sm:text-4xl" />
      <Titulo heading={str(titulos[1]?.props.heading, 'Este es el subtítulo')} as="h2" size="text-2xl" />

      <Carrusel items={items} cardWidth="w-72 sm:w-80 aspect-[3/4]" gap="gap-6" />
    </div>
  );
};

export default VariantC;
