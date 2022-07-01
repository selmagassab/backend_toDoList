const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const { promisifyUpload } = require('../utils/uploadHelper');

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, `Joi: ${errorMessage}`));
  }
  Object.assign(req, value);
  return next();
};

const validFormData = (schema) => async (req, res, next) => {
  const [fields, files] = await promisifyUpload(req);
  const object = { body: { ...JSON.parse(fields.body[0]), files } };

  const validSchema = pick(schema, ['params', 'query', 'body']);
  // const object = pick(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    // return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    return next(new ApiError(httpStatus.BAD_REQUEST, `Joi: ${errorMessage}`));
  }
  Object.assign(req, value);
  return next();
};

module.exports = { validate, validFormData };
