import auth from '../auth/auth'
import { Pokemon } from '../db/sequelize'

export default (app) => {
    app.get('/api/pokemons/:id', auth, (req, res) => {
        Pokemon.findByPk(req.params.id)
            .then(pokemon => {
                const message = `Le pokemon d'id ${req.params.id} a été trouvé`
                res.json({ message, data: pokemon })
            })
    })
}