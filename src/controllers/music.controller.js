const pool = require("../db");

const obtenerListaCanciones = async (req, res) => {
    try {
        const listaCanciones = await pool.query(
        "SELECT c.*, a.nombre AS artista FROM cancion c, usuario a WHERE idartista=idusuario"
        );
        res.json(listaCanciones.rows);
    } catch (error) {
        console.log(error.message);
    }
};

const obtenerCancion = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
        "SELECT c.*, a.nombre AS artista FROM cancion c, usuario a WHERE idartista=idusuario and idcancion = $1", [id]
        );

    if (result.rows.length === 0) {
        return res.status(404).json({
        message: "Canción no encontrada",
        });
    }
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
};

const subirCancion = async (req, res) => {
    try {
        const { idartista, titulo, genero, anio } = req.body;

        const result = await pool.query(
        "INSERT INTO cancion (idartista, titulo, genero, anio) VALUES($1, $2, $3, $4) RETURNING *",
        [idartista, titulo, genero, anio]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.json({ error: error.message });
    }
};

const borrarCancion = async (req, res) => {
    try{
    const { id } = req.params;
    const result = await pool.query(
    "DELETE FROM cancion WHERE idcancion = $1 RETURNING *", [id]
    );

    if (result.rowCount === 0) {
        return res.status(404).json({
        message: "Canción no encontrada",
        });
    }
    return res.sendStatus(204);
    }catch (error) {
        console.log(error.message);
        res.json({ error: error.message });
    }
};

const buscarCanciones = async (req, res) => {
    try {
        const { busqueda, tipoBusqueda } = req.query;
        const busquedaLimpia = busqueda.trim();
        let listaCanciones
        if(busquedaLimpia === ""){
            listaCanciones = await pool.query(
                "SELECT c.*, a.nombre AS artista FROM cancion c, usuario a WHERE idartista=idusuario"
            );    
        }
        if(tipoBusqueda == "artista"){
            listaCanciones = await pool.query(
                "SELECT c.*, a.nombre AS artista FROM cancion c, usuario a WHERE c.idartista = a.idusuario AND (similarity(a.nombre, $1) > 0.1 OR a.nombre ILIKE '%' || $1 || '%')", [busqueda]
            );
        }else{
           if(tipoBusqueda == "titulo"){
            listaCanciones = await pool.query(
                "SELECT c.*, a.nombre AS artista FROM cancion c, usuario a WHERE c.idartista = a.idusuario AND (similarity(c.titulo, $1) > 0.1 OR c.titulo ILIKE '%' || $1 || '%')", [busqueda]
            ); 
           } 
        }
        res.json(listaCanciones.rows);
    } catch (error) {
        console.log(error.message);
        res.json({ error: error.message });
    }
}

const actualizarCancion = (req, res) => {
    res.send("Actualizar canción");
};

const agregarCancionPlaylist  = async (req, res) => {    
    try {
        const {idCancion, idUsuario, nomPlaylist} = req.query;
        const result = await pool.query(
            "INSERT INTO cancionesPlaylists (idCancion, idPlaylist) VALUES ($1, (SELECT idPlaylist FROM playlist WHERE idUsuario = $2 AND nombre = $3)) RETURNING *", [idCancion, idUsuario, nomPlaylist]
            );
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.json({ error: error.message });
    }
}

module.exports = {
    obtenerListaCanciones,
    obtenerCancion,
    subirCancion,
    borrarCancion,
    actualizarCancion,
    buscarCanciones,
    agregarCancionPlaylist,
}