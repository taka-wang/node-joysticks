var io = require('socket.io').listen(7000);
io.sockets
    .on('connection', function(socket) {
        socket.on('message', function(data) {
            switch (data) {
                case 2:
                    console.log("L UP");
                    break;
                case 3:
                    console.log("L DOWN");
                    break;
                case 4:
                    console.log("L LEFT");
                    break;
                case 5:
                    console.log("L RIGHT");
                    break;
                case 6:
                    console.log("R UP");
                    break;
                case 7:
                    console.log("R DOWN");
                    break;
                case 8:
                    console.log("R LEFT");
                    break;
                case 9:
                    console.log("R RIGHT");
                    break;
            }
            //socket.broadcast.send(data);
        });
        socket.on('disconnect', function() {
            console.log("disconnect");
            // handle disconnect
        });
    });