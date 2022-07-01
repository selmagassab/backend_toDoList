const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getConsultationById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const previousConsultation = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const deleteConsultationById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const searchConsultation = {
  query: Joi.object().keys({
    search: Joi.string(),
    patientId: Joi.string(),
    motifcs: Joi.string(),
    datecs: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
module.exports = {
  getConsultationById,
  deleteConsultationById,
  searchConsultation,
  previousConsultation,
};
