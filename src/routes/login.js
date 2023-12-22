const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')

module.exports = (app) => {
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

                const message = 'Utilisateur connecté';
                return res.json({ message, data: user })
            })
        }).catch(error => {
            const message = `L'utilisateur n'a pas pu etre connecté`
            return res.status(400).json({ message, data: error })
        })
    })
}