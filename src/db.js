const {Pool} = require('pg')

const pool = new Pool({
    user: "postgres",
    password: "hola",
    host: "localhost",
    port: 5432,
    database: "Prueba"
})

module.exports = pool