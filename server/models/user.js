'use strict';
const {
  Model
} = require('sequelize');

const {hashPass} = require("../helpers/bcrypt")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Email is required`
        },
        isEmail: {
          msg: `Email not valid`
        },
        notNull: {
          msg: "Email cannot be NULL"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Password is required`
        },
        notNull: {
          msg: "Password is required"
        },
        len: {
          args: 8,
          msg: "Password minimal 8 characters"
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Location cannot be NULL"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance) {
        instance.password = hashPass(instance.password)
      }
    }
  });
  return User;
};