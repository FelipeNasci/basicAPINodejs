const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({
        message: 'Tudo ok com a requisicao GET de Users'
    });
})

router.post('/', (req, res)=>{
    return res.send({
        message: 'Tudo ok com a requisicao POST de Users'
    })

})


module.exports = router;