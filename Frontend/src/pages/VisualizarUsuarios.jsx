import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VisualizarUsuarios.css';

function VisualizarUsuarios({ tipo }) {
  const [tipoTabela, setTipoTabela] = useState(tipo || 'voluntarios');
  const [filtro, setFiltro] = useState('');
  const [filtroArea, setFiltroArea] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  const navigate = useNavigate();

  useEffect(() => {
    setTipoTabela(tipo || 'voluntarios');
    setFiltro('');
    setPaginaAtual(1); // reinicia a página ao trocar tipo
  }, [tipo]);

  const mudarTipoTabela = (novoTipo) => {
    if (tipoTabela !== novoTipo) {
      setTipoTabela(novoTipo);
      navigate(`/${novoTipo}`);
    }
  };

  const handleEditar = (pessoa) => {
    const rota = tipoTabela === 'voluntarios' ? '/editar-voluntario' : '/editar-apoiador';
    navigate(rota, { state: { pessoa } }); 
  };

  const handleExcluir = (pessoa) => {
    const confirmacao = window.confirm(`Tem certeza que deseja excluir ${pessoa.nome}?`);
    if (confirmacao) {
      alert(`${pessoa.nome} excluído com sucesso!`);
    }
  };

  const voluntarios = [
    { nome: 'Ana Silva', ra: '2025001', email: 'ana.silva@alunos.utfpr.edu.br', area: 'Desenvolvimento', aniversario: '15/03/2001' },
    { nome: 'Beatriz Santos', ra: '2025002', email: 'beatriz.santos@alunos.utfpr.edu.br', area: 'Design', aniversario: '22/07/2000' },
    { nome: 'Carlos Souza', ra: '2025004', email: 'carlos.souza@alunos.utfpr.edu.br', area: 'Marketing', aniversario: '10/01/2002' },
    { nome: 'Débora Martins', ra: '2025005', email: 'debora.martins@alunos.utfpr.edu.br', area: 'Eventos', aniversario: '02/04/2000' },
    { nome: 'Eduarda Lopes', ra: '2025006', email: 'eduarda.lopes@alunos.utfpr.edu.br', area: 'Conteúdo', aniversario: '09/08/2001' },
    { nome: 'Fernanda Oliveira', ra: '2025007', email: 'fernanda.oliveira@alunos.utfpr.edu.br', area: 'Design', aniversario: '17/09/2000' },
  ];

  const apoiadores = [
    {
      tipo: 'Aluno',
      nome: 'Carlos Lima',
      email: 'carlos.lima@alunos.utfpr.edu.br',
      ra: '2025003',
      descricao: 'Ajuda em eventos',
      observacoes: 'Disponível aos finais de semana'
    },
    {
      tipo: 'Não Aluno',
      nome: 'Juliana Rocha',
      email: 'juliana.rocha@gmail.com',
      descricao: 'Doação de materiais',
      observacoes: 'Contato via WhatsApp'
    },
    {
      tipo: 'Aluno',
      nome: 'Luan Pereira',
      email: 'luan.pereira@alunos.utfpr.edu.br',
      ra: '2025008',
      descricao: 'Mentoria em programação',
      observacoes: 'Prefere horário noturno'
    },
    {
      tipo: 'Não Aluno',
      nome: 'Mariana Alves',
      email: 'mariana.alves@gmail.com',
      descricao: 'Organização de eventos',
      observacoes: 'Contato via e-mail'
    },
    {
      tipo: 'Aluno',
      nome: 'Renato Silva',
      email: 'renato.silva@alunos.utfpr.edu.br',
      ra: '2025009',
      descricao: 'Apoio financeiro',
      observacoes: 'Mensal'
    },
  ];

  // Aplica filtro por nome ou email
  const listaOriginal = tipoTabela === 'voluntarios' ? voluntarios : apoiadores;

  const dadosFiltrados = listaOriginal.filter((pessoa) => {
    const texto = `${pessoa.nome} ${pessoa.email}`.toLowerCase();
    const correspondeTexto = texto.includes(filtro.toLowerCase());
    const correspondeArea =
      tipoTabela === 'voluntarios'
        ? filtroArea === '' || pessoa.area === filtroArea
        : true;

    return correspondeTexto && correspondeArea;
  });


  const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);

  const dadosPaginados = dadosFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const irParaPagina = (novaPagina) => {
    if (novaPagina >= 1 && novaPagina <= totalPaginas) {
      setPaginaAtual(novaPagina);
    }
  };

  return (
    <main className="usuarios">
      <h1>Visualização de Voluntários/Apoiadores</h1>

      <div className="filtros">
        <button
          className={tipoTabela === 'voluntarios' ? 'ativo' : ''}
          onClick={() => mudarTipoTabela('voluntarios')}
        >
          Voluntários
        </button>
        <button
          className={tipoTabela === 'apoiadores' ? 'ativo' : ''}
          onClick={() => mudarTipoTabela('apoiadores')}
        >
          Apoiadores
        </button>

        <input
          type="text"
          placeholder="Pesquisar por nome ou e-mail..."
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value);
            setPaginaAtual(1);
          }}
        />
        <button onClick={() => setFiltro('')}>❌</button>

        {tipoTabela === 'voluntarios' && (
          <select
            value={filtroArea}
            onChange={(e) => {
              setFiltroArea(e.target.value);
              setPaginaAtual(1);
            }}
          >
            <option value="">Todas as Áreas</option>
            <option value="Desenvolvimento">Desenvolvimento</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Eventos">Eventos</option>
            <option value="Conteúdo">Conteúdo</option>
          </select>
        )}
      </div>
      
      <div className="topo-tabela">
        <h2>{tipoTabela === 'voluntarios' ? 'Lista de Voluntários' : 'Lista de Apoiadores'}</h2>
        <button
          className="botao-cadastrar"
          onClick={() =>
            navigate(tipoTabela === 'voluntarios' ? '/cadastro-voluntario' : '/cadastro-apoiador')
          }
        >
          ➕ Cadastrar {tipoTabela === 'voluntarios' ? 'Voluntário' : 'Apoiador'}
        </button>
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
              <th style={{ textAlign: 'center' }}>Ações</th>
            </tr>
          ) : (
            <tr>
              <th>Tipo</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>RA</th>
              <th>Descrição</th>
              <th>Observações</th>
              <th style={{ textAlign: 'center' }}>Ações</th>
            </tr>
          )}
        </thead>
        <tbody>
          {dadosPaginados.map((p, i) =>
            tipoTabela === 'voluntarios' ? (
              <tr key={i}>
                <td>{p.nome}</td>
                <td>{p.ra}</td>
                <td>{p.email}</td>
                <td>{p.area}</td>
                <td>{p.aniversario}</td>
                <td className="acoes">
                  <button className="botao-editar" onClick={() => handleEditar(p)}>✏️</button>
                  <button className="botao-excluir" onClick={() => handleExcluir(p)}>🗑️</button>
                </td>

              </tr>
            ) : (
              <tr key={i}>
                <td>{p.tipo}</td>
                <td>{p.nome}</td>
                <td>{p.email}</td>
                <td>{p.tipo === 'Aluno' ? p.ra : '—'}</td>
                <td>{p.descricao || '—'}</td>
                <td>{p.observacoes || '—'}</td>
                <td className="acoes">
                  <button className="botao-editar" onClick={() => handleEditar(p)}>✏️</button>
                  <button className="botao-excluir" onClick={() => handleExcluir(p)}>🗑️</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <div className="paginacao">
        <button onClick={() => irParaPagina(paginaAtual - 1)} disabled={paginaAtual === 1}>
          ⬅️ Anterior
        </button>
        <span>
          Página {paginaAtual} de {totalPaginas}
        </span>
        <button onClick={() => irParaPagina(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>
          Próxima ➡️
        </button>
      </div>
    </main>
  );
}

export default VisualizarUsuarios;
