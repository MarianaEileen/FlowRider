import { useRef, useState } from 'react';

interface CarruselItem {
 title: string;
 description: string;
}

interface CarruselProps {
 items: CarruselItem[];
 cardWidth?: string;
 gap?: string;
}

export function Carrusel({ items, cardWidth = 'w-52', gap = 'gap-4' }: CarruselProps) {
 const trackRef = useRef<HTMLDivElement>(null);
 const cardRefs = useRef<(HTMLElement | null)[]>([]);
 const [active, setActive] = useState(0);

 const goTo = (i: number) => {
  cardRefs.current[i]?.scrollIntoView({
   behavior: 'smooth',
   inline: 'start',
   block: 'nearest',
  });
 };

 const handleScroll = () => {
  const track = trackRef.current;
  const first = cardRefs.current[0];
  if (!track || !first) return;
  const i = Math.round(track.scrollLeft / first.getBoundingClientRect().width);
  setActive(i);
 };

 return (
  <section className="flex flex-col gap-4 w-full">
   <div
    className={`flex overflow-x-auto snap-x snap-mandatory scrollbar-hide ${gap}`}
    ref={trackRef}
    onScroll={handleScroll}
    style={{ scrollbarWidth: 'none' }}
   >
    {items.map((item, i) => (
     <article
      key={i}
      ref={(el) => (cardRefs.current[i] = el)}
      className={`flex-none snap-start bg-white border border-gray-200 rounded-xl p-5 shadow-sm ${cardWidth}`}
     >
      <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
      <p className="text-sm text-gray-600">{item.description}</p>
     </article>
    ))}
   </div>
   <div className="flex justify-center gap-2">
    {items.map((_, i) => (
     <button
      key={i}
      className={`w-2.5 h-2.5 rounded-full transition-colors ${i === active ? 'bg-indigo-600' : 'bg-gray-300'}`}
      onClick={() => goTo(i)}
      aria-label={`Ir a la tarjeta ${i + 1}`}
     />
    ))}
   </div>
  </section>
 );
}
