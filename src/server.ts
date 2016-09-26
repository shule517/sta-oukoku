/// <reference path="../typings/index.d.ts" />
let http = require('http');
let socketio = require('socket.io');
let fs = require('fs');

let server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(fs.readFileSync('./dist/chat.html', 'utf-8'));
}).listen(3000);

let io = socketio.listen(server);

io.sockets.on('connection', (socket) => {
    socket.on('c2s_message', (data) => {
        console.log('c2s_message:' + data);
        io.sockets.emit('s2c_message', {value:data.value});
    });

    socket.on('c2s_broadcast', (data) => {
        console.log('c2s_broadcast:' + data);
        socket.broadcast.emit('s2c_message', {value:data.value});
    });
});
