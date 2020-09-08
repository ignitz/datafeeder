const { Model, DataTypes } = require("sequelize");

class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        website: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "companies",
      },
    );
  }

  static associate(models) {
    this.belongsToMany(
      models.User,
      { foreignKey: "company_id", through: "users_companies", as: "users" },
    );
  }
}

module.exports = Company;
