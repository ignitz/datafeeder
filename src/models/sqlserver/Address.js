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
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

module.exports = Address;
