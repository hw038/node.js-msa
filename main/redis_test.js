import express from "express"
import redis from "redis"
import fetch from "node-fetch"




const REDIS_PORT = 6379
const PORT = 5000
const app = express()
const client = redis.createClient(REDIS_PORT)
const GIT_URL = 'https://api.github.com/users/'


const getRepos = async (req, res, next) => {
    console.log("s1-1");
    try{
         console.log("s1-1");
         const { username } = req.params
         const response = await fetch(`${GIT_URL}${username}`) 
         const data = await response.json()
         const repos = data.public_repos
         client.set(username, repos)
         res.send(genView(username, repos))
    }catch(e){
        console.log("s1-2");
        if(e) console.log("error: " ,e)
    }
 }

 const genView = (username, repos) => {
    return `<h1>${username} \'s numbers of repositories are ${repos}</h1>`
}
const getCache = (req, res, next) => {
    console.log("g1-1");
    const { username } = req.params
client.get(username, (err, data) => {
        if(err) throw err;
        if(data){
            res.send(genView(username, data))
        }else{
            next()
        }
    })
}
app.get('/:hw038',getCache, getRepos);

app.listen(PORT, () => console.log('server started...'))


