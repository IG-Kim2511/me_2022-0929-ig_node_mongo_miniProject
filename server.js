

/* 🦄🦄🦄npm , terminal  명령어
   
  🍀npm
  npm install -g nodemon  
  npm install mongodb  

  🍀terminal  명령어
  서버 끄기 : terminal에서 ctrl + c

  node server.js
  nodemon server.js 
*/
/* 
  🦄🦄🦄자주쓰는 node.js, mongoDB 문법,

  🍀
  app.listen(3000, function(){ } )
  

  
  app.get("/", function (req요청, res응답) {
    res응답.render('index.ejs')
    res.sendFile(__dirname + "/style.css");
  })

  app.post('/add',function (req,res) {   })

  app.delete('/delete',function (req,res) {   })

  app.put('/update',function (req,res) {   })

  🍀
    res.redirect('/list');

  🍀
    req.body.~

  🍀
  .insertOne({},function (err,res) {})
  .updateOne({},function (err,res) {})
  .deleteOne({},function (err,res) {})

  🍀
  .findOne({},function (err,res) {})
  .find({title:req.query.value}).toArray((err,db결과)=>{ })



  🍀Google cloud 명령어
    gcloud init
    gcloud app deploy

*/




/* 🍀 Server.js 상단 코드 */

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

/* 
  🍀me - next 수업에 나올 상단 코드 정리

  // c30)
  const MongoClient = require('mongodb').MongoClient;

  // c32) 
  app.set('view engine', 'ejs');

  // c50)  static 파일 보관위해 public폴더 쓸거라는 뜻
  app.use('/public_c50', express.static('public_c50'));

  // c52)  method-override
  var methodOverride = require('method-override');
  const passport = require('passport');
  app.use(methodOverride('_method'))

  // 🍀c58-10)
  // const passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;
  const session = require('express-session');

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session({ secret: 'ingyum123', resave: true, saveUninitialized: false }));


  // c64) .env 파일, environment variable, 
  // root folder에 .env파일 만들때 : require('dotenv').config()
  // 다른 folder(env_c64)에 .env파일 만들때 : require('dotenv').config({path: "./env_c64/.env"})
  require('dotenv').config({path: "./env_c64/.env"})
*/


// 🦄🦄me- terminal 명령어, 파일위치 정리 (👉codingapple-Node.js.MongoDB-2022-0629-classnote폴더...server.js)
/* 
  🦄🦄c12 express 라이브러리 설치
        $npm init
        $npm install express

  🦄🦄c14 미리보기
  node server.js

  서버 끄기 : ctrl +c

  🦄🦄c18 nodemon 자동 미리보기
  $npm install -g nodemon (yarn add global nodemon)

  $nodemon server.js 

  🦄🦄c24 body-parser 라이브러리 설치
  $npm install body-parser 혹은 yarn add body-parser


  🦄🦄c28 mongodb 라이브러리 설치        
  npm install mongodb

  🦄🦄c32 EJS 
  👉./views/~~.ejs
  npm install ejs

  🦄🦄c52 method-override
  npm install method-override

  🦄🦄c58 passport, passport-local, express-session,
  npm install passport, passport-local, express-session

  🦄🦄c64 dot env
  👉./env_c64/.env
  npm install dotenv

  🦄🦄c74 router관리, router.get(주소, 미들웨어, 함수), router.use(미들웨어)
  👉 ./routes/shop_c74.js
  👉 ./routes/zoo_c74.js


  🦄🦄c76
  👉app.yaml
  🍀gcloud init
  🍀gcloud app deploy


  🦄🦄c78
  👉./public/image
   npm install multer
        
*/

/* 🦄🦄 참고  
  w3school - node.js
    
  https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/

  npmjs.com    
*/



/* 🦄🦄me- 에러해결 
  10) 접속이 안됨... :   비밀번호 랜덤생성했을때 접속성공함

  20) 코드는 다 맞고, console.log에도 데이터 제대로 다 적용이 됬는데, mongodb사이트에는 안보임 : 그냥 mongodb사이트 재로그인해서 해결
*/


// 🦄🦄c16 npm에러해결, package.json, npm init, npm install express(Node.js, Express라이브러리 설치)
console.log('🦄🦄🦄🦄c5')

/* 
  2)
  npm
  package.json

  4) 터미널 명령어
  $npm init
  $npm install express
*/

// 🦄🦄c18 express로 서버오픈공식, node server.js, listen, get(주소, (req,res)={} ), send('글자')
// 👉 server.js 상단 -  (express) 서버오픈 기본공식  
// 👉하단 코드 - listen(~)

/*

  2) 👉 server.js 상단에 코드 추가, express 라이브러리 첨부와 사용 

  4) app.listen()은 원하는 포트에 서버를 오픈하는 문법이라고 보시면 됩니다. 
  listen() 함수 안엔 두개의 파라미터가 필요합니다. 
  listen(서버를 오픈할 포트번호, function(){서버 오픈시 실행할 코드})

  5) 8080포트 쓰면 편함 - 구글 클라우드서비스 디폴트값 👉 c76

  6) node server.js / localhost:3000

  터미널에서 node server.js를 입력하면 서버가 뜹니다.
  브라우저에서 localhost:3000  접속하면 확인가능합니다. 

  8) 서버 끄기 
  terminal에서 ctrl + c

  10) get(주소, ()={} ), send('글자')

  -2) 누군가가 localhost:3000/pet으로 방문하면,
  -3) 안내문 띄우기

  -4) get안의 파라미터 eng이름 : (request, response) (req,res) 주로 사용함

  브라우저 켜서 localhost:3000/pet  접속하면 펫용품 사라는 안내문이 뜨죠?
*/





// 🍀route : get, post, put, delete

// 🍀get
// 사용자가 / 경로로 접속시 (/ 하나만 있으면 홈페이지입니다)
app.get("/", function (req요청, res응답) {
  
  //🍉 send()
  //res.send('ig node server')
  
  // 🍉html
  // res.sendFile(__dirname + "/index.html");

  //🦄c50. ejs : html과 달리 render(~) 라는거 헷갈리지 말기
  // 👉index.ejs
  res응답.render('index.ejs')

});


// 🦄🦄c20 html파일전송하기,.sendFile(~), Nodemon, 설치오류해결 powershell관리자모드
console.log('🦄🦄🦄🦄c20')

/* 
  1) nodemon 설치

  1-2)
  npm install -g nodemon
  yarn add global nodemon 

  1-4) nodemon server.js
  이제 서버를 실행할 때 nodemon server.js 라고 입력해주시면 되겠습니다.
  파일 저장할 때 마다 이제 지가 알아서 서버를 새로 시작해줍니다.
  (하지만 브라우저에서 새로고침은 하셔야합니다.)

  1-5)에러난때 powershell관리자모드 실행 👉 set-executionpolicy unrestricted
*/

/* 
  2) 사용자가 / 경로로 접속시 (/ 하나만 있으면 홈페이지입니다)

  4) server.js랑 같은 경로에 있는 /index.html 이라는 파일을 보내줍니다. 

  4-2) sendFile() 함수를 쓰면 파일을 보낼 수 있습니다

  4-4) __dirname은 현재 파일의 경로를 뜻합니다. 
*/

// 🍉sendFile()
/* 
  app.get('/', function(req요청, res응답) {               //2)
    res응답.sendFile(__dirname + '/index.html')       //4)
  })   
*/


// 6) css 적용하기 (me...구글검색) ⚡

app.get("/style.css", function (req, res) {
  res.sendFile(__dirname + "/style.css");
});


// 🦄🦄c24 POST요청 app.post('/add',(res,req)=>{}), body-parser(POST요청으로 서버에 데이터 전송 쉽게해주는 라이브러리 : body-parser, form, input, name)
// 👉write.html
console.log('🦄🦄🦄🦄c9')


/*  2) arrow function 사용 가능
2-1) /write접속..
2-2) write.html보내줌  */

app.get("/write", function (req, res) {
    //res.send('ig node server')
    // res.sendFile(__dirname + "/write.html");

    res.render('write.ejs')
});


/* 4)
  😄알고리즘 pseudo-coding
  -1. 👉write.html   👉      <form action="/add" method="POST">  코딩  , 서버에서 input 구분하기 위해 name태그 넣음
  -2. 어떤 사람이 /add 경로(html에 지정한 action="")로 , POST요청 하면, 
  -3. ??을 해주세요 */


  /* 5)form 데이터를 서버로 전송하기 
  - body-parser 설치 
  : POST요청으로 서버에 데이터 전송 쉽게해주는 라이브러리 : body-parser, form, input, name
  ( http://expressjs.com/en/resources/middleware/body-parser.html )

  5-2)
  4)까지만 해도 데이터가 잘 전송되긴 하는데, (전송된 데이터는 'req요청'파라미터에 저장됨)

  전송된 데이터 사용하기 : body-parser라는 라이브러리가 있어야, 여러분이 보낸 데이터들 처리가 쉽게 가능함.

  터미널을 켜서 npm install body-parser 혹은 yarn add body-parser를 하도록 합시다. 

  👉server.js 상단에 추가
  const bodyParser= require('body-parser')
  app.use(bodyParser.urlencoded({extended: true})) 


  5-4)
  input작성 후 submit click한때 ( 누군가가 /add 경로로 post 요청을 할 때 ) , 터미널 콘솔창에 요청.body가 출력됨

  요청.body는 여러분이 폼에 입력한 데이터가 들어가 있음.  
 */

// post() , req요청.body.ig_title
/* 
  app.post('/add',function(req요청,res응답){    //4-2)

    res응답.send('c24 전송완료했어용')                       //4-3)
      
    console.log(req요청.body)          //5-4)
    console.log(req요청.body.ig_title)          //5-4)
    console.log(req요청.body.ig_data)          //5-4)

    //  DB에 저장하기 👉 다음시간에....
  })
*/  



// 🦄🦄c28. mongoDB 셋팅, MongoClient.connect(url, function(err, client) {~~} 
// 👆server.js 상단에 코드 추가
/* 
  2) 구글에 MongoDB Atlas 검색 , 가입

  4) mongodb  라이브러리 설치
     npm install mongodb  

  8) <●mongoDB - cluster - application code>복사해놓음
  (~~~~://디비계정아이디:디비계정패스워드~~~/데이터베이스이름~~~~) 

  mongodb+srv://iikim2511:1234qwer@cluster0.o0asn.mongodb.net/<dbname>?retryWrites=true&w=majority

  8-2) mongoDB연결되면, 
  8-4) 이 서버 연결해주셉
*/

// 🦄🦄c30 Database에 자료 저장하기, client.db('작명').collection('작명').insertOne(자료오브젝트, 콜백함수)
//👉상단배치 const MongoClient = require('mongodb').MongoClient;

console.log('🦄🦄c30')

/* 
  1) mongoDB 사이트 
  clusters ->collection -> database는 하나의 폴더, collection은 하나의 엑셀파일이라고 생각하면 딱 맞습니다. 

  2)🍀😎uri : iikim2522:dRT2GRSjF5PoHsam : 비밀번호 랜덤생성했을때 접속성공함 ,
  🍉auto generate password 
   home 👉 Projects 👉 Security 👉Quickstart에서 username edit선택하고 auto generate password 클릭 (가끔 quick start안나올때 있는데, home에서부터 넘어오면 생김 )
  https://cloud.mongodb.com/v2/62be0862fda87151be53eb94#setup/access
  비밀파일에 숨겨야함. 해킹될수있음, 연습때는 연습끝날때마다 비밀번호 새로 생성
*/



// url, password
let url = process.env.mongoDB_url;

MongoClient.connect(url, function(mongo_err, client) {
  if (mongo_err) throw mongo_err;
  console.log((`ig-Database created!`).bgBrightMagenta)

  let db = client.db('db0921')

  // 🦄🦄c32 npm ejs 1, ejs 파일 만들기
  // 👉write.ejs
  /* 
    🦄 누군가 /add 경로로 POST 요청을 하면, 폼에 입력된 자료를 2개가 서버로 도착합니다.
      이 때 자료 2개를 ~~라는 이름의 collection에 저장하기
  */

  // 🍀post, bodyParser
  //  post()를 통한 insetOne()실행, send(), req.body.ig_title
  app.post('/add',function (req,res) {    
    // res.send('/add, 전송완료')
    // res.sendFile(__dirname + "/write.html");
    res.render('write.ejs')


    console.log('add fin')

    console.log(req.body)
    console.log(req.body.ig_title)


    // 🦄🦄c38 게시물마다 id넣기, auto increment문법, findOne(.), insertOne(.)
    /*    
      2) ex)그냥 단순하게 "id:총게시물갯수+1"하면 2번째 자료(id:2)를 지우고, 새로운 데이터를 넣었을때 id:2가 되는 상황이 발생함
      이렇게 되면 안됨, 
      지우고 새로운거 넣어도 id:2는 공백이 되어야 함
      
      4) find() : 모든 데이터 찾고싶을때
      findOne() : 원하는 데이터 1개만 찾고싶을때  

      findOne({~},function(){}) : {~}가 있는 오브젝트 뭉치를 찾아줌, 그 오브젝트 안의 데이터들을 수정할 예정
      
      ~~collection(~)~~.findOne({~~{}~~},function(){
        ~~~~ 수정할 코드~~~
      })


      🍄6) /add로 post요청하면, 
      DB의 총게시물갯수 데이터 가져오셉
      
      🍄8) 새로운 collecton 만듬
      -> 여기에 자료갯수를 저장해서 꺼냈는 방식을 사용할 예정
      default로 데이터 만들어두고, 게시물 만들어질때마다 totalPost숫자 늘리는 방식을 사용할 예정
    */

    // 🍀c38.findOne, total count    
    // .collecton(~) : ....'~' 에 연결, collecton이름 여기에 작명하면, mongoDB에 자동으로 그 collecton 만들어짐
    db.collection('counter').findOne({name:'total post count'},function (p_err,pp_res) {
      console.log(pp_res)
      console.log(pp_res.totalPost)
      
      // 🍀insertOne, _id: pp_res.totalPost+1
      // .insertOne(~) : .insertOne(저장할 데이터, 그 이후 실행할 콜백함수)  👉 mongoDB에 가면 저장된 데이터 확인됨
      db.collection('co0921').insertOne({_id:pp_res.totalPost+1,title: req.body.ig_title, date:req.body.ig_data },function (){
        console.log('insertone success'.blue)      


                
        // 🦄🦄c40 게시물마다 id넣기2 - id에 +1하기, updateOne(.), mongodb operator $inc $set 
        console.log('🦄🦄c40')  
        /*
          10) updateOne({},{},function(){}) : 하나의 데이터 수정
          updateMany() : 한번에 많은 데이터 수정

          20-10) post()할때, 
          findOne() :  collection('~~')에서 name:'게시물갯수'데이터를 가지고있는 오브젝트 전체를 가져옴 (ex: collection(counter)의 오브젝트)
          collection("~~")에 insertOne : collection("~~")에  그 db결과의 totalPost에 +1을 해서 _id만듬

          20-20) post()할 때 + collection('~~') 에 insertOne할때 : 
          updateOne() : collection('~~')에서 " name:게시물갯수"데이터를 가진 오브젝트 전체를 가져옴. 
          그안의 데이터 하나(ex: totalPost) 를 수정함 (ex: totalPost+1)

          30) $inc : number data에 +, - 시킴
          양수, 음수 둘다 가능함
          +1 : +1 해줌
          -1 : -1 해줌


          30-2) mongodb update operators : 
          https://www.mongodb.com/docs/manual/reference/operator/update/
        */

        // 🦄🦄 40 게시물마다 id넣기2 - id에 +1하기, updateOne(.), mongodb operator $inc $set 
        // 🍀c40.updateOne, $inc:{totalPost:1}
        db.collection('counter').updateOne({name:'total post count'},{$inc:{totalPost:1}},function (PPP_err,ppp_res) {
          if (PPP_err) {
            return console.log(PPP_err)            
          } 
          
        });
      })
    });
  })

  //🦄🦄c34 HTML에 DB데이터 넣는 법 2 (DB데이터 읽기), .find(.).toArray(에러,결과)={}), { posts  결과 }
  // 👉list.ejs

  /* list.ejs 파일안 코딩
        <!-- 🦄c34 반복문     <%  %>   
            for (let i = 0; i < array.length; i++) {
                array[i];              
            }        
        -->
        
        <%    for (let i = 0; i < ig_posts.length; i++) {   %>  
          <h4>할일 제목 : <%= ig_posts[i].제목 %></h4>
          <p>할일 마감날짜 : <%= ig_posts[i].날짜 %></p>          
        <%  }  %>        
  */    
  /*
      2).find().toArray() 라고 적으시면 collection(‘post’)에 있는 모든 데이터를 Array 자료형으로 가져옵니다. 

      4)list.ejs 파일을 렌더링함과 동시에 {ig_posts: 결과} 라는 데이터를 함께 보내줄 수 있습니다. 
      (정확히 말하면 결과라는 데이터를 ig_posts 라는 이름으로 ejs 파일에 보내주세요~ 입니다)
  */

      
  // 🍀c34. list
  app.get("/list", function (req, res) {

    // find().toArray()
    db.collection('co0921').find().toArray(function (err,p_db결과) {
      console.log(p_db결과)
      
      // ejs
      //res.render
      res.render('list.ejs',{ig_posts:p_db결과});
    })

  });

  // 🍀c34-2. list-reverse
  app.get("/list-reverse_c34", function (req, res) {

    // find().toArray()
    db.collection('co0921').find().toArray(function (err,pp_res) {
      console.log(pp_res)
      
      // ejs
      //res.render
      res.render('list-reverse_c34.ejs',{ig_posts:pp_res});
    })

  });


  // 🦄🦄c42 AJAX로 DELETE 요청하기1, $.ajax(.), app.delete('delete',(.)={})
  // 🦄🦄c44 AJAX로 DELETE 요청하기2, deleteOne(.), data-~~, .dataset.~~, parseInt(.)
  // 🦄🦄c46 AJAX로 DELETE 요청하기3, jQuery기능 .status(~).send(~)
  console.log('🦄🦄c42,44,46')

  //c44) 🍄req요청.body에 담겨온 id를 가진 오브젝트를 db에서 찾아서, 삭제
  // 👉./views/list.ejs

  // 🍀c42, delete
  app.delete('/delete', function (req,res) {
    
    console.log(`delete`.bgBrightMagenta)
    console.log(req.body)

    /*🍀
      "req요청.body.~id"를 number로 바꿈  -> "req요청.body"를 deleteOne()에 사용함. 
      ("req요청.body._id"  가 아니라. "req요청.body") 
    */
    req.body._id = parseInt(req.body._id);

    // ~.deleteOne()
    db.collection('co0921').deleteOne(req.body, function (pp_err, pp_res) {
         console.log('ig delete fin')

      // c46-30) 성공코드 200:  res응답.status(200).send({message : "c46, success"});  
      // 👉 list.ejs
      res.status(200).send({message:"ig delete fail"});

      // c46-40) 실패코드 400:  res응답.status(400).send({message : "c46, fail"});        
      // res응답.status(400).send({message : "c46, fail"});
    })
    
  });


  // 🦄🦄c48 상세페이지를 만들어보자 id (URL parameter), req요청.params.id
  // 👉/views/detail.ejs
  
  /* 
    🍀목표: /detail로 접속하면 detail.ejs 보여주기 

    -2) :id : URL parameter
    = req요청.params.id  = 'detail/:id'

    -4)findOne({~},function(){}) : {~}가 있는 오브젝트 뭉치를 찾아줌

    -6) parseInt() :  db의 id는 int인데, 코드를 확인하면 string으로 나옴 -> parseInt()붙여서 number로 만듬
    팁: 마우스를 hover하면 JavaScript type을 알려줌

    -8).render('~c~',{ ~b~ : ~a~ }) : ~a~데이터를, ~b~이름으로,  ~c~~로 보냄,
  */
  // :id
  app.get('/detail/:id',function (req,res) {

    //  req요청.params.id 
    // findOne({~},function(){})
    // parseInt 
    db.collection('co0921').findOne({_id: parseInt(req.params.id)},function (pp_err,p_res) {
      console.log(p_res)

      // .render('~c~',{ ~b~ : ~a~ })
      res.render('detail.ejs',{ig_data: p_res})      
    });    
  });



  // 🦄🦄c50 ejs include 문법(= react components), static파일, express.static('public') 
  // 👉상단코드) app.use('.public', express.static('pulbic'));
  //  👉 ./views/nav.html 
  // 👉./views/~~~.ejs

  /* 
    2)
    👉./public/style.css 만들기

      static files는 public폴더안에 보관하는게 관습
      CSS파일이 여기에 해당됨
      (static files : 데이터에 의해 변하지 않는 파일) 

    4) 👉상단코드) app.use('.public', express.static('pulbic'));
    static 파일 보관위해 public폴더 쓸거라는 뜻

    6) 👉 ./views/nav.html 만들기

      공유할 html 파일 : 
      views폴더
      html형식  (ejs X)
      
      적용은 ~.ejs파일에만 적용가능함
  
    8)👉./views/~~~.ejs에 삽입하기

      여기 이자리에 nav_c50.html을 넣을수있음
      <%- include('nav_c50.html') %>  

    10)
      👉./views/index.ejs 파일변경, 폴더이동.. 
      👉./views/write.ejs 파일변경, 폴더이동.. 
  
    app.listen(3000, function(){
        console.log('c30 listening on 3000')
      });
  */


  // 🦄🦄c52 글 수정 =PUT=update, html에서 PUT요청하기, method-override 
  // 👉update.ejs, update-id.ejs
  /* 
    1 'update' - 'update-id'페이지 따로만듬
    2. app.get()도 따로 만듬
    에러없이 정상작동됨
  */
  app.get("/update", function (req, res) {
    res.render('update.ejs')
  });

  // 🍀 /update/:id
  app.get("/update/:id", function (req, res) {
    db.collection('co0921').findOne({_id: parseInt(req.params.id)},function (pp_err, p_db결과) {    
        
      console.log(p_db결과)
      res.render('update-id.ejs',{ig_post: p_db결과})      
    })
  });


  // 🦄🦄🦄c54, 👉update-id.ejs

  app.put('/update-id',function (req,res) {

    console.log(res.body)

    db.collection('co0921').updateOne({_id:parseInt(req.body.ig_id)},{$set:{title: req.body.ig_title, date: req.body.ig_date}},function (p_err, p_res) {
      console.log('ig- update- fin')

      // 🍀redirect
      // res.render('list.ejs'); 로 하면 에러남 (왜인지는 모름)
      res.redirect('/list');
    })
  });


  // 🦄🦄c56 (회원 로그인0) 세션, JWT, OAuth 등 회원인증 방법 이해하기
  // 🦄🦄c58 (회원 로그인1) 미들웨어, app.use(~), passport, express-session, passport.authenticate(~), passport.use(new LocalStorategy(~))
  // 🦄🦄c60 (회원 로그인2) passport-local, passport.serializeUser(~), bcryptjs
  // 🦄🦄c62 (회원 로그인3) mypage.ejs, middleware로그인확인, passport.deserializeUser, req.user: db의 데이터
  // 👉mypage.ejs
  // 👉login_c58.ejs

  console.log('🦄🦄c56,58,60,62')

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
    인증 성공시 : res응답.redirect('/') 
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
    function(입력한username, 입력한password, done) {
      db.collection('login').findOne({ id: 입력한username }, function (err, user정보) {

        console.log(colors.bgYellow('passport.use(new LocalStrategy'))            
        console.log(입력한username,입력한password)
        console.log(user정보)

        /*-40)
          error처리
          DB에 ID가 없을때
          DB에 ID가 있을때
          DB에 ID가 있으면, input password == DB password 비교함

          -50)
          done: 3개의 argument를 가짐
          done(서버에러, 성공시 사용자 db데이터, 에러 메시지)

          -60)        
          입력한 비밀번호를 암호화한 후 ,DB의 비밀번호와 비교해야함 (나중에 알아서 하세요)
        */

        if (err) { return done(err); }
        if (!user정보) { return done(null, false,{message:'존재하지않는 아이디입니다'}); }
        if (입력한password !== user정보.pw) { 
          return done(null, false,{message: '비번 틀림'});
        }
        return done(null, user정보,{message:'성공'});

      });
    }
  ));

  // 🍀passport.serializeUser
  // login 성공 때, id를 이용해서 session을 local에(?) 저장 (session의 id정보를 cookie로 보냄)
  // 👉f12 -> Application -> Cookies에서 확인
  passport.serializeUser(function(user정보, done) {
    console.log(colors.bgYellow('passport.serializeUser'))
    console.log(user정보)

    done(null, user정보.id);
  });


  // 🦄c62,  👉mypage.ejs
  // 🍀 passport.deserializeUser
  // login 성공 때, 위의 session데이터를 가진사람(login한 유저)의 정보를 db에서 찾아줌
  // user정보 : db에서 찾은 정보
  // p_id : passport.serializeUser에서의 use정보.id
  passport.deserializeUser(function(p_id, done) {
    db.collection('login').findOne({id:p_id}, function (err, user정보) {
      done(err, user정보);
    });
  });

  // 🍀62-50. app.get("/mypage",~~~~), 
  // 🍉req.user : db의 데이터
  app.get("/mypage",middleware로그인확인, function (req, res) {
    console.log(colors.bgBrightYellow(`/mypage : req.user`))
    console.log(req.user)
    res.render('mypage_62.ejs',{ig_mypage유저정보: req.user})
  });

  //🥒62-50. middleware로그인확인
  // req.user가 있으면 next() : 통과  👉app.get("/mypage",~~~~실행
  // req.user가 없으면 res.render(~~)  (html에 메시지 띄움)
  function middleware로그인확인(req,res,next) {
    if (req.user) {
      console.log(colors.bgBrightGreen('middleware로그인확인'))
      next()    
    } else {
      // res.send('로그인 안했습니다.');    
      res.render('login_fail.ejs')    
    }  
  }



  // 🦄🦄c64 .env 파일, environment variable, 가변적인 변수 데이터들 관리하기 
  // 👉.env  
  console.log('🦄🦄c64 ')


  /* 
    🍀 npm install dotenv

    🍀 👉상단코드 : 
      root folder에 .env파일 만들때 : require('dotenv').config()
      다른 folder(env_c64)에 .env파일 만들때 : require('dotenv').config({path: "./env_c64/.env"})
    
    🍀 server.js와 같은 폴더에 '.env'파일 만듬
    👉.env  
  */


  //🦄🦄c66 검색기능1 Query string parameters, ('/search?value='+입력한value), req.query.value, window.location.replace('/~')
  // 👉views/list.ejs : html, javascript 
  


  /* 
    🍀c66) Query string parameters : 
    b 검색하면 url뒤로 몰래 정보를 전달함
    ? ~~a~~ = ~~b~~

    🍀c66-20) server.js에서 query string꺼내씀, DB에서 데이터 꺼냄. 

    -a) req요청.query : get함수에서 요청.body 쓰는것과 비슷하게 사용하는 방식임

    -b)
      collection().findOne()           : 1개 찾을 때
      collection().find().toArray()     : 여러개 찾을 때
    */
  app.get('/search_c68',(req,res)=>{
    
    // 🥒req.query 
    console.log(req.query)
    console.log(req.query.value)

     // 🥒 collection().find().toArray()  
    // find({제목:req요청.query.value})  👉 문제점: 정확히 일치하는 것만 찾아줌
    db.collection('co0921').find({title:req.query.value}).toArray((p_err,p_db결과)=>{
      
      console.log(colors.bgBrightMagenta('get./search_c68'))
      console.log(p_db결과)

  
      //🦄🦄c68 검색기능2 mongoDB사이트...index탭, Binary Search, 
      // 👉views/👉search_c68.ejs

      /*
        🍀-30) 👉mongoDB사이트  collection 👉 index
        가나다라 정렬
        오름차순, 내림차순
        동시에 여러개 설정가능함      
      */

      res.render('search_c68.ejs',{ig_posts:p_db결과});

    })
  });
   

  //🦄🦄c70 검색기능3 mongoDB사이트...search index탭, $.parma(~), $("#form").serialize(~), aggregate(~), $search, $sort,$limit, $project, {$meta:"searchScore"}
  // 👉mongoDB사이트  collection 👉 index
  // 👉 mongoDB사이트...search index탭 활용함

  /* 
    🍀70-2) me: okky처럼 구글로 검색이동시키는 방법도 있음, 
  */


    app.get('/search_c70',(req요청,res응답)=>{

      console.log(colors.bgBrightMagenta('get./search_c70'))
      console.log(req요청.query.value)

      //  🍀70-15) .find(검색조건).toArray()
      // 👉mongoDB사이트  collection 👉 index
      // {title:req요청.query.value} : full scan하는 이전 방법      
      /*      
        db.collection('co0921').find({title:req요청.query.value}).toArray((P_err,p_db)=>{
          console.log(p_db)
          res응답.render('search_c70.ejs',{ig_posts:p_db});
        }); 
      */


      // 🍀실패함 {$text:{ $search: req요청.query.value}}
      /*  
        db.collection('co0921').find({$text:{ $search: req요청.query.value}}).toArray((P_err,p_db)=>{
          console.log(p_db)
          res응답.render('search_c70.ejs',{ig_posts:p_db});
        }); 
      */


      
      //  🍀70-20) .aggregate(검색조건).toArray()  
      // 👉 mongoDB사이트...search index탭 활용함      
      /* 
        🍀70-30)
          $sort : 
          결과정렬
          _id 순으로 정렬
          1, -1 :  오름차순, 내림차순 정렬

          $limit :
          상위 10개만 가져와주세요...라는 limit

          $project : 검색결과에서 원하는것만 보여줌
          1 : 검색결과 나옴
          0 : 검색결과 나오지 않음
          항목에 넣지않아도, 검색결과 나오지 않는걸..로 알고있음

          searchScore:  검색어와 게시물의 관련석이 높은것, 검색 많이 하는 항목은 score가 높아짐

          score는 collection에 없어도 이런식으로 코딩하면 , 
          검색결과필터링으로 넣어줌      
      */

      let 검색조건 =[
        {
          $search:{
            index : "ig_titleSearch",
            text:{
              query: req요청.query.value,
              path: ["title",'date']        //db안의 오브젝트 이름
            }  
          }
        },
        // 70-30)$sort, $limit,$project
        {$sort :{_id :1}},
        {$limit : 10},
        {$project : {title : 1, date:1, _id: 0, score :{$meta : "searchScore"}}}
      ];
      db.collection('co0921').aggregate(검색조건).toArray((err,p_db결과)=>{
        console.log(p_db결과)  
  
        res응답.render('search_c70.ejs',{ig_posts:p_db결과});
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

    app.get('/register_c72', (req요청,res응답)=>{
      res응답.render('register_c72.ejs')

    });
    
    //🍀register post하기 : passport~~~ 코드 밑에 코딩해야함
    app.post('/register_post', (req요청,res응답)=>{
      
      console.log(colors.bgBrightMagenta('register_post'))
      console.log(req요청.body.id)

      // 🍉insertOne({id:req요청.body.id, pw:req요청.body.pw}, : post로 넘어온 req요청.body.~ 데이터 저장
      db.collection('login').insertOne({id:req요청.body.id, pw:req요청.body.pw},function (p_err,p_db) {

        // 🍉redirect
        res응답.redirect('/');         
      })
    });


    // 🍀write할때, 로그인 한 작성자도 추가하기 : passport~~~ 코드 밑에 코딩해야함
    // 👉register_c72.ejs
    app.post('/add_c72',function (req요청,res) {    
      
      console.log((`app.post('/add_c72'`).bgBrightMagenta)  
      console.log(req요청.body)
      console.log(req요청.body.ig_title)

      res.render('register_c72.ejs')


      /* 
        🍀작성자: req요청.user._id        
          req요청.user._id : 현재 로그인한 사람의 정보
          req요청.user.pw  : 현재 로그인한 사람의 password
      */
      let 저장할것 = {작성자: req요청.user._id , title: req요청.body.ig_title, date:req요청.body.ig_data}

      db.collection('co0921').insertOne(저장할것,function (p_err, p_db결과) {

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

        //🍉기존 c41에서의 코드와의 차이점 :  db.collection('co0921').deleteOne(req.body, function (pp_err, pp_res) {
        db.collection('co0921').deleteOne(삭제할데이터, function (pp_err, pp_res) {
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

    // 🍀 app.use(미들웨어)
    // 👉 ./routes/shop_c74.js
    //  ./rountes/shop_c74.js 파일을 여기에 첨부
    app.use('/', require('./routes/shop_c74.js'))
    
    
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

    app.get('/upload',(req요청,res응답)=>{
      res응답.render('upload_c78.ejs');
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
    app.post('/upload',upload.single('ig_uploadInput'),(req요청,res응답)=>{
      res응답.send('c78_fin');
    });

    /* 
      🍀-40 API만들기 (업로드한 이미지... API로 만들기)

      🍉URL파라미터 
      
        a) 이름짓기👉 :ig_imageName

          적용 👉 req요청.params.ig_imageName


        b) 파일경로 : __dirname +'/public/image_c78'


        c) html에 img태그에 적용하기 (파일명 :   test_c78.jpg)
        👉upload_c78.ejs
        <img src="/public_c50/image_c78/test_c78.jpg" alt="">
    */

    app.get('/image_c78/:ig_imageName',(req요청,res응답)=>{
      res응답.sendFile(__dirname +'/public/image_c78'+ req요청.params.ig_imageName)
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





