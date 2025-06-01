const Supporter = require('../models/supporter')
const mongoose = require('mongoose')

module.exports = class SupporterController{

    static async register(req, res){

         const {name, email, ra, description, observation, type} = req.body

        if(!name){
            res.status(422).json({message: 'O nome é obrigatorio!'})
            return
        }

        if(!email){
            res.status(422).json({message: 'O email é obrigatorio!'})
            return
        }

        if(!description){
            res.status(422).json({message: 'A descrição é obrigatorio!'})
            return
        }

        if(!type){
            res.status(422).json({message: 'Por favor selecione um tipo de apoiador '})
            return
        }

        const userExist = await Supporter.findOne({email: email})

        if(userExist){
            res.status(422).json({message: 'Esse email ja foi cadastrado!'})
            return
        }

         const supporter = new Supporter({
            name: name,
            email: email,
            ra: ra,
            description: description,
            observation: observation,
            type: type,
        })

        try {
            
            const newSupporter = await supporter.save()
            res.status(202).json({message: 'Apoiador criado com sucesso', newnewSupporterUser})

        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    static async delete(req, res){

        const id = req.params.id

        const supporter = await Supporter.findOne({_id: id})

        if(!prosupporterduct){
            return res.status(404).json({message: 'Apoiador não encontrado'})
        }

        try {
            const deletedUser = await Supporter.findByIdAndDelete(id)
            res.status(202).json({message: 'Apoiador deletado com sucesso', deletedUser})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    static async edit(req, res){

        const id = req.params.id

        const { name, email, ra, description, observation, type } = req.body

        if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório.' });
        if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório.' });
        if (!description) return res.status(400).json({ message: 'O campo "descrição" é obrigatório.' });
        if (!type) return res.status(400).json({ message: 'O campo "tipo" é obrigatório.' });

        try {
            const updatedSupporter = await Supporter.findByIdAndUpdate(
            id,
            { name, email, ra, description, observation, type },
            { new: true, runValidators: true }
            );

            if (!updatedSupporter) {
            return res.status(404).json({ message: 'Supporter não encontrado.' });
            }

            res.json(updatedSupporter);
        } catch (error) {
            console.error('Erro ao atualizar o Supporter:', error);
            res.status(500).json({ message: 'Erro no servidor ao atualizar o Supporter.' });
        }
    }

    static async allSupporters(req, res){

        try {
            const supporter = await Supporter.find();
            res.status(200).json({supporter: supporter})
        } catch (error) {
            console.error('Erro ao buscar os Supporters:', error);
            res.status(500).json({ message: 'Erro no servidor ao buscar os Supporters.' });
        }
    }

    static async allSupportersNumb(req, res){

        try {
            const total = await Supporter.countDocuments();
            res.status(200).json({ total:total });
        } catch (error) {
            console.error('Erro ao contar os Supporters:', error);
            res.status(500).json({ message: 'Erro no servidor ao contar os Supporters.' });
        }
    }
}
