const joi = require("joi");

const insertEstudiante = joi.object({
    primer_nombre: joi.string().min(2).max(50).empty().required(),
    segundo_nombre: joi.string().min(2).max(50).empty().required(),
    primer_apellido: joi.string().min(2).max(50).empty().required(),
    segundo_apellido: joi.string().min(2).max(50).empty().required(),
    carrera : joi.string().min(2).max(50).empty().required(),
    nivel : joi.number().integer().min(1).max(20).empty().required(), 
});

const actualizarEstudiante = joi.object({
    id: joi.string().min(2).max(50).empty().required(),
    primer_nombre: joi.string().min(2).max(50).empty().required(),
    segundo_nombre: joi.string().min(2).max(50).empty().required(),
    primer_apellido: joi.string().min(2).max(50).empty().required(),
    segundo_apellido: joi.string().min(2).max(50).empty().required(),
    carrera : joi.string().min(2).max(50).empty().required(),
    nivel : joi.number().integer().min(1).max(20).empty().required(), 
});

module.exports = {
    insertEstudiante,
    actualizarEstudiante,
};