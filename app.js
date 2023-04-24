const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const usuarioController = require('./controller/usuarioController');
app.use('/usuario', usuarioController);

const tarefaController = require('./controller/tarefaController');
app.use('/tarefa', tarefaController);

mongoose.connect('mongodb+srv://sergiosoaresb:1AY3sLSRGAQrJbvD@cluster0.lwnkibs.mongodb.net/?retryWrites=true&w=majority').then(() => {
        app.listen(3000, () => {
            console.log('Conectado ao mongoDB');
            console.log('Servidor iniciado na porta 3000.');
        })
    })
    .catch((err) => {
        console.log(err);
    });