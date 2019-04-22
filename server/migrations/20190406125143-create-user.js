export function up(queryInterface, Sequelize) {
  return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
      return queryInterface.createTable('Users', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
          primaryKey: true,
          unique: true,
        },
        fullName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        role: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
          references: {
            model: 'Roles',
            key: 'value',
          }
        },
        phoneNumber: {
          type: Sequelize.STRING,
          unique: true,
        },
        profileUrl: {
          type: Sequelize.STRING
        },
        approved: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: false,
        },
        salt: {
          type: Sequelize.STRING(1024),
          allowNull: false,
        },
        hash: {
          type: Sequelize.STRING(1024),
          allowNull: false,
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
    });
}
export function down(queryInterface, Sequelize) {
  return queryInterface.dropTable('Users');
}