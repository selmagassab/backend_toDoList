const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createPatient = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().valid('Male', 'Female'),
    birthdate: Joi.date(),
    email: Joi.string().email(),
    phoneNumber: Joi.number(),
    cin: Joi.number(),
    address: Joi.object().keys({
      country: Joi.string(),
      governorates: Joi.string(),
      subdivision: Joi.string(),
      address: Joi.string(),
      postalCode: Joi.number(),
    }),
    assured: Joi.boolean(),
    insurancePlan: Joi.object().keys({
      cnam: Joi.object().keys({
        num: Joi.string().required(),
        dateValidation: Joi.date().required(),
        filliere: Joi.string().required().valid('public', 'prive', 'remboursement'),
      }),
      other: Joi.string(),
    }),
    patientConsultations: Joi.array(),
  }),
};

const createPatientWithConsultaion = {
  body: Joi.object().keys({
    patientData: Joi.object().allow({}).required(),
    patient: Joi.string().required(),
  }),
};
const createPatientWithAppointment = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().valid('Male', 'Female'),
    birthdate: Joi.date(),
    email: Joi.string().email(),
    phoneNumber: Joi.number(),
    cin: Joi.number(),
    address: Joi.object().keys({
      country: Joi.string(),
      governorates: Joi.string(),
      subdivision: Joi.string(),
      address: Joi.string(),
      postalCode: Joi.number(),
    }),
    assured: Joi.boolean().required(),
    insurancePlan: Joi.object().keys({
      cnam: Joi.object().keys({
        num: Joi.string().required(),
        dateValidation: Joi.date().required(),
        filliere: Joi.string().required().valid('public', 'prive', 'remboursement'),
      }),
      other: Joi.string(),
    }),
    patientConsultations: Joi.array(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  }),
};
const getPatients = {
  query: Joi.object().keys({
    search: Joi.string().allow(''),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPatient = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updatePatient = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      userName: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      firstName: Joi.string(),
      lastName: Joi.string(),
      gender: Joi.string(),
      birthdate: Joi.date(),
      address: Joi.object().keys({
        country: Joi.string(),
        governorates: Joi.string(),
        subdivision: Joi.string(),
        address: Joi.string(),
        postalCode: Joi.number(),
      }),
      phoneNumber: Joi.number(),
      assured: Joi.boolean(),
      insurancePlan: Joi.object().keys({
        cnam: Joi.object().keys({
          num: Joi.string().required(),
          dateValidation: Joi.date().required(),
          filliere: Joi.string().required().valid('public', 'prive', 'remboursement'),
        }),
        other: Joi.string(),
      }),
    })
    .min(1),
};

module.exports = {
  createPatient,
  createPatientWithAppointment,
  getPatients,
  getPatient,
  updatePatient,
  createPatientWithConsultaion,
};
