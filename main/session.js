const express = require('express');
const session = require("express-session")
let RedisStore = require("connect-redis")(session)
const Redis = require('ioredis');
const bodyParser = require('body-parser');
const fs = require('fs');
// const client = redis.createClient();

let redisClient = new Redis({
  port: 3000,
  host: "172.30.1.16"
})
const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

var PORT = process.env.PORT || 3000;

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: "keyboard cat",
    resave: false,
  })
)
app.get('/', (req, res) => {
    res.status(200).send({ 'message': 'Try another URI' });
});

// const publisher = redis.createClient(6379, '172.30.1.16')
// publisher.connect().catch(console.error)

// publisher.on("error", function(error) {
//     console.error(error);
// });


// app.get('/', (req, res) => {
//     res.status(200).send({ 'message': 'Try another URI' });
// });

// app.post('/load', async (req, res) => {
//     const data = req.body;
//     console.dir(req.body);
//     const id = req.body.id;
//     console.log("New ID is", id);
//     // return res.status(201).json({id});
//     // const result = await publisher.set("test", "some sample text", redis.print);
//     const result = await publisher.hSet(id, req.body, (err, result) => {
//         if(err) {
//             console.log('ERROR: failed to load contents');
//             console.log(err);
//             res.status(500).json(err);
//         }
//         else {
//             console.log('SUCCESS: Loaded contents into collection');
//             console.log(result);
//             return res.status(201).json({result});
//         }
//     });
// });

// app.get('/load', async(req, res) => {
//     const key = "asjhdfw873465askfjb";
//     const response = await publisher.hGetAll(key);
//     console.log(response);
//     return res.status(200).json(response);
// })

app.listen(PORT, () => {
    console.log(`Redis PUBLISHER NodeJS application in port ${PORT}`);
});