var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/cu.usbserial-AH02UGI5", {
  baudrate: 9600
});


serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
  });
  var count = 0;
  setInterval(function() {
    if (count % 2)  {
        serialPort.write("4:0\n", function(err, results) {
            console.log('err ' + err);
            console.log('results ' + results);
        });
    } else {
        serialPort.write("4:1023\n", function(err, results) {
            console.log('err ' + err);
            console.log('results ' + results);
        });
    }
    count++;
  }, 3000);

  
});