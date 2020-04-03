const fs = require("fs")
const express = require("express")

const app = express()

app.set("view engine", "hbs")
app.set("views", "public")
app.use(express.static("/public"))

app.get('/', (req, res) => {
  res.render('index.hbs')
})

app.get('/login', (req, res) => {
  res.render('login.hbs')
})

app.get('/users', (req, res) => {
  if(!req.query.username && !req.query.password){
    return res.send({
      error: "No value was provided."
    })
  } else {
    let cred = {
      username: req.query.username,
      password: req.query.password
    }
    const accountData = JSON.stringify(cred)
    fs.appendFileSync('info.txt', accountData)
    res.send(accountData)
  }
})

app.get('*', (req, res) => {
  res.render('404.hbs')
})

app.listen(3000, () => {
  console.log("The server is up on port 3000.")
})
let username = "hello"
let password = "hello"

const jsonDataObject = {
  username: username,
  password: password
}

const jsonData = JSON.stringify(jsonDataObject)
fs.writeFileSync("info.txt", jsonData)