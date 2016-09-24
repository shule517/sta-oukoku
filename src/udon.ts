export default class Udon extends createjs.Container {
    private bitmap: createjs.Bitmap;
    constructor() {
        super();
        this.bitmap = new createjs.Bitmap('./img/udon.png');
        this.addChild(this.bitmap);
        this.x = 100;
        this.y = 100;

        this.bitmap.addEventListener("click", (event) => {
            const time = 70;
            const jumpHeight = 100;
            createjs.Tween.get(this, {loop:false})
                .to({y: this.y - jumpHeight}, time, createjs.Ease.circOut)
                .to({y: this.y}, time*2, createjs.Ease.circOut)
                .to({y: this.y - jumpHeight}, time, createjs.Ease.circOut)
                .to({y: this.y}, time*2, createjs.Ease.circOut);
        });
    }
}
