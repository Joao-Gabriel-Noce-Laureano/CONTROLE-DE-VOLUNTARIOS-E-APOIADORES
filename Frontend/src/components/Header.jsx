import React from 'react';

export default function Header() {
  return (
    <header className="bg-slate-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Meninas Digitais</h1>
      <nav className="space-x-4">
        <a href="#" className="hover:underline">Página Inicial</a>
        <a href="#" className="hover:underline">Visualizar Voluntário</a>
        <a href="#" className="hover:underline">Visualizar Apoiador</a>
        <a href="#" className="hover:underline">Registrar Voluntário</a>
        <a href="#" className="hover:underline">Registrar Apoiador</a>
      </nav>
    </header>
  );
}
