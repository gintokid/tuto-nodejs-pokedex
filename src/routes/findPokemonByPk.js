import auth from "../auth/auth.js"
import { Pokemon } from '../db/sequelize.js'

export default (app) => {
    app.get('/api/pokemons/:id', auth, (req, res) => {
        Pokemon.findByPk(req.params.id)
            .then(pokemon => {
                const message = `Le pokemon d'id ${req.params.id} a été trouvé`
                res.json({ message, data: pokemon })
            })
    })
}