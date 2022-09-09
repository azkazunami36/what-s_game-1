var iW = 0, iH = 0, dW = 0, dH = 0, ibuki, //宣言&初期化
    y = 0, x = 0, //キャラクターの位置、初期化
    k = 15, //速度
    mouse = false, mouseX = 0, mouseY = 0; //マウスの状態
function windowsizeGet() { dW = document.documentElement.clientWidth, dH = document.documentElement.clientHeight; }; //ウィンドウサイズ取得の関数
function reflect() { //画像の位置を反映させる関数
    if (y > (dH - iH)) { y = dH - iH; };
    if (y < 0) { y = 0; };
    if (x > (dW - iW)) { x = dW - iW; };
    if (x < 0) { x = 0; };
    ibuki.style.top = y + "px";
    ibuki.style.left = x + "px";
};
function mousedown() {
    mouse = true;
    mouseX = event.clientX - x;
    mouseY = event.clientY - y;
    console.log(mouseX + "x" + mouseY);
};
window.onload = function () {
    windowsizeGet();
    ibuki = document.getElementById('ibuki'); //オフジェクト取得
    iW = ibuki.naturalWidth, iH = ibuki.naturalHeight; //画像サイズ取得
    console.log("Display Size:" + dW + "x" + dH);
    console.log("Image Size" + iW + "x" + iH);
    //ウィンドウサイズが変更されたとき、以下のプログラムを実行する
    window.addEventListener('resize', () => { windowsizeGet(); reflect(); });
    window.onmouseup = function () { mouse = false; };
    window.onmousemove = function () { 
        if (mouse == true) {
            x = event.clientX - mouseX;
            y = event.clientY - mouseY;
            reflect();
        }
    };
    //なにかキーが押されたとき、以下のプログラムを実行する
    addEventListener("keydown", event => {
        if (event.keyCode == 37) x -= k; //「左ボタン」が押されたとき、xの値から32を引き算する
        if (event.keyCode == 38) y -= k; //「上ボタン」が押されたとき、yの値から32を引き算する
        if (event.keyCode == 39) x += k; //「右ボタン」が押されたとき、xの値に32を足し算する
        if (event.keyCode == 40) y += k; //「下ボタン」が押されたとき、yの値に32を足し算する
        reflect();
    });
};
