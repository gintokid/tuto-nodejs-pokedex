import express from 'express'
import favicon from 'serve-favicon'
import bodyParser from 'body-parser'
import { initDb } from './src/db/sequelize.js'
import cors from 'cors'

import findAllPokemons from './src/routes/findAllPokemons.js'
import findPokemonByPk from './src/routes/findPokemonByPk.js'
import createPokemon from './src/routes/createPokemon.js'
import updatePokemon from './src/routes/updatePokemon.js'
import deletePokemon from './src/routes/deletePokemon.js'
import login from './src/routes/login.js'


// instantion express et ajouter les middleware
const app = express()
const port = process.env.PORT || 3000

app
    .use(favicon('./favicon.ico'))
    .use(bodyParser.json())
    .use(cors())


app.get('/', (req, res) => {
    res.json('Hello, Heroku ! 😊👌')
})

// init de la base
initDb()



// Points de terminaisons
findAllPokemons(app)
findPokemonByPk(app)
createPokemon(app)
updatePokemon(app)
deletePokemon(app)
login(app)


// on ajoute la gestion des erreurs 404
app.use(({ res }) => {
    const message = 'Impossible de trouver la ressource demandée.'
    res.status(404).json({ message })
})

// 
app.listen(port, () => console.log(`Notre appli Node est started on : http://localhost:${port}`))
