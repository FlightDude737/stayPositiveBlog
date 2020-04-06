const fs = require("fs")
const express = require("express")
const request = require("request")

let usernameSet = "User"
const dataBuffer = fs.readFileSync("info.json")

if (JSON.parse(fs.readFileSync('info.json').toString() == "")) {
  fs.writeFileSync('info.json', "[]")
}

const app = express()

app.set("view engine", "hbs")
app.set("views", "public")
app.use(express.static("/public"))

app.get('/', (req, res) => {
  res.render('index.hbs', {
    username: usernameSet
  })
})

app.get('/login', (req, res) => {
  res.render('login.hbs')
})

app.get('/login/authenticate', (req, res) => {
  if (!req.query.username || !req.query.password) {
    res.send("There is no username or password. Please input your credidentials.")
  } else {
    var url = 'https://api.hashify.net/hash/sha512/hex?value=' + req.query.password
    request( { url, json: true }, function (error, response) { 
      if ( error ) {
        console.log(error)
      } else {
        let passwordHashLogin = response.body.Digest
        console.log(passwordHashLogin)
        const dataBuffer = fs.readFileSync('info.json')
        const dataJSON = dataBuffer.toString()
        const info = JSON.parse(dataJSON)
        console.log(info)
        info.forEach((data) => {
          if (data.username == req.query.username) {
            console.log(data.username)
            if (data.password == passwordHashLogin) {
              res.render('index.hbs', {
                username: req.query.username
              })
            } else {
              console.log("no match password")
            }
          } else {
            console.log('no username')
          }
        })
      }
    })
  }
})

app.get('/sign-up', (req, res) => {
  res.render('signup.hbs')
})

app.get('/users', (req, res) => {
  if(!req.query.username && !req.query.password){
    return res.send({
      error: "No value was provided."
    })
  } else {
    var url = 'https://api.hashify.net/hash/sha512/hex?value=' + req.query.password
    request( { url, json: true }, function (error, response) { 
      if ( error ) {
        res.send(error)
      } else {
        let passwordHash = response.body.Digest
        try{
          const dataBuffer = fs.readFileSync('info.json')
          const dataJSON = dataBuffer.toString()
          const info = JSON.parse(dataJSON)
          info.push({
            username: req.query.username,
            password: passwordHash
          })
          const finalData = JSON.stringify(info)
          fs.writeFileSync('info.json', finalData)
        } catch (e) {
            console.log(e)
        }
      }
    })
    res.send("<html><script>window.location = 'https://staypositiveblog--flightdude737.repl.co/login';</script></html>")
  }
})

app.get('*', (req, res) => {
  res.render('404.hbs')
})

app.listen(3000, () => {
  console.log("The server is up on port 3000.")
})