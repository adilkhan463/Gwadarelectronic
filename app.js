const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const nodemon = require('nodemon');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const Student = require('./models/student');
const Buyproduct = require('./models/buyproduct');
const User = require('./models/User');
const passport = require('passport');
const session = require('express-session');

//routes
const users = require('./routes/users');
//passport config
require('./config/passport')(passport);

//making a publicc folder for our app to allow a client to access the files
app.use(express.static(__dirname + '/public'));
//seting up view engine as ejs
app.set('view engine','ejs');

//mongooose database connection 
mongoose.connect('mongodb://localhost/crudapp', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDB connected")
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//seting up multer file storage 

const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: function (req, file, cb) {
    cb(null, 'myapp '+ Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('filetoupload');

function checkFileType(file, cb) {
  const filetypes = /jpg|png|jpeg|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('ERROR : Images only !');
  }
}


//get all product route index
app.get('/', (req, res) => {
  Student.find().limit(12)
  .then((results)=>{
    res.render('index',{students:results});
  // res.send(results)
  })
  .catch(err=>{console.log(err)});

});

//go login page

  app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res, next) => {
    
    passport.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true })(req, res,next)
});

app.get('/logout', (req, res) => {
  req.logout();
  req.flash('success','you are logged out');
  res.redirect('/login');
});

  //go signup page
app.get('/signup', (req, res) => {
  res.render('user_create');
  });





//go contact page
app.get('/cntact', (req, res) => {
  res.render('cantact');
  });
  //go about page
app.get('/abot', (req, res) => {
  res.render('about');
  //res.send(results);
  });

//get all Product of brand dell route product
app.get('/del', (req, res) => {
  Student.find({brand:'Dell'}).limit(15)
  .then((results)=>{
    res.render('pages',{students:results});
  res.send(results)
  })
  .catch(err=>{console.log(err)});

});

//get all Product of brand hp route product
app.get('/hp', (req, res) => {
  Student.find({brand:'Hp'}).limit(15)
  .then((results)=>{
    res.render('pages',{students:results});
  res.send(results)
  })
  .catch(err=>{console.log(err)});

});

//get all Product of brand lenovo route product
app.get('/lenovo', (req, res) => {
  Student.find({brand:'Lenovo'}).limit(15)
  .then((results)=>{
    res.render('pages',{students:results});
  res.send(results)
  })
  .catch(err=>{console.log(err)});

});
//get all Product of brand apple route product
app.get('/apple', (req, res) => {
  Student.find({brand:'Apple'}).limit(15)
  .then((results)=>{
    res.render('pages',{students:results});
  res.send(results)
  })
  .catch(err=>{console.log(err)});

});
//get all Product of brand Nokia route product
app.get('/nokia', (req, res) => {
  Student.find({brand:'Nokia'}).limit(15)
  .then((results)=>{
    res.render('pages',{students:results});
  res.send(results)
  })
  .catch(err=>{console.log(err)});

});

//get all Product of brand Samsung route product
app.get('/samsung', (req, res) => {
  Student.find({brand:'Samsung'}).limit(15)
  .then((results)=>{
    res.render('pages',{students:results});
  res.send(results)
  })
  .catch(err=>{console.log(err)});

});

//get all Product of brand Vivo route product
app.get('/vivo', (req, res) => {
  Student.find({brand:'Vivo'}).limit(15)
  .then((results)=>{
    res.render('pages',{students:results});
  res.send(results)
  })
  .catch(err=>{console.log(err)});

});
//get all Product of brand oppo route product
app.get('/oppo', (req, res) => {
  Student.find({brand:'Oppo'}).limit(15)
  .then((results)=>{
    res.render('pages',{students:results});
  res.send(results)
  })
  .catch(err=>{console.log(err)});

});

//get all Product of laptop route product
app.get('/laptop', (req, res) => {
  Student.find({category:'laptop'}).limit(15)
  .then((results)=>{
    res.render('pages',{students:results});
  res.send(results)
  })
  .catch(err=>{console.log(err)});

});

//get all Product of mobile route product
app.get('/mobile', (req, res) => {
  Student.find({category:'Mobile'}).limit(15)
  .then((results)=>{
    res.render('pages',{students:results});
  res.send(results)
  })
  .catch(err=>{console.log(err)});

});


//get all produt route or check product its for admin
app.get('/students', (req, res) => {
  Student.find()
  .then((results)=>{
    res.render('productadd',{students:results});
  // res.send(results)
  })
  .catch(err=>{console.log(err)});

});

//get all  user route or check product its for admin
app.get('/userdet', (req, res) => {
  User.find()
  .then((results)=>{
    res.render('userdetail',{users:results});
  // res.send(results)
  })
  .catch(err=>{console.log(err)});

});

//sign up user
app.get('/usercer', (req, res) => {
  res.render('user_create');
  });
app.post('/usercer',(req, res) => {
 const User = new User({name:req.body.name,email:req.body.email,password:req.body.password,role:req.body.role })
 User.save()
 .then(results =>{res.redirect('/usercer');})
 .catch(err => {console.log(err)});
});






//insert product its for admin Route
app.get('/studentscrt', (req, res) => {
  res.render('insertproduct');
  });
app.post('/studentscrt',upload,(req, res) => {
 const student = new Student({category:req.body.category,brand:req.body.brand,price:req.body.price,descrption:req.body.descrption,warrenty:req.body.warrenty,year:req.body.year,image:req.file.filename })
 student.save()
 .then(results =>{res.redirect('/studentscrt');})
 .catch(err => {console.log(err)});
});

//for cart route
app.get('/cartpro', (req, res) => {
  
Student.find( { _id:'614b39ec0dcac22a387e6725' } )
.then((results)=>{
  res.render('cart',{students:results});
  res.send(results)
 })
 .catch(err=>{console.log(err)});

});

//for post cart route
app.post('/cartpro',(req, res) => {
  const buyproduct = new Buyproduct({name:req.body.name,number:req.body.number,email:req.body.email,city:req.body.city,brand:req.body.brand,category:req.body.category })
 buyproduct.save()
.then(results =>{res.redirect('/cartpro');})
 .catch(err => {console.log(err)});
});

//get all  check product order list route its for admin
app.get('/order', (req, res) => {
  Buyproduct.find()
  .then((results)=>{
    res.render('orderdproduct',{buyproducts:results});
  // res.send(results)
  })
  .catch(err=>{console.log(err)});

});

  //delete  studnet route
app.get('/students/delete/:id', (req, res) => {

  Student.deleteOne({_id:req.params.id})
  .then(result=>{
    res.redirect('/students');
  })
  .catch(err=>{console.log(err)});
  });

//delete  user route
app.get('/user/:id', (req, res) => {

  User.deleteOne({_id:req.params.id})
  .then(result=>{
    res.redirect('/userdet');
  })
  .catch(err=>{console.log(err)});
  });

 //update   studnet route
  app.get('/students/update/:id', (req, res) => {

    Student.findById({_id:req.params.id})
    .then(result=>{
      res.render('students-update',{student:result});
    })
    .catch(err=>{console.log(err)});
    });
   
  
  app.post('/students/update', (req, res) => {
    const id = req.body.id;
   
  Student.findByIdAndUpdate({_id:id},{category:req.body.category,brand:req.body.brand,price:req.body.price,descrption:req.body.descrption,warrenty:req.body.warrenty,year:req.body.year})
  .then(result=>{
    res.redirect('/students');
  }).catch(err=>{console.log(err)});
  });

  //express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
  //passport middleware

app.use(passport.initialize());
app.use(passport.session());
  


  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
