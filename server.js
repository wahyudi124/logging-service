const db = require('./app/config/db.config.js');

const Latest_rectifier = db.rectifier_latest;
const Log_rectifier = db.rectifier_timeseries;

const Latest_ups = db.ups_latest;
const Log_ups = db.ups_timeseries;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const io = require('socket.io-client')
socket = io.connect('http://localhost:5001', {
    transports : ['websocket']
});

socket.on('connect', function () { console.log("socket connected"); });

// db.sequelize.sync({force: false}).then(() => {
//   console.log('Drop and Resync with { force: true }');
// });


socket.on('rectifier_datas', async (datas) => {
    var data = JSON.parse(datas);
    await updateValue(data,Latest_rectifier,Log_rectifier)
})

socket.on('ups_datas', async (datas) => {
    var data = JSON.parse(datas);
    await updateValue(data,Latest_ups,Log_ups)
})


const updateValue = (data,latesdb,logdb) =>{
    Promise.all(data.newValue.map(data => {
        latesdb.update({value : data.value},
        {where : {id_profile : data.id_profile,
                 var_name : data.var_name
                }
        })}))
        .then( () => {
            logdb.create({
                id_profile : data.id_profile,
                data : JSON.stringify(data.newValue)
            }).then( () => {
                console.log("Log Create");
            })
        })
        .catch( err => {
            console.log("Log Error");
        })
}