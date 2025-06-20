import React from 'react';
import '../App.css';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import api from '../api';


// Dados do gráfico de pizza
const data = [
  { name: 'Desenvolvimento Web', value: 20 },
  { name: 'UX/UI', value: 12 },
  { name: 'Robótica', value: 8 },
  { name: 'IA', value: 5 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f7f'];

function Dashboard() {

  const [voluntary, setVoluntary] = useState()
  const [supporter, setSupporter] = useState()

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
      setVoluntary(response.data.total);
      console.log(response.data.total);
    })
    .catch((error) => {
      console.error('Erro ao buscar voluntários:', error);
    });
}, []);

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
            <p>{supporter} a </p>
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

            <div className="activity">
              <img src="/avatar1.png" alt="Avatar" className="avatar" />
              <div>
                <p><strong>Nova Voluntária: Maria Silva</strong></p>
                <p>Desenvolvimento Web</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      
    </>
  );
}

export default Dashboard;

