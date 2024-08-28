const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController.js');
const loginController = require('./src/controllers/loginController.js');
const contatoController = require('./src/controllers/contatoController.js');

const { loginRequired } = require('./src/middlewares/middleware.js')



// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas de contato
route.get('/contato/index', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);



module.exports = route; 