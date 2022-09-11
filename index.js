var iW = 0, iH = 0, dW = 0, dH = 0, ibuki, //宣言&初期化
    y = 0, x = 0, //位置、初期化
    k = 15, //速度
    mouse = false, mouseX = 0, mouseY = 0; //マウスの状態
var windowsizeGet = () => { dW = document.documentElement.clientWidth, dH = document.documentElement.clientHeight; }; //ウィンドウサイズ取得の関数
var reflect = () => { //画像の位置を反映させる関数
    if (y > (dH - iH)) { y = dH - iH; };
    if (y < 0) { y = 0; };
    if (x > (dW - iW)) { x = dW - iW; };
    if (x < 0) { x = 0; };
    ibuki.style.top = y + "px";
    ibuki.style.left = x + "px";
};
window.onload = () => {
    windowsizeGet();
    ibuki = document.getElementById('ibuki'); //オフジェクト取得
    iW = ibuki.naturalWidth, iH = ibuki.naturalHeight; //画像サイズ取得
    console.log("Display Size:" + dW + "x" + dH);
    console.log("Image Size" + iW + "x" + iH);

    ibuki.addEventListener("mousedown", dragstart, { passive: false });
    ibuki.addEventListener("touchstart", dragstart, { passive: false });
    addEventListener("mousemove", dragmove, { passive: false });
    addEventListener("touchmove", dragmove, { passive: false });
    addEventListener("mouseup", dragend, { passive: false });
    addEventListener("touchend", dragend, { passive: false });
};
const dragstart = e => { 
    mouse = true;
    //mousedownかtouchstartかを判断し、evの内容を変える(スマホ操作の場合changedTouche[0]に入る)
    if (e.type == "mousedown") { var ev = e; } else { var ev = e.changedTouches[0]; };
    mouseX = ev.clientX - x;
    mouseY = ev.clientY - y;
};
const dragmove = e => {
    if (mouse == true) {
        e.preventDefault();
        //mousemoveかtouchmoveかを判断し、evの内容を変える(スマホ操作の場合changedTouche[0]に入る)
        if (e.type == "mousemove") { var ev = e; } else { var ev = e.changedTouches[0]; };
        x = ev.clientX - mouseX;
        y = ev.clientY - mouseY;
        reflect();
    };
};
const dragend = e => { mouse = false; };
//ウィンドウサイズが変更されたとき、以下のプログラムを実行する
addEventListener('resize', () => { windowsizeGet(); reflect(); });
//なにかキーが押されたとき、以下のプログラムを実行する
addEventListener("keydown", event => {
    if (event.key == "ArrowLeft" || event.key == "a") x -= k; //「左ボタン」が押されたとき、xの値から引き算する
    if (event.key == "ArrowUp" || event.key == "w") y -= k; //「上ボタン」が押されたとき、yの値から引き算する
    if (event.key == "ArrowRight" || event.key == "d") x += k; //「右ボタン」が押されたとき、xの値に足し算する
    if (event.key == "ArrowDown" || event.key == "s") y += k; //「下ボタン」が押されたとき、yの値に足し算する
    reflect();
});
