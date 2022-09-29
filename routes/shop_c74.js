

// 🦄🦄c74 

// 🍀require(~) : ~파일, ~라이브러리을 가져와서(import) 쓰겠다는 뜻
// 🍉express 라이브러리.Router
const express = require('express')
const router = express.Router()

//🍀server.js의 app.get과 같은뜻
// 🍉 http://localhost:3000/shop/shirts 접속됨
router.get('/shop/shirts', (req, res) => {
    res.send('c74, /shop/shirts')
})
  
router.get('/shop/pants', (req, res) => {
    res.send('c74, /shop/pants')
})
  








// // middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// })


//🍀 module.exports = ~~변수명 : ~변수를 export하겠다는 뜻
module.exports = router