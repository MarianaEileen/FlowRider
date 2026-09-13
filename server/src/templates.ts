export const TEMPLATES = [
  {
    id: 'A',
    name: 'Resumen narrativo',
    useCase: 'Explicar, describir o dar contexto sobre un elemento. Combina texto con un apoyo visual o documental.',
    typicalComponents: ['Titulo', 'Parrafo', 'Imagen', 'Documento', 'Boton'],
  },
  {
    id: 'B',
    name: 'Panel de métricas',
    useCase: 'Mostrar progreso, cifras, comparaciones o estado de algo. Prioriza datos cuantitativos.',
    typicalComponents: ['Titulo', 'Grafica', 'BarraProgreso', 'ListaSimple', 'Boton'],
  },
  {
    id: 'C',
    name: 'Exploración de colección',
    useCase: 'Navegar o comparar varios elementos relacionados entre sí.',
    typicalComponents: ['Titulo', 'Carrusel', 'ListaFiltro', 'Boton'],
  },
] as const;

const COMPONENT_PROP_REFERENCE = `
- Titulo: { eyebrow?: string, heading: string, as?: "h1"|"h2"|"h3"|"h4"|"h5"|"h6", size?: string, eyebrowSize?: string }
- Parrafo: { label?: string, size?: string, children: string } (children es el texto del párrafo)
- Imagen: { src?: string, alt?: string, placeholder?: string, caption?: string, aspect?: string }
- Grafica: { title: string, data: { value: number, display: string, label: string }[] }
- BarraProgreso: { label: string, value: number }
- Documento: { icon: string, name: string, info?: string, actionLabel?: string, actionHref?: string }
- ListaSimple: { items: { label: string, meta?: string }[] }
- ListaFiltro: { filters: { id: string, label: string }[], items: { label: string, tag: string, tags: string[] }[] }
- Boton: { label: string, icon?: string }
- Carrusel: { items: { title: string, description: string }[] }
`.trim();

export function buildSystemPrompt(): string {
  const templateList = TEMPLATES.map(
    (t) => `${t.id} — ${t.name}: ${t.useCase} (componentes típicos: ${t.typicalComponents.join(', ')})`,
  ).join('\n');

  return `
Eres el motor de layout de FlowRider, una interfaz que reacomoda su panel central en tiempo real según lo que el usuario pide.

Tu tarea: dada la intención del usuario (y, si se incluye, los datos de un elemento ya detallado), elegir UNA de estas 3 plantillas fijas y devolver los componentes con sus props ya llenos.

Plantillas disponibles:
${templateList}

Componentes disponibles y su forma de props:
${COMPONENT_PROP_REFERENCE}

Reglas:
- Usa solo componentes de la lista anterior, respetando exactamente su forma de props.
- Incluye entre 2 y 5 componentes coherentes con la plantilla elegida.
- Usa datos que te haya dado el usuario o razonablemente inferibles de su intención.
- Responde ÚNICAMENTE con un JSON con esta forma exacta (mismos nombres de llave: "layout", "components", "type", "props"), sin texto adicional ni markdown:

{
  "layout": "B",
  "components": [
    { "type": "BarraProgreso", "props": { "label": "Meta semanal", "value": 75 } },
    { "type": "Grafica", "props": { "title": "Ventas diarias", "data": [{ "label": "Lun", "value": 60, "display": "60%" }] } }
  ]
}
`.trim();
}
