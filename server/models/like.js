export default (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    postId: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Posts',
        key: 'id',
        as: 'postId',
      },
      allowNull: {
        args: false,
        msg: 'postId is required',
      },
    },
    userId: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
      allowNull: {
        args: false,
        msg: 'userId is required',
      },
    },
    removed: DataTypes.BOOLEAN,
  }, {});
  Like.associate = (models) => {
    Like.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Like.belongsTo(models.Post, {
      foreignKey: 'postId',
      onDelete: 'CASCADE',
    });
  };
  return Like;
};
