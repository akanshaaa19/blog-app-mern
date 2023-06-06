var express = require('express');
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser")
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session')

var userRouter = require('./routes/users');
var feedRouter = require('./routes/feed');
const { error } = require('console');

const main = require("./utils/database").main;
main();

var app = express();

const fileStrorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4()+file.originalname);
  },
})

const fileFilter = (req, file, cb) => {
  if(
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' 
  ){
    cb(null, true)
  }else{
    cb(null, false)
  }

}

app.use(multer({storage: fileStrorage, fileFilter: fileFilter}).single('image'));

// view engine setu
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(
  session({ secret: "my-secret", resave: false, saveUninitialized: false })
);

app.listen(8080);

app.use((error, req, res, next)=>{
  console.log(error);
  const status = 500;
  const message = error.message;
  res.status(status).json({message: message});
})

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()

})
app.use('/users', userRouter);
app.use('/feed', feedRouter);



module.exports = app;
