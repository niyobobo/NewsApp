import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.DIALECT,
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.DIALECT,
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.DIALECT,
    logging: false,
  },
};
