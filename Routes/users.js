const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Users = require('../Model/User.js');
const config = require('../config/config');

//FUNÇÕES AUXILIARES
const createUserToken = (userId) => {

  //para gerar o token, são utilizados:
  //id do usuario, uma chave, tempo de validade
  return jwt.sign({id: userId}, config.token, {expiresIn: config.token_expires} );
}

router.get('/', async (req, res) => {

  try{

    //{} indica que todos os usuarios serao capturados
    const user = await Users.find( {} );
    return res.send(user);

  }catch (err) {
    return res.status(500).send( {error: 'Erro na consulta de usuários '} );
  }

});

router.post('/create', async (req, res) => {

  //utilizando desestruturacao (ES6)
  const {email, password} = req.body;

  if(!email || !password) return res.status(400).send({error: 'Dados insuficientes'});

  //Verifica se ja existe este usuario
  try{

    //Se o email já existir, retorne: 'usuario ja cadastrado'
    //realiza pesquisa de usuario -> campo "email"
    if(await Users.findOne({ email }) )
      return res.status(400).send({error: 'Usuario já cadastrado'});

  }catch (err) { return res.status(500).send({error: 'Erro ao buscar usuário'}); }

  //Criando usuario
  try{

    const user = await Users.create( req.body );
    user.password = undefined;    //Evitar que a senha de user seja exibida
    return res.status(201).send( {user, token: createUserToken(user.id) } );

  }catch (err) { return res.status(500).send({ error: 'erro ao criar usuario' }); }

});

//autenticacao de usuario
router.post('/auth', async (req, res) =>{

  const {email, password} = req.body;

  //Caso nao seja enviado email ou senha
  if(!email || !password) return res.status(400).send({error: 'Dados insuficientes'});

  //Verifica se este usuario existe
  try{

    const user = await Users.findOne({ email }).select('+password');

    if( !user ) return res.status(400).send( {error: 'Usuario não registrado!'} );

    const same = await bcrypt.compare(password, user.password);

    //same é um booleano que informa se o password está corrreto
    if(!same) return res.status(401).send( {error: 'Erro ao autenticar usuário'} );

    //Após realizada a comparação, o password não pode ser retornado
    user.password = undefined;

    //retorna dados de usuário e o token
    return res.send({user, token: createUserToken(user.id) });

  }catch (err) { return res.status(500).send({error: 'Erro ao buscar usuário'}); }

});

module.exports = router;
