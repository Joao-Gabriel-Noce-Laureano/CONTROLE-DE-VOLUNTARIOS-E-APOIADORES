import React, { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import './VisualizarUsuarios.css';
import api from '../api';
import { Link } from "react-router-dom"

function VisualizarUsuarios({ tipo }) {
  const [tipoTabela, setTipoTabela] = useState(tipo || 'voluntarios');
  const [filtro, setFiltro] = useState('');
  const [filtroArea, setFiltroArea] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;
  const [voluntarios, setVoluntarios] = useState([])
  const [apoiadores, setApoiadores] = useState([])
  const [att, setAtt] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    setTipoTabela(tipo || 'voluntarios');
    setFiltro('');
    setPaginaAtual(1); // reinicia a página ao trocar tipo
  }, [tipo]);

  useEffect(() => {
    api.get('voluntary/all')
      .then((response) => {
        setVoluntarios(response.data.Voluntary);
        console.log(response.data.Voluntary);
      })
      .catch((error) => {
        console.error('Erro ao buscar voluntários:', error);
      });
  }, [att]);

  useEffect(() => {
    api.get('supporter/all')
      .then((response) => {
        setApoiadores(response.data.supporter);
        console.log(response.data.supporter);
      })
      .catch((error) => {
        console.error('Erro ao buscar voluntários:', error);
      });
  }, [att]);
  

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

  const handleExcluirS = async (pessoa) => {
    const confirmacao = window.confirm(`Tem certeza que deseja excluir ${pessoa.name}?`);
    if (confirmacao) {
      const data = await api.delete(`supporter/delete/${pessoa._id}`)
                          .then((response) => {
                            return response.data
                          })
      alert(`${pessoa.name} excluído com sucesso!`);
      setAtt(prev => !prev)
    }
  };

  const handleExcluirV = async (pessoa) => {
    const confirmacao = window.confirm(`Tem certeza que deseja excluir ${pessoa.name}?`);
    if (confirmacao) {
      const data = await api.delete(`voluntary/delete/${pessoa._id}`)
                          .then((response) => {
                            return response.data
                          })
      alert(`${pessoa.name} excluído com sucesso!`);
      setAtt(prev => !prev)
    }
  };


  // Aplica filtro por nome ou email
  const listaOriginal = tipoTabela === 'voluntarios' ? voluntarios : apoiadores;

  const dadosFiltrados = listaOriginal.filter((pessoa) => {
    const texto = `${pessoa.name} ${pessoa.email}`.toLowerCase();
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
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.ra}</td>
                <td>{p.email}</td>
                <td>{p.area}</td>
                <td>{p.birthday}</td>
                <td className="acoes">
                  <button className="botao-excluir" onClick={() => handleExcluirV(p)}>🗑️</button>
                  <Link className="botao-editar" to={`/editar-voluntario/${p._id}`}>✏️</Link>
                </td>

              </tr>
            ) : (
              <tr key={p._id}>
                <td>{p.type}</td>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>{p.type === 'Aluno' ? p.ra : '—'}</td>
                <td>{p.description || '—'}</td>
                <td>{p.observation || '—'}</td>
                <td className="acoes">
                  <Link className="botao-editar" to={`/editar-apoiador/${p._id}`}>✏️</Link>
                  <button className="botao-excluir" onClick={() => handleExcluirS(p)}>🗑️</button>
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
