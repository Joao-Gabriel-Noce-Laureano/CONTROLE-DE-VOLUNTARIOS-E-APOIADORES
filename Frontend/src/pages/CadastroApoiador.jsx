// src/pages/CadastroApoiador.jsx
import React, { useState } from 'react';
import './Cadastro.css';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import api from '../api';


function CadastroApoiador() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    tipo: 'Aluno',
    nome: '',
    email: '',
    ra: '',
    descricao: '',
    observacoes: '',
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

      const data = await api.post('/supporter/register', form)
                    .then((response) =>{
                      return response.data
                    })
    } catch (error) {
      console.log(error)
    }
    console.log('Apoiador cadastrado:', form);
    setToastVisivel(true);
    setTimeout(() => {
        setToastVisivel(false);
        navigate('/apoiadores');
    }, 2000);
  };

  
  
  return (
    <div className="form-container">
      <h2>Cadastro de Apoiador</h2>

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
        <input name="name" value={form.name} onChange={handleChange} required />

        <label>E-mail *</label>
        <input name="email" onChange={handleChange} required />

        <label>RA (apenas para alunos)</label>
        <input
            name="ra"
            onChange={handleChange}
            required
            type="text"
            inputMode="numeric"
            pattern="[0-9]+"
            title="Digite apenas números"
        />


        <label>Descrição do Apoio *</label>
        <textarea name="description" onChange={handleChange} required />

        <label>Observações</label>
        <textarea name="observation" onChange={handleChange} />

        <div className="botoes">
          <button type="submit" className="principal">Cadastrar</button>
          <button type="button" onClick={() => navigate('/apoiadores')}>Cancelar</button>
        </div>
      </form>
      <Toast mensagem="Alterações salvas com sucesso!" visivel={toastVisivel} />
    </div>
  );
}

export default CadastroApoiador;
