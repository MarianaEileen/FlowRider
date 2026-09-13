interface ImagenProps {
 src?: string;
 alt?: string;
 placeholder?: string;
 caption?: string;
 width?: string;
 aspect?: string;
 radius?: string;
}

export function Imagen({ src, alt = '', placeholder = 'imagen', caption, width = 'w-full max-w-sm', aspect = 'aspect-video', radius = 'rounded-lg' }: ImagenProps) {
 return (
  <figure className={`flex flex-col gap-2 ${width}`}>
   <div className={`w-full overflow-hidden bg-gray-100 flex items-center justify-center ${aspect} ${radius}`}>
    {src ? (
     <img src={src} alt={alt} className="w-full h-full object-cover" />
    ) : (
     <span className="text-gray-400 font-semibold tracking-widest uppercase">{placeholder}</span>
    )}
   </div>
   {caption && <figcaption className="text-sm text-gray-500 text-center">{caption}</figcaption>}
  </figure>
 );
}
