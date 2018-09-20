var express = require('express')
var router = express.Router();
var trade = require('./trade')
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/getBalance', trade.getBalance);
router.get('/getPrice', trade.getPrice);



module.exports = router;

//API Key:
//URFYLX94dWX9D6sAAtfdTWdqQhYGEu118PguIA3rhd3YYvm7LgEnEaEVEYIpgZ4k
//Secret Key:  出于安全考虑，Secret Key只在创建时显示。若Secret Key遗失，可删除后创建并使用新的API。
//PLyUzDV6bL9nxN62FB1aGfqVoEHWfLGkdJsDzqjDr805ftFODrnrOZs416CLBjn4

