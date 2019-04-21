import dotenv from 'dotenv';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

dotenv.config();

export default {
  generateToken: (role, email) => jwt.sign({ role, email }, process.env.JWT_SECRET),

  generateHash: (password, salt) => crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex'),

  verifyToken: async (req, res, next) => {
    const { Authorization } = req.headers;
    if (!Authorization) {
      return res.status(401).send({
        status: res.statusCode,
        error: 'Unauthorized, No token provided'
      });
    }

    try {
      const { email, role } = await jwt.verify(Authorization, process.env.JWT_SECRET);
      req.user = { email, role };
      next();
    } catch (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'Invalid token'
      });
    }
  }
};
