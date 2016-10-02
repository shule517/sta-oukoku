/// <reference path="../typings/index.d.ts" />
import Udon from './udon';
import Statu from './statu';

window.onload = () => {
    let myCharaId = 0;
    let stage = new createjs.Stage("canvasElement");
    let ioSocket = io.connect( "http://localhost:3000" ); // チャットサーバーに接続

    let map = new createjs.Bitmap('./img/map.png');
    map.y = 30;
    stage.addChild(map);

    let udon = new Udon(ioSocket);
    stage.addChild(udon);
    stage.enableMouseOver();
    // stage.addEventListener("click", (event:any) => {
    //     alert(`(x, y) = (${stage.mouseX}, ${stage.mouseY})`);
    // });
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", () => {
        stage.update();
    });

    stage.addEventListener("click", (event: any) => {
        //alert('x:' + event.stageX + ' y:' + event.stageY);
        let x = event.stageX;
        let y = event.stageY;
        ioSocket.emit( "chara_move", { id:myCharaId, x: x, y: y });
        udon.move(x, y)
    });

    // サーバーからのデータ受け取り処理
    ioSocket.on( "connect", function() { ioSocket.emit( "c2s_message", { value : 'message' }); } ); // 接続
    ioSocket.on( "disconnect", function() {} ); // 切断

    var t = new createjs.Text("Hello World!", "24px serif", "DarkRed");
    stage.addChild(t);

    ioSocket.on( "get_id", function(charaId) {
        myCharaId = charaId;
        t.text = 'id:' + charaId;
    });

    let charas: Statu[] = [];
    ioSocket.on("chara_add", function(data) {
        console.log('chara_add id:' + data.id, ' x:' + data.x + ' y:' + data.y);
        let statu = new Statu(ioSocket, data.id);
        statu.x = data.x;
        statu.y = data.y;
        charas[data.id] = statu;
        stage.addChild(statu);
    });
    ioSocket.on( "chara_move", function(data) {
        //udon.move(data.x, data.y);
        console.log('chara_move id:' + data.id + 'x:' + data.x + 'y:' + data.y);
        if (charas[data.id] === null) {
            let statu = new Statu(ioSocket, data.id);
            charas[data.id] = statu;
            stage.addChild(statu);
        }
        charas[data.id].move(data.x, data.y);
    });
    ioSocket.on( "udon_click", function(data) {
        /*appendMessage( data.value )*/ 
        udon.click();
        console.log(data.value);
    });
};
