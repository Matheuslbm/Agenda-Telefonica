require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
//const connectionString = ''
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('pronto')
    })
    .catch(e => console.log(e));
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const {middlewareGlobal, checkCsrfError, csrfMidleware} = require('./src/middlewares/middleware')


app.use(helmet());
app.use(express.urlencoded({ extended: true})); // pegar o conteudo do form ao enviar ele
app.use(express.json()); // conteudo do form em jason na aplicacao
app.use(express.static(path.resolve(__dirname, 'public')));
const sessionOptions = session({
    secret: 'mementomori()',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
// middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMidleware);
app.use(routes);
 
app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000')
        console.log('Servidor executando na porta 3000')
    });
})
