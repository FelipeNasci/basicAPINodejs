const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

//antes de bater na raíz, autentica o usuário.
router.get('/', auth, (req, res) => {
    //console.log(res.locals.auth_data);
    return res.send({ message: 'Tudo ok com a requisicao GET da raiz' });
})

router.post('/', (req, res)=>{
    return res.send({
        message: 'Tudo ok com a requisicao POST da raiz'
    })

})

module.exports = router;
