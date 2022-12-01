const express = require('express')
<<<<<<< HEAD
const mysql = require('mysql')
const app = express()
const port = 3000
const cors = require('cors')
var connection

function kapcsolat() {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'bevasarlolista'
    })
}



app.use(express.json())
app.use(cors())



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/listak', (req, res) => {
    kapcsolat()

    connection.query('SELECT * from listak', (err, rows, fields) => {
        if (err) throw err


        res.send(rows)
    })
    connection.end()
})

app.post('/tartalomfel', (req, res) => {
    kapcsolat()

    connection.query('INSERT INTO `listak` VALUES (NULL, "' + req.body.bevitel1 + '",CURDATE(), "' + req.body.bevitel2 + '");', function (err, rows, fields) {
        if (err)
            console.log(err)
        else {
            console.log(rows)
            res.send(rows)
        }
    })
    connection.end()

})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
=======
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
>>>>>>> 373b6dab7bbd3b25b6bfb869e0b3d16451e96bb8
