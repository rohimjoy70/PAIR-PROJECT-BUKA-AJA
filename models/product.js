'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Store)
    }
    rupiah(number){
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number)
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    imageURL: DataTypes.STRING,
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {args: 1}
      }
    },
    StoreId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};