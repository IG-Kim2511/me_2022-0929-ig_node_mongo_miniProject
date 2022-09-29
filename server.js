
// c18 express
// require(~) : ~파일, ~라이브러리을 가져와서(import) 쓰겠다는 뜻
const express = require("express");
const app = express();

// colors
let colors = require("colors");

// c24-5) bodyParser
let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// dotenv
require('dotenv').config()

// c30) mogoClient
let MongoClient = require('mongodb').MongoClient;

 // c32) ejs
// let ejs = require('ejs'); 👉documnet에 있는 사용법인데 아직 이해못했음
app.set('view engine','ejs')

// c50) static 파일 보관위해 public폴더 씀. html에서 경로설정할 때 root폴더에 보관된 것처럼 경로 설정함
app.use(express.static('public'))

// c52)  method-override
let methodOverride = require('method-override')
app.use(methodOverride('_method'))

// 🍀c58-10)
// passport
const passport = require('passport');

// passport-local
const LocalStrategy = require('passport-local').Strategy;

// express-session
const session = require('express-session');

// middleware
app.use(session({ secret: 'ig123', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


/* 
  🍀me - next 수업에 나올 상단 코드 정리

  // c64) .env 파일, environment variable, 
  // root folder에 .env파일 만들때 : require('dotenv').config()
  // 다른 folder(env_c64)에 .env파일 만들때 : require('dotenv').config({path: "./env_c64/.env"})
  require('dotenv').config({path: "./env_c64/.env"})
*/


// 🍀route : get, post, put, delete

// 🍀 app.use(), routes.js
app.use('/', require('./routes/routes.js'))


// 🦄🦄c28. MongoClient.connect(url, function(err, client) {~~} 

// 🦄🦄c30 Database, client.db('').collection('').insertOne(, )

// url, password
let url = process.env.mongoDB_url;

MongoClient.connect(url, function(mongo_err, client) {
  if (mongo_err) throw mongo_err;
  console.log((`ig-Database created!`).bgBrightMagenta)

  let db = client.db('db0929')

  // 🦄🦄c32 npm ejs 1
  // 👉write.ejs

  // 🍀post, bodyParser
  //  post() insetOne(), send(), req.body.ig_title
  app.post('/add',function (req,res) {    

    res.render('write.ejs')

    console.log('post-add fin'.bgMagenta)
    console.log(req.body)
    console.log(req.body.ig_title)

    // 🦄🦄c38  id, auto increment, findOne(.), insertOne(.)
   
    // 🍀c38.findOne, total count    
    // .collecton(~) :
    db.collection('counter').findOne({name:'total post count'},function (p_err,pp_res) {
      console.log(pp_res)
      console.log(pp_res.totalPost)
      
      // 🍀insertOne, _id: pp_res.totalPost+1
      db.collection('post').insertOne({_id:pp_res.totalPost+1,title: req.body.ig_title, date:req.body.ig_data },function (){
        console.log('insertone success'.bgBlue)         
    
        // 🦄🦄c40 id+1, updateOne(.), mongodb operator $inc $set 
        // 🍀c40.updateOne, $inc:{totalPost:1}
        db.collection('counter').updateOne({name:'total post count'},{$inc:{totalPost:1}},function (PPP_err,ppp_res) {
          if (PPP_err) {
            return console.log(PPP_err)            
          }           
        });
      })
    });
  })
  

  //🦄🦄c34 find(.).toArray(,)={}), { posts   }
  // 👉list.ejs

  // 🍀c34-2. list-reverse
  app.get("/list-reverse_c34", function (req, res) {

    // find().toArray()
    db.collection('post').find().toArray(function (err,pp_res) {
      console.log(pp_res)
      
      // ejs
      //res.render
      res.render('list-reverse_c34.ejs',{ig_posts:pp_res});
    })

  });


  // 🦄🦄c42 AJAX로 DELETE , $.ajax(.), app.delete('delete',(.)={})
  // 🦄🦄c44 deleteOne(.), data-~~, .dataset.~~, parseInt(.)
  // 🦄🦄c46 .status(~).send(~)

  // 👉./views/list.ejs

  // 🍀c42, delete
  app.delete('/delete', function (req,res) {
    
    console.log(`delete`.bgBrightMagenta)
    console.log(req.body)

    /*🍀
      "req.body.~id"를 number로 바꿈  -> "req.body"를 deleteOne()에 사용함. 
      ("req.body._id"  가 아니라. "req.body") 
    */
    req.body._id = parseInt(req.body._id);

    // ~.deleteOne()
    db.collection('post').deleteOne(req.body, function (pp_err, pp_res) {
         console.log('ig delete fin'.bgBlue)

      // c46-30)  200:  res.status(200).send({message : "c46, success"});  
      // 👉 list.ejs
      res.status(200).send({message:"ig delete fail"});

      // c46-40)  400:  res.status(400).send({message : "c46, fail"});        
      // res.status(400).send({message : "c46, fail"});
    })
    
  });


  // 🦄🦄c48 id (URL parameter), req.params.id
  // 👉/views/detail.ejs
  
  // :id
  app.get('/detail/:id',function (req,res) {

    //  req.params.id 
    // findOne({~},function(){})
    // parseInt 
    db.collection('post').findOne({_id: parseInt(req.params.id)},function (pp_err,p_res) {
      console.log(p_res)

      // .render('~c~',{ ~b~ : ~a~ })
      res.render('detail.ejs',{ig_data: p_res, ig_title:req.params.id})      
    });    
  });



  // 🦄🦄c50 ejs include (= react components), static, express.static('public') 
  // 👉 app.use('.public', express.static('pulbic'));
  //  👉 ./views/nav.html 
  // 👉./views/~~~.ejs


  // 🦄🦄c52 =PUT=update,  PUT, method-override 
  // 👉update.ejs, update-id.ejs

  app.get("/update", function (req, res) {
    res.render('update.ejs')
  });

  // 🍀 /update/:id
  app.get("/update/:id", function (req, res) {
    db.collection('post').findOne({_id: parseInt(req.params.id)},function (pp_err, p_db) {    
        
      console.log(p_db)
      res.render('update-id.ejs',{ig_post: p_db})      
    })
  });


  // 🦄🦄🦄c54, 👉update-id.ejs

  app.put('/update-id',function (req,res) {

    console.log(res.body)

    db.collection('post').updateOne({_id:parseInt(req.body.ig_id)},{$set:{title: req.body.ig_title, date: req.body.ig_date}},function (p_err, p_res) {
      console.log('ig- update- fin')

      // 🍀redirect     
      res.redirect('/list');
    })
  });


  // 🦄🦄c58  app.use(~), passport, express-session, passport.authenticate(~), passport.use(new LocalStorategy(~))
  // 🦄🦄c60  passport-local, passport.serializeUser(~), bcryptjs
  // 🦄🦄c62  mypage.ejs, middleware로그인확인, passport.deserializeUser, req.user: db의 데이터
  // 👉 up
  // 👉mypage.ejs
  // 👉login_c58.ejs

  console.log('🦄🦄c56,58,60,62')


  app.get('/login',(req,res)=>{
    res.render('login_c58.ejs');
  });

  app.get('/login_fail',function (req,res) {
    res.render('login_fail.ejs')    
  })


  // 🍀passport
  /*🍀-20)
    passport.authenticate('local') : (인증해주세요)함수 ,    
    인증 실패시 (failureRedirect : '/fail') :  '/login_fail' 로 연결 
    인증 성공시 : res.redirect('/') 
  */
  app.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login_fail' }),
    function(req, res) {
      console.log('🦄c58. login')
      res.redirect('/');
  });


  // 🍀passport-local
  // 🍀c60-30) passport.authenticate('local',~)...로그인 성공시, 다음코드 실행됨
  passport.use(new LocalStrategy(
    {
    usernameField:'id',             // 👉login_c58.ejs
    passwordField:'pw',            // 👉login_c58.ejs
    session: true,                       // login 후 session을 저장할것인지?
    passReqToCallback:false,
    },
    function(username, password, done) {
      db.collection('login').findOne({ id: username }, function (err, user) {

        console.log(colors.bgYellow('passport.use(new LocalStrategy'))            
        console.log(username,password)
        console.log(user)

        if (err) { return done(err); }
        if (!user) { return done(null, false,{message:'wrong ID'}); }
        if (password !== user.pw) { 
          return done(null, false,{message: 'wrong password'});
        }
        return done(null, user,{message:'success log in'});

      });
    }
  ));

  // 🍀passport.serializeUser  
  // 👉f12 -> Application -> Cookies
  passport.serializeUser(function(user, done) {
    console.log(('passport.serializeUser').bgYellow)
    console.log(user)

    done(null, user.id);
  });


  // 🦄c62,  👉mypage.ejs
  // 🍀 passport.deserializeUser
  // login 성공 때, 위의 session데이터를 가진사람(login한 유저)의 정보를 db에서 찾아줌
  // user : db에서 찾은 정보
  // p_id : passport.serializeUser에서의 use정보.id
  passport.deserializeUser(function(p_id, done) {
    db.collection('login').findOne({id:p_id}, function (err, user) {
      done(err, user);
    });
  });

  // 🍀62-50. app.get("/mypage",~~~~), 
  // 🍉req.user : db의 데이터
  app.get("/mypage",loginCheck, function (req, res) {
    console.log((`/mypage : req.user`).bgYellow)
    console.log(req.user)  
    res.render('mypage_62.ejs',{ig_mypage유저정보: req.user})
  });

  //🥒62-50. loginCheck
  // req.user가 있으면 next() : 통과  👉app.get("/mypage",~~~~실행
  // req.user가 없으면 res.render(~~)  (html에 메시지 띄움)
  function loginCheck(req,res,next) {
    if (req.user) {
      console.log(colors.bgBrightGreen('loginCheck'))
      next()    
    } else {
      res.render('login_fail.ejs')    
    }  
  }


  // 🦄🦄c64 .env 파일, environment variable, 
  // 👉.env  
  console.log('🦄🦄c64 ')


  //🦄🦄c70  mongoDB...search index탭, $.parma(~), $("#form").serialize(~), aggregate(~), $search, $sort,$limit, $project, {$meta:"searchScore"}
  // 👉mongoDB사이트  collection 👉 index
  // 👉 mongoDB사이트...search index탭 활용함

    app.get('/search_c70',(req,res)=>{

      console.log(('get./search_c70').bgBrightMagenta)
      console.log(req.query.value)

      //  🍀70-15) .find(검색조건).toArray()
      // 👉mongoDB사이트  collection 👉 index
      // {title:req.query.value} : full scan하는 이전 방법 

      // 🍀실패함 {$text:{ $search: req.query.value}}
      
      //  🍀70-20) .aggregate(검색조건).toArray()  
      // 👉 mongoDB사이트...search index탭 활용함      


      let 검색조건 =[
        {
          $search:{
            index : "ig_titleSearch",
            text:{
              query: req.query.value,
              path: ["title",'date']        //db안의 오브젝트 이름
            }  
          }
        },
        // 70-30)$sort, $limit,$project
        {$sort :{_id :1}},
        {$limit : 10},
        {$project : {title : 1, date:1, _id: 0, score :{$meta : "searchScore"}}}
      ];
      db.collection('post').aggregate(검색조건).toArray((err,p_db)=>{
        console.log(p_db)  
  
        res.render('search_c70.ejs',{ig_posts:p_db});
      })       
    });


    //🦄🦄 72 회원 기능...게시판 기능, req.body._id, req.user._id 
    // 👉./views/register_c72.ejs
    // 👉./views/list.ejs
    
    console.log('🦄🦄c72 ')
    /*
      🍀(나중에 알아서 추가)
        🍉id중복검사하고 저장하기 
        🍉id에 알파벳, 숫자 잘 들어있나 검사하고 저장하기 
        🍉비번 저장전에 암호화했나     

        🍀
        아이디 park으로, 아이디kim으로 아까 저장한 게시물 삭제해보기
        👉ui로는 삭제되는데, 새로고침해보면 삭제안되고 그대로인걸 확인할 수 있음
    */

    app.get('/register_c72', (req,res)=>{
      res.render('register_c72.ejs')

    });
    
    //🍀register post하기 : passport~~~ 코드 밑에 코딩해야함
    app.post('/register_post', (req,res)=>{
      
      console.log(colors.bgBrightMagenta('register_post'))
      console.log(req.body.id)

      // 🍉insertOne({id:req.body.id, pw:req.body.pw}, : post로 넘어온 req.body.~ 데이터 저장
      db.collection('login').insertOne({id:req.body.id, pw:req.body.pw},function (p_err,p_db) {

        // 🍉redirect
        res.redirect('/');         
      })
    });


    // 🍀write할때, 로그인 한 작성자도 추가하기 : passport~~~ 코드 밑에 코딩해야함
    // 👉register_c72.ejs
    app.post('/add_c72',function (req,res) {    
      
      console.log((`app.post('/add_c72'`).bgBrightMagenta)  
      console.log(req.body)
      console.log(req.body.ig_title)

      res.render('register_c72.ejs')


      /* 
        🍀작성자: req.user._id        
          req.user._id : 현재 로그인한 사람의 정보
          req.user.pw  : 현재 로그인한 사람의 password
      */
      let 저장할것 = {작성자: req.user._id , title: req.body.ig_title, date:req.body.ig_data}

      db.collection('post').insertOne(저장할것,function (p_err, p_db) {

        console.log('co0921-saved')        
      })      
    })

    
    // 🍀delete, 실제 로그인 한 _id == 글에 저장된 _id 같을때만 삭제하기 : passport~~~ 코드 밑에 코딩해야함
    // 👉./views/list.ejs

    /* 
      🍉아이디 park으로, 아이디kim으로 아까 저장한 게시물 삭제해보기
      👉일단 화면에서 삭제되는데, 새로고침해보면 삭제안되고 그대로인걸 확인할 수 있음
    */

      app.delete('/delete_c72', function (req,res) {
        
        console.log(req.body)

        req.body._id = parseInt(req.body._id);

        // 🍉{_id:req.body._id, 작성자:req.user._id} 둘다 만족하는 게시물을 찾아서 delete해줌
        let 삭제할데이터 = {_id:req.body._id, 작성자:req.user._id}

        //🍉기존 c41에서의 코드와의 차이점 :  db.collection('post').deleteOne(req.body, function (pp_err, pp_res) {
        db.collection('post').deleteOne(삭제할데이터, function (pp_err, pp_res) {
            console.log('ig delete fin')

          res.status(200).send({message:"ig delete fail"});
        })        
      });



    //🦄🦄c74 router(=app.get(~)묶음)관리, router.get(주소, 미들웨어, 함수), router.use(미들웨어)
    // 👉 ./routes/shop_c74.js
    // 👉 ./routes/zoo_c74.js
    
    /*🍀 app.get(~) 묶음 관리하기
       routes : 너무 많은 app.get(~)을 1개의 파일로 묶어서 관리하기
      
       🍀 https://expressjs.com/en/guide/routing.html
    */

    
    //🍉 /shop2 
    // 👉 ./routes/shop2_c74.js
    app.use('/shop2', require('./routes/shop2_c74.js'))



    // 🍉미들웨어 함수 적용하는법 : ig_middleware
    // ./rountes/zoo_c74.js 파일을 여기에 첨부
    
    app.use('/zoo', require('./routes/zoo_c74.js'))

        
    // 🦄🦄c76 Google Cloud(=AWS) 사이트배포, app.yaml, gcloud init, gcloud app deploy
    // 👉노트필기 필수 참고
    // 👉app.yaml
    // 👉Google Cloud - App Engine - dash board

    /* 
      🍀2. server.js에 서버를 띄울 때 포트가 8080인지 확인합니다.
        Google cloud default port : 8080      

      🍀명령어
        gcloud init
        gcloud app deploy
    */


  
        
    // 🦄🦄c78 이미지 업로드 & api만들기, enctype="", multer, upload.array(~,~)
    // 👉views/upload_c78.ejs
    // 👉./public/image_c78

    // 🍚 ?? 왜 local publilc/image/~ 폴더에 저장하는지 이해 못했음. DB에 저장해야 API로 사용할수있는것 아닌가?


    /* 
      🍀-10) upload.ejs 만듬 : 👉views/upload_c78.ejs
    */

    app.get('/upload',(req,res)=>{
      res.render('upload_c78.ejs');
    });

    /* 
      🍀-20) npm install multer

          diskStorage : 컴퓨터 하드안에 저장
          memoryStorage : 램안에 저장. 휘발성..저장
    */
    const multer = require('multer')

    // 🍉diskStorage
    const storage = multer.diskStorage({

      // 🍉경로 : './public/image_c78'
      destination: function (req, file, cb) {
        cb(null, './public/image_c78')
      },

      // 🍉file name 설정 : file.originalname
      filename: function (req, file, cb) {
        console.log((`multer-filename-file`).bgBrightMagenta)
        console.log(file)

        /* 🍉파일명 추가로 넣기      
          a) 
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, file.originalname + '-' + uniqueSuffix)    

          b) 
          cb(null, file.originalname + '날짜:' + new Date())    
        */
        cb(null, file.originalname)
        
      }
    })

    // 🍉const upload : 모든설정...const upload에 저장함. const multer , const storage 가져옴

    const upload = multer({
      storage: storage,

      /* 
        // 🍉fileFilter : PNG, JPG만 업로드하기
        fileFilter: function (req, file, callback) {
            var ext = path.extname(file.originalname);
            if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
                return callback(new Error('PNG, JPG만 업로드하세요'))
            }
            callback(null, true)
        },

        // 🍉limits : 파일사이즈 제한
        limits:{
            fileSize: 1024 * 1024
        }
      */
    });


    /* 
      🍀-30
          upload.ejs에서 post요청오면

          ./public/image폴더안에 저장함
    */

    /* 
      🍉미들웨어 const upload : upload.single('ig_uploadInput')
      👉./views/upload.ejs의  <input type="file" name="ig_uploadInput"> 의 name="ig_uploadInput"가져옴
    */
    app.post('/upload',upload.single('ig_uploadInput'),(req,res)=>{
      res.send('c78_fin');
    });

    /* 
      🍀-40 API만들기 (업로드한 이미지... API로 만들기)

      🍉URL파라미터 
      
        a) 이름짓기👉 :ig_imageName

          적용 👉 req.params.ig_imageName


        b) 파일경로 : __dirname +'/public/image_c78'


        c) html에 img태그에 적용하기 (파일명 :   test_c78.jpg)
        👉upload_c78.ejs
        <img src="/public_c50/image_c78/test_c78.jpg" alt="">
    */

    app.get('/image_c78/:ig_imageName',(req,res)=>{
      res.sendFile(__dirname +'/public/image_c78'+ req.params.ig_imageName)
    })



    // 🦄🦄80 라이브러리 소개 helmet.js , Mongoose, Connect-mongo, OAuth소셜로그인
    /* 
      보안 : helmet.js 라이브러리 
      ex) express사용하고있다는 정보...숨겨줄 필요가 있음

      Mongoose : mongodb 데이터저장할때 검사도와줌

      OAuth소셜로그인 
      Connect-mongo : 세션데이터..db저장  ...사용하면 속도 안느려지고 좋음
    */


    //🦄🦄82, 84, 86 웹소켓으로 채팅서비스 만들기 1 (Socket.io)
    

    // 🦄🦄88 Node서버+ React 합치기, app.get("*",~), 리액트 router사용, proxy 라이브 코딩

    /*   
        리액트 라우터에서 다 해결해주므로, 서버의 역할을  db연결만으로 축소시킬수있음

        일반 자바스크립트 페이지 보다가,
        특정페이지 들어갔을때, 리액트 페이지 보여주는 법

        "/" 접속 : 자바스크립트 html페이지 보여줌
        "/react"접속 :  리액트 페이지 보여줌

        미들웨어 : 서버의 요청과 응답사이에 실행할 코드 , 
        유저가 /~~url로 요청시, 응답하기전에 실행할 코드

        "homepage" :"~~" 추가한 후 
        npm run build

        계속 중간에 멈추고 build를 해야하는가??
        ㄴㄴ, 라이브로 가능함
        proxy 검색
    */





    // 👉🍀c18, listen
    app.listen(process.env.PORT, function () {
        console.log((`bgBrightMagenta`).bgBrightMagenta)
        console.log(`ig node server gogo, port: ${process.env.PORT}`.rainbow);
        
    });

    //🍀 client.close()있으면 post가 안됨..왜인지는 모름
    // client.close();
});





