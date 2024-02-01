const Sequelize = require('sequelize');


const sequelize = new Sequelize("mydb", "root", "", {
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    define: {
        timestamps: false
    }
});


sequelize.sync().then(() => {
    console.log('Connected to the database!');
  }).catch(err => console.log(err));
  

module.exports = sequelize;