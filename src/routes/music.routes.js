const {Router} = require("express")
const {obtenerListaCanciones} = require("../controllers/music.controller")

const router = Router()

router.get("/spotify", obtenerListaCanciones)

module.exports = router