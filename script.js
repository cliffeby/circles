var canvas, ctx;
var min = 0;
var maxX = width = 1100;
var maxY = height = 400;
var beginTime;
var endTime;
var dotSize = 40;
var dotOffset = dotSize/2;
var touched = {
    count:0, x:0, y:0, time:0
}
var correctT =[];
var incorrectT = [];
var totalT = [];
var counter =0;
var dotCounter = 0;

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
        ctx.font="20px Georgia";
        ctx.fontSize = '25';

    };
    self.clear = function () {
        ctx.clearRect(0, 0, width, height);
    };
    self.results = function(){
        var resultText = numberCorrect+'-'+numberOfMissed+'-'+numberOfIncorrect
        ctx.fillText(resultText, width/2,height/2);
        ctx.fillText('a', width/4,height/4);
        ctx.fillText('b', width *.75,height/4);
        ctx.fillText('c', width/4,height *.75);
        ctx.fillText('d', width*.75,height *.75);
    };
    var dotLeft = canvas.offsetLeft;
    var dotTop = canvas.offsetTop;

    canvas.addEventListener('click', function (event) {
        touched={};

        var x = event.pageX - dotLeft;
        var y = event.pageY - dotTop;
        console.log('x = ', x, 'y = ', y, dotY);
        endTime = new Date();
        touched.x = x;
        touched.y = y;
        touched.count = counter;
        touched.time = endTime-beginTime;
        totalT.push(touched);
        console.log('totalT', totalT, 'counter', counter);


        if (y > dotY - dotOffset && y < dotY + dotOffset
            && x > dotX - dotOffset && x < dotX + dotOffset) {
            endTime = new Date();
            clearInterval(myTimer);
            correctT.push(touched);
            console.log('correct',correctT);
            init();
        }
        counter++;

    })
}
function placeDot() {
    canvas.clear();
    //canvas.results();

    dotX = randomIntFromInterval(20, maxX - 100);
    dotY = randomIntFromInterval(20, maxY + 200);
    canvas.drawCircle(dotX, dotY, dotSize, 'red');
    beginTime = new Date();
    if (dotCounter== 3){
        clearInterval(myTimer);
        numberOfDots = dotCounter;
        numberCorrect = correctT.length;
        numberOfIncorrect = totalT.length-(2*numberCorrect)-numberOfMissed;
        numberOfMissed = numberOfDots-numberCorrect;
        console.log('d',numberOfDots,'c',numberCorrect,'m',numberOfMissed,'i',numberOfIncorrect);
        canvas.results();
        return;
    }else{
        dotCounter++;
        console.log('dotCounter', dotCounter);
    }
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
numberOfDots = dotCounter;
numberCorrect = correctT.length +1;
numberOfIncorrect = totalT.length-numberCorrect;
numberOfMissed = numberCorrect-numberOfDots;
console.log('d',numberOfDots,'c',numberCorrect,'m',numberOfMissed);

