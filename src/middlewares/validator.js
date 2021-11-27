const { check, body } = require('express-validator')

const validate = (method) => {
    switch (method) {

      case 'createUser': {
       return [
        check('name').not().isEmpty(),
        check('phone').not().isEmpty().trim().matches('([\(]?[1-9]{2}[\)]?)([0-9]{4,5}[\-]?[0-9]{4})').withMessage('Invalid Phone'),
        check('email').not().isEmpty().isEmail(),
        check('password').not().isEmpty().isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,30}$/, "i").withMessage('Invalid Password'),
        check('birthday').not().isEmpty().isDate().withMessage('Invalid Date'),
       ]
      };

      case 'updateUser': {
        return [
        check('phone').if(body('phone').exists()).trim().matches('([\(]?[1-9]{2}[\)]?)([0-9]{4,5}[\-]?[0-9]{4})').withMessage('Invalid Phone'),
        check('email').if(body('email').exists()).isEmail(),
        check('password').if(body('password').exists()).isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,30}$/, "i").withMessage('Invalid Password'),
        check('birthday').if(body('birthday').exists()).isDate().withMessage('Invalid Date'),
        ]
      };
    }
}

module.exports = validate