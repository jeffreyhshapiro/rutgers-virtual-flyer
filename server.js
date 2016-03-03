var express = require('express');
var expressHandlebars = require('express-handlebars');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 8080;

var app = express();
var connection = new Sequelize('DB_Virtual_Flyer','root');

app.use(express.static('public'));

app.engine('handlebars',expressHandlebars({
  defaultLayout :'main'
}));
app.set('view engine','handlebars');

app.use(bodyParser.urlencoded({
  extended :false
}));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(req,res){
  res.render('homeView')
});

app.get('/login',function(req,res){
  res.render('login');
});

app.get('/placeDetails', function(req, res) {
  res.render('placedetails')
})

connection.sync().then(function(){
  app.listen(PORT,function(){
    console.log("Application is listening on PORT %s",PORT);
  });
});

