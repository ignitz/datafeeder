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
      models.Person,
      { foreignKey: "company_id", through: "persons_companies", as: "persons" },
    );
  }
}

module.exports = Company;
