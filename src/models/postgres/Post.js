const { Model, DataTypes } = require("sequelize");

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        keywords: DataTypes.STRING,
        content: DataTypes.STRING,
        ip: DataTypes.STRING,
        mac: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "posts",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

module.exports = Post;
