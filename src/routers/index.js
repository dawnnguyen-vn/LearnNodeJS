const createError = require('http-errors');
const productRouter = require('./post');
const authController = require('../controllers/auth')
const globalErrorHandler = require("../middlewares/globalErrorHandler");
const verifyToken = require('../middlewares/verifyToken');

function route(app) {
    app.post('/register', authController.register);
    app.post('/login',  authController.login);

    app.use('/posts', verifyToken, productRouter);
    app.use((req, res, next) => {
        next(createError.NotFound('This route does not exist.'))
    });
    app.use(globalErrorHandler)

};

module.exports = route;