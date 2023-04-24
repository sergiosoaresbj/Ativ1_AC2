const express = require('express');
const router = express.Router();

const Tarefa = require('../Model/tarefa');


router.post('/', async (req, res) => {
    const { nome, descricao, atribuido } = req.body;

    const tarefa = {
        nome, descricao, atribuido
    }
    try {
        await Tarefa.create(tarefa);
        res.status(201).json(tarefa);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/', async (req, res) => {
    try {
        const tarefa = await Tarefa.find();
        res.status(200).json(tarefa);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const tarefa = await Tarefa.findOne({ _id: req.params.id });
        if (!tarefa) {
            res.status(422).json({ mensagem: "Tarefa não encontrada" });
            return;
        }
        res.status(200).json(tarefa);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const tarefa = await Tarefa.findOne({ _id: id });
        if (!tarefa) {
            res.status(422).json({ mensagem: "Tarefa não encontrada" });
            return;
        }
        await Tarefa.deleteOne({ _id: id });
        res.status(200).json({ mensagem: "Excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.put('/:id', async (req, res) => {
    try{
        const id = req.params.id; 
        const {atribuido} = req.body;
        const tarefa = await Tarefa.findOne({ _id: id });
        tarefa.atribuido = atribuido;
        console.log(tarefa);

       const x = await Tarefa.updateOne({_id: id} , tarefa)
       console.log(x);
        res.status(200).json({ mensagem: "Usuário atribuido"})
    } catch (error) {
        res.status(500).json({ error: error });
    }
});




module.exports = router;