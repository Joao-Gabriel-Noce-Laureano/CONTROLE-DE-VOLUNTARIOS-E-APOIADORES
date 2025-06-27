// src/pages/EditarApoiador.jsx
import React, { useState, useEffect } from 'react';
import './Cadastro.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Toast from '../components/Toast';
import { useParams } from 'react-router-dom'
import api from '../api';

function EditarApoiador() {
  const navigate = useNavigate();
  const location = useLocation();
  let { userId } = useParams()

  const [form, setForm] = useState({
    type: 'Aluno',
    name: '',
    email: '',
    ra: '',
    description: '',
    observation: '',
  });

  useEffect(() => {
    api.get(`supporter/getuser/${userId}`)
          .then((response) => {
            setForm(response.data.supporter);
            console.log(response.data.supporter);
          })
          .catch((error) => {
            console.error('Erro ao buscar voluntários:', error);
          });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [toastVisivel, setToastVisivel] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@alunos\.utfpr\.edu\.br$/;
    if (!emailRegex.test(form.email)) {
      alert("Use um e-mail institucional da UTFPR (ex: nome@alunos.utfpr.edu.br)");
      return;
    }

    const data = await api.patch(`supporter/edit/${userId}`, form
            ).then((response) =>{
            return response.data
            })

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
            <input type="radio" name="type" value="Aluno" checked={form.type === 'Aluno'} onChange={handleChange} />
            Aluno
          </label>
          <label>
            <input type="radio" name="type" value="Não Aluno" checked={form.type === 'Não Aluno'} onChange={handleChange} />
            Não Aluno
          </label>
        </div>

        <label>Nome Completo *</label>
        <input name="name" value={form.name || ''} onChange={handleChange} required />

        <label>E-mail *</label>
        <input name="email" value={form.email || ''} onChange={handleChange} required />

        <label>RA (apenas para alunos)</label>
        <input
          name="ra"
          value={form.ra || ''}
          onChange={handleChange}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          title="Digite apenas números"
          disabled={form.type === 'Não Aluno'}
          placeholder={form.type === 'Não Aluno' ? 'Não se aplica' : ''}
        />

        <label>Descrição do Apoio *</label>
        <textarea name="description" value={form.description || ''} onChange={handleChange} required />

        <label>Observações</label>
        <textarea name="observation" value={form.observation || ''} onChange={handleChange} />

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
