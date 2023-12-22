const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

// instantion express et ajouter les middleware
const app = express()
const port = process.env.PORT || 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())


app.get('/', (req, res) => {
    res.json('Hello, Heroku ! 😊👌')
})

// init de la base
sequelize.initDb()



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
