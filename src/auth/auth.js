import jsonwebtoken from 'jsonwebtoken';
import privateKey from '../auth/private_key.js';

export default (req, res, next) => {

    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'entete de la requete`
        return res.status(401).json(message)
    }

    const token = authorizationHeader && authorizationHeader.split(' ')[1];
    jsonwebtoken.verify(token, privateKey, (error, decodedToken) => {
        console.log('DECODED', decodedToken);
        if (error) {
            const message = `L'utilisateur n'est pas autorisé a acceder à cette ressource`
            return res.status(401).json({ message, data: error })
        }

        const userId = decodedToken.userId
        if (req.body.userId && req.body.userId != userId) {
            const message = `L'identifiant utilisateur est invalide`
            return res.status(401).json(message)
        }
        else {
            next()
        }
    })
};
