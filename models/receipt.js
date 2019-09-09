'use strict';
module.exports = (sequelize, DataTypes) => {
  const Receipt = sequelize.define('Receipt', {
    image: DataTypes.STRING,
    observation: DataTypes.TEXT,
    status: DataTypes.INTEGER
  }, {});
  Receipt.associate = function(models) {
    // associations can be defined here
  };
  return Receipt;
};