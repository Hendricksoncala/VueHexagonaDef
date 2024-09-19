// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const UserController = require('../controllers/userController.cjs');
const UserValidator = require('../validator/userValidator.cjs');
const { auth } = require('../../infrastructure/middlewares/auth.cjs');
const sessionAuth = require('../../infrastructure/middlewares/sessionLogin.cjs');

const router = express.Router();
const userController = new UserController();
const userValidator = new UserValidator();

//rutas de login
router.post('/login', sessionAuth, (req, res) => userController.login(req, res));
router.get('/vefiryToken', sessionAuth, auth, (req, res) => res.status(200).json({menssage: 'token valido', token: true}))

//rutas de crud usuarios
router.post('/', userValidator.validateUserData(), (req, res) => userController.createUser(req, res));
router.get('/:id', sessionAuth, auth, userValidator.validateUserId(), (req, res) => userController.getUser(req, res));
router.put('/:id', sessionAuth, auth, userValidator.validateUserUpdateDataById(), (req, res) => userController.updateUser(req, res));
router.delete('/:id', sessionAuth, auth, userValidator.validateUserId(), (req, res) => userController.deleteUser(req, res));
router.get('/search', sessionAuth, auth, (req, res) => userController.searchUsers(req, res));

module.exports = router; 