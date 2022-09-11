var iW = 0, iH = 0, dW = 0, dH = 0, ibuki, //宣言&初期化
    k = 15, //速度
    newimage = 50, //新しい画像生成時の初期位置
    mouseX = 0, mouseY = 0; //マウスの状態
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
    addEventListener("mousemove", dragmove, { passive: false }); //ドラッグされると
    addEventListener("touchmove", dragmove, { passive: false }); //すワイプされると
    addEventListener("mouseup", dragend, { passive: false }); //クリックが解除されると
    addEventListener("touchend", dragend, { passive: false }); //タップが外されると
    addEventListener('resize', () => { //画面サイズが変わると
        var resized = document.getElementsByClassName("images"); //オブジェクト取得
        for (let i = 0; i != resized.length; i++) { //resizedの数だけ
            var outxy = windowoverflow( //座標の管理、画面外を抑制
                resized[i].getBoundingClientRect().left, //座標取得、左から
                resized[i].getBoundingClientRect().top, //座標取得、上から
                document.documentElement.clientWidth, //画面サイズ取得、横
                document.documentElement.clientHeight, //画面サイズ取得、縦
                resized[i].naturalWidth, //要素の大きさを取得、横幅
                resized[i].naturalHeight //要素の大きさを取得、縦幅
            );
            resized[i].style.left = outxy[0] + "px"; //反映
            resized[i].style.top = outxy[1] + "px"; //反映
        };
    });
    addEventListener("keydown", event => { //キーを押されると
        if (event.key == " ") { //スペースキーが押されたら
            var body = document.body; //bodyオブジェクト取得
            var image = document.createElement("img"); //imgオブジェクト作成
            image.src = "1232.jpg"; //画像先
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
        if (event.key == "c") { //cキーが押されたら
            var shuffle = document.getElementsByClassName("images"); //オブジェクト取得
            var windowxy = [document.documentElement.clientWidth, document.documentElement.clientHeight]; //画面サイズ取得、縦横
            for (let i = 0; i != shuffle.length; i++) { //shuffleの数だけ
                shuffle[i].style.left = Math.floor(Math.random() * (windowxy[0] - shuffle[i].naturalWidth)) + "px"; //スタイル指定
                shuffle[i].style.top = Math.floor(Math.random() * (windowxy[1] - shuffle[i].naturalHeight)) + "px"; //スタイル指定
            };
        };
        if (event.key == "v") { //vキーが押されると
            var alignment = document.getElementsByClassName("images"); //オブジェクト取得
            var windowxy = [document.documentElement.clientWidth, document.documentElement.clientHeight]; //画面サイズ取得、縦横
            var xy = [0,0];
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
        var ibukixy = [ibuki.getBoundingClientRect().left, ibuki.getBoundingClientRect().top]; //座標取得、左からと上から
        if (event.key == "ArrowLeft" || event.key == "a") ibukixy[0] -= k; //aか←が押されるとk引く
        if (event.key == "ArrowUp" || event.key == "w") ibukixy[1] -= k; //wか↑が押されるとk引く
        if (event.key == "ArrowRight" || event.key == "d") ibukixy[0] += k; //dか→が押されるとk足す
        if (event.key == "ArrowDown" || event.key == "s") ibukixy[1] += k; //sか↓が押されるとk足す
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
    });
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
    //mousedownかtouchstartかを判断し、evの内容を変える(スマホ操作の場合changedTouche[0]に座標が入るため、置き換えが必須)
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
