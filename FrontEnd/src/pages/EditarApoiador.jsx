// src/pages/EditarApoiador.jsx
import React, { useState, useEffect } from 'react';
import './Cadastro.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Toast from '../components/Toast';

function EditarApoiador() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    tipo: 'Aluno',
    nome: '',
    email: '',
    ra: '',
    descricao: '',
    observacoes: '',
  });

  useEffect(() => {
    if (location.state?.pessoa) {
      const { tipo = 'Aluno', nome, email, ra = '', descricao = '', observacoes = '' } = location.state.pessoa;
      setForm({ tipo, nome, email, ra, descricao, observacoes });
    }
  }, [location]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [toastVisivel, setToastVisivel] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@alunos\.utfpr\.edu\.br$/;
    if (!emailRegex.test(form.email)) {
      alert("Use um e-mail institucional da UTFPR (ex: nome@alunos.utfpr.edu.br)");
      return;
    }

    console.log('Apoiador editado:', form);
    setToastVisivel(true);
    setTimeout(() => {
      setToastVisivel(false);
      navigate('/apoiadores');
    }, 2000);
  };

  return (
    <div className="form-container">
      <h2>Edição de Apoiador</h2>

      <form onSubmit={handleSubmit}>
        <label>Tipo de Apoiador</label>
        <div className="radio-group">
          <label>
            <input type="radio" name="tipo" value="Aluno" checked={form.tipo === 'Aluno'} onChange={handleChange} />
            Aluno
          </label>
          <label>
            <input type="radio" name="tipo" value="Não Aluno" checked={form.tipo === 'Não Aluno'} onChange={handleChange} />
            Não Aluno
          </label>
        </div>

        <label>Nome Completo *</label>
        <input name="nome" value={form.nome} onChange={handleChange} required />

        <label>E-mail *</label>
        <input name="email" value={form.email} onChange={handleChange} required />

        <label>RA (apenas para alunos)</label>
        <input
          name="ra"
          value={form.ra}
          onChange={handleChange}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          title="Digite apenas números"
          disabled={form.tipo === 'Não Aluno'}
          placeholder={form.tipo === 'Não Aluno' ? 'Não se aplica' : ''}
        />

        <label>Descrição do Apoio *</label>
        <textarea name="descricao" value={form.descricao} onChange={handleChange} required />

        <label>Observações</label>
        <textarea name="observacoes" value={form.observacoes} onChange={handleChange} />

        <div className="botoes">
          <button type="submit" className="principal">Salvar Alterações</button>
          <button type="button" onClick={() => navigate('/apoiadores')}>Cancelar</button>
        </div>
      </form>
      <Toast mensagem="Alterações salvas com sucesso!" visivel={toastVisivel} />
    </div>
  );
}

export default EditarApoiador;
