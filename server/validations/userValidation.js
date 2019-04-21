import Joi from 'joi';
import validate from '.';

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
