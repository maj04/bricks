var width = 1000;
var height = 600;
var x = width / 2 + 10;
var y = 560;
var dx = 3;
var dy = -5;
var ctx;
var canvas;
var radZoge = 10;
var paddlex;
var paddleh;
var paddlew;
var paddleSP = 5;
var paddleSN = -5;
var rightDown = false;
var leftDown = false;
var NROWS = 7;
var NCOLS = 10;
var bricks = new Array(NROWS);
var BRICKWIDTH = (width / NCOLS) - 38.6;
var BRICKHEIGHT = 15;
var PADDING = 5;
var sekunde = 0;
var sekundeI;
var minuteI;
var intTimer;
var izpisTimer = "00:00";
var zivljenja = 3;
var play = false;
var točke = 000;
var točkeZaZmago = 0;
var zmaga = false;
var timergo = true;
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

function timer() {
    if (timergo) {
        sekunde++;
        sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0" + sekundeI;
        minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0" + minuteI;
        izpisTimer = minuteI + ":" + sekundeI;

        document.getElementById("cas").innerHTML = izpisTimer;
    }
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initPaddle();
    initbricks();

    ctx.beginPath();
    ctx.fillStyle = "rgb(38, 57, 115)";
    ctx.arc(x, y, radZoge, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    //drawPaddlet
    ctx.beginPath();
    ctx.fillStyle = "rgb(38, 57, 115)";
    ctx.rect(paddlex, height - paddleh - 20, paddlew, paddleh);
    ctx.closePath();
    ctx.fill();

    //drawBricks
    for (i = 0; i < bricks.length; i++) {
        for (j = 0; j < bricks[i].length; j++) {
            if (bricks[i][j] == 1) {
                ctx.fillStyle = "rgb(38, 57, 115)";
                ctx.beginPath();
                ctx.rect(j * (BRICKWIDTH + PADDING) + PADDING, i * (BRICKHEIGHT + PADDING) + PADDING, BRICKWIDTH, BRICKHEIGHT);
                ctx.closePath();
                ctx.fill();
            }

            var rowheight = BRICKHEIGHT + PADDING + 4;
            var colwidth = BRICKWIDTH + PADDING;
            var row = Math.floor(y / rowheight);
            var col = Math.floor(x / colwidth);

            if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
                dy = -dy;
                bricks[row][col] = 0;
                točke = točke + 10;
                if (točke < 100)
                    document.getElementById("točke").innerHTML = "0" + točke;
                else
                    document.getElementById("točke").innerHTML = točke;
                točkeZaZmago++;
                if (točkeZaZmago > 104) {
                    win();
                }

            }

            if (x + dx > width - 5 || x + dx < 5)
                dx = -dx;
            if (y + dy < 5)
                dy = -dy;
            else if (y + dy > BRICKHEIGHT - (5)) {
                if (y + dy > BRICKHEIGHT - 5) {
                    clearInterval(draw);
                }
            }
        }
    }


    if (play) {
        intTimer = setInterval(timer, 1000);
    }

    drawTimer = setInterval(draw, 10);
}

function initPaddle() {
    paddlex = (width / 2) - 33;
    paddleh = 10;
    paddlew = 85;
}

function onKeyDown(evt) {
    if (evt.keyCode == 39)
        rightDown = true;
    else if (evt.keyCode == 37) leftDown = true;
}

function onKeyUp(evt) {
    if (evt.keyCode == 39)
        rightDown = false;
    else if (evt.keyCode == 37) leftDown = false;
}

function initbricks() {
    for (var c = 0; c < bricks.length; c++) {
        bricks[c] = new Array(15);
        for (var r = 0; r < bricks[c].length; r++) {
            bricks[c][r] = 1;
        }
    }
}

function draw() {
    if (play) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //risanjeBall
        ctx.beginPath();
        ctx.fillStyle = "rgb(38, 57, 115)";
        ctx.arc(x, y, radZoge, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        //risanjePaddlet
        ctx.beginPath();
        ctx.fillStyle = "rgb(38, 57, 115)";
        ctx.rect(paddlex, height - paddleh - 20, paddlew, paddleh);
        ctx.closePath();
        ctx.fill();

        //risanjeBricks
        for (i = 0; i < bricks.length; i++) {
            for (j = 0; j < bricks[i].length; j++) {
                if (bricks[i][j] == 1) {
                    ctx.fillStyle = "rgb(38, 57, 115)";
                    ctx.beginPath();
                    ctx.rect(j * (BRICKWIDTH + PADDING) + PADDING, i * (BRICKHEIGHT + PADDING) + PADDING, BRICKWIDTH, BRICKHEIGHT);
                    ctx.closePath();
                    ctx.fill();
                }

                var rowheight = BRICKHEIGHT + PADDING + 4;
                var colwidth = BRICKWIDTH + PADDING;
                var row = Math.floor(y / rowheight);
                var col = Math.floor(x / colwidth);

                if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
                    dy = -dy;
                    bricks[row][col] = 0;
                    točke = točke + 10;
                    if (točke < 100)
                        document.getElementById("točke").innerHTML = "0" + točke;
                    else
                        document.getElementById("točke").innerHTML = točke;
                    točkeZaZmago++;
                    if (točkeZaZmago > 104) {
                        win();
                    }

                }

                if (x + dx > width - 5 || x + dx < 5)
                    dx = -dx;
                if (y + dy < 5)
                    dy = -dy;
                else if (y + dy > BRICKHEIGHT - (5)) {
                    if (y + dy > BRICKHEIGHT - 5) {
                        clearInterval(draw);
                    }
                }
            }
        }

        if (rightDown && paddlex < width - paddlew)
            paddlex += 5;
        else if (leftDown && paddlex > 1)
            paddlex += -5;

        //bounce

        if (x + dx > width - 10) {

            dx = -3;
        }
        if (x + dy < 10) {

            dx = 3;
        }
        if (y + dy > height - 10) {

            dy = -5;
        }
        if (y + dy < 10) {

            dy = 5;
        }
        if (x + dx > paddlex && x + dx < paddlex + paddlew && y + dy > height - paddleh - 30) {
            dx = 8 * ((x - (paddlex + paddlew / 2)) / paddlew);
            dy = -5;
        }

        if (y + dy > height - 15) {
            zivljenja = zivljenja - 1;
            if (zivljenja < 1) {
                zivljenja = 0;

                Swal.fire({
                    title: 'Hopsala!',
                    text: 'Izgubil si! Igral si: ' + sekundeI + ' sekund in: ' + minuteI + ' minut prejel pa si : ' + točke + 'točk',
                    confirmButtonText: `Poskusi ponovno`,
                    confirmButtonColor: 'rgb(38, 57, 115)'
                }).then((result) => {

                    if (result.isConfirmed) {
                        ponastavi();
                        igraj();
                    }
                })
            }
            document.getElementById("zivljenja").innerHTML = zivljenja;
        }

        x += dx;
        y += dy;

        konec();
        if (zmaga) {
            play = false;
        }
    }
}

function konec() {
    if (zivljenja == 0) {
        play = false;
        clearInterval(intTimer);
    }
}

var modal = document.getElementById("zacetek");

function win() {
    zmaga = true;
    clearInterval(intTimer);

    Swal.fire({
        icon: 'success',
        title: 'ZMAGA',
        text: 'Bravo Zmagal si! Igral si: ' + sekundeI + ' sekund in: ' + minuteI + ' minut prejel pa si : ' + točke + 'točk',
    })
}

function ponastavi() {
    width = 1000;
    height = 600;
    x = width / 2 + 10;
    y = 560;
    dx = 4;
    dy = -6;
    ctx;
    canvas;
    radZoge = 10;
    paddlex;
    paddleh;
    paddlew;
    paddleSP = 5;
    paddleSN = -5;
    rightDown = false;
    leftDown = false;
    NROWS = 7;
    NCOLS = 10;
    bricks = new Array(NROWS);
    BRICKWIDTH = (width / NCOLS) - 38.6;
    BRICKHEIGHT = 15;
    PADDING = 5;
    sekunde = 0;
    sekundeI;
    minuteI;
    intTimer;
    izpisTimer = "00:00";
    zivljenja = 3;
    play = false;
    točke = 000;
    točkeZaZmago = 0;
    zmaga = false;
    timergo = true;
    stevec = 0;
    document.getElementById("zivljenja").innerHTML = 3;
    document.getElementById("točke").innerHTML = "000";
    document.getElementById("cas").innerHTML = izpisTimer;
    clearInterval(intTimer);
    clearInterval(drawTimer);
    document.getElementById("igraj").style.display = "inline";
    document.getElementById("stop").style.display = "none";

}

var stevec = 0;

function igraj() {
    play = true;
    timergo = true;
    document.getElementById("igraj").style.display = "none";
    document.getElementById("stop").style.display = "inline";
    if (stevec == 0) {
        init();
        stevec = 1;
        clearInterval(drawTimer);
    } else {
        draw();
    }

}

function stop() {
    document.getElementById("igraj").style.display = "inline";
    document.getElementById("stop").style.display = "none";
    play = false;
    timergo = false;
}

function oIgri() {
    document.getElementById("igraj").style.display = "inline";
    document.getElementById("stop").style.display = "none";
    play = false;
    timergo = false;
    Swal.fire({
        title: 'Blue Bricks',
        text: 'Dobrodošel v igri Blue Bricks. Cilj igre je da podreš vse brike in pridobiš vse točke. To narediš tako, da odbijaš žogico s ploščkom. Plošček pa premikaš z levo in desno puščico. Želim ti veliko zabave.   Maj Kravanja 4. Ra',
        timer: 5000,
        showCancelButton: false,
        showConfirmButton: false
    }).then(
        function() {},
        function(dismiss) {
            if (dismiss === 'timer') {}
        })
}