const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3002;
const app = express();
app.use(bodyParser.json());
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'test',
    user: 'root',
    password: ''
});

//Route
app.get('/', (req, res) => {
    res.send('Welcome');
});

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
        res.json(results);
        }else{
        res.send('Not results')
    }
    });
});

app.get('/users/:id', (req, res) => {
    const {id} = req.params
    const sql = `SELECT * FROM users WHERE id = ${id}`;
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
        res.json(results);
        }else{
        res.send('Not results')
    }
    });
});

app.post('/users/add', (req, res) => {
    const sql = 'INSERT INTO users SET ?';
    const usersobj = {
        nombre: req.body.nombre,
        apellido: req.body.apellido
    }

    connection.query(sql, usersobj, error => {
        if(error) throw error;
        res.send('user created')
    });
});

app.put('/users/update/:id', (req, res) => {
    const { id } = req.params;
    const {nombre, apellido} = req.body;
    const sql = `UPDATE users SET nombre = '${nombre}', apellido = '${apellido}' 
    WHERE id = ${id}`;

    connection.query(sql, error => {
        if(error) throw error;
        res.send('user updated')
    });
});

app.delete('/users/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM users WHERE id = ${id}`;
    connection.query(sql, error => {
        if(error) throw error;
        res.send('Delete updated')
    });
});

connection.connect(error => {
    if(error) throw error;
    console.log('CONEXION EXITOSA');
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
//Mostrar

/* connection.query('SELECT * FROM usuarios', function(error, filas){
    if(error){
        throw error;
    }else{
        filas.forEach(fila => {
            console.log(fila);
        });
    }
}); */

//Insertar