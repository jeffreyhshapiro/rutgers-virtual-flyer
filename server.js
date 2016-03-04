var express = require('express');
var expressHandlebars = require('express-handlebars');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 8080;
var bcrypt = require('bcryptjs');
var session = require('express-session');
//requiring passport last
var passport = require('passport');
var passportLocal = require('passport-local').Strategy;

var app = express();
// var connection = new Sequelize('DB_Virtual_Flyer','root');
var connection = new Sequelize ('mysql://sql2a0nrhy1ejduq:unq2bz7o6h39ykrd@l3855uft9zao23e2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/xjwoutzkamibecal');

app.use(express.static('public'));

app.engine('handlebars',expressHandlebars({
  defaultLayout :'main'
}));
app.set('view engine','handlebars');

app.use(bodyParser.urlencoded({
  extended :false
}));

//middleware init
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

//passport use methed as callback when being authenticated
// passport.use(new passportLocal(function(username, password, done) {
//     //check password in db
//     Users.findOne({
//         where: {
//             emailAddress: emailAddress
//         }
//     }).then(function(user) {
//         //check password against hash
//         if(user){
//             bcrypt.compare(password, user.dataValues.password, function(err, user) {
//                 if (user) {
//                   //if password is correct authenticate the user with cookie
//                   done(null, { id: emailAddress, emailAddress: emailAddress });
//                 } else{
//                   done(null, null);
//                 }
//             });
//         } else {
//             done(null, null);
//         }
//     });

// }));

passport.use(new passportLocal.Strategy(function(username, password, done) {
    //check password in db
    Users.findOne({
        where: {
            username: username
        }
    }).then(function(user) {
        //check password against hash
        if(user){
            bcrypt.compare(password, user.dataValues.password, function(err, user) {
                if (user) {
                  //if password is correct authenticate the user with cookie
                  done(null, { id: username, username: username });
                } else{
                  done(null, null);
                }
            });
        } else {
            done(null, null);
        }
    });

}));

//change the object used to authenticate to a smaller token, and protects the server from attacks
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    done(null, { id: id, name: id })
});

var Users = connection.define ('user',{
  firstName : {
    type : Sequelize.STRING,
    unique : true,
    allowNull: false,
    validation : {
      check :function(bodyVal){
        if(!isAlpha(bodyVal)){
          res.send("Name should only be letters!!!");
        }
      },
      notEmpty:true,
      len:{
        ars:[1,50],
        msg:'Name should be between 1-50 characters, Can not be empty!!'
      }
    }
  },
  lastName : {
    type : Sequelize.STRING,
    unique : true,
    allowNull: false,
    validation : {
      check :function(bodyVal){
        if(!isAlpha(bodyVal)){
          res.send("Name should only be letters!!!");
        }
      },
      notEmpty:true,
      len:{
        ars:[1,50],
        msg:'Name should be between 1-50 characters, Can not be empty!!'
      }
    }
  },
  username : {
    type : Sequelize.STRING,
    unique :true,
    allowNull : false
  },
  password : {
    type:Sequelize.STRING,
    unique:false,
    allowNull:false,
   }}, {
    hooks: {
      beforeCreate : function(input){
        input.password = bcrypt.hashSync(input.password,10);
      }
    }
}); // End of creation of login table

app.get('/',function(req,res){
  res.render('homeView')
});

app.post('/loginentry',function(req,res){
  Users.create(req.body).then(function(results){
    res.redirect('/?msg=Account Created');
  }).catch(function(err){
    res.redirect('/?msg='+ err.errors[0].message);
  });

 });

//check login with db
app.post('/check', passport.authenticate('local', {
    successRedirect: '/?msg=Welcome back!!',
    failureRedirect: '/?msg=Login Credentials do not work'
    // failureFlash: 'Invalid username or password.'
}));

connection.sync().then(function(){
  app.listen(PORT,function(){
    console.log("Application is listening on PORT %s",PORT);
  });
});


