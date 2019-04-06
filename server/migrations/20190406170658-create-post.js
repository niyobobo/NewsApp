'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      postId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.lateral('uuid_generate_v4()'),
      },
      postHeader: {
        allowNull: false,
        type: Sequelize.STRING
      },
      postContent: {
        allowNull: false,
        type: Sequelize.STRING
      },
      media: {
        allowNull: false,
        type: Sequelize.STRING
      },
      slug: {
        allowNull: false,
        type: Sequelize.STRING
      },
      author: {
        allowNull: false,
        type: Sequelize.UUID
      },
      approvedBy: {
        allowNull: false,
        type: Sequelize.UUID
      },
      edited: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      deleted: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      status: {
        allowNull: false,
        defaultValue: 'Pending',
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Posts');
  }
};