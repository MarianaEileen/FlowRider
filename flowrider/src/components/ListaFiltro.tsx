import { useState } from 'react';

interface FilterType {
 id: string;
 label: string;
}

interface ListItem {
 label: string;
 tag: string;
 tags: string[];
}

interface ListaFiltroProps {
 filters: FilterType[];
 items: ListItem[];
 width?: string;
}

export function ListaFiltro({ filters, items, width = 'w-full max-w-md' }: ListaFiltroProps) {
 const [active, setActive] = useState('todos');
 const visible = items.filter((item) => active === 'todos' || item.tags.includes(active));

 return (
  <section className={`flex flex-col gap-3 ${width}`}>
   <div className="flex flex-wrap gap-2">
    <button
     className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${active === 'todos' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
     onClick={() => setActive('todos')}
    >
     Todos
    </button>
    {filters.map((f) => (
     <button
      key={f.id}
      className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${active === f.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
      onClick={() => setActive(f.id)}
     >
      {f.label}
     </button>
    ))}
   </div>
   <ul className="flex flex-col gap-2">
    {visible.map((item, i) => (
     <li key={i} className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
      <span className="text-sm font-medium text-gray-800">{item.label}</span>
      <span className="text-xs font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{item.tag}</span>
     </li>
    ))}
   </ul>
  </section>
 );
}
