const dotEnv = require('dotenv');
const jwt = require('jsonwebtoken');
dotEnv.config();

const JWTSecret = process.env.JWT_SECRET;

const auth = (req, res, next) => {

    try {
        const authToken = req.headers['authorization'];

        if(!authToken) {
            return res.status(400).json('Token not found!');
        }

        const token = authToken.split(' ').pop();

        if(token) {
            jwt.verify(token, JWTSecret, (error, data) => {

                if(error) {
                    throw new Error('Invalid Token');
                }

                req.token = token;
            })
            next();
        }
    } catch(error) {
        return res.status(400).send(error.message);
    }
}

module.exports = auth;