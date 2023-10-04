const pool = require("../db");

const obtenerListaCanciones = async (req, res) => {
  try {
    const listaCanciones = await pool.query("SELECT * FROM cancion")
    res.json(listaCanciones.rows)
  }catch (error) {
    console.log(error.message)
  }

};

module.exports = {
    obtenerListaCanciones,
};