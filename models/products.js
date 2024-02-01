const Sequelize = require('sequelize');
const db = require('./index')


const Products = db.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                message: 'Name is required!'
            }
        }
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notNull: {
                message: 'Price is required!'
            }
        }
    },
    description: {
        type: Sequelize.STRING,
        validate: {
            min: {
                args: 5,
                msg: 'Minimum characters must be 5'
            },
            max: {
                args: 50,
                msg: 'Maximum characters must be 50'
            }
        }
    },
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
});


Products.associate = (models) => {
    Products.belongsTo(models.Category, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false
      },
    });
  };

module.exports = Products;
