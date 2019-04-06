export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    postId: {
      type: DataTypes.UUID,
      references: {
        model: 'Posts',
        key: 'postId',
        as: 'postId',
      },
      allowNull: {
        args: false,
        msg: 'postId is required',
      },
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'userId',
        as: 'userId',
      },
      allowNull: {
        args: false,
        msg: 'userId is required',
      },
    },
    removed: DataTypes.BOOLEAN,
  }, {});
  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
      onDelete: 'CASCADE',
    });
  };
  return Comment;
};
