var express = require('express')
var router = express.Router()
console.log("Init IndexCtrl");
router.use(require('./pageCtrl'))

module.exports = router
