'use strict';
const {
  Model
} = require('sequelize');
const User = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product)
      this.belongsTo(models.User)
    }
    static category = [
      "Electronics Store",
      "Game Store",
      "Medical Store",
      "Food and Beverage",
      "Funiture Store"
    ]
  }
  Store.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: ' Name is required'
        },
        notEmpty: {
          msg: ' Name is required'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Category is required'
        },
        notEmpty: {
          msg: 'Category is required'
        }
      }
    },
    code: DataTypes.STRING,
    since: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'gender is required'
        },
        notEmpty: {
          msg: 'gender is required'
        },
        isDate:{
          msg : "Invalide Date"
        }
      }
    },
    UserId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Store',
    hooks :{
      beforeCreate(instance, options) {
         instance.code = `---BukaBesok ${instance.category}---`
      }
    }
  });
  return Store;
};