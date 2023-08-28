const {DataTypes} = require('sequelize');
const sequelize = require('../dbConnector');

const Users = sequelize.define('users',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userName: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    refreshToken: {
        type: DataTypes.STRING
    }
},{
    timestamps: false,
    createdAt: false
});

module.exports = Users;