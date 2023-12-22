const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')


// instantion express et ajouter les middleware
const app = express()
const port = 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())




app.get('/', (req, res) => res.send('Hello, Express avec nodemon !!!  👍👍'))

// Recuperation d'un pokemon
app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(poke => poke.id == id)
    res.json(success(`Pokemon n° ${id} trouvé`, pokemon))
}
)

// Recuperation du nombre de pokemons
app.get('/api/pokemons/', (req, res) => {
    const count = pokemons.length
    const message = `${count} pokemons ont été trouvés`
    res.json(success(message, pokemons))
}
)

app.post('/api/pokemons/', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } }
    pokemons.push(pokemonCreated)
    const message = `Le pokemon ${pokemonCreated.name} a été créé`
    res.json(success(message, pokemonCreated))
})

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = { ...req.body, id: id }
    pokemons = pokemons.map(pokemon => {
        return pokemon.id == id ? pokemonUpdated : pokemon
    })

    const message = `Le pokemon ${pokemonUpdated.name} (id ${id}) a été modifié`
    res.json(success(message, pokemonUpdated))
})

app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)

    const message = `Le pokemon ${pokemonDeleted.name} (id ${id}) a été supprimé`
    res.json(success(message, pokemonDeleted))
})


app.listen(port, () => console.log(`Notre appli Node est started on : http://localhost:${port}`))
