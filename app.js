require("dotenv").config();
let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");
let logger = require("morgan");
let mongoose = require("mongoose");
let SourceMapSupport = require("source-map-support");
// let routes
let poisonRoutes = require("./routes/poisonRoute");


// define our app using express
const app = express();
// express-busboy to parse multipart/form-data
// allow-cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// configure app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "client", "build")));
// set the port
const port = process.env.PORT || 3001;
// connect to database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/scraper');
SourceMapSupport.install();
app.use('/api', poisonRoutes);
app.get('/', function (req,res) {
  return res.end('Api working');
})

// catch 404
app.use('*', function (req, res, next) {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
// start the server
app.listen(port, function() {
  console.log(`App Server Listening at ${port}`);
});