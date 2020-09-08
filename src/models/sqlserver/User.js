const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        cpf: DataTypes.STRING,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        gender: DataTypes.STRING,
        birth_date: DataTypes.DATEONLY,
      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Address, { foreignKey: "user_id", as: "addresses" });
    this.belongsToMany(
      models.Company,
      { foreignKey: "user_id", through: "users_companies", as: "companies" },
    );
  }
}

module.exports = User;
