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

app.get('*', (req, res) => {
  res.render('404.hbs')
})

app.listen(3000, () => {
  console.log("The server is up on port 3000.")
})

const jsonData = {
  username: username,
  password: password
}

fs.appendFileSync(jsonData)