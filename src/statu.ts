/// <reference path="../typings/index.d.ts" />
export default class Statu extends createjs.Container {
    private bitmap: createjs.Bitmap;
    private charaId: Number;
    constructor(ioSocket: SocketIOClient.Socket, charaId) {
        super();
        this.charaId = charaId;
        this.bitmap = new createjs.Bitmap('./img/stamp6.png');
        this.addChild(this.bitmap);
        //this.x = 100;
        //this.y = 100;
        this.scaleX /= 2;
        this.scaleY /= 2;
        this.regX = this.getBounds().width / 2;
        this.regY = this.getBounds().height / 2;

        this.bitmap.addEventListener("click", (event) => {
            ioSocket.emit( "udon_click", { value : 'message' });

            const time = 70;
            const jumpHeight = 100;
            createjs.Tween.get(this, {loop:false})
                .to({y: this.y - jumpHeight}, time, createjs.Ease.circOut)
                .to({y: this.y}, time*2, createjs.Ease.circOut)
                .to({y: this.y - jumpHeight}, time, createjs.Ease.circOut)
                .to({y: this.y}, time*2, createjs.Ease.circOut);
        });
    }

    click() {
        const time = 70;
        const jumpHeight = 100;
        createjs.Tween.get(this, {loop:false})
            .to({y: this.y - jumpHeight}, time, createjs.Ease.circOut)
            .to({y: this.y}, time*2, createjs.Ease.circOut)
            .to({y: this.y - jumpHeight}, time, createjs.Ease.circOut)
            .to({y: this.y}, time*2, createjs.Ease.circOut);
    }

    move(x, y) {
        const time = 200;
        createjs.Tween.get(this, {loop:false})
            .to({x: x, y: y}, time, createjs.Ease.circOut);
    }
}
