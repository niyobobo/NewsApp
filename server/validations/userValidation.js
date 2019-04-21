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
function validate(data, res, schema, next) {
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
}

export default {
  user: (req, res, next) => {
    const schema = {
      fullName: Joi.string().trim().required(),
      email: Joi.string().email().trim().required(),
      password: Joi.string().trim().required(),
    };
    validate(req.body, res, schema, next);
  },

  login: (req, res, next) => {
    const schema = {
      email: Joi.string().email().trim().required(),
      password: Joi.string().trim().required(),
    };
    validate(req.body, res, schema, next);
  },

  email: (req, res, next) => {
    const schema = {
      email: Joi.string().email().required(),
    };
    validate(req.body, res, schema, next);
  },

  reset: (req, res, next) => {
    const schema = {
      password: Joi.string().min(8).required(),
      confirmation: Joi.any().valid(Joi.ref('password')).required()
        .options({ language: { any: { allowOnly: 'and password not match' } } }),
    };
    validate(req.body, res, schema, next);
  }
};
