const Sequelize = require('sequelize')
const db = require('./index')

const User = db.define('user', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                message:'Name is required!'
            }
        }
    },
    lastname:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                message:'Lastname is required!'
            }
        }
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                message:'Email is required!'
            }
        }
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notNull:{
                message:'Password is required!'
            }
        }
    }

})


module.exports = User;