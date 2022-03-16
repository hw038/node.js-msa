var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet')
var session = require('express-session')
var FileStore = require('session-file-store')(session)

var app = express();
app.use(helmet());

const APPPORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(session({
  secret: 'asadlfkj!@#!@#dfgasdg',
  resave: false,
  saveUninitialized: true,
  store:new FileStore()
}))
app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
});

var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');
var authRouter = require('./routes/auth');

app.use(function(req, res, next){
	if(!req.secure){
    console.log(`http://${req.hostname}:${APPPORT}${req.url}`);

		next();
    // res.redirect(`http://${req.hostname}:${APPPORT}${req.url}`);
	}else{
    console.log(`http://${req.hostname}:${APPPORT}${req.url}`);
    res.redirect(`http://${req.hostname}:${APPPORT}${req.url}`);
	}
});
app.use('/', indexRouter);
app.use('/topic', topicRouter);
app.use('/auth', authRouter);

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(APPPORT, '0.0.0.0', function() {
  console.log(`Example app listening on port ${APPPORT}!`)
});