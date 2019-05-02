const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({
        message: 'Tudo ok com a requisicao GET da raiz'
    });
})

router.post('/', (req, res)=>{
    return res.send({
        message: 'Tudo ok com a requisicao POST da raiz'
    })

})


module.exports = router;