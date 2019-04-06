'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.INTEGER
      },
      phone_number: {
        type: Sequelize.STRING
      },
      profile_url: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      handle: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      salt: {
        type: Sequelize.STRING
      },
      hash: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};