var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet')
const session = require("express-session")
let RedisStore = require("connect-redis")(session)
const { createClient } = require("redis")

APPPORT = process.env.APPPORT || 3000;
REDISHOST = process.env.REDIS_HOST || "172.30.1.16";
REDISPORT = process.env.REDIS_PORT || 6379;


let redisClient = createClient({ 
  legacyMode: true,
  host: REDISHOST,
  port: REDISPORT
 })
redisClient.connect().catch(console.error)

var app = express();
app.use(helmet());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(session({
    secret: 'awkefjl#!@$!fkawegwef',
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({client: redisClient}),
    cookie: {
      maxAge: 1000 * 60
    }
}));
app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
});

var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');
var authRouter = require('./routes/auth');

// app.use(function(req, res, next){
// 	if(!req.secure){
//     console.log(`http://${req.hostname}:${APPPORT}${req.url}`);

// 		next();
//     // res.redirect(`http://${req.hostname}:${APPPORT}${req.url}`);
// 	}else{
//     console.log(`http://${req.hostname}:${APPPORT}${req.url}`);
//     res.redirect(`http://${req.hostname}:${APPPORT}${req.url}`);
// 	}
// });
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