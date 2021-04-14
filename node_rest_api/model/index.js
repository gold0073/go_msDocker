'use strict'

require('dotenv').config()
const Sequelize = require('sequelize')
const env = process.env
const config = require(__dirname + '/../config/')[env.NODE_ENV]
const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db