var iW = 0, iH = 0, dW = 0, dH = 0, ibuki, //宣言&初期化
    k = 15, //速度
    newimage = 50, //新しい画像生成時の初期位置
    mouse = false, mouseX = 0, mouseY = 0; //マウスの状態
var windowsizeGet = () => { dW = document.documentElement.clientWidth, dH = document.documentElement.clientHeight; }; //ウィンドウサイズ取得の関数
var reflect = (x, y) => { //画像の位置を反映させる関数
    if (y > (dH - iH)) { y = dH - iH; };
    if (y < 0) { y = 0; };
    if (x > (dW - iW)) { x = dW - iW; };
    if (x < 0) { x = 0; };
    ibuki.style.top = y + "px";
    ibuki.style.left = x  + "px";
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
    addEventListener('resize', () => { 
        windowsizeGet(); 
        reflect(ibuki.getBoundingClientRect().left, 
        ibuki.getBoundingClientRect().top); 
        var resizes = document.getElementsByClassName("images");
        for (let i = 0; i != resizes.length; i++) {
            var x1 = resizes[i].getBoundingClientRect().left, y1 = resizes[i].getBoundingClientRect().top;
            if (y1 > (document.documentElement.clientHeight - resizes[i].naturalHeight)) { y1 = document.documentElement.clientHeight - resizes[i].naturalHeight; };
            if (y1 < 0) { y1 = 0; };
            if (x1 > (document.documentElement.clientWidth - resizes[i].naturalWidth)) { x1 = document.documentElement.clientWidth - resizes[i].naturalWidth; };
            if (x1 < 0) { x1 = 0; };
            resizes[i].style.left = x1 + "px";
            resizes[i].style.top = y1 + "px";
        };
    });
    //なにかキーが押されたとき、以下のプログラムを実行する
    addEventListener("keydown", event => {
        if (event.key == " ") {
            var body = document.body;
            var image = document.createElement("img");
            image.src = "1232.jpg";
            image.classList = "images"
            image.style.position = "absolute";
            body.appendChild(image);
            if (document.documentElement.clientWidth < document.documentElement.clientHeight) {
                if ((document.documentElement.clientHeight - image.naturalHeight) < newimage) {
                    newimage = 0;
                };
            } else {
                if ((document.documentElement.clientWidth - image.naturalWidth) < newimage) {
                    newimage = 0;
                };
            };
            var x1 = newimage, y1 = newimage;
            if (y1 > (document.documentElement.clientHeight - image.naturalHeight)) { y1 = document.documentElement.clientHeight - image.naturalHeight; };
            if (y1 < 0) { y1 = 0; };
            if (x1 > (document.documentElement.clientWidth - image.naturalWidth)) { x1 = document.documentElement.clientWidth - image.naturalWidth; };
            if (x1 < 0) { x1 = 0; };
            image.style.top = y1 + "px";
            image.style.left = x1 + "px";
            newimage += 5;
            image.addEventListener("mousedown", dragstart, { passive: false });
            image.addEventListener("touchstart", dragstart, { passive: false });
        };
        if (event.key == "c") {
            var shuffle = document.getElementsByClassName("images");
            for (let i = 0; i != shuffle.length; i++) {
                shuffle[i].style.left = Math.floor(Math.random() * (document.documentElement.clientWidth - shuffle[i].naturalWidth)) + "px";
                shuffle[i].style.top = Math.floor(Math.random() * (document.documentElement.clientHeight - shuffle[i].naturalHeight)) + "px";
            };
        };
        var x = ibuki.getBoundingClientRect().left, y = ibuki.getBoundingClientRect().top;
        if (event.key == "ArrowLeft" || event.key == "a") x -= k;
        if (event.key == "ArrowUp" || event.key == "w") y -= k;
        if (event.key == "ArrowRight" || event.key == "d") x += k;
        if (event.key == "ArrowDown" || event.key == "s") y += k;
        reflect(x, y);
        console.log(event.key)
    });
};
const dragstart = e => {
    e.target.classList.add("drag");
    mouse = true;
    //mousedownかtouchstartかを判断し、evの内容を変える(スマホ操作の場合changedTouche[0]に入る)
    if (e.type == "mousedown") { var ev = e; } else { var ev = e.changedTouches[0]; };
    mouseX = ev.clientX - e.target.getBoundingClientRect().left;
    mouseY = ev.clientY - e.target.getBoundingClientRect().top;
};
const dragmove = e => {
    var dragitem = document.getElementsByClassName("drag")[0];
    if (dragitem == undefined) return;
    e.preventDefault();
    //mousemoveかtouchmoveかを判断し、evの内容を変える(スマホ操作の場合changedTouche[0]に入る)
    if (e.type == "mousemove") { var ev = e; } else { var ev = e.changedTouches[0]; };
    var x = ev.clientX - mouseX;
    var y = ev.clientY - mouseY;
    if (y > (document.documentElement.clientHeight - dragitem.naturalHeight)) { y = document.documentElement.clientHeight - dragitem.naturalHeight; };
    if (y < 0) { y = 0; };
    if (x > (document.documentElement.clientWidth - dragitem.naturalWidth)) { x = document.documentElement.clientWidth - dragitem.naturalWidth; };
    if (x < 0) { x = 0; };
    dragitem.style.left = x + "px";
    dragitem.style.top = y + "px";
};
const dragend = e => { mouse = false; document.getElementsByClassName("drag")[0].classList.remove("drag"); };
