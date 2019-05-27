const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = (req, res, next) => {
  //req.header.nome_variavel_embutida_no_json_da_requisicao
  const token_header = req.headers.token;

  console.log(token_header);

  //Se a requisicao nao contiver nenhum token, nao faça login
  if(!token_header) return res.status(401).send( {error: 'Autenticação recusada'} );

  //verifica se o token é válido, se sim, siga a vida.
  jwt.verify (token_header, config.token, (err, decoded) => {

    //Caso o token esteja incorreto
    if(err) return res.status(401).send( {error: 'Token inválido'} );

    res.locals.auth_data = decoded;     //salva o id dos usuarios logados
    return next();
  });

}

module.exports = auth;
