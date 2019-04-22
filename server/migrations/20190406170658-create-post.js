export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('Posts', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING
    },
    body: {
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
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    approved: {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.BOOLEAN,
    },
    approvedBy: {
      allowNull: true,
      type: Sequelize.UUID
    },
    edited: {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.BOOLEAN,
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
}
export function down(queryInterface, Sequelize) {
  return queryInterface.dropTable('Posts');
}
