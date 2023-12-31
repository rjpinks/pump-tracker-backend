const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class Strength extends Model {}

Strength.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        date: {
            type: DataTypes.DATE,
            default: Date.now,
            allowNull: false,
        },
        activity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reps: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        satisfaction: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        remarks: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profile_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'profile',
              key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'strength',
      }
)

module.exports = Strength;