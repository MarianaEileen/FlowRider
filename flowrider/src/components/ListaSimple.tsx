interface SimpleItem {
 label: string;
 meta?: string;
}

interface ListaSimpleProps {
 items: SimpleItem[];
 width?: string;
}

export function ListaSimple({ items, width = 'w-full max-w-sm' }: ListaSimpleProps) {
 return (
  <ul className={`flex flex-col gap-2 ${width}`}>
   {items.map((item, i) => (
    <li key={i} className="flex items-center gap-3 py-1">
     <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
     <span className="text-sm font-medium text-gray-800 flex-grow">{item.label}</span>
     {item.meta && <span className="text-xs text-gray-500 whitespace-nowrap">{item.meta}</span>}
    </li>
   ))}
  </ul>
 );
}
