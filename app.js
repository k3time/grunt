var express = require('express'); // Third party module
var app = express(); // Initailising express or creating instance of it

var bodyparser = require('body-parser'); // Third party module
app.use(bodyparser.json()); // Following two lines needed in case we 
app.use(bodyparser.urlencoded({extended:false})); // using body parser

var routes = require('./routes/route'); // calling route.js

app.use(express.static(__dirname + "/")); // to set folder to read by browser

var expressHbs = require('express-handlebars'); // Third party module
app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'layout.hbs'}));
app.set('view engine', 'hbs');

app.get('/', routes.defaultHandler);
app.get('/add', routes.addHandler);
app.post('/noAction', routes.noActionHandler);

var port = process.env.PORT || 3333;
app.listen(port, function(){ //To run local server and show command line message
    console.log('HTTP server is listening on port: ' + port);
}); 