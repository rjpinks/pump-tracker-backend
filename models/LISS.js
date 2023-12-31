const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class LISS extends Model {}

LISS.init(
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
            defaultValue: Sequelize.NOW,
            allowNull: false,
        },
        activity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: DataTypes.DECIMAL,
            //allowNull: false,
        },
        distance: {
            type: DataTypes.DECIMAL,
            //allowNull: false,
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
        modelName: 'liss',
      }
)

module.exports = LISS;