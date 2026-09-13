export type ComponentType =
  | 'Titulo'
  | 'Parrafo'
  | 'Imagen'
  | 'Grafica'
  | 'BarraProgreso'
  | 'Documento'
  | 'ListaSimple'
  | 'ListaFiltro'
  | 'Boton'
  | 'Carrusel';

export interface ComponentSpec {
  type: ComponentType;
  props: Record<string, unknown>;
}
