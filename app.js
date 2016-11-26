var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
    users={};

var port = process.env.PORT || 3333;
    server.listen(port);

var bodyparser = require('body-parser'); // Third party module
app.use(bodyparser.json()); // Following two lines needed in case we 
app.use(bodyparser.urlencoded({extended:false})); // using body parser

var routes = require('./routes/route'); // calling route.js

app.use(express.static(__dirname + "/")); // to set folder to read by browser

var expressHbs = require('express-handlebars'); // Third party module
app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'layout.hbs'}));
app.set('view engine', 'hbs');

app.get('/', routes.defaultHandler);

io.sockets.on('connection', function(socket) {

    console.log("A New Connection Established");

    socket.on('new user', function(data, callback) {
        if (data in users) {
            console.log("Username already taken");
            callback(false);
        } else {
            console.log("Username available");
            callback(true);
            socket.nickname = data;
            users[socket.nickname] = socket;
            updateNicknames();
        }
    });

    function updateNicknames() {
        io.sockets.emit('usernames', Object.keys(users));
    }

    socket.on('send message', function(data, callback) {
        var msg = data.trim();

        if (msg.substr(0, 1) === '@') {
            msg = msg.substr(1);
            var ind = msg.indexOf(' ');
            if (ind !== -1) {
                var name = msg.substring(0, ind);
                var msg = msg.substring(ind + 1);
                if (name in users) {
                    users[name].emit('whisper', {
                        msg: msg,
                        nick: socket.nickname
                    });
                    socket.emit('private', {
                        msg: msg,
                        nick: name
                    });
                    console.log("Whispering !");
                } else {
                    callback("Sorry, " + name + " is not online");
                }
            } else {
                callback("Looks like you forgot to write the message");
            }

        } else {
            console.log("Got Message :" + data)
            io.sockets.emit('new message', {
                msg: msg,
                nick: socket.nickname
            });
        }
    });

    socket.on('disconnect', function(data) {
        if (!socket.nickname) return;
        delete users[socket.nickname];
        updateNicknames();
    });

});