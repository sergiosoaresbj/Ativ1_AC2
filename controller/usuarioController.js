const express = require('express');
const router = express.Router();

const Usuario = require('../Model/usuario');


router.post('/', async (req, res) => {
    const { nome, email } = req.body;

    const usuario = {
        nome, email
    }
    try {
        await Usuario.create(usuario);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/', async (req, res) => {
    try {
        const usuario = await Usuario.find();
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ _id: req.params.id });
        if (!usuario) {
            res.status(422).json({ mensagem: "Usuario não encontrado" });
            return;
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await Usuario.findOne({ _id: id });
        if (!usuario) {
            res.status(422).json({ mensagem: "Usuario não encontrado" });
            return;
        }
        await Usuario.deleteOne({ _id: id });
        res.status(200).json({ mensagem: "Excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


module.exports = router;