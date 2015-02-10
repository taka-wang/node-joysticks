var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/cu.usbserial-AH02UGI5", {
    baudrate: 9600
});

var io = require('socket.io').listen(7000);

io.sockets
    .on('connection', function(socket) {
        serialPort.on("open", function () {
            console.log('port open');
        });
        socket.on('message', function(data) {
                //console.log(data);
                serialPort.write(data, function(err, results) {});
            });        
        socket.on('disconnect', function() {
            console.log("disconnect");
        });
    });

