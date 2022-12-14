var iW = 0, iH = 0, dW = 0, dH = 0, ibuki, ibukixy, //宣言&初期化
    k = 15, //速度
    newimage = 50, //新しい画像生成時の初期位置
    mouseX = 0, mouseY = 0, //マウスの状態
    imagetype = [ //写真のタイプ
        "1232.jpg",
        "1233.jpg",
        "favicon.ico"
    ],
    imagetypeno = 0; //写真タイプの選択状態

var windowoverflow = (x1, y1, ww, wh, iw, ih) => { //ブラウザより外に行かないようにする関数
    var x2 = x1, y2 = y1; //まずはそのまま
    if (y1 > (wh - ih)) { y2 = wh - ih; }; //座標が画面枠より下なら
    if (y1 < 0) { y2 = 0; }; //座標が画面枠より上なら
    if (x1 > (ww - iw)) { x2 = ww - iw; }; //座標が画面枠より右なら
    if (x1 < 0) { x2 = 0; }; //座標が画面枠より左なら
    return [x2, y2]; //結果を出力
};
window.onload = () => { //すべて読み込まれると
    ibuki = document.getElementById('ibuki'); //オフジェクト取得
    ibuki.addEventListener("mousedown", dragstart, { passive: false }); //クリックされると
    ibuki.addEventListener("touchstart", dragstart, { passive: false }); //タップされると
    addEventListener("keydown", event => { //キーを押されると
        if (event.key == " ") imagecreate(); //スペースキーが押されたら関数を実行
        if (event.key == "x") imagedelete(); //xキーが押されたら関数を実行
        if (event.key == "c") imageshuffle(); //cキーが押されたら関数を実行
        if (event.key == "v") imagealignment(); //vキーが押されたら関数を実行
        if (event.key == "g") imagecolorreversal(); //gキーが押されたら関数を実行
        if (event.key == "t") imagetypechange(); //tが押されたら関数を実行
        if (event.key == "h") helpwindow(); //hが押されたら関数を実行
        if (event.key == "a") imagemove("2", "0"); //aが押されたら関数を実行
        if (event.key == "w") imagemove("0", "2"); //wが押されたら関数を実行
        if (event.key == "d") imagemove("1", "0"); //dが押されたら関数を実行
        if (event.key == "s") imagemove("0", "1"); //sが押されたら関数を実行
        if (event.key == "ArrowLeft") imagemove("2", "0"); //←が押されたら関数を実行
        if (event.key == "ArrowUp") imagemove("0", "2"); //↑が押されたら関数を実行
        if (event.key == "ArrowRight") imagemove("1", "0"); //→が押されたら関数を実行
        if (event.key == "ArrowDown") imagemove("0", "1"); //↓が押されたら関数を実行
    });
    addEventListener("mousemove", dragmove, { passive: false }); //ドラッグされると関数を実行
    addEventListener("touchmove", dragmove, { passive: false }); //スワイプされると関数を実行
    addEventListener("mouseup", dragend, { passive: false }); //クリックが解除されると関数を実行
    addEventListener("touchend", dragend, { passive: false }); //タップが外されると関数を実行
    addEventListener('resize', windowresize); //画面サイズが変わると
};
const imagecreate = () => { //画像を生成しbodyに配置する関数
    var body = document.body; //bodyオブジェクト取得
    var image = document.createElement("img"); //imgオブジェクト作成
    image.src = imagetype[imagetypeno]; //画像先
    image.classList = "images" //クラス指定
    image.style.position = "absolute"; //スタイル指定
    body.appendChild(image); //設置
    var windowxy = [document.documentElement.clientWidth, document.documentElement.clientHeight]; //画面サイズ取得、縦横
    var imagewh = [image.naturalWidth, image.naturalHeight]; //要素の大きさ取得、縦幅と横幅
    if (windowxy[0] < windowxy[1]) { //画面サイズが横と縦を比べ、縦のほうが広かったら
        if ((windowxy[1] - imagewh[1]) < newimage) { //newimageが要素の大きさ分引いた画面サイズより大きかったら
            newimage = 0; //リセット
        };
    } else { //そうじゃなかったら
        if ((windowxy[0] - imagewh[0]) < newimage) { //newimageが要素の大きさ分引いた画面サイズより大きかったら
            newimage = 0; //リセット
        };
    };
    var outxy = windowoverflow(newimage, newimage, windowxy[0], windowxy[1], imagewh[0], imagewh[1]); //座標の管理、画面外を抑制
    image.style.top = outxy[1] + "px"; //スタイル指定
    image.style.left = outxy[0] + "px"; //スタイル指定
    newimage += 5; //newimageに5足す
    image.addEventListener("mousedown", dragstart, { passive: false }); //クリックされると
    image.addEventListener("touchstart", dragstart, { passive: false }); //タップされると
};
const imageshuffle = () => { //imagesタグのついた画像の座標をランダムに変更する関数
    var shuffle = document.getElementsByClassName("images"); //オブジェクト取得
    var windowxy = [document.documentElement.clientWidth, document.documentElement.clientHeight]; //画面サイズ取得、縦横
    for (let i = 0; i != shuffle.length; i++) { //shuffleの数だけ
        shuffle[i].style.left = Math.floor(Math.random() * (windowxy[0] - shuffle[i].naturalWidth)) + "px"; //スタイル指定
        shuffle[i].style.top = Math.floor(Math.random() * (windowxy[1] - shuffle[i].naturalHeight)) + "px"; //スタイル指定
    };
};
const imagealignment = () => { //imagesタグのついた画像の座標を整列させる関数
    var alignment = document.getElementsByClassName("images"); //オブジェクト取得
    var windowxy = [document.documentElement.clientWidth, document.documentElement.clientHeight]; //画面サイズ取得、縦横
    var xy = [0, 0];
    for (let i = 0; i != alignment.length; i++) { //alignmentの数だけ
        xy = windowoverflow(xy[0], xy[1], windowxy[0], windowxy[1], alignment[i].naturalWidth, alignment[i].naturalHeight); //座標の管理、画面外を抑制
        alignment[i].style.left = xy[0] + "px"; //スタイル指定
        alignment[i].style.top = xy[1] + "px"; //スタイル指定
        xy[0] += alignment[i].naturalWidth; //要素の大きさを足す
        if (xy[0] == windowxy[0]) { //同じになったら
            xy[0] = 0; //リセット
            xy[1] += alignment[i].naturalHeight; //要素の大きさを足す
            if (xy[1] == windowxy[1]) { //同じになったら
                xy[1] = 0; //リセット
            };
        };
    };
};
const imagecolorreversal = () => {
    var reversal = document.getElementsByClassName("images");
    for (let i = 0; i < (reversal.length); i++) {
        var classlength = reversal[i].classList.length
        for (let i1 = 0; i1 < classlength; i1++) {
            if (reversal[i].classList[i1] != "reversal-color") {
                reversal[i].classList.add("reversal-color");
            } else {
                reversal[i].classList.remove("reversal-color");
            };
        };
    };
    var reversalback = document.getElementById("backimage");
    var classlength = reversalback.classList.length
    for (let i = 0; i < classlength; i++) {
        if (reversalback.classList[i] != "reversal-background-color") {
            reversalback.classList.add("reversal-background-color");
        } else {
            reversalback.classList.remove("reversal-background-color");
        };
    };
};
const imagemove = (xtype, ytype) => {
    ibukixy = [ibuki.getBoundingClientRect().left, ibuki.getBoundingClientRect().top]; //座標取得、左からと上から
    if (xtype == "1") { ibukixy[0] += k } else if (xtype == "2") { ibukixy[0] -= k; };
    if (ytype == "1") { ibukixy[1] += k; } else if (ytype == "2") { ibukixy[1] -= k; };
    ibukixy = windowoverflow( //座標の管理、画面外を抑制
        ibukixy[0],
        ibukixy[1],
        document.documentElement.clientWidth, //画面サイズ取得、横
        document.documentElement.clientHeight, //画面サイズ取得、縦
        ibuki.naturalWidth, //要素の大きさを取得、横幅
        ibuki.naturalHeight //要素の大きさを取得、縦幅
    );
    ibuki.style.top = ibukixy[1] + "px"; //スタイル指定
    ibuki.style.left = ibukixy[0] + "px"; //スタイル指定
};
const imagetypechange = () => {
    if (imagetypeno == (imagetype.length - 1)) {
        imagetypeno = 0;
    } else {
        imagetypeno++;
    };
    document.getElementById("ibuki").src = imagetype[imagetypeno];
    document.getElementById("backimage").src = imagetype[imagetypeno];
};
const imagedelete = () => {
    var deletes = document.getElementsByClassName("images");
    if (deletes.length == 1) return;
    deletes[deletes.length - 1].remove();
    var windowxy = [document.documentElement.clientWidth, document.documentElement.clientHeight]; //画面サイズ取得、縦横
    if (newimage < 1) {
        if (windowxy[0] < windowxy[1]) { //画面サイズが横と縦を比べ、縦のほうが広かったら
            newimage = windowxy[1] - deletes[deletes.length - 1].naturalHeight;
        } else {
            newimage = windowxy[0] - deletes[deletes.length - 1].naturalWidth; //newimageが要素の大きさ分引いた画面サイズより大きかったら
        };
    } else {
        newimage -= 5;
    };
};
const dragstart = e => { //クリック時などに使う関数
    e.target.classList.add("drag"); //クラス追加
    if (e.type == "mousedown") { var ev = e; } else { var ev = e.changedTouches[0]; }; //スマホ用座標かを確認し、置き換え
    //mousedownかtouchstartかを判断し、evの内容を変える(スマホ操作の場合changedTouche[0]に座標が入るため、置き換えが必須)
    mouseX = ev.clientX - e.target.getBoundingClientRect().left; //要素とマウスとのズレを記録、横
    mouseY = ev.clientY - e.target.getBoundingClientRect().top; //要素とマウスとのズレを記録、縦
};
const dragmove = e => { //ドラッグ時やすワイプ時に使う関数
    var dragitem = document.getElementsByClassName("drag")[0]; //オブジェクト取得
    if (dragitem == undefined) return; //オブジェクトがなければ終了
    e.preventDefault(); //通常起こる動作を抑制
    if (e.type == "mousemove") { var ev = e; } else { var ev = e.changedTouches[0]; }; //スマホ用座標かを確認し、置き換え
    //mousemoveかtouchmoveかを判断し、evの内容を変える(スマホ操作の場合changedTouche[0]に座標が入るため、置き換えが必須)
    var outxy = windowoverflow( //座標の管理、画面外を抑制
        ev.clientX - mouseX, //ズレを反映
        ev.clientY - mouseY, //ズレを反映
        document.documentElement.clientWidth, //画面サイズ取得、横
        document.documentElement.clientHeight, //画面サイズ取得、縦
        dragitem.naturalWidth, //要素の大きさを取得、横幅
        dragitem.naturalHeight //要素の大きさを取得、縦幅
    );
    dragitem.style.left = outxy[0] + "px"; //スタイルを指定
    dragitem.style.top = outxy[1] + "px"; //スタイルを指定
};
const dragend = e => { //クリックが外されたときなどに使う関数
    var dragends = document.getElementsByClassName("drag")[0]; //オブジェクト取得
    if (dragends != undefined) dragends.classList.remove("drag"); //クラス除去
};
const windowresize = () => {
    var resized = document.getElementsByClassName("images"); //オブジェクト取得
    for (let i = 0; i != resized.length; i++) { //resizedの数だけ
        var tagxy = resized[i].getBoundingClientRect(); //座標取得用
        var windowxy = [document.documentElement.clientWidth, document.documentElement.clientHeight]; //画面サイズ取得、縦横
        var outxy = windowoverflow(tagxy.left, tagxy.top, windowxy[0], windowxy[1], resized[i].naturalWidth, resized[i].naturalHeight); //座標の管理、画面外を抑制
        resized[i].style.left = outxy[0] + "px"; //反映
        resized[i].style.top = outxy[1] + "px"; //反映
    };
};
const helpwindow = () => {
    var helpactive = document.getElementsByClassName("helpd")[0];
    var help = document.getElementsByClassName("help-window")[0];
    if (helpactive == undefined) {
        help.classList.add("helpd");
    } else {
        help.classList.remove("helpd");
    };
};