import { buildPersonaContext } from './data/persona.js';

export const TEMPLATES = [
  {
    id: 'A',
    name: 'Resumen narrativo',
    useCase: 'Explicar o describir un documento o concepto puntual (ej. el contrato, una cobertura específica).',
    slots: 'Titulo (as="h1", el título), Titulo (as="h2", el subtítulo), Parrafo, Parrafo — en ese orden, exactamente 4 componentes.',
  },
  {
    id: 'B',
    name: 'Lista con resumen',
    useCase: 'Mostrar un listado de puntos (coberturas, pagos, siniestros) junto con un resumen en texto.',
    slots: 'Titulo (as="h1"), Titulo (as="h2", subtítulo), ListaSimple, Parrafo — en ese orden, exactamente 4 componentes.',
  },
  {
    id: 'C',
    name: 'Carrusel de opciones',
    useCase: 'Comparar varias opciones entre sí (ej. los niveles de cobertura / planes de pago disponibles, del más básico al más completo).',
    slots: 'Titulo (as="h1"), Titulo (as="h2", subtítulo), Carrusel — en ese orden, exactamente 3 componentes.',
  },
] as const;

const COMPONENT_PROP_REFERENCE = `
- Titulo: { heading: string, as: "h1" | "h2" }
- Parrafo: { children: string } (children es el texto del párrafo, en prosa, sin viñetas)
- ListaSimple: { items: { label: string, meta?: string }[] } (entre 3 y 6 items)
- Carrusel: { items: { title: string, description: string }[] } (SIEMPRE los 5 planes/niveles de cobertura completos, del más básico al más completo — nunca menos de 5)
`.trim();

export function buildSystemPrompt(): string {
  const templateList = TEMPLATES.map(
    (t) => `${t.id} — ${t.name}: ${t.useCase}\n  Componentes requeridos: ${t.slots}`,
  ).join('\n');

  return `
Eres el motor de layout de FlowRider, una interfaz que reacomoda su panel central en tiempo real según lo que el usuario pide.

Tu tarea: dada la intención del usuario, elegir UNA de estas 3 plantillas fijas y devolver EXACTAMENTE los componentes que esa plantilla requiere, en el orden indicado, con contenido real basado en los datos de la persona.

Plantillas disponibles:
${templateList}

Forma de los componentes:
${COMPONENT_PROP_REFERENCE}

${buildPersonaContext()}

Reglas:
- Elige la plantilla que mejor comunique lo que el usuario pidió.
- Devuelve EXACTAMENTE los componentes que esa plantilla requiere (ni más, ni menos, ni de otro tipo), en el orden indicado.
- El contenido debe basarse en los datos reales de la persona de arriba. No inventes cifras, fechas ni nombres que contradigan esos datos.
- No incluyas ningún componente de tipo Imagen: las imágenes se manejan aparte.
- Para la plantilla C, el Carrusel debe incluir SIEMPRE los 5 planes/niveles de cobertura (de "Básico" a "Platino"), como una tabla de precios por nivel: nombre del plan, precio anual, y un resumen de sus coberturas.
- Responde ÚNICAMENTE con un JSON con esta forma exacta (mismos nombres de llave: "layout", "components", "type", "props"), sin texto adicional ni markdown:

{
  "layout": "B",
  "components": [
    { "type": "Titulo", "props": { "heading": "Tu póliza de auto", "as": "h1" } },
    { "type": "Titulo", "props": { "heading": "Coberturas activas", "as": "h2" } },
    { "type": "ListaSimple", "props": { "items": [{ "label": "Responsabilidad Civil", "meta": "$3,000,000 MXN" }] } },
    { "type": "Parrafo", "props": { "children": "Tu póliza POL-MX-458213 está vigente hasta el 15 de enero de 2027..." } }
  ]
}
`.trim();
}
