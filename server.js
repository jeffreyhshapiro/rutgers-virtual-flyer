var express = require('express');
var expressHandlebars = require('express-handlebars');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 8080;

var app = express();
// var connection = new Sequelize('DB_Virtual_Flyer','root');
var connection = new Sequelize ('mysql://fumuromxdo1b50a9:vf02gxl7t9h40dnf@l3855uft9zao23e2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/con4ys57b1f4red1');


app.use(express.static('public'));

app.engine('handlebars',expressHandlebars({
  defaultLayout :'main'
}));
app.set('view engine','handlebars');

app.use(bodyParser.urlencoded({
  extended :false
}));

var Users = connection.define ('user',{
 name : {
    type : Sequelize.STRING,
    unique : true,
    allowNull: false,
  },
  phonenumber : {
    type : Sequelize.STRING,
    unique :true,
    allowNull : false
  },
 message : {
    type : Sequelize.STRING,
    unique :false,
    allowNull : true
  }
});

app.get('/',function(req,res){
  res.render('homeView')
});

// app.get('/login',function(req,res){
//   res.render('login');
// });

app.post('/loginentry',function(req,res){
  var myName = req.body.name;
  var myPhone = req.body.phone;
  var myMessage = req.body.message;

  Users.create({
    name :myName,
    phonenumber:myPhone,
    message:myMessage
    }).then(function(results){
      res.redirect('/?msg=Success');
    }).catch(function(err){
      debugger;
      // console.log(err.errors[0].message);
      // res.redirect('/?msg='+err.error[0].message);
    });
 });

connection.sync().then(function(){
  app.listen(PORT,function(){
    console.log("Application is listening on PORT %s",PORT);
  });
});

