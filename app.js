import express from 'express'
import favicon from 'serve-favicon'
import { json } from 'body-parser'
import { initDb } from './src/db/sequelize'
import cors from 'cors'

// instantion express et ajouter les middleware
const app = express()
const port = process.env.PORT || 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(json())
    .use(cors())


app.get('/', (req, res) => {
    res.json('Hello, Heroku ! 😊👌')
})

// init de la base
initDb()



// Points de terminaisons
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)



// on ajoute la gestion des erreurs 404
app.use(({ res }) => {
    const message = 'Impossible de trouver la ressource demandée.'
    res.status(404).json({ message })
})

// 
app.listen(port, () => console.log(`Notre appli Node est started on : http://localhost:${port}`))
