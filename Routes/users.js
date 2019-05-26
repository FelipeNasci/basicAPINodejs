const express = require('express');
const bcrypt = require('bcrypt');
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

    data.password = undefined;  //Evitar que a senha de user seja exibida
    return res.send(data);
    });
  });
});


//autenticacao de usuario
router.post('/auth', (req, res) => {

  const {email, password} = req.body;

  //Caso nao seja enviado email ou senha
  if(!email || !password) return res.send({error: 'Dados insuficientes'});

  //envia o email para a funcao e recebe 02 funcoes de callback
  // err -> caso algum erro aconteça
  // data -> retorna os dados do usuario
  Users.findOne( {email}, (err, data) => {
    if (err) return res.send( { error: 'Erro ao buscar usuário!' });
    if (!data) return res.send( {error: 'Usuário não registrado'} );

    bcrypt.compare(password, data.password, (err, same) => {

      //same é um booleano que informa se o password está corrreto
      if(!same) return res.send({error: 'Erro ao autenticar usuário'});

      //Após realizada a comparação, o password não pode ser retornado
      data.password = undefined;
      return res.send(data);
    });

    //select('+password') é utilizado para obrigar o db a enviar o password
    //porém, testes foram realizados com sucesso sem este parâmetro.
  }).select('+password');

});

module.exports = router;
