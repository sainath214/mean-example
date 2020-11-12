require('dotenv-expand')(require('dotenv').config());
var User = db.sequelize.define('users', {

    userId: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: db.Sequelize.STRING,
        unique: true,
    },
    password: {
        type: db.Sequelize.STRING
    },
    status: {
        type: db.Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "( 0 - Inactive | 1 - Active )"
    }
}, {
        timestamps: false,
    })

module.exports = User;