import './App.css';

// Component imports
import { Titulo } from './Titulo';
import { Parrafo } from './Parrafo';
import { Boton } from './Boton';
import { Documento } from './Documento';
import { BarraProgreso } from './BarraProgreso';
import { Carrusel } from './Carrusel';
import { Grafica } from './Grafica';
import { Imagen } from './Imagen';
import { ListaFiltro } from './ListaFiltro';
import { ListaSimple } from './ListaSimple';

export default function App() {
  // Mock data for Carrusel
  const carruselCards = [
    { title: 'Paso 1: Registro', description: 'Crea tu cuenta empresarial en minutos.' },
    { title: 'Paso 2: Configuración', description: 'Ajusta las preferencias de tu equipo.' },
    { title: 'Paso 3: Lanzamiento', description: 'Publica tus servicios en la plataforma.' },
    { title: 'Paso 4: Métricas', description: 'Analiza el impacto y los resultados en tiempo real.' },
  ];

  // Mock data for Grafica
  const datosGrafica = [
    { label: 'Lun', display: '40', value: 40 },
    { label: 'Mar', display: '65', value: 65 },
    { label: 'Mié', display: '30', value: 30 },
    { label: 'Jue', display: '85', value: 85 },
    { label: 'Vie', display: '95', value: 95 },
  ];

  // Mock data for ListaFiltro
  const filtros = [
    { id: 'dev', label: 'Desarrollo' },
    { id: 'design', label: 'Diseño' },
    { id: 'ops', label: 'Operaciones' },
  ];

  const itemsFiltrados = [
    { label: 'Refactorizar API REST', tag: 'Dev', tags: ['dev'] },
    { label: 'Prototipo de wireframes', tag: 'UI/UX', tags: ['design'] },
    { label: 'Migración a PostgreSQL', tag: 'Backend', tags: ['dev', 'ops'] },
    { label: 'Configurar pipeline CI/CD', tag: 'DevOps', tags: ['ops'] },
    { label: 'Auditoría de diseño accesible', tag: 'A11y', tags: ['design'] },
  ];

  // Mock data for ListaSimple
  const tareasPendientes = [
    { label: 'Revisión trimestral de seguridad', meta: 'Vence hoy' },
    { label: 'Sincronización con clientes', meta: '14:30 hrs' },
    { label: 'Actualización de dependencias', meta: 'Pendiente' },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">

        {/* 1. Titulo & Parrafo */}
        <section className="flex flex-col gap-3">
          <Titulo
            eyebrow="Panel de Control"
            heading="Resumen Ejecutivo"
            as="h1"
            size="text-3xl sm:text-4xl"
          />
          <Parrafo label="Contexto del proyecto" size="text-base">
            Bienvenido al panel centralizado. Aquí puedes monitorear el avance de las tareas,
            consultar documentos oficiales, verificar métricas semanales y revisar el estado
            general del despliegue.
          </Parrafo>
        </section>

        {/* 2. Boton & BarraProgreso */}
        <section className="flex flex-wrap items-end gap-6 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <BarraProgreso label="Progreso del Sprint" value={72} width="w-full sm:w-72" />
          <div className="flex gap-3">
            <Boton label="Guardar Avance" onClick={() => alert('¡Avance guardado!')} />
            <Boton
              label="Exportar"
              icon="📥"
              padX="px-4"
              padY="py-2.5"
              fontSize="text-sm"
              onClick={() => console.log('Exportando...')}
            />
          </div>
        </section>

        {/* 3. Documento & Imagen */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-gray-700">Archivos adjuntos</h2>
            <Documento
              icon="PDF"
              name="Especificaciones_Tecnicas.pdf"
              info="3.8 MB • Actualizado hace 2h"
              actionLabel="Descargar"
              actionHref="#descarga"
            />
            <Documento
              icon="DOC"
              name="Manual_Usuario_v2.docx"
              info="1.2 MB • Pendiente de firma"
              actionLabel="Ver"
              actionHref="#visualizar"
            />
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-gray-700">Vista previa del sistema</h2>
            <Imagen
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
              alt="Dashboard de métricas"
              caption="Captura del panel de telemetría en producción"
              width="w-full"
            />
          </div>
        </section>

        {/* 4. Grafica & ListaSimple */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <Grafica title="Rendimiento Semanal (%)" data={datosGrafica} />
          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-3">Recordatorios clave</h3>
            <ListaSimple items={tareasPendientes} width="w-full" />
          </div>
        </section>

        {/* 5. ListaFiltro */}
        <section className="flex flex-col gap-3">
          <Titulo heading="Registro de Actividades" as="h2" size="text-xl" />
          <ListaFiltro filters={filtros} items={itemsFiltrados} width="w-full" />
        </section>

        {/* 6. Carrusel */}
        <section className="flex flex-col gap-3 pb-8">
          <Titulo heading="Flujo de Integración" as="h2" size="text-xl" />
          <Carrusel items={carruselCards} cardWidth="w-64" />
        </section>

      </div>
    </main>
  );
}