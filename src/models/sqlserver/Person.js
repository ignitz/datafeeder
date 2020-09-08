const { Model, DataTypes } = require("sequelize");

class Person extends Model {
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
        tableName: "persons",
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Address, { foreignKey: "person_id", as: "addresses" });
    this.belongsToMany(
      models.Company,
      {
        foreignKey: "person_id",
        through: "persons_companies",
        as: "companies",
      },
    );
  }
}

module.exports = Person;
