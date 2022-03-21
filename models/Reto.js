const mongoose = require('mongoose');

const RetoSchema = new mongoose.Schema({
    pregunta: String,
    respuesta: String,
    valor: Number
}, { timestamps: true });

const Reto = mongoose.model('Reto', RetoSchema);

module.exports = Reto;
