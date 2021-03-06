var five = require("johnny-five");
var config = require("./config");
var board = new five.Board();



var chartPointsAcceleration = [];
var chartPointsRoll = [];
var chartPointsZo = [];
var mostRecentTime = 0;
var activePercentage = [];
var awake = "Yili is active.";
var lay = "Yili is laying on bed.";
var turn = "Yili is turning over.";
var action = "";
var test = "";
var alertAction = false;
var count = 0;
var percentage = 0;
var tooActive = false;

var ioLib = require('socket.io');
var io;
var http = require('http');
var server = http.createServer();
server.listen(3000, function() {
    console.log('Server started');
});

if(config.linkToPhone) {
    var accountSid = config.accountSid;
    var authToken = config.authToken;
    var twilio = require('twilio');
    var client = new twilio(accountSid, authToken);

    var sendMessage = function( msg ) {
        client.messages.create({
            body: msg,
            to: config.to,  // Your phone number
            from: config.from // a Twilio number
        });
    };
}

function boardHandler() { // wait for board to be ready
    var accelerometer = new five.Accelerometer({
        controller: "ADXL335",
        pins: [config.accelerometerX, config.accelerometerY, config.accelerometerZ]
    });
    var piezo = new five.Piezo(config.piezoPin);
    function accelerometerHandler() {
        if(!io) {
            return;
        }

        if(this.z < 0) {
            action = turn;
        } else if (this.acceleration < 2 && this.acceleration > 1 && this.roll > 8
            && this.roll < 16 && this.z < 2 && this.z > 1){
            action = lay;
        } else {
            action = awake;

        }

        var d = new Date();
        if (d.getTime() - mostRecentTime < 500) {
            return;
        }

        if (this.acceleration<0.5) {
            if(config.linkToPhone) {
                sendMessage("Alert: Yili fell from bed!");
            }
            alertAction = true;
        } else {
            alertAction = false;
        }

        mostRecentTime = d.getTime();
        chartPointsAcceleration.push(this.acceleration.toFixed(2));
        chartPointsRoll.push(this.roll.toFixed(2));
        chartPointsZo.push(this.z.toFixed(2));
        activePercentage.push(action);

        if (activePercentage.length >= 20) {
            for (var i = 0; i < activePercentage.length; i++) {
                if (activePercentage[i] == "Yili is active."){
                    count++;
                }

            }

            if (count > 0) {
            percentage = count / (activePercentage.length);
            }
            count= 0;
            activePercentage=[];
        }
        if(percentage>0.5){
            tooActive = true;
        }else{
            tooActive = false;
        }
        percentage=0;
        if (chartPointsAcceleration.length > 10) {
            chartPointsAcceleration.splice(0, 1);
        }

        if (chartPointsRoll.length > 10) {
            chartPointsRoll.splice(0, 1);
        }

        if (chartPointsZo.length > 10) {
            chartPointsZo.splice(0, 1);
        }
        io.sockets.emit('event:accelerometer', chartPointsAcceleration.join(),
            chartPointsRoll.join(), chartPointsZo.join(), action, alertAction, tooActive);
        tooActive = false;
    }

    accelerometer.on("acceleration", accelerometerHandler);
    io = ioLib.listen(server);
    io.on('connection', function(connection) {
        connection.on('event:acceleration',
            function(chartPointsAcceleration, chartPointsRoll, chartPointsZo, action, alertAction, tooActive) {
                io.emit('acceleration', chartPointsAcceleration.join(), chartPointsRoll.join(),
                    chartPointsZo.join(), action, alertAction, tooActive);
            });
        connection.on('playornot',(playcomment)=>{
            if(playcomment){
                piezo.play({
                    song: [
                        [null, 1],
                        [null, 1 / 2],
                        ["A5", 1 / 4],
                        ["A5", 1 / 4],
                        ["C5", 1 / 2],
                        ["A5", 1 / 4],
                        ["A5", 1 / 4],
                        ["C5", 1 / 4],
                        [null, 1 / 4],
                        ["A5", 1 / 4],
                        ["C5", 1 / 4],
                        ["F5", 1 / 4],
                        ["E5", 1 / 2],
                        ["D5", 1 / 4],
                        ["D5", 1 / 4]
                    ],
                    tempo: 100
                });
            }
        });
    });
}

board.on("ready", boardHandler);