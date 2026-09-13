import './App.css';

import { Navbar } from './main/Navbar';
import { Footer } from './main/Footer';
import { MainLayout } from './main/MainLayout';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <MainLayout />
      </main>
      <Footer />
    </div>
  );
}

export default App;