'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }

    get datebirth(){
      const dated = new Date(this.dateOfBirth).toISOString().split("T")[0]
      return dated
    }
  }
  Profile.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First name is required'
        },
        notEmpty: {
          msg: 'First name is required'
        }
      }
    },
    lastName: DataTypes.STRING,

    phoneNumber: DataTypes.INTEGER,
    
    gender: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'gender is required'
        },
        notEmpty: {
          msg: 'gender is required'
        },
        isIn: {
         args : ['male', 'female'],
         msg : "Invalid Gender"
        }
      }
    },

    dateOfBirth:{
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
    UserId: DataTypes.INTEGER,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'gender is required'
        },
        notEmpty: {
          msg: 'gender is required'
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};