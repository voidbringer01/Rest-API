const Sequelize = require('sequelize')
const db = require('./index')


const Employees = db.define("employees", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    zipcode: {
        type: Sequelize.STRING
    },
    street: {
        type: Sequelize.STRING
    },
    date_of_birth: {
        type: Sequelize.DATEONLY
    },
});
    
module.exports = Employees