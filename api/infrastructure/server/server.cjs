// Configuración y puesta en marcha del servidor Express.
const express = require('express');
const userRoutes = require('../../application/routes/userRoutes.cjs');
const productsRoutes = require('../../application/routes/productsRoutes.cjs');
const loginRouter = require('../../application/routes/loginRouter.cjs');
const sessionGoogleOAuth = require('../middlewares/sessionOAuth.cjs');

const passport = require('passport');

const { jsonParseErrorHandler } = require('../middlewares/errorHandling.cjs');
const { limiTotal } = require('../middlewares/rateLimit.cjs');
const { auth } = require('../middlewares/auth.cjs');
const sessionAuth = require('../middlewares/sessionLogin.cjs');



const createServer = () => {
    const app = express();
    app.use(express.json());
    app.use(jsonParseErrorHandler);
    app.use(limiTotal); 
    

    app.use('/login', sessionGoogleOAuth, passport.initialize(), passport.session(), loginRouter);

    app.use('/users',  userRoutes);
    app.use('/products', sessionAuth, auth, productsRoutes);
    return app;
};



module.exports = createServer;