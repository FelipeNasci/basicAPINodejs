const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const password = 'Minhasenha';
const url =  'mongodb+srv://userAdm:'+ password +'@clusterapi-vxcdt.mongodb.net/test?retryWrites=true';
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true  };


mongoose.connect(url, options);           //conecta com o banco
mongoose.set('useCreateIndex', true);     //usado para evitar codigo de alerta

//--------------  Eventos do banco
mongoose.connection.on('error', (err)=>{
  console.log('Erro na conexão com o banco de dados' + err);
});

mongoose.connection.on('disconnect', (err)=>{
  console.log('Aplicação desconectada com o Banco de dados' + err);
});

mongoose.connection.on('connected',()=>{
  console.log('Conectado ao banco de dados');
});

//BODY-PARSER
app.use( bodyParser.urlencoded({extended: false }) );
app.use( bodyParser.json() );

//Instanciando rotas
const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

//Quando usuario bater na rota raiz
app.use('/', indexRoute);       //sera enviado o objeto indexRoute
app.use('/users', usersRoute);  //sera enviado o objeto usersRoute

var port = 3000;               //porta de acesso
app.listen(port);

console.log('Servidor ativo na porta ' + port);
module.exports = app;
