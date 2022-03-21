const mongoose = require('mongoose');

const RetoSchema = new mongoose.Schema({
    pregunta: String,
    respuesta: [],
    valor: Number
}, { timestamps: true });

const Reto = mongoose.model('Reto', RetoSchema);

module.exports = Reto;
