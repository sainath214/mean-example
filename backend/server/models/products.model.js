require('dotenv-expand')(require('dotenv').config());
var Products = db.sequelize.define('products', {
    productId: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: db.Sequelize.STRING
    },
    description: {
        type: db.Sequelize.TEXT
    },
    price: {
        type: db.Sequelize.FLOAT,
        allowNull: false,
        defaultValue: false

    },
    image: {
        type: db.Sequelize.STRING,
        allowNull: true,
    },
    status: {
        type: db.Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "( 0 - Inactive | 1 - Active )"
    }
}, {
        timestamps: false,
        getterMethods:{
            imagePath() {
                return this.image ? "server/uploads/" + this.profilepic : '';
                
            }
        }
    })

module.exports = Products;