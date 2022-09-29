const express = require('express')
const router = express.Router()


// 🦄🦄c74 

router.get('/shirts', (req, res) => {
    res.send('/shop2/shirts')
})
  
router.get('/pants', (req, res) => {
    res.send('/shop2/pants')
})
  

module.exports = router