const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const port = 3000
app.use(bodyParser.json())
require ("./db-conection")
module.exports = {
    port : port,
    app : app
}