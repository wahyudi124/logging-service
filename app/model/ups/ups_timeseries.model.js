module.exports = (sequelize, Sequelize) => {
    const Log = sequelize.define('ups_timeseries', {
        timestamp : {
            type: Sequelize.DATE, 
            defaultValue: Sequelize.NOW 
        },
        data : {
            type: Sequelize.TEXT('long')
        },
        id_profile : {
            type : Sequelize.INTEGER
        }
    },
    {
        timestamps: false,  // I do want timestamps here
    }
    )

    return Log;
}