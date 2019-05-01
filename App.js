const express = require('express');
const app = express();


//Metodo get, ao entrar na raiz do sistema
app.get('/', (req, res) => {
    let objeto = req.query;
    return res.send(
        {  message: 'Tudo ok com o metodo GET' }
    )
})

//Metodo get, ao realizar uma requisicao POST na raiz do sistema
app.post('/', (req, res) => {
    return res.send(
        { message: 'Tudo ok com o metodo post' }
    )
})

//Usuario envia dados atraves do metodo GET
app.get('/query', (req, res) => {

    let obj = req.query;
    return res.send({
        message: 'Você enviou os parametros: nome: = ' + obj.nome + ' Idade: = ' + obj.idade 
    })
})

//Usuario envia dados atraves do metodo POST
//Usuario envia JSON
//Necessita do BodyParser
app.post('/query', (req, res)=>{

    let obj = req.query;
    return res.send({
        message: 'Você enviou os parametros: nome: = ' + obj.nome + ' Idade: = ' + obj.idade 
    })
})

port = 3000;        //porta de acesso
app.listen(port);

console.log('Servidor ativo na porta ' + port);

module.exports = app;