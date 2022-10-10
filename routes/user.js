const express = require("express")
const mysql = require("mysql8")

const router = express.Router()

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "password",
  database: "projects"
})

function getConnection() {
  return pool
}

router.post("/users", (req, res) => {  
  const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)"
  const firstName = req.body.first_name
  const lastName = req.body.last_name

  getConnection().query(queryString, [firstName, lastName], (err, result, fields) => {
    if (err) {
      console.log("Failed to insert new user:" + err)
      res.sendStatus(500)
      return
    }

    console.log("Inserted a new user with Id: ", result.insertId)
    res.end()
  })

  res.end()
})

router.get("/users", (req, res) => {
  const queryString = "SELECT * FROM users"

  getConnection().query(queryString, (err, result, fields) => {
    res.status(200).json(result)
  })
})

router.get("/users/:id", (req, res) => {
  const queryString = `SELECT * FROM users WHERE id=?`
  const userId = req.params.id

  getConnection().query(queryString, [userId], (err, result, fields) => {
    if (err) {
      console.log("Failed to query for users:" + err)
      res.sendStatus(500)
      return
    }
    // Rename fields, and omit id column
    users = result.map(user => {
      return {firstName: user.first_name, lastName: user.last_name}
    })
    res.status(200).json(users[0])
  })
})

module.exports = router