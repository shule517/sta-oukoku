/// <reference path="../typings/index.d.ts" />

import * as express from "express";
import * as socketio from "socket.io";

//var path = express.static(__dirname + '../dist');
let path = express.static('S:/dev/git/sta-oukoku/dist/');
let app = express();
app.use(path);

const port = 3000;
let server = app.listen(port);
console.log('server starting:' + port);

let io = socketio.listen(server);

//let charaId = 0;

class Chara {
    constructor(public id, public x, public y) {
    }
}

let charas: Chara[] = [];
let charaId: number = 0;

io.sockets.on('connection', (socket) => {

    // キャラID生成
    //charaId++;
    //socket.emit('get_id', charaId);
    console.log('socket.id:' + socket.id);

    // キャラID通知
    socket.emit('get_id', charaId);

    // 既存キャラ通知
    for (let chara of charas) {
        socket.emit('chara_add', chara);
    };

    // 新規キャラ通知
    charas[charaId] = {id: charaId, x: 100, y: 100};
    charaId++;

    socket.on('udon_click', (data:any) => {
        console.log('udon_click:' + data);
        socket.broadcast.emit('udon_click', {value:data.value});
    });

    socket.on('chara_move', (data:any) => {
        console.log('chara_move(id:' + data.id + ', x:' + data.x + ', y:' + data.y);
        charas[data.id].x = data.x;
        charas[data.id].y = data.y;
        socket.broadcast.emit('chara_move', {id: data.id, x: data.x, y: data.y});
    });

    // 自分含まない全員に送信
    // socket.on('c2s_message', (data:any) => {
    //     console.log('c2s_message:' + data);
    //     io.sockets.emit('s2c_message', {value:data.value});
    // });

    // 自分含む全員に送信
    // socket.on('c2s_broadcast', (data:any) => {
    //     console.log('c2s_broadcast:' + data);
    //     socket.broadcast.emit('s2c_message', {value:data.value});
    // });
});
