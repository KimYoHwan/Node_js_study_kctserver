const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const User = require('../models/user');
const crypto = require('crypto');

passport.use('basic',new BasicStrategy(
    function (id,password,callback){
        //디비에 접근을 해서 아이디와 비밀번호를 가져와서 확인하는 부분
        const hash = crypto.createHash('sha256');
        hash.update(password);
        let hash_password = hash.digest('hex');


        //컨트롤러에서 User 확인 끝 나고 보낼떄 password 제외 {password : 0}
        User.findOne({userName:id,password:hash_password},{password:0},(err,doc) =>{
            if(doc){
                //조건이 맞으면 doc 데이터가 넘어오며 , 조건이 없을 경우 doc이 false가 된다.
                callback(null,doc);
            } else{
                callback(null,false);
            }
        });


        // if(id === "study" && password ==="1234"){
        //     return callback(null,id);
        // }else{
        //     return callback(null,false);
        // }
    }
));
exports.isBasicAuthenticated = passport.authenticate('basic',{session:false});
