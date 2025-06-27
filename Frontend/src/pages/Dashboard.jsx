import React from 'react';
import '../App.css';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import api from '../api';




const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f7f'];

function Dashboard() {

  const [voluntary, setVoluntary] = useState()
  const [supporter, setSupporter] = useState()
  const [dados, setDados] = useState([]);
  const [cadastro, setCadastro] = useState([]);


  useEffect(() => {
  api.get('voluntary/allnunb')
    .then((response) => {
      setVoluntary(response.data.total);
      console.log(response.data.total);
    })
    .catch((error) => {
      console.error('Erro ao buscar voluntários:', error);
    });
  }, []);

    useEffect(() => {
  api.get('supporter/allnunb')
    .then((response) => {
      setSupporter(response.data.total);
      console.log(response.data.total);
    })
    .catch((error) => {
      console.error('Erro ao buscar voluntários:', error);
    });
}, []);

  useEffect(() => {
  api.get('/user/dist')
    .then(res => {
      console.log('dados:', res);
      setDados(res.data);
    })
    .catch(err => console.error(err));
}, []);

useEffect(() => {
  api.get('/user/cadastro')
    .then(res => {
      setCadastro(res.data);
      console.log('Últimos cadastrados:', res.data);
    })
    .catch(err => {
      console.error('Erro ao buscar últimos cadastrados:', err);
    });
}, []);

  const data = dados.map(d => ({
  name: d.area,
  value: d.total
  }));

  return (
    <>
      <main className="dashboard">
        <h1>Dashboard</h1>

        <div className="card-grid">
          <div className="card">
            <h2>Total de Voluntários</h2>
            <p>{voluntary}</p>
          </div>
          <div className="card">
            <h2>Total de Apoiadores</h2>
            <p>{supporter}</p>
          </div>
          <div className="card">
            <h2>Áreas Ativas</h2>
            <p>8</p>
          </div>
        </div>

        <div className="row">
          <div className="chart">
            <h2>Distribuição por Área</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <ResponsiveContainer width="60%" height={200}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <ul style={{ listStyle: 'none', marginLeft: '20px', fontSize: '14px', padding: 0 }}>
                {data.map((entry, index) => (
                  <li key={index} style={{ marginBottom: '6px', display: 'flex', alignItems: 'center' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 12,
                        height: 12,
                        backgroundColor: COLORS[index % COLORS.length],
                        marginRight: 8,
                        borderRadius: '50%',
                      }}
                    ></span>
                    {entry.name} ({entry.value})
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="activities">
            <h2>Atividades Recentes</h2>
            {cadastro.map((usuario, index) => (
            <div key={index} className="activity">
              <img src="/avatar1.png" alt="Avatar" className="avatar" />
              <div>
                <p><strong>Novo {usuario.tipo}: {usuario.name}</strong></p>
                <p>{usuario.area || usuario.type}</p>
              </div>
            </div>
            ))}
          </div>
        </div>
      </main>

      
    </>
  );
}

export default Dashboard;

