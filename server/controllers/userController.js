import models from '../models';
import auth from '../middleware/auth';

const { User } = models;

const userController = {
  signUp: async (req, res) => {
    const { fullName, email, password: hash } = req.body;
    const username = `${fullName}`.split(' ').join('-').toLowerCase().substring(0, 15);
    try {
      const existingUser = await User.findOne({ where: { email } || { username } });
      if (existingUser) {
        if (existingUser.email === email) {
          return res.status(400).send({
            status: res.statusCode,
            message: 'User with this email already exists',
          });
        }
        if (existingUser.username === username) {
          return res.status(400).send({
            status: res.statusCode,
            message: 'User with this username already exists',
          });
        }
      }
      const user = await User.create({
        fullName, username, email, hash,
      });
      return res.status(201).send({
        status: res.statusCode,
        user: {
          fullName: user.fullName,
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          profileUrl: user.profileUrl,
        },
      });
    } catch (error) {
      return res.status(500).send({
        status: res.statusCode,
        message: 'Internal server error'
      });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).send({
          status: res.statusCode,
          message: 'Invalid account with this email'
        });
      }
      const {
        id, role, hash, salt
      } = user;
      const hashedpass = auth.generateHash(password, salt);

      if (hash !== hashedpass) {
        return res.status(400).send({
          status: res.statusCode,
          message: 'Incorrect password'
        });
      }

      const token = auth.generateToken(id, role);
      return res.status(200).send({
        status: res.statusCode,
        token,
        user: {
          fullName: user.fullName,
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          profileUrl: user.profileUrl,
        },
      });
    } catch (error) {
      return res.status(500).send({
        status: res.statusCode,
        message: 'Internal server error'
      });
    }
  },

  forgetPassword: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).send({
          status: res.statusCode,
          message: 'No account associated to this email'
        });
      }
      // handle sending email and token;
    } catch (error) {
      return res.status(500).send({
        status: res.statusCode,
        message: 'Internal server error'
      });
    }
  },

  resetPassord: async (req, res) => {
    const { password: hash } = req.body;
    // handle resetting password.
  },
};

export default userController;
