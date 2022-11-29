const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
const cors = require('cors')

app.use(express.static('kepek'))
app.use(express.json())
app.use(cors())



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/listak', (req, res) => {

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