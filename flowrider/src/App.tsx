import './App.css';

// Component imports
import { Titulo } from './components/Titulo';
import { Parrafo } from './components/Parrafo';
import { Boton } from './components/Boton';
import { Documento } from './components/Documento';
import { BarraProgreso } from './components/BarraProgreso';
import { Carrusel } from './components/Carrusel';
import { Grafica } from './components/Grafica';
import { Imagen } from './components/Imagen';
import { ListaFiltro } from './components/ListaFiltro';
import { ListaSimple } from './components/ListaSimple';

import { Navbar } from './main/Navbar';
import { Footer } from './main/Footer';
import { MainLayout } from './main/MainLayout';

export default function App() {

  return (
    <div>
      <Navbar />
      <main>
        <MainLayout />
      </main>
      <Footer />
    </div>
  );
}