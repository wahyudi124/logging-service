module.exports = (sequelize, Sequelize) => {
    const Log = sequelize.define('rectifier_timeseries', {
        timestamp : {
            type: Sequelize.DATE, 
            defaultValue: Sequelize.NOW 
        },
        data : {
            type: Sequelize.TEXT('long')
        },
    },
    {
        timestamps: false,  // I do want timestamps here
    }
    )

    return Log;
}