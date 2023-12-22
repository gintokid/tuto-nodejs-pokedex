const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require("../auth/auth")

module.exports = (app) => {
    app.get('/api/pokemons', auth, (req, res) => {
        if (req.query.name) {
            const name = req.query.name
            const limit = parseInt(req.query.limit) || 5

            if (name.length < 2) {
                const message = 'Le terme de recherche doit contenir au moins 2 caractères'
                return res.status(400).json({ message })
            }

            return Pokemon.findAndCountAll({
                where: {
                    name: {  // ici name est la propriété du modele
                        [Op.like]: `%${name}%` // ici name est le critere de la recherche
                    }
                },
                order: ['name'],
                limit: limit
            }).then(({ count, rows }) => {
                const message = `La liste des pokemons a bien été recue (${count}) `
                res.json({ message, data: rows })
            })
        }
        else {
            Pokemon.findAll({ order: ['name'] })
                .then(pokemons => {
                    const message = `La liste des pokemons a bien été recue (${pokemons.length}) `
                    res.json({ message, data: pokemons })
                }).catch(error => {
                    const message = `La liste des pokemons n'a pas pu etre recuperée. Ressayez dans quelques instants.`
                    res.status(500).json({ message, data: error })
                })
        }
    })
}