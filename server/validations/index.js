import Joi from 'joi';

/**
 *
 * @param {*} data data to be validated.
 * @param {*} res response object.
 * @param {*} schema validation schema.
 * @param {*} next callback to be triggered when no validation error found.
 * @returns {*} return object.
 *
 */
const validate = (data, res, schema, next) => {
  const { error } = Joi.validate(data, schema, ({ abortEarly: false }));
  if (!error) return next();

  const { details } = error;
  const errors = [];
  details.forEach((element) => {
    errors.push(element.message.split('"').join(''));
  });

  return res.status(400).send({
    status: res.statusCode,
    errors,
  });
};

export default validate;
