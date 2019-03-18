var five = require("johnny-five");
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
var percentage =0;
var tooActive = false;

var accountSid = 'AC6fb75d429a3a081945f8dc45a6202c5d';
var authToken = '3689140f138e5a71981addc3edb3f9c9';
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

var sendMessage = function( msg ) {
    client.messages.create({
        body: msg,
        to: '+16693503610',  // Text this number
        from: '+19792698506' // From a valid Twilio number
    }).then(function(message){
        console.log(message.sid);
        console.log('message sent');
    }, function(err) {
        console.log(err);
    });
};


var ioLib = require('socket.io');
var io;
var http = require('http');
var server = http.createServer();
server.listen(3000, function() {
    console.log('Server started');
});

function boardHandler() { // wait for board to be ready
    console.log("------starting");
    var accelerometer = new five.Accelerometer({
        controller: "ADXL335",
        pins: ["A0", "A1", "A2"]
    });
    var piezo = new five.Piezo(10);
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
            // var testTime = new Date();
            // mostRecentTime2 = testTime.getTime();

        }

        var d = new Date();
        if (d.getTime() - mostRecentTime < 500) {
            return;
        }

        if (this.acceleration<0.5) {
            sendMessage("Alert: Yili fell from bed!");
            alertAction = true;
            console.log("Message sent");
            console.log(alertAction);
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
            console.log("count"+count);
            console.log("percentage"+percentage);
            // console.log(activePercentage);
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
        // console.log(tooActive);
        tooActive = false;
    }

    accelerometer.on("acceleration", accelerometerHandler);
    io = ioLib.listen(server);
    io.on('connection', function(connection) {
        console.log('User Connected');
        connection.on('event:acceleration',
            function(chartPointsAcceleration, chartPointsRoll, chartPointsZo, action, alertAction, tooActive) {
                io.emit('acceleration', chartPointsAcceleration.join(), chartPointsRoll.join(),
                    chartPointsZo.join(), action, alertAction, tooActive);
            });
        connection.on('playornot',(playcomment)=>{
            console.log(playcomment);
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