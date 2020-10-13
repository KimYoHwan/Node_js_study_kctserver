const express = require("express");
const route = express.Router();
const user = require("../controller/user");
const auth = require("../auth/auth");
const path = require('path');
const multer = require('multer');

//업로드할 경로
//var upload = multer({dest:'images/'});
var storage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null,'images')
    },
    filename: function (req,file,cb){
        cb(null,file.originalname);
    }
})

function fileFilter(req,file,cb){
    if(file.mimetype === "image/png"){
        cb(null,true);
    }else if(file.mimetype === "image/jpeg"){
        cb(null,true);
    }
    else{
        cb(null,false);
    }

}
var upload = multer({storage:storage,fileFilter:fileFilter,limits:{fileSize:1000000000}});




//__dirname 프로젝트 경로 ( 절대 경로 ) => path.join(__dirname, , ,)
route.get('/home',(req, res) => {
    res.sendfile(path.resolve(__dirname,'..','view','index.html'));
});

route.route('/image')
    .get((req,res) =>{
        res.sendFile(path.resolve(__dirname,'..','images','background.jpg'))
    })
    .post(upload.single('avatar'), (req, res, next) => {
        res.send(req.file);
    })


route.route('/user')
    .post(user.createUser)
    .get(auth.isBasicAuthenticated,user.readUser)
    .put(auth.isBasicAuthenticated,user.updateUser)
    .delete(auth.isBasicAuthenticated,user.deleteUser);

route.route('/test')
    .get((req, res) => {
        console.log(req.query);
        res.send("테스트");
    })
    .post((req, res) => {
        console.log(req.body);

        res.send("POST방식");
    });

route.route('/test/:id')
    .get((req, res) => {
        //데이터를 업데이트, 삭제
        console.log(req.query);
        res.send("확인2");
    });

module.exports=route;

//Create  : POST : 회원가입
//READ : GET : Login
//UPDATE : PUT : 회원가입 수정
//DLETE : DLETE : 회원가입 삭제
