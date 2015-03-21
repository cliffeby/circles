var canvas, ctx;
var min = 0;
var maxX = width = 1100;
var maxY = height = 400;
var beginTime;
var endTime;
var correct =[,,];
var incorrect = [,,];

function randomIntFromIntervalX(min, width) {
    return Math.floor(Math.random() * (width - min + 1) + min);
}
function randomIntFromIntervalX(min, height) {
    return Math.floor(Math.random() * (height - min + 1) + min);
}

function Canvas() {
    var self = this;
    var canvas = self.canvas = document.getElementById('thecanvas');
    canvas.addEventListener('click', function () {
    }, false);
    var width = canvas.width = canvas.clientWidth;
    var height = canvas.height = canvas.clientHeight;
    var ctx = self.ctx = canvas.getContext('2d');

    self.drawCircle = function (x, y, r, c) {
        ctx.fillStyle = 'red';
        ctx.strokeStyle = c || 'black';
        ctx.strokeWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    };
    self.clear = function () {
        ctx.clearRect(0, 0, width, height);
    };
    var dotLeft = canvas.offsetLeft;
    var dotTop = canvas.offsetTop;

    canvas.addEventListener('click', function (event) {
        var x = event.pageX - dotLeft;
        var y = event.pageY - dotTop;
        console.log('x = ', x, 'y = ', y, dotY);
        if (y > dotY - 10 && y < dotY + 10
            && x > dotX - 10 && x < dotX + 10) {
            endTime = new Date();
            clearInterval(myTimer);
            correct.push(x,y,endTime-beginTime);
            console.log('correct',correct);
            init();
        }else{
            incorrect.push(x,y,endTime-beginTime);
            console.log('incorrect',incorrect);
        }

    })
}
function placeDot() {
    canvas.clear();
    dotX = randomIntFromIntervalX(20, maxX - 100);
    dotY = randomIntFromIntervalX(20, maxY + 200);
    canvas.drawCircle(dotX, dotY, 40, 'red');
    beginTime = new Date();
    console.log(dotX, 'y', dotY);
};
function init() {
    canvas = new Canvas();
    placeDot();
    myTimer = setInterval(drawMyDot = function () {
            placeDot();
        },
        5000);
};
window.onload = init;
