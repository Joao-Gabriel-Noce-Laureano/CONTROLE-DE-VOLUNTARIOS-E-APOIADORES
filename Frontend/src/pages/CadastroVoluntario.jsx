// src/pages/CadastroVoluntario.jsx
import React, { useState } from 'react';
import './Cadastro.css';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import api from '../api';

function CadastroVoluntario() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    ra: '',
    birthday: '',
    email: '',
    area: '',
  });

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

    try {
    
          const data = await api.post('/voluntary/register', form)
                        .then((response) =>{
                          return response.data
                        })
        } catch (error) {
          console.log(error)
        }

    console.log('Voluntário cadastrado:', form);
    setToastVisivel(true);
    setTimeout(() => {
        setToastVisivel(false);
        navigate('/voluntarios');
    }, 2000);
  };
  

  return (
    <div className="form-container">
      <h2>Cadastro de Voluntários</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome Completo</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <div className="duas-colunas">
          <div>
            <label>RA</label>
            <input
                name="ra"
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
              name="birthday"
              type="date"
              value={form.birthday}
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
          <button type="submit" className="principal">Cadastrar</button>
        </div>
      </form>
      <Toast mensagem="Alterações salvas com sucesso!" visivel={toastVisivel} />
    </div>
  );
}

export default CadastroVoluntario;
