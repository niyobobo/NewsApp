import Joi from 'joi';
import validate from '.';

export default {
  post: (req, res, next) => {
    const schema = {
      title: Joi.string().min(5).required(),
      body: Joi.string().min(20).required(),
      media: Joi.string().uri().required(),
    };
    validate(req.body, res, schema, next);
  },

  update: (req, res, next) => {
    const schema = {
      id: Joi.string().uuid().required(),
      title: Joi.string().min(5).required(),
      body: Joi.string().min(20).required(),
      media: Joi.string().uri().required(),
    };
    validate(req.body, res, schema, next);
  },

  postId: (req, res, next) => {
    const schema = {
      id: Joi.string().uuid().required(),
    };
    validate(req.params, res, schema, next);
  },

  author: (req, res, next) => {
    const schema = {
      username: Joi.string().min(3).required(),
    };
    validate(req.params, res, schema, next);
  },
};
