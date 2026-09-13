import { COBERTURAS, PERSONA, PLANES, POLIZA, SINIESTROS, resumenPlan } from './data/persona.js';
import type { LayoutId, LayoutResponse } from './types.js';

export const MOCK_RESPONSES: Record<LayoutId, LayoutResponse> = {
  A: {
    layout: 'A',
    components: [
      { type: 'Titulo', props: { heading: 'Tu contrato de seguro de auto', as: 'h1' } },
      { type: 'Titulo', props: { heading: 'Resumen del contrato', as: 'h2' } },
      {
        type: 'Parrafo',
        props: {
          children: `Tu contrato con ${PERSONA.aseguradora} (póliza ${PERSONA.numeroPoliza}) cubre tu ${PERSONA.vehiculo.marca} ${PERSONA.vehiculo.modelo} ${PERSONA.vehiculo.anio}, placas ${PERSONA.vehiculo.placas}. La vigencia va del ${POLIZA.vigenciaInicio} al ${POLIZA.vigenciaFin}, con una prima anual de ${POLIZA.primaAnual}.`,
        },
      },
      {
        type: 'Parrafo',
        props: {
          children: `Cualquier siniestro debe notificarse dentro de las 48 horas siguientes a través de tu agente asignado, ${PERSONA.agente.nombre} (ext. ${PERSONA.agente.extension}), o el centro de atención telefónica.`,
        },
      },
    ],
  },
  B: {
    layout: 'B',
    components: [
      { type: 'Titulo', props: { heading: 'Tu póliza de auto', as: 'h1' } },
      { type: 'Titulo', props: { heading: 'Coberturas activas', as: 'h2' } },
      {
        type: 'ListaSimple',
        props: {
          items: COBERTURAS.map((c) => ({ label: c.nombre, meta: c.sumaAsegurada })),
        },
      },
      {
        type: 'Parrafo',
        props: {
          children: `Tu póliza ${PERSONA.numeroPoliza} está vigente hasta el ${POLIZA.vigenciaFin}, con pagos de ${POLIZA.formaPago}. Tu siniestro más reciente (${SINIESTROS[0].tipo}, ${SINIESTROS[0].fecha}) quedó ${SINIESTROS[0].estado.toLowerCase()} con costo de ${SINIESTROS[0].costo}.`,
        },
      },
    ],
  },
  C: {
    layout: 'C',
    components: [
      { type: 'Titulo', props: { heading: 'Planes de mejora disponibles', as: 'h1' } },
      { type: 'Titulo', props: { heading: 'Compara y mejora tu cobertura', as: 'h2' } },
      {
        type: 'Carrusel',
        props: {
          items: PLANES.map((p) => ({
            title: `${p.nombre} — ${p.precioAnual}/año`,
            description: resumenPlan(p),
          })),
        },
      },
    ],
  },
};

export function selectMockLayout(intent: string): LayoutId {
  const text = intent.toLowerCase();
  if (/(plan|mejora|upgrade|compar|cotiza)/.test(text)) return 'C';
  if (/(cobertura|pago|siniestro|reclamo|resumen|estado de cuenta|deducible)/.test(text)) return 'B';
  return 'A';
}
