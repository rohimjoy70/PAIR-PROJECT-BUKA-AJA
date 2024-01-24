'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile),
      User.hasMany(models.Store)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull :{
          msg: 'Username Is Required'
        },
        notEmpty:{
          msg : 'Username Is Required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull :false,
      validate :{
        notNull : {
          msg : 'Password Is Required'
        },
        notEmpty:{
          msg : 'Password Is Required'
        }
      }
    },
    role: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull :{
          msg : 'Role Is Required'
        },
        notEmpty:{
          msg : 'Role Is Required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate(instance, options){
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(instance.password, salt);
          instance.password = hash
      }
    }
  });
  return User;
};