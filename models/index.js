const { Sequelize } = require ('sequelize')

const { DB_SERVER, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env

const sequelize = new Sequelize(DB_DATABASE,DB_USERNAME,DB_PASSWORD,{
    host:DB_SERVER,
    dialect:'mssql'
})


const db = {}
db.sequelize = sequelize

module.exports = db