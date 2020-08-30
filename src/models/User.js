const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        cpf: DataTypes.STRING,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
      },
      { sequelize }
    );
  }
}

module.exports = User;
