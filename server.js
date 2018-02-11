const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
var morgan =require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
const app = express();


// Parsers
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// API file for interacting with MongoDB
var api = require('./server/routes/api')(app,express);


mongoose.connect(config.database, function (err) {
  if(err){
    console.log(err);
  }
  else{
    console.log('database connected');
  }
})

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
//const port = process.env.PORT || '3000';
//app.set('port', config.port);

const server = http.createServer(app);

server.listen(config.port,function (err){
  if(err){
    console.log(err);
  }
  else{
    console.log('app is listing on port 3000');
  }
}
);
