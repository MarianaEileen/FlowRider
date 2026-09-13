export const PERSONA = {
  nombre: 'Renata Gómez Villarreal',
  fechaNacimiento: '14 de marzo de 1990',
  domicilio: 'Av. Roble 245, Col. Cumbres 3er Sector, Monterrey, N.L., C.P. 64610',
  telefono: '+52 81 5523 9041',
  correo: 'renata.gomez90@example.com',
  numeroPoliza: 'POL-MX-458213',
  aseguradora: 'Sextante Seguros',
  agente: {
    nombre: 'Luis Fernando Treviño',
    extension: '4521',
    correo: 'ltrevino@sextanteseguros.example',
  },
  vehiculo: {
    marca: 'Nissan',
    modelo: 'Versa Advance',
    anio: 2022,
    color: 'Gris plata',
    placas: 'NLR-224-B',
    vin: '3N1CN7AP8NL123456',
    uso: 'Particular',
  },
};

export const CONTRATO_TEXTO = `
CONTRATO DE SEGURO DE AUTOMÓVIL — Póliza POL-MX-458213

Entre Sextante Seguros, S.A. de C.V. ("la Aseguradora") y Renata Gómez Villarreal ("la Asegurada"),
con domicilio en Av. Roble 245, Col. Cumbres 3er Sector, Monterrey, N.L., se celebra el presente
contrato de seguro de automóvil bajo los siguientes términos:

La Aseguradora se obliga a resarcir los daños que sufra el vehículo Nissan Versa Advance 2022,
placas NLR-224-B, así como los daños a terceros derivados de su uso, conforme a las coberturas,
sumas aseguradas y deducibles establecidos en la póliza correspondiente.

La vigencia del presente contrato inicia el 15 de enero de 2026 y concluye el 15 de enero de 2027,
renovable previo acuerdo entre las partes. La Asegurada se obliga al pago puntual de la prima en
la forma de pago seleccionada.

Cualquier modificación al vehículo asegurado, cambio de uso, o siniestro deberá notificarse a la
Aseguradora dentro de las 48 horas siguientes al hecho, a través del agente asignado o el centro
de atención telefónica.

Firmado electrónicamente por ambas partes el 10 de enero de 2026.
`.trim();

export const COBERTURAS = [
  { nombre: 'Responsabilidad Civil', sumaAsegurada: '$3,000,000 MXN', deducible: 'No aplica' },
  { nombre: 'Daños Materiales', sumaAsegurada: 'Valor comercial del vehículo', deducible: '5%' },
  { nombre: 'Robo Total', sumaAsegurada: 'Valor comercial del vehículo', deducible: '10%' },
  { nombre: 'Gastos Médicos Ocupantes', sumaAsegurada: '$200,000 MXN por persona', deducible: 'No aplica' },
  { nombre: 'Asistencia Vial', sumaAsegurada: 'Incluida (grúa, cerrajería, batería)', deducible: 'No aplica' },
];

export const POLIZA = {
  vigenciaInicio: '15 de enero de 2026',
  vigenciaFin: '15 de enero de 2027',
  primaAnual: '$14,850 MXN',
  formaPago: 'Mensual sin recargo (12 pagos de $1,237.50 MXN)',
  coberturas: COBERTURAS,
};

export const PLANES = [
  {
    nombre: 'Básico',
    precioAnual: '$8,400 MXN',
    responsabilidadCivil: '$3,000,000 MXN',
    danosMateriales: 'No incluido',
    roboTotal: 'No incluido',
    asistenciaVial: 'No incluida',
    gastosMedicos: 'No incluido',
    extras: 'Ninguno',
    descripcion: 'Cobertura mínima: solo responsabilidad civil.',
  },
  {
    nombre: 'Esencial',
    precioAnual: '$11,200 MXN',
    responsabilidadCivil: '$3,000,000 MXN',
    danosMateriales: 'Deducible 10%',
    roboTotal: 'No incluido',
    asistenciaVial: 'No incluida',
    gastosMedicos: '$100,000 MXN por persona',
    extras: 'Ninguno',
    descripcion: 'Agrega protección por daños al propio vehículo.',
  },
  {
    nombre: 'Amplia (plan actual)',
    precioAnual: '$14,850 MXN',
    responsabilidadCivil: '$3,000,000 MXN',
    danosMateriales: 'Deducible 5%',
    roboTotal: 'Deducible 10%',
    asistenciaVial: 'Incluida (grúa, cerrajería, batería)',
    gastosMedicos: '$200,000 MXN por persona',
    extras: 'Ninguno',
    descripcion: 'Tu plan actual: cobertura amplia con asistencia vial incluida.',
  },
  {
    nombre: 'Amplia Plus',
    precioAnual: '$19,300 MXN',
    responsabilidadCivil: '$3,000,000 MXN',
    danosMateriales: 'Deducible 5%, cristales sin deducible',
    roboTotal: 'Deducible 10%',
    asistenciaVial: 'Incluida + auto sustituto 5 días',
    gastosMedicos: '$400,000 MXN por persona',
    extras: 'Auto sustituto 5 días, cristales sin deducible',
    descripcion: 'Todo lo de Amplia, más auto sustituto y cristales sin deducible.',
  },
  {
    nombre: 'Platino',
    precioAnual: '$24,500 MXN',
    responsabilidadCivil: '$5,000,000 MXN',
    danosMateriales: 'Deducible 3%, cristales sin deducible, valor factura 2 años',
    roboTotal: 'Deducible 5%',
    asistenciaVial: 'Incluida + auto sustituto 15 días + asistencia legal',
    gastosMedicos: '$600,000 MXN por persona',
    extras: 'Valor factura 2 años, auto sustituto 15 días, asistencia legal',
    descripcion: 'Cobertura máxima: valor factura, mayor RC y auto sustituto extendido.',
  },
];

export function resumenPlan(p: (typeof PLANES)[number]): string {
  return `${p.descripcion} RC: ${p.responsabilidadCivil}. Daños materiales: ${p.danosMateriales}. Robo total: ${p.roboTotal}. Asistencia vial: ${p.asistenciaVial}. Gastos médicos: ${p.gastosMedicos}.`;
}

export const HISTORIAL_PAGOS = [
  { mes: 'Ene', monto: 1237.5 },
  { mes: 'Feb', monto: 1237.5 },
  { mes: 'Mar', monto: 1237.5 },
  { mes: 'Abr', monto: 1237.5 },
  { mes: 'May', monto: 1237.5 },
  { mes: 'Jun', monto: 1237.5 },
];

export const SINIESTROS = [
  { folio: 'S-2025-0231', fecha: '12/08/2025', tipo: 'Cristal delantero', estado: 'Resuelto', costo: '$0 (cubierto)' },
  { folio: 'S-2024-0987', fecha: '03/11/2024', tipo: 'Choque menor en estacionamiento', estado: 'Resuelto', costo: 'Deducible $850 MXN' },
  { folio: 'A-2026-0045', fecha: '20/02/2026', tipo: 'Asistencia vial: batería descargada', estado: 'Resuelto', costo: '$0 (incluido)' },
];

export function buildPersonaContext(): string {
  const coberturas = COBERTURAS.map((c) => `- ${c.nombre}: ${c.sumaAsegurada} (deducible: ${c.deducible})`).join('\n');
  const planes = PLANES.map((p) => `- ${p.nombre} — ${p.precioAnual}/año: ${resumenPlan(p)}`).join('\n');
  const pagos = HISTORIAL_PAGOS.map((p) => `${p.mes}: $${p.monto} MXN`).join(', ');
  const siniestros = SINIESTROS.map((s) => `- [${s.folio}] ${s.fecha} — ${s.tipo} (${s.estado}, costo: ${s.costo})`).join('\n');

  return `
Datos de la persona que está usando la aplicación (es SU propia información; el usuario ve su propia póliza):

Asegurada: ${PERSONA.nombre}, nacida el ${PERSONA.fechaNacimiento}.
Domicilio: ${PERSONA.domicilio}. Teléfono: ${PERSONA.telefono}. Correo: ${PERSONA.correo}.
Aseguradora: ${PERSONA.aseguradora}. Número de póliza: ${PERSONA.numeroPoliza}.
Agente asignado: ${PERSONA.agente.nombre} (ext. ${PERSONA.agente.extension}, ${PERSONA.agente.correo}).
Vehículo asegurado: ${PERSONA.vehiculo.marca} ${PERSONA.vehiculo.modelo} ${PERSONA.vehiculo.anio}, color ${PERSONA.vehiculo.color}, placas ${PERSONA.vehiculo.placas}, uso ${PERSONA.vehiculo.uso}.

Contrato vigente:
${CONTRATO_TEXTO}

Póliza — vigencia del ${POLIZA.vigenciaInicio} al ${POLIZA.vigenciaFin}. Prima anual: ${POLIZA.primaAnual}. Forma de pago: ${POLIZA.formaPago}.
Coberturas contratadas:
${coberturas}

Planes de mejora disponibles (el plan "Amplia" es el que tiene actualmente):
${planes}

Historial de pagos recientes (MXN): ${pagos}

Historial de siniestros y asistencias:
${siniestros}
`.trim();
}
