const { body, query, param } = require("express-validator");
const { ObjectId } = require("mongodb");
class UserValidator {
    validateUserData = () => {
        return [
            body('cedula').optional({ checkFalsy: true }).isNumeric().withMessage('The cedula is mandatory'),
            body('names').optional({ checkFalsy: true }).isString().withMessage('The name is mandatory'),
            body('nick').notEmpty().isString().withMessage('Send the nickname you will have in the system'),
            body('password').optional({ checkFalsy: true }).isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
            .matches(/\d/).withMessage('Debe contener al menos un número.')
            .matches(/[A-Z]/).withMessage('Debe contener al menos una letra mayúscula.')
            .matches(/[a-z]/).withMessage('Debe contener al menos una letra minúscula.')
            .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Debe contener un carácter especial.'),
            body('email').notEmpty().isEmail().withMessage('Send the email'),
            body('phone').optional({ checkFalsy: true }).isString().withMessage('Send the phone'),
            body('role', 'The role was not sent').optional({ checkFalsy: true }).exists().custom((value) => {
                if (value && !['Usuario Estandar', 'Usuario VIP', 'Administrador'].includes(value)) {
                    throw new Error(`There are only three roles available 'Usuario Estandar', 'Usuario VIP', 'Administrador'`);
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    validateUserDataEmpty = () => {
        return [
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };

    validateUserId = () => {
        return [
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            }),
            body().custom((value, { req }) => {
                if (Object.keys(req.body).length > 0) {
                    throw new Error('Do not send anything in the body');
                }
                return true;
            })
        ];
    };

    validateUserUpdateDataById = () => {
        return [   
            body('cedula').isNumeric().withMessage('The cedula is mandatory'),
            body('names').isString().withMessage('The name is mandatory'),
            body('nick').notEmpty().isString().withMessage('Send the nickname you will have in the system'),
            body('email').notEmpty().isEmail().withMessage('Send the email'),
            body('phone').isString().withMessage('Send the phone'),
            body('role', 'The role was not sent').notEmpty().exists().custom((value) => {
                if (value && !['Usuario Estandar', 'Usuario VIP', 'Administrador'].includes(value)) {
                    throw new Error(`There are only three roles available 'Usuario Estandar', 'Usuario VIP', 'Administrador'`);
                }
                return true;
            }),
            param('id').custom((value, { req }) => {
                if (!ObjectId.isValid(value)) {
                    throw new Error('Submit a valid ID');
                }
                return true;
            }),
            query().custom((value, { req }) => {
                if (Object.keys(req.query).length > 0) {
                    throw new Error(`Don't send anything in the url`);
                }
                return true;
            })
        ];
    };
}

module.exports = UserValidator;
