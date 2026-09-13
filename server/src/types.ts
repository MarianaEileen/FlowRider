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

export type LayoutId = 'A' | 'B' | 'C';

export interface ComponentSpec {
  type: ComponentType;
  props: Record<string, unknown>;
}

export interface LayoutResponse {
  layout: LayoutId;
  components: ComponentSpec[];
  reply: string;
}

export interface LayoutRequest {
  intent: string;
  item?: Record<string, unknown>;
}
