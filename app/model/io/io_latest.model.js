module.exports = (sequelize, Sequelize) => {
    const Latest = sequelize.define('io_latest', {
        timestamp : {
            type: Sequelize.DATE, 
            defaultValue: Sequelize.NOW 
        },
        value : {
            type: Sequelize.STRING
        },
    },
    {
        timestamps: false,  // I do want timestamps here
    }
    
    )

    return Latest;
}

