const express = require("express");
const router = express.Router();
const { user } = require('../models');
const { validationResult } = require('express-validator');
const auth = require('../middlewares/auth');
const validator = require('../middlewares/validator');
const UserService = require('../services/user');

const userService = new UserService(user);


router.get('/', auth, async (req, res) => {

    let inactive = req.query.inactive;

    let user = await userService.find(inactive);

    return res.status(200).json(user);
});

router.get('/:id', auth, async (req, res) => {

    let user = await userService.get(req.params.id);

    return res.status(200).json(user);
});

router.post('/register', validator('createUser'),

    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try {
            let createdUser = await userService.create(req.body);

            return res.status(201).send(createdUser);
        } catch(erro) {

            return res.status(400).send(erro.message);
        }
});

router.post('/', [ auth, validator('createUser') ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try {
            let createdUser = await userService.create(req.body);

            return res.status(201).send(createdUser);
        } catch(erro) {

            return res.status(400).send(erro.message);
        }
});

router.post('/restore/:id', auth,
    async (req, res) => {
        try {
            await userService.restore(req.params.id);

            return res.status(201).send('User successfully restored!');
        } catch(erro) {

            return res.status(400).send(erro.message);
        }
});

router.put('/:id', [ auth, validator('updateUser') ],

    async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {

        return res.status(400).json({errors: errors.array()});
    }

    let userData = req.body;
    try {
        let user = await userService.update(req.params.id, userData);

        return res.status(202).send(user);
    } catch(erro) {

        return res.status(400).send(erro.message);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await userService.destroy(req.params.id);

        return res.status(200).send('User successfully deleted!');
    } catch(erro) {

        return res.status(400).send(erro.message);
    }
});

module.exports = router;