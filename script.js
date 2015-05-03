angular.module('circles', ['ui.bootstrap'])
    .controller('MainCtrl', [function () {
        var ctrl = this;
        var trialLength;
        var c = 'red';
        var canvas;
        var width = 1100;
        var height = 400;
        var beginTime;
        var endTime;
        var dotSize;
        ctrl.dotSize = dotSize = 40;
        ctrl.timeBetweenDots = timeBetweenDots = 2000;
        ctrl.trialLength = trialLength = 5;
        ctrl.c = c;
        ctrl.showHide = true;
        var dotOffset = dotSize / 2 + 5;
        var touched = {
            count: 0, x: 0, y: 0, time: 0
        };
        var correctT = [];
        var dotT = [];
        var totalT = [];
        var counter = 0;
        var dotCounter = 0;
        var againButtonY = 10;
        var againButtonX = 500;
        var quad;

//function playSound(soundfile) {
//    document.getElementById("dummy").innerHTML= "<embed src=\""
//    +soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
//}

        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        function Canvas() {
            var self = this;
            var canvas = self.canvas = document.getElementById('thecanvas');
            var width = canvas.width = canvas.clientWidth;
            var height = canvas.height = canvas.clientHeight;
            dotLeft = canvas.offsetLeft;
            dotTop = canvas.offsetTop;
            var ctx = self.ctx = canvas.getContext('2d');
            ctx.strokeStyle = c || 'black';
            ctx.strokeWidth = 3;
            ctx.rect(againButtonX, againButtonY, 15, 10);
            ctx.stroke();
            self.drawCircle = function (x, y, r, c) {
                ctx.fillStyle = c;
                ctx.strokeStyle = c || 'black';
                ctx.strokeWidth = 3;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.stroke();
                ctx.font = "40px Georgia";
                //ctx.fontSize = '25';
            };
            self.clear = function () {
                ctx.clearRect(0, 0, width, height);
            };
            self.getReady = function () {
                ctx.font = "40px Arial";
                ctx.fillText('Get Ready', width / 2 - 40, height / 2 - 40);
            };
            self.results = function () {
                var resultText = numberCorrect[0] + '-' + numberOfMissed[0] + '-' + numberOfIncorrect[0];
                var resultTextUL = numberCorrect[1] + '-' + numberOfMissed[1] + '-' + numberOfIncorrect[1];
                var resultTextUR = numberCorrect[2] + '-' + numberOfMissed[2] + '-' + numberOfIncorrect[2];
                var resultTextLL = numberCorrect[3] + '-' + numberOfMissed[3] + '-' + numberOfIncorrect[3];
                var resultTextLR = numberCorrect[4] + '-' + numberOfMissed[4] + '-' + numberOfIncorrect[4];
                ctx.fillText(resultText, width / 2 - 40, height / 2 - 40);
                ctx.fillText('Correct - Ignored - Poor Touch', width / 2 - 180, height / 2 + 50);
                ctx.fillText(resultTextUL, width / 4, height / 4);
                ctx.fillText(resultTextUR, width * .75, height / 4);
                ctx.fillText(resultTextLL, width / 4, height * .75);
                ctx.fillText(resultTextLR, width * .75, height * .75);
                ctx.beginPath();
                ctx.moveTo(0, height / 2);
                ctx.lineTo(width, height / 2);
                ctx.stroke();
                ctx.moveTo(width / 2, 0);
                ctx.lineTo(width / 2, height);
                ctx.stroke();
            };


            canvas.addEventListener('mouseup', myTouch, false);


        }

        function myTouch(event) {
            touched = {};
            var x = event.pageX - dotLeft;
            var y = event.pageY - dotTop;
            //console.log('x = ', x, 'y = ', y, dotY);
            endTime = new Date();
            touched.x = x;
            touched.y = y;
            touched.count = counter;
            touched.time = endTime - beginTime;
            totalT.push(touched);
            console.log('totalT', totalT, 'counter', counter);

            if (y > dotY - dotOffset && y < dotY + dotOffset
                && x > dotX - dotOffset && x < dotX + dotOffset) {
                correctT.push(touched);
                resetInterval();
                placeDot(c);
            }
            counter++;
            if (y > againButtonY - dotOffset && y < againButtonY + dotOffset
                && x > againButtonX - dotOffset && x < againButtonX + dotOffset) {
                console.log('Reset');
                again();
            }
        }

        function countQuadResults(T) {
            console.log('T', T);
            quad = [0, 0, 0, 0, 0];
            for (var i = 0; i < T.length; i++) {
                if (T[i].x < width / 2 && T[i].y < height / 2) {
                    quad[1]++
                }
                if (T[i].x > width / 2 && T[i].y < height / 2) {
                    quad[2]++
                }
                if (T[i].x < width / 2 && T[i].y > height / 2) {
                    quad[3]++
                }
                if (T[i].x > width / 2 && T[i].y > height / 2) {
                    quad[4]++
                }
            }
            quad[0] = T.length;
            return quad;
        }

        function subtractArray(a1, a2) {
            var a3 = [];
            for (var i = 0; i < a1.length; i++) {
                a3[i] = a1[i] - a2[i];
            }
            return a3;
        }

        function calcResults() {
            numberOfDots = countQuadResults(dotT);
            numberCorrect = countQuadResults(correctT);
            numberOfIncorrect = subtractArray(countQuadResults(totalT), numberCorrect);
            numberOfMissed = subtractArray(numberOfDots, numberCorrect);
            ctrl.showHide = true;
            console.log(ctrl.showHide, 'd', numberOfDots, 'c', numberCorrect, 'm', numberOfMissed, 'i', numberOfIncorrect);
            console.log('quadTotalT', countQuadResults(totalT));
            canvas.results();


        }

        function placeDot(c) {
            if (dotCounter >= trialLength) {
                console.log('maxed out');
                clearInterval(myTimer);
                canvas.clear();
                calcResults();

                return;
            }
            canvas.clear();
            touched = {};
            dotCounter++;
            dotX = randomIntFromInterval(20, width - 100);
            dotY = randomIntFromInterval(20, height + 200);
            touched.x = dotX;
            touched.y = dotY;
            touched.time = 0;
            touched.count = dotCounter;
            dotT.push(touched);
            canvas.drawCircle(dotX, dotY, dotSize, c);
            beginTime = new Date();

            console.log(dotX, 'y', dotY);

        }

        function setTimer() {
            myTimer = setInterval(function () {
                placeDot(c)
            }, timeBetweenDots);
        }

        function resetInterval() {
            clearInterval(myTimer);
            console.log("restarted interval");
            setTimer();
        }

        function again() {
            correctT = [];
            dotT = [];
            totalT = [];
            quad = [0, 0, 0, 0, 0];
            dotCounter = 0;
            numberCorrect = 0;
            counter = 0;
            clearInterval(myTimer);

            //document.getElementById('thecanvas').remove();
            //canvas={};
            //Not working.  Need to reset canvas and handler.
            vm.submit();
        }

        function init() {
            canvas = new Canvas();
            //placeDot(c);
            canvas.getReady();
            setTimer();
        }

        ctrl.submit = function () {
            console.log('dsd', ctrl.dotSize, ctrl.timeBetweenDots, ctrl.trialLength, ctrl.c);
            dotSize = ctrl.dotSize;
            timeBetweenDots = ctrl.timeBetweenDots;
            trialLength = ctrl.trialLength;
            c = ctrl.c;
            ctrl.showHide = false;
            init();
        }
    }]);