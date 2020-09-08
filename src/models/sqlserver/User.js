const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        cpf: DataTypes.STRING,
        name: DataTypes.STRING,
        gender: DataTypes.STRING,
        birth_date: DataTypes.DATEONLY,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Address, { foreignKey: "user_id", as: "addresses" });
  }
}

module.exports = User;
