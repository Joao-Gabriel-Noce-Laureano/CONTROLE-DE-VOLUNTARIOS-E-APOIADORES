import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import VisualizarUsuarios from './pages/VisualizarUsuarios';

function App() {
  return (
    <Router>
      <header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.jpg" alt="Logo" style={{ height: '32px' }} />
          <h1>Meninas Digitais</h1>
        </div>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/voluntarios">Voluntários</Link>
          <Link to="/apoiadores">Apoiadores</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/voluntarios" element={<VisualizarUsuarios tipo="voluntarios" />} />
        <Route path="/apoiadores" element={<VisualizarUsuarios tipo="apoiadores" />} />
      </Routes>

      <footer className="footer">
        <span>© 2025 Meninas Digitais - UTFPR-CP</span>
        <div className="social-icons">
          <a href="https://www.instagram.com/meninasdigitaisutfprcp/"><img src="/instagram.png" alt="Instagram" /></a>
          <a href="https://www.linkedin.com/company/meninas-digitais-utfpr-cp/"><img src="/linkedin.png" alt="LinkedIn" /></a>
          <a href="https://meninas.sbc.org.br/projetos-parceiros/meninas-digitais-utfpr-cp/"><img src="/website.png" alt="WebSite" /></a>
        </div>
      </footer>
    </Router>
  );
}

export default App;
