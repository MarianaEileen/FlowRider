import type { LayoutId, LayoutResponse } from './types.js';

export const MOCK_RESPONSES: Record<LayoutId, LayoutResponse> = {
  A: {
    layout: 'A',
    components: [
      { type: 'Titulo', props: { eyebrow: 'Resumen Informativo', heading: 'Contrato de Servicio 2026', as: 'h2' } },
      {
        type: 'Parrafo',
        props: {
          label: 'Descripción general',
          children:
            'Este documento detalla los términos legalmente vinculantes, niveles de servicio (SLA), esquema de tarifas y condiciones de confidencialidad acordados para la prestación de servicios durante el ejercicio 2026.',
        },
      },
      { type: 'Documento', props: { icon: 'file-text', name: 'Contrato de Servicio 2026', info: 'PDF • 12 páginas', actionLabel: 'Abrir PDF' } },
      { type: 'Imagen', props: { alt: 'Vista previa de la carátula del contrato', caption: 'Vista previa de la portada del documento oficial', aspect: '16/9' } },
    ],
  },
  B: {
    layout: 'B',
    components: [
      { type: 'Titulo', props: { eyebrow: 'Rendimiento Semanal', heading: 'Progreso de Ventas y Tareas del Equipo', as: 'h2' } },
      { type: 'BarraProgreso', props: { label: 'Meta de Ventas Semanal (82% alcanzado)', value: 82 } },
      {
        type: 'Grafica',
        props: {
          title: 'Ventas Diarias ($)',
          data: [
            { label: 'Lun', value: 1500, display: '$1,500' },
            { label: 'Mar', value: 2300, display: '$2,300' },
            { label: 'Mié', value: 3100, display: '$3,100' },
            { label: 'Jue', value: 2800, display: '$2,800' },
            { label: 'Vie', value: 4200, display: '$4,200' },
          ],
        },
      },
      {
        type: 'ListaSimple',
        props: {
          items: [
            { label: 'Revisión de propuestas comerciales', meta: 'Pendiente · Ana' },
            { label: 'Seguimiento a leads calificados', meta: 'En progreso · Carlos' },
            { label: 'Actualización del CRM regional', meta: 'Pendiente · Sofía' },
          ],
        },
      },
      { type: 'Boton', props: { label: 'Asignar nueva tarea', icon: 'plus' } },
    ],
  },
  C: {
    layout: 'C',
    components: [
      { type: 'Titulo', props: { eyebrow: 'Catálogo', heading: 'Servicios Disponibles', as: 'h2' } },
      {
        type: 'Carrusel',
        props: {
          items: [
            { title: 'Plan Básico', description: 'Acceso a funciones esenciales para equipos pequeños.' },
            { title: 'Plan Pro', description: 'Automatizaciones avanzadas e integraciones ilimitadas.' },
            { title: 'Plan Empresarial', description: 'Soporte dedicado y SLA garantizado.' },
          ],
        },
      },
      {
        type: 'ListaFiltro',
        props: {
          filters: [
            { id: 'activos', label: 'Activos' },
            { id: 'archivados', label: 'Archivados' },
          ],
          items: [
            { label: 'Plan Básico', tag: 'Activo', tags: ['activos'] },
            { label: 'Plan Pro', tag: 'Activo', tags: ['activos'] },
            { label: 'Plan Legacy', tag: 'Archivado', tags: ['archivados'] },
          ],
        },
      },
      { type: 'Boton', props: { label: 'Comparar planes', icon: 'arrow-right' } },
    ],
  },
};

export function selectMockLayout(intent: string): LayoutId {
  const text = intent.toLowerCase();
  if (/(métric|progres|venta|gráfica|estadístic|kpi|cifras|número)/.test(text)) return 'B';
  if (/(explor|colección|varios|compar|catálogo|carrusel|planes)/.test(text)) return 'C';
  return 'A';
}
