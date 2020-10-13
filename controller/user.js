const User = require('../models/user');
const crypto = require('crypto')
const jwt = require('jsonwebtoken');

let jwtKey = '20201013';



exports.createUser = (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;
    //해쉬
    const hash = crypto.createHash('sha256');
    hash.update(password);
    let hash_password = hash.digest('hex');
    //대칭키
    // const key = crypto.scryptSync('Howlkey', 'salt', 24);
    // const iv = Buffer.alloc(16,0);
    // const ciper = crypto.createCipheriv("aes-192-cbc", key,iv);
    // const deciper = crypto.createDecipheriv('aes-192-cbc',key,iv);
    // let encrypted_password = ciper.update(password,'utf8','hex');
    // encrypted_password+=ciper.final('hex');


    new User({userName: userName, password:hash_password}).save((err,doc) => {
        if(doc){
            console.log(doc);
            //대칭키 코드
            // let target = doc.password;
            // let decrypted = deciper.update(target,'hex','utf8');
            // decrypted+=deciper.final('utf8');
            // console.log("복호화 된 패스워드 "+decrypted)

            res.send("유저가 생성되었습니다.");
        }
    })

}

exports.readUser =(req, res) => {
    console.log(req.user);
    //생성되는 디비 조회 부분
    //그대로 하면 에러 , req.user => req.user.toJSON() 형태로 해야 함 (payload Error );
    let token = jwt.sign(req.user.toJSON(),jwtKey);
    res.send(token);

}
exports.updateUser = (req, res) => {
    //생성되는 디비 수정 부분
    res.send("유저가 수정 되었습니다.");
}

exports.deleteUser = (req, res)=> {
    //삭제 부분
    res.send("유저가 삭제 되었습니다.");
}