const socketio = require('socket.io');
const socketAuthorization = require('../middleware/socketAuthorization');
const io = socketio();

const socketApi = {
    io
};

//Socket authorization
io.use(socketAuthorization);

/*
Redis Adapter
 */
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT
}));

io.on('connection', socket => {
    console.log('a user logged in', socket.request.user.name); //özellikle connection yapılmadığı sürece loglamıyor

    socket.on('Selam', () =>{
        console.log('Selam');
    })

});


module.exports = socketApi;