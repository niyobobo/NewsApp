export default (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    postHeader: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'postHeader is required',
      },
    },
    postContent: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'postContent is required',
      },
    },
    media: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'media is required',
      },
    },
    slug: DataTypes.STRING,
    author: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'author is required',
      },
    },
    approvedBy: DataTypes.UUID,
    edited: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN,
    status: DataTypes.STRING,
  }, {});
  Post.associate = (models) => {
    Post.hasMany(models.Post, {
      foreignKey: 'postId',
    });
    Post.hasMany(models.Like, {
      foreignKey: 'postId',
    });
    Post.belongsTo(models.User, {
      foreignKey: 'author',
    });
  };
  return Post;
};
