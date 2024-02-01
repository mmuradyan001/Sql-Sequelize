const Sequelize = require('sequelize');
const db = require('./index')


const Category = db.define('category', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

Category.associate = (models) => {
    Category.hasMany(models.Products, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false
      },
    });
  };



module.exports = Category;
