// src/pages/EditarVoluntario.jsx
import React, { useState, useEffect } from 'react';
import './Cadastro.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Toast from '../components/Toast';

function EditarVoluntario() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    nome: '',
    ra: '',
    nascimento: '',
    email: '',
    area: '',
  });

  useEffect(() => {
    if (location.state?.pessoa) {
      const { nome, ra, email, area, aniversario } = location.state.pessoa;
      setForm({
        nome,
        ra,
        nascimento: aniversario ? formatarDataISO(aniversario) : '',
        email,
        area,
      });
    }
  }, [location]);

  const formatarDataISO = (dataBR) => {
    const [dia, mes, ano] = dataBR.split('/');
    return `${ano}-${mes}-${dia}`;
  };

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

    console.log('Voluntário editado:', form);
    setToastVisivel(true);
    setTimeout(() => {
      setToastVisivel(false);
      navigate('/voluntarios');
    }, 2000);
  };

  return (
    <div className="form-container">
      <h2>Edição de Voluntário</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome Completo</label>
        <input name="nome" value={form.nome} onChange={handleChange} required />

        <div className="duas-colunas">
          <div>
            <label>RA</label>
            <input
              name="ra"
              value={form.ra}
              onChange={handleChange}
              required
              type="text"
              inputMode="numeric"
              pattern="[0-9]+"
              title="Digite apenas números"
            />
          </div>
          <div>
            <label>Data de Nascimento</label>
            <input
              name="nascimento"
              type="date"
              value={form.nascimento}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label>E-mail Institucional</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          pattern="^[a-zA-Z0-9._%+-]+@alunos\.utfpr\.edu\.br$"
          title="Use um e-mail institucional da UTFPR (ex: nome@alunos.utfpr.edu.br)"
        />

        <label>Área no Projeto</label>
        <select name="area" value={form.area} onChange={handleChange} required>
          <option value="">Selecione uma área</option>
          <option value="Desenvolvimento">Desenvolvimento</option>
          <option value="Design">Design</option>
          <option value="Eventos">Eventos</option>
        </select>

        <div className="botoes">
          <button type="button" onClick={() => navigate('/voluntarios')}>Cancelar</button>
          <button type="submit" className="principal">Salvar Alterações</button>
        </div>
      </form>
      <Toast mensagem="Alterações salvas com sucesso!" visivel={toastVisivel} />
    </div>
  );
}

export default EditarVoluntario;
