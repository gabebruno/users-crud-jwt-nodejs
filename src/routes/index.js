const express = require('express');
const dotEnv = require('dotenv');
const jwt = require('jsonwebtoken');
const models = require('../models');
const bcrypt = require('bcryptjs');

dotEnv.config();

const JWTSecret = process.env.JWT_SECRET;
const userRouter = require('./user');

const router = express.Router();

router.use('/api/users', userRouter);

router.post('/api/login',
  async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await models.user.findOne({
            where: {
                email: email
            }
        });
        console.log(email)

        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }

        jwt.sign({ id: user.id, email: user.email }, JWTSecret, { expiresIn: "1h" }, (err, token) => {
            if(err) {
                return res.status(500).json('Internal server error!');
            }

            return res.status(200).json({token: token});

        })
    } catch(erro) {
            return res.status(401).send('Something wrong, try again later.');
    }
});

module.exports = router;