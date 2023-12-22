const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemons.js')
const UserModel = require('../models/users.js')
let pokemons = require('./mock-pokemon.js')
const bcrypt = require('bcrypt')


// creation et config de l'instance sequelize 
let sequelize
if (process.env.NODE_ENV = 'production') {

    sequelize = new Sequelize(
        'y2ky4qav5i5wpzhy',
        'y6mrm0b2x0uj1wce',
        'oqdlqyml13s5hil9',
        {
            host: 'klbcedmmqp7w17ik.cbetxkdyhwsb.us-east-1.rds.amazonaws.com	',
            dialect: 'mariadb',
            dialectOptions: {
                timezone: 'Etc/GMT-2'
            },
            logging: true
        }
    )
} else {
    sequelize = new Sequelize(
        'pokedex',
        'root',
        '',
        {
            host: 'localhost',
            dialect: 'mariadb',
            dialectOptions: {
                timezone: 'Etc/GMT-2'
            },
            logging: false
        }
    )
}

// creation model pokemon
const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

//connexion
sequelize.authenticate()
    .then(_ => console.log('Connexion a la base de données etablie'))
    .catch(error => console.error(`Error lors de la connexion à la base de données ${error}`))

// ajout middleware custom logger
// app.use((req, res, next) => {
//     console.log(`${new Date().toLocaleTimeString()} - URL : ${req.url}`);
//     next()
// })


// syncronisation pour creer automatiquement les tables dans la BDD
// force true pour supprimer tes tables si elles existent
const initDb = () => {
    sequelize.sync()
        .then(_ => {
            console.log('Base de donnée pokedex synchronisée')

            pokemons.map(pokemon => {

                Pokemon.create({
                    name: pokemon.name,
                    hp: pokemon.hp,
                    cp: pokemon.cp,
                    picture: pokemon.picture,
                    types: pokemon.types
                }).then(bulbi => console.log(bulbi.toJSON()))
            })

            bcrypt.hash('kanto', 10)
                .then(hash => {
                    User.create({
                        username: 'kanto',
                        password: hash
                    }).then(user => console.log(user.toJSON()))
                })
        })

    console.log('Base de donnée initialisée !')
}

module.exports = { initDb, Pokemon, User }