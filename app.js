const express = require("express")
const morgan = require("morgan")
const router = require("./routes/user")

const app = express()
// Serve static file
app.use(express.static('./public'))
// app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("combined"))
app.use(router)

app.get("/", (req, res) => {
  console.log("Responding to root route")
  res.status(200).send("Hello from ROOT")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Server is listening on 3000 ...")
})