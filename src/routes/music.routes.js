const {Router} = require("express")
const {obtenerListaCanciones, obtenerCancion, subirCancion, borrarCancion, actualizarCancion, buscarCanciones} = require("../controllers/music.controller")

const router = Router()

router.get("/spotify/buscar", buscarCanciones);
router.get("/spotify", obtenerListaCanciones)
router.get("/spotify/:id", obtenerCancion);
router.post("/spotify", subirCancion);
router.delete("/spotify/:id", borrarCancion);
router.put("/spotify/:id", actualizarCancion);

module.exports = router