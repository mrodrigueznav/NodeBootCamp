'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Usuario.belongsTo(models.Empleado, {
      //   foreignKey: 'empleadoId',
      //   targetKey: 'id'
      // })
    }
  }
  Usuario.init({
    usuario: DataTypes.STRING,
    password: DataTypes.STRING,
    empleadoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};