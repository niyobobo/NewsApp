import models from '../models';

const { Role } = models;

const roles = {
  async createRole(req, res) {
    const { value, name } = req.body;
    try {
      const roleData = await Role.create({ value, name });
      return res.status(201).send({
        status: res.statusCode,
        data: roleData,
      });
    } catch (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: error.errors[0].message,
      });
    }
  },
}

export default roles;
