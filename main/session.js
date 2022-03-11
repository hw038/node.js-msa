var express = require('express')
var parseurl = require('parseurl')
const session = require("express-session")
let RedisStore = require("connect-redis")(session)

// redis@v4
const { createClient } = require("redis")
let redisClient = createClient({ legacyMode: true })
redisClient.connect().catch(console.error)

var app = express()

app.use(session({
  secret: 'awkefjl#!@$!fkawegwef',
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({ client: redisClient })
}))

app.get('/', function (req, res, next) {
  if(req.session.num === undefined){
    req.session.num = 1;
  }else{
    req.session.num = req.session.num + 1;
  }
  res.send(`View : ${req.session.num}`);
})

app.listen(3000, function(){
  console.log('3000!');
});