const express = require("express")
const morgan = require("morgan")

const musicRoutes = require("./routes/music.routes")

const app = express()

app.use(morgan("dev"))
app.use(express.json());
app.use(musicRoutes)


app.listen(4000)
console.log("Server on port 4000")
