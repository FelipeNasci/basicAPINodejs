const express = require('express');
const app = express();

//Instanciando rotas
const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

//Quando usuario bater na rota raiz
app.use('/', indexRoute);       //sera enviado o objeto indexRoute
app.use('/users', usersRoute);  //sera enviado o objeto usersRoute

port = 3000;                    //porta de acesso
app.listen(port);

console.log('Servidor ativo na porta ' + port);
module.exports = app;