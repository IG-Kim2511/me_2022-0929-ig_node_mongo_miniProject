const express = require('express')
const router = express.Router()


// 🦄🦄c74 

// 🍀74-50.미들웨어 적용하기 - 기본
// ~~~/zoo/lion 접속됨
function 로그인했니_middleware(req,res,next) {
    if (req.user) {
        next()        
    } else {
        res.send('not log in');        
    }    
}

router.get('/lion', 로그인했니_middleware,(req, res응답) => {
    res응답.send('lion home page')
})

// // 🍀74-60. 여기있는 모든 url에 미들웨어 적용하기
// router.use(로그인했니_middleware);


// 🍀74-70. 특정 url에만 적용함
// ~~~/zoo/dog 접속됨
router.use('/dog',로그인했니_middleware);
  
router.get('/dog', (req, res응답) => {
    res응답.send('About dog')
})
  
  

module.exports = router