'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuario.belongsTo(models.Empleado, {
        foreignKey: 'empleadoId',
        targetKey: 'id'
      })
    }
  }
  Usuario.init({
    usuario: DataTypes.STRING,
    password: DataTypes.STRING,
    empleadoId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: async (usuario) => {
        if (usuario.password) {
          const salt = await bcrypt.genSaltSync(10)
          usuario.password = bcrypt.hashSync(usuario.password, salt)
        }
      }
    },
    sequelize,
    modelName: 'Usuario'
  });
  return Usuario;
};