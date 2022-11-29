const express = require('express')
const app = express()
const port = 3000

app.use(express.json())


app.get('/listak', (req, res) => {
    const mysql = require('mysql')
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'bevasarlolista'
    })
    
    connection.connect()
    
    connection.query('SELECT * from listak', (err, rows, fields) => {
      if (err) throw err
    
      res.send(rows)
    })
    
    connection.end()
  })


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })