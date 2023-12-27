import { ValidationError } from 'sequelize'
import { Pokemon } from '../db/sequelize'
import auth from '../auth/auth'

export default (app) => {
    app.put('/api/pokemons/:id', auth, (req, res) => {
        const id = req.params.id
        Pokemon.update(req.body, {
            where: { id, id }
        })
            .then(_ => {
                return Pokemon.findByPk(id).then(pokemon => {
                    if (pokemon === null) {
                        const message = `Le pokemon demandé n'existe pas`
                        return res.status(404).json({ message })
                    }
                    const message = `Le pokemon ${pokemon.name}} a été modifié`
                    res.json({ message, data: pokemon })
                })
            }).catch(error => {
                if (error instanceof ValidationError) {
                    res.status(400).json({ message: error.message, data: error })
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: error.message, data: error })
                }
                const message = `Le pokemon n'a pas pu etre modifié. Ressayez dans quelques instants.`
                res.status(500).json({ message, data: error })
            })
    })
}