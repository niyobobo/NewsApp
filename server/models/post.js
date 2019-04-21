export default (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'title is required',
      },
    },
    body: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'body is required',
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
      type: DataTypes.UUID,
      allowNull: {
        args: false,
        msg: 'author is required',
      },
    },
    approved: DataTypes.BOOLEAN,
    approvedBy: DataTypes.UUID,
    edited: DataTypes.BOOLEAN,
  }, {});
  Post.associate = (models) => {
    Post.hasMany(models.Comment, {
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
