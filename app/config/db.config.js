const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.rectifier_latest = require('../model/rectifier/rectifier_latest.model.js')(sequelize,Sequelize)
db.rectifier_timeseries = require('../model/rectifier/rectifier_timeseries.model.js')(sequelize,Sequelize)

db.ups_latest = require('../model/ups/ups_latest.model.js')(sequelize,Sequelize)
db.ups_timeseries = require('../model/ups/ups_timeseries.model.js')(sequelize,Sequelize)

db.rectifier_latest = require('../model/rectifier/rectifier_latest.model.js')(sequelize,Sequelize)
db.rectifier_timeseries = require('../model/rectifier/rectifier_timeseries.model.js')(sequelize,Sequelize)

db.battery_latest = require('../model/battery/battery_latest.model.js')(sequelize,Sequelize)
db.battery_timeseries = require('../model/battery/battery_timeseries.model.js')(sequelize,Sequelize)

db.pdu_latest = require('../model/pdu/pdu_latest.model.js')(sequelize,Sequelize)
db.pdu_timeseries = require('../model/pdu/pdu_timeseries.model.js')(sequelize,Sequelize)


db.sensor_latest = require('../model/sensor/sensor_latest.model.js')(sequelize,Sequelize)
db.sensor_timeseries = require('../model/sensor/sensor_timeseries.model.js')(sequelize,Sequelize)


db.io_latest = require('../model/io/io_latest.model.js')(sequelize,Sequelize)
db.io_timeseries = require('../model/io/io_timeseries.model.js')(sequelize,Sequelize)

module.exports = db;