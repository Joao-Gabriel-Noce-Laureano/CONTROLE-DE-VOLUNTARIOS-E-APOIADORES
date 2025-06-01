const Voluntary = require('../models/voluntary')
const mongoose = require('mongoose')

module.exports = class VoluntaryController{

    static async register(req, res){

         const {name, email, ra, description, birthday, area} = req.body

        if(!name){
            res.status(422).json({message: 'O nome é obrigatorio!'})
            return
        }

        if(!email){
            res.status(422).json({message: 'O email é obrigatorio!'})
            return
        }

        if(!birthday){
            res.status(422).json({message: 'O aniversário é obrigatorio!'})
            return
        }

        if(!description){
            res.status(422).json({message: 'A descrição é obrigatorio!'})
            return
        }

        if(!area){
            res.status(422).json({message: 'Por favor selecione um tipo de apoiador '})
            return
        }

        const userExist = await Voluntary.findOne({email: email})

        if(userExist){
            res.status(422).json({message: 'Esse email ja foi cadastrado!'})
            return
        }

         const voluntary = new Voluntary({
            name: name,
            email: email,
            ra: ra,
            birthday: birthday,
            description: description,
            area: area,
        })

        try {
            
            const newVoluntary = await voluntary.save()
            res.status(200).json({message: 'Apoiador criado com sucesso', newVoluntary})

        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    static async delete(req, res){

        const id = req.params.id

        const voluntary = await Voluntary.findOne({_id: id})

        if(!voluntary){
            return res.status(404).json({message: 'Voluntario não encontrado'})
        }

        try {
            const deletedUser = await Voluntary.findByIdAndDelete(id)
            res.status(202).json({message: 'Voluntario deletado com sucesso', deletedUser})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    static async edit(req, res){

        const id = req.params.id

        const {name, email, ra, description, birthday, area} = req.body

        if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório.' });
        if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório.' });
        if (!description) return res.status(400).json({ message: 'O campo "descrição" é obrigatório.' });
        if (!ra) return res.status(400).json({ message: 'O campo "ra" é obrigatório.' });
        if (!area) return res.status(400).json({ message: 'O campo "area" é obrigatório.' });
        if (!birthday) return res.status(400).json({ message: 'O campo "aniversario" é obrigatório.' });

        try {
            const updatedVoluntary = await Voluntary.findByIdAndUpdate(
            id,
            { name, email, ra, description, birthday, area },
            { new: true, runValidators: true }
            );

            if (!updatedVoluntary) {
            return res.status(404).json({ message: 'Voluntary não encontrado.' });
            }

            res.json(updatedVoluntary);
        } catch (error) {
            console.error('Erro ao atualizar o Voluntary:', error);
            res.status(500).json({ message: 'Erro no servidor ao atualizar o Voluntary.' });
        }
    }

    static async allVoluntarys(req, res){

        try {
            const voluntary = await Voluntary.find();
            res.status(200).json({Voluntary: voluntary})
        } catch (error) {
            console.error('Erro ao buscar os Voluntarys:', error);
            res.status(500).json({ message: 'Erro no servidor ao buscar os Voluntarys.' });
        }
    }

    static async allVoluntarysNumb(req, res){

        try {
            const total = await Voluntary.countDocuments();
            res.status(200).json({ total:total });
        } catch (error) {
            console.error('Erro ao contar os Voluntary:', error);
            res.status(500).json({ message: 'Erro no servidor ao contar os Voluntary.' });
        }
    }
}
