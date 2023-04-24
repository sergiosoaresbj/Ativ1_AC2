const mongoose = require('mongoose');
const Tarefa = mongoose.model('Tarefa',{
    nome: String,
    descricao: String,
    atribuido: String
});
module.exports = Tarefa;