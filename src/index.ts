/// <reference path="../typings/index.d.ts" />
import Udon from './udon';

window.onload = () => {
    let stage = new createjs.Stage("canvasElement");

    let udon = new Udon();
    stage.addChild(udon);

    stage.enableMouseOver();
    // stage.addEventListener("click", (event:any) => {
    //     alert(`(x, y) = (${stage.mouseX}, ${stage.mouseY})`);
    // });
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", () => {
        stage.update();
    });
};
