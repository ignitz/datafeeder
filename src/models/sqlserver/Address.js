const { Model, DataTypes } = require("sequelize");

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        country: DataTypes.STRING,
        countryCode: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
        street: DataTypes.STRING,
        zipcode: DataTypes.STRING,
        latitude: DataTypes.DOUBLE,
        longitude: DataTypes.DOUBLE,
      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Person, { foreignKey: "person_id", as: "person" });
  }
}

module.exports = Address;
