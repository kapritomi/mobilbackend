const express = require('express')
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

app.get('/listakarszerintnov', (req, res) => {
    kapcsolat()

    connection.query('SELECT * from listak order by listak_ar ASC', (err, rows, fields) => {
        if (err) throw err


        res.send(rows)
    })
    connection.end()
})

app.get('/listakarszerintcsokk', (req, res) => {
    kapcsolat()

    connection.query('SELECT * from listak order by listak_ar DESC', (err, rows, fields) => {
        if (err) throw err


        res.send(rows)
    })
    connection.end()
})

app.get('/listakdatumszerintnov', (req, res) => {
    kapcsolat()

    connection.query('SELECT * from listak order by listak_datum ASC', (err, rows, fields) => {
        if (err) throw err


        res.send(rows)
    })
    connection.end()
})

app.get('/listakdatumszerintcsokk', (req, res) => {
    kapcsolat()

    connection.query('SELECT * from listak order by listak_datum DESC', (err, rows, fields) => {
        if (err) throw err


        res.send(rows)
    })
    connection.end()
})


app.get('/honapok', (req, res) => {
    kapcsolat()

    connection.query('SELECT MONTHNAME(listak_datum) AS honap, SUM(listak_ar) AS ar FROM `listak` GROUP BY YEAR(listak_datum), MONTH(listak_datum);', (err, rows, fields) => {
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

app.delete('/regilistatorles', (req, res) => {
    kapcsolat()

    connection.query('DELETE FROM `listak` WHERE listak_datum < (SELECT CURDATE() - INTERVAL 3 MONTH FROM `listak` LIMIT 1);', (err, rows, fields) => {
        if (err)
            console.log(err)
        else {
            console.log(rows)
            res.send(rows)
        }
    })
    connection.end()

})

app.delete('/listatorles', (req, res) => {
    kapcsolat()

    connection.query('DELETE FROM `listak` WHERE listak_id = "' + req.body.bevitel5 + '"', (err, rows, fields) => {
        if (err)
            console.log(err)
        else {
            console.log(rows)
            res.send(rows)
        }
    })
    connection.end()

})

app.post('/arfel', (req, res) => {
    kapcsolat()

    connection.query('UPDATE `listak` SET `listak_ar`= "' + req.body.bevitel3 + '" WHERE listak_id = "' + req.body.bevitel4 + '"', function (err, rows, fields) {
        if (err)
            console.log(err)
        else {
            console.log(rows)
            res.send(rows)
        }
    })
    connection.end()

})

app.get('/aktualis', (req, res) => {
    kapcsolat()

    connection.query('SELECT * FROM `listak` WHERE listak_datum > CURRENT_DATE();', (err, rows, fields) => {
        if (err) throw err


        res.send(rows)
    })
    connection.end()
})

app.post('/felhasznaloossz', (req, res) => {
    kapcsolat()

    connection.query('SELECT count(listak_nev) as osszes  FROM `listak` WHERE `letrehozofelhasznalo` = "' + req.body.bevitel1 + '";', function (err, rows, fields) {
        if (err)
            console.log(err)
        else {
            console.log(rows[0])
            res.send(rows)

        }
    })
    connection.end()

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
