import models from '../models';

const { Role } = models;

const roles = {
  /**
  *
  * @param {*} req Request object containing name and value.
  * @param {*} res Response object
  * @returns {*} data (error/response).
  *
  */
  createRole: async (req, res) => {
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
        error: error.name,
      });
    }
  },

  /**
   * Retrieving all roles information.
   *
   * @param {*} req
   * @param {*} res Array response of all roles.
   * @returns {*} return data.
   */
  viewAllRole: async (req, res) => {
    try {
      const allRole = await Role.findAll();
      return res.status(200).send({
        status: res.statusCode,
        data: allRole,
      });
    } catch (error) {
      return res.status(500).send({
        status: res.statusCode,
        error,
      });
    }
  },

  /**
   * Deleting Role.
   *
   * @param { id } req  RoleId from request params of needed Role.
   * @param {*} res     Confirmation message that Role deleted.
   * @returns {*} return data.
   */
  deleteRole: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await Role.destroy({ where: { id } });
      return data > 0
        ? res.status(200).send({
          status: res.statusCode,
          message: 'Role deleted successfully',
        })
        : res.status(400).send({
          status: res.statusCode,
          message: 'No role found for the provided id',
        });
    } catch (error) {
      return res.status(500).send({
        status: res.statusCode,
        error,
      });
    }
  },
};

export default roles;
