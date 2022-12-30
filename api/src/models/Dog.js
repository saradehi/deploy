const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    height_min: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height_max: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height: {
      type: DataTypes.STRING
    },
    weight_min: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight_max: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.STRING
    },
    life_span: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    // temperament: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // }
  },
  {
    timestamps: false
  });
};