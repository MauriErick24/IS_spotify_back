const {Pool} = require('pg')

const pool = new Pool({
    connectionString: "postgres://postgres2:S3RQnMqlJQQ0gkFIeuDmGzXcZk1TvUNe@dpg-ckfb6eeafg7c739kur80-a.oregon-postgres.render.com/spotify2023?sslmode=no-verify"
})

module.exports = pool