const express = require('express');
const router = express.Router();

const Users = require('../Model/User.js');

router.get('/', (req, res) => {

  //{} indica que todos os usuarios serao capturados
  //varioavel err -> caso haja erro
  //variavel data -> usuarios
  Users.find( {}, (err, data)=>{
    if(err) return res.send( {error: 'Erro na consulta de usuários '} );
    return res.send(data);
  });

});

router.post('/create', (req, res) =>{

  //utilizando desestruturacao (ES6)
  const {email, password} = req.body;

  console.log(req.body);
  console.log('email: ' + email);
  console.log('password: ' + password);

  if(!email || !password) return res.send({error: 'Dados insuficientes'});

  //realiza pesquisa de usuario -> campo "email"
  Users.findOne({email}, (err, data)=>{
    if(err) return res.send({error: 'email nao encontrado'})
    //Se retornar um usuario (data), o usuario nao pode ser criado (pois ja existe)
    if(data) return res.send({error: 'email inválido'});

  Users.create(req.body, (err, data)=>{
    if(err) return res.send({ error: 'erro ao criar usuario' });
    return res.send(data);
    });
  });

  //return res.send({message: 'usuario criado com sucesso!'})
});


module.exports = router;
