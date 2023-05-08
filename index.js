const {app, port} = require("./lib/appServer").app
const router = require("./routes/router")

app.use("/router", router)
app.listen(port, () => {
  console.log("Example app listening on port ${port}")
})
