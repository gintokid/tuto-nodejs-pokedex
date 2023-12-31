import auth from '../auth/auth.js'
import { Pokemon } from '../db/sequelize.js'

export default (app) => {
    app.delete('/api/pokemons/:id', auth, (req, res) => {
        Pokemon.findByPk(req.params.id)
            .then(pokemon => {
                if (pokemon === null) {
                    const message = `Le pokemon a supprimer n'existe pas`
                    return res.status(404).json({ message })
                }
                const pokemonDeleted = pokemon
                return Pokemon.destroy({
                    where: { id: pokemon.id }
                })
                    .then(_ => {
                        const message = `Le pokémon avec l'identifiant n°${pokemon.id} a bien été supprimé.`
                        res.json({ message, data: pokemon })
                    })
                    .catch(error => {
                        const message = `Le pokemon n'a pas pu etre supprimé. Ressayez dans quelques instants.`
                        res.status(500).json({ message, data: error })
                    })
            })
    })
}