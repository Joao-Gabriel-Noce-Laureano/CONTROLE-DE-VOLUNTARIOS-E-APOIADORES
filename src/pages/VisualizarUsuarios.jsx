import React, { useState } from 'react';
import './VisualizarUsuarios.css'; // crie este arquivo para estilo próprio
const voluntarios = [
  { nome: 'Ana Silva', ra: '2025001', email: 'ana.silva@alunos.utfpr.edu.br', area: 'Desenvolvimento', aniversario: '15/03/2001' },
  { nome: 'Beatriz Santos', ra: '2025002', email: 'beatriz.santos@alunos.utfpr.edu.br', area: 'Design', aniversario: '22/07/2000' },
];

const apoiadores = [
  { tipo: 'Aluno', nome: 'Carlos Lima', email: 'carlos.lima@alunos.utfpr.edu.br', ra: '2025003' },
  { tipo: 'Não Aluno', nome: 'Juliana Rocha', email: 'juliana.rocha@gmail.com' },
];

function VisualizarUsuarios() {
  const [tipoTabela, setTipoTabela] = useState('voluntarios');

  return (
    <main className="usuarios">
      <h1>Visualização de Voluntários/Apoiadores</h1>

      <div className="filtros">
        <button
          className={tipoTabela === 'voluntarios' ? 'ativo' : ''}
          onClick={() => setTipoTabela('voluntarios')}
        >
          Voluntários
        </button>
        <button
          className={tipoTabela === 'apoiadores' ? 'ativo' : ''}
          onClick={() => setTipoTabela('apoiadores')}
        >
          Apoiadores
        </button>
        <input type="text" placeholder="Pesquisar..." />
        <button>🔍</button>
      </div>

      <table>
        <thead>
          {tipoTabela === 'voluntarios' ? (
            <tr>
              <th>Nome Completo</th>
              <th>RA</th>
              <th>E-mail</th>
              <th>Área</th>
              <th>Aniversário</th>
              <th>Ações</th>
            </tr>
          ) : (
            <tr>
              <th>Tipo</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>RA</th>
              <th>Ações</th>
            </tr>
          )}
        </thead>
        <tbody>
          {tipoTabela === 'voluntarios'
            ? voluntarios.map((v, i) => (
                <tr key={i}>
                  <td>{v.nome}</td>
                  <td>{v.ra}</td>
                  <td>{v.email}</td>
                  <td>{v.area}</td>
                  <td>{v.aniversario}</td>
                  <td>
                    ✏️ 🗑️
                  </td>
                </tr>
              ))
            : apoiadores.map((a, i) => (
                <tr key={i}>
                  <td>{a.tipo}</td>
                  <td>{a.nome}</td>
                  <td>{a.email}</td>
                  <td>{a.tipo === 'Aluno' ? a.ra : '—'}</td>
                  <td>
                    ✏️ 🗑️
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </main>
  );
}

export default VisualizarUsuarios;
