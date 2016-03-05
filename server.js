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
var passportFacebook = require('passport-facebook').Strategy;

var app = express();
var connection = new Sequelize('DB_Virtual_Flyer','root');
// var connection = new Sequelize ('mysql://sql2a0nrhy1ejduq:unq2bz7o6h39ykrd@l3855uft9zao23e2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/xjwoutzkamibecal');

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

passport.use(new passportFacebook({
    clientID: '1548091428822940',
    clientSecret: 'f60d23cc2234f4886a397996bb870207',
    callbackURL: "http://localhost:8080/facebook/return"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
app.get('/facebook',
  passport.authenticate('facebook'));

app.get('/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
      debugger;
    res.redirect('/');
  });

passport.use(new passportLocal.Strategy(function(username, password, done) {
    //check password in db
    User.findOne({
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

var User = connection.define ('user',{
  firstName : {
    type : Sequelize.STRING,
    // unique : true,
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
    // unique : true,
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
  res.render('homeView');
});

app.post('/loginentry',function(req,res){
  User.create(req.body).then(function(results){
    res.redirect('/?msg=Account Created');
  }).catch(function(err){
    res.redirect('/?msg='+ err.errors[0].message);
  });

 });

app.post('/check',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // console.log(req.user.username);
    res.redirect('/' + req.user.username);
  });

app.get('/:username', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.username === "") next('route');
  // otherwise pass the control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
    User.findAll({
    where: {
      username: req.params.username
    }
  }).then(function(results){
    if(results != ""){
    var authenticatedUser = results[0].dataValues.firstName;
    res.render('homeView',{authenticatedUser});
    } else {
      res.render('homeView');
    }

  });
});

// handler for the /user/:id path, which renders a special page
// app.get('/user/:username', function (req, res, next) {
//   res.render('homeView');
// });

// app.get('/:username',function(req,res){
//     User.findAll({
//     where: {
//       username: req.params.username
//     }
//   }).then(function(results){
//     var authenticatedUser = results[0].dataValues.firstName;
//     res.render('homeView',{authenticatedUser});
//   });
// });
connection.sync().then(function(){
  app.listen(PORT,function(){
    console.log("Application is listening on PORT %s",PORT);
  });
});
