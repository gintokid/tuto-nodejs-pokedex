import { User } from '../db/sequelize.js'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import privateKey from '../auth/private_key.js'

export default (app) => {
    app.post('/api/login', (req, res) => {

        User.findOne({ where: { username: req.body.username } }).then(user => {

            if (!user) {
                const message = `L'utilisateur n'existe pas`
                return res.status(400).json({ message, data: user })
            }

            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                if (!isPasswordValid) {
                    const message = `Password incorrect`
                    return res.status(400).json({ message, data: user })
                }

                //Jeton JWT
                const token = jsonwebtoken.sign(
                    { userId: user.id }
                    , privateKey
                    , { expiresIn: '24h' }
                )

                const message = 'Utilisateur connecté';
                return res.json({ message, data: user, token })
            })
        }).catch(error => {
            const message = `L'utilisateur n'a pas pu etre connecté`
            return res.status(400).json({ message, data: error })
        })
    })
}