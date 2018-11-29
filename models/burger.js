'use strict';
module.exports = (sequelize, DataTypes) => {
  // here we are defining a map between the model and table
  // the attributes of createdAt and updatedAt are automatically added
  // 'Burger' in orange after .define is the model name
  const Burger = sequelize.define('Burger', {
    burger: {
      type: DataTypes.STRING,
      allowNull: false
    },  
      
    devoured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Burger.associate = function(models) {
    // associations can be defined here
  };

  return Burger;
};