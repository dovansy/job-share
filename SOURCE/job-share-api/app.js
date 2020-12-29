var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var fileUpload = require('express-fileupload');
var cors = require('cors');
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
// var multer = require('multer');
// var upload = multer();

var routes = require("@src/routes/index.routers");
var users = require("@src/routes/users.routers");

var app = express();

// var cors = require("cors");
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// enable files upload
app.use(fileUpload({
  createParentPath: true
}));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(upload.array());

app.use("/", require("./src/routes/router"));

// app.use('/', routes);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: app.get("env") === "development" ? err : {},
  });
});

module.exports = app;
