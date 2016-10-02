/// <reference path="../typings/index.d.ts" />

import * as SocketIOStatic from "socket.io";
const socketio: SocketIOStatic = require("socket.io");
import * as http from "http";
import * as fs from "fs";

let server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(fs.readFileSync('./dist/chat.html', 'utf-8'));
}).listen(3000);

let io = socketio.listen(server);
io.sockets.on('connection', (socket) => {
    socket.on('c2s_message', (data:any) => {
        console.log('c2s_message:' + data);
        io.sockets.emit('s2c_message', {value:data.value});
    });

    socket.on('c2s_broadcast', (data:any) => {
        console.log('c2s_broadcast:' + data);
        socket.broadcast.emit('s2c_message', {value:data.value});
    });
});
