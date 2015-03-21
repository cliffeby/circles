// vim:set sw=2 sts=2 et:
var canvas, ctx;


//setInterval(function () {alert("Hello1")}, 3000);
var min = 0;
var maxX = width = 1100;
var maxY = height = 400;
function randomIntFromIntervalX(min,maxX)
{
    return Math.floor(Math.random()*(maxX-min+1)+min);
}
function randomIntFromIntervalX(min,maxY)
{
    return Math.floor(Math.random()*(maxY-min+1)+min);
}

function Canvas() {
    var self = this;
    var canvas = self.canvas = document.getElementById('thecanvas');
    canvas.addEventListener('click', function() { }, false);
    var width = canvas.width = canvas.clientWidth;
    var height = canvas.height = canvas.clientHeight;
    var ctx = self.ctx = canvas.getContext('2d');
    var vertices = self.vertices = [];
    // var HANDLERADIUS = 4;


    self.drawCircle = function (x,y,r,c) {
        ctx.fillStyle = 'red';
        ctx.strokeStyle = c || 'black';
        ctx.strokeWidth = 3;
        ctx.beginPath();
        ctx.arc(x,y,40,0,Math.PI*2,true);
        ctx.fill();
        ctx.stroke();
    };
    self.clear = function () {
        ctx.clearRect(0,0,width,height);
    };
    var dotLeft = canvas.offsetLeft;
    var dotTop = canvas.offsetTop;

    canvas.addEventListener('click', function(event){
        var x = event.pageX - dotLeft;
        var y = event.pageY - dotTop;
        console.log('x = ',x, 'y = ',y, dotY);
        if (y > dotY-10 && y < dotY+10
            && x > dotX-10 && x < dotX+10) {
           // alert('clicked an element');
            clearInterval(myTimer);
        init();
            //myTimer = setInterval(drawMyDot, myTimer);
        }
    })

}

function init() {
     canvas = new Canvas();
    canvas.clear();
    dotX = randomIntFromIntervalX(20, maxX-100);
    dotY = randomIntFromIntervalX(20, maxY+200);
    canvas.drawCircle(dotX, dotY, 40, 'red');
    console.log(dotX, 'y', dotY);
     myTimer = setInterval(drawMyDot = function () {
            canvas.clear();
            dotX = randomIntFromIntervalX(20, maxX-100);
            dotY = randomIntFromIntervalX(20, maxY+200);
            canvas.drawCircle(dotX, dotY, 40, 'red');
            console.log(dotX, 'y', dotY);
        },
        5000);
};

for (var i = 0;i<10;i++) {
    window.onload = init;
    //canvas.clear();
}