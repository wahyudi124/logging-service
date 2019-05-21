const db = require('./app/config/db.config.js');

const Latest_rectifier = db.rectifier_latest;
const Log_rectifier = db.rectifier_timeseries;

const Latest_ups = db.ups_latest;
const Log_ups = db.ups_timeseries;

const Latest_pdu = db.pdu_latest;
const Log_pdu = db.pdu_timeseries;

const Latest_battery = db.battery_latest;
const Log_battery = db.battery_timeseries;

const Latest_io = db.io_latest;
const Log_io = db.io_timeseries;

const Latest_aircond = db.aircond_latest;
const Log_aircond = db.aircond_timeseries;

const Latest_sensor = db.sensor_latest;
const Log_sensor = db.sensor_timeseries;

const io = require('socket.io-client')
socket = io.connect('http://localhost:5001', {
    transports : ['websocket']
});

socket.on('connect', function () { console.log("socket connected"); });

// db.sequelize.sync({force: false}).then(() => {
//   console.log('Drop and Resync with { force: true }');
// });

socket.emit('join_room','room_ups')
socket.emit('join_room','room_rectifier')
socket.emit('join_room','room_pdu')
socket.emit('join_room','room_battery')
socket.emit('join_room','room_aircond')
socket.emit('join_room','room_gpio_monitor')
socket.emit('join_room','room_sensor')


socket.on('pdu_datas', async (datas) => {                   
    var data = JSON.parse(datas);
    await updateValue(data,Latest_pdu,Log_pdu)
})

socket.on('battery_datas', async (datas) => {               
    var data = JSON.parse(datas);
    await updateValue(data,Latest_battery,Log_battery)
})

socket.on('rectifier_datas', async (datas) => {
    var data = JSON.parse(datas);
    await updateValue(data,Latest_rectifier,Log_rectifier)
})

socket.on('ups_datas', async (datas) => {
    var data = JSON.parse(datas);
    await updateValue(data,Latest_ups,Log_ups)
})

socket.on('aircond_datas', async (datas) => {
    var data = JSON.parse(datas);
    await updateValue(data,Latest_aircond,Log_aircond)
})

socket.on('sensor_datas', async (datas) => {
    var data = JSON.parse(datas);
    await updateValue(data,Latest_sensor,Log_sensor)
})

socket.on('gpio_datas', async (datas) => {
    var data = JSON.parse(datas);
    await updateValue(data,Latest_io,Log_io)
})

socket.on('control_datas', async(datas) => {
    var data =JSON.parse(datas);
    await controlValue(data,Latest_io,Log_io,Latest_pdu,Log_pdu)
})


const controlValue = (data,iolatesdb,iologdb,pdulatestdb,pdulogdb) =>{
    Promise.all(data.newValue.map(data => {
        if(data.type === 'GPIO') {
        iolatesdb.update({value : data.value},
        {where : {id_profile : data.id_profile,
                 var_name : data.var_name
                }
        })
        }
        else if (data.type === 'PDU'){
        pdulatestdb.update({value : data.value},
            {where : {id_profile : data.id_profile,
                        var_name : data.var_name
                    }
            })
        } 
        }))
        .then( () => {
            if(data.type === 'GPIO') {
            iologdb.create({
                id_profile : data.id_profile,
                data : JSON.stringify(data.newValue)
            }).then( () => {
                console.log("Log Create");
            })
            }
            else if(data.type === 'PDU'){
            pdulogdb.create({
                id_profile : data.id_profile,
                data : JSON.stringify(data.newValue)
            }).then( () => {
                console.log("Log Create");
            })
            }


        })
        .catch( err => {
            console.log("Log Error");
        })
}

const updateValue = (data,latesdb,logdb) =>{
    Promise.all(data.newValue.map(data => {
        latesdb.update({value : data.value},
        {where : {id_profile : data.id_profile,
                 var_name : data.var_name
                }
        })}))
        .then( () => {
            
            var newValue = []
            
            data.newValue.map(d=>{
                 newValue.push({
                     "id" : d.id,
                     "value" : d.value
                 })
            })
            logdb.create({
                id_profile : data.newValue[0].id_profile,
                data : JSON.stringify(newValue)
                //old format JSON.stringify(data.newValue)
            }).then( () => {
                console.log("Log Create");
            })
        })
        .catch( err => {
            console.log("Log Error");
        })
}