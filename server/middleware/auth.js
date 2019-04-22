import dotenv from 'dotenv';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

dotenv.config();

export default {
  generateToken: (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET),

  generateHash: (password, salt) => crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex'),

  verifyToken: async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({
        status: res.statusCode,
        error: 'Unauthorized, No token provided'
      });
    }

    try {
      const token = authorization.split(' ')[1];
      const { id, role } = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id, role };
      next();
    } catch (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'Provided token is invalid'
      });
    }
  }
};
