'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content:{type : DataTypes.STRING, required: true},
    attachement: DataTypes.STRING,
  },
    {});
  Post.associate = function (models) {
    
    models.Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return Post;
};