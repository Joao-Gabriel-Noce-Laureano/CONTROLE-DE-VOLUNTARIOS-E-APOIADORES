const Voluntary = require('../models/voluntary')
const Supporter = require('../models/supporter')
const mongoose = require('mongoose')

module.exports = class UserController{

    static async distribuicao(req, res){

        try {

    const voluntarioAreas = await Voluntary.aggregate([
      { $group: { _id: '$area', total: { $sum: 1 } } }
    ]);

    // Junta os dois resultados e agrupa somando as áreas iguais
    const contador = {};

    [...voluntarioAreas].forEach(({ _id, total }) => {
      if (contador[_id]) {
        contador[_id] += total;
      } else {
        contador[_id] = total;
      }
    });

    // Formato final para o front
    const resultado = Object.entries(contador).map(([area, total]) => ({
      area,
      total
    }));

    res.status(200).json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao calcular distribuição por área' });
  }
    };

    static async cadastro(req, res){

      try {

    const [apoiadores, voluntarios] = await Promise.all([
      Supporter.find().sort({ createdAt: -1 }).limit(5),
      Voluntary.find().sort({ createdAt: -1 }).limit(5)
    ]);

    const todos = [
      ...apoiadores.map(a => ({ tipo: 'Apoiador', ...a._doc })),
      ...voluntarios.map(v => ({ tipo: 'Voluntario', ...v._doc }))
    ];

    const ordenado = todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json(ordenado.slice(0, 2));
  } catch (error) {
    console.error('Erro ao buscar últimos cadastrados:', error);
    res.status(500).json({ error: 'Erro ao buscar últimos cadastrados' });
  }
    }
    
}