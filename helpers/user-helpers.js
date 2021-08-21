var db=require('../config/connection')
const { response } = require('../app')

module.exports={
    doSignup:(userData)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection("users").insertOne(userData).then((data)=>{
                resolve(data)
            }) 
        })
    },

    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let user = await db.get().collection("users").findOne({email:userData.email})
            let loginStatus =false
            if(user){
                if(user.password==userData.password){
                    loginStatus = true;
                    resolve(loginStatus)                    
                }else{
                    loginStatus =false;
                    resolve(loginStatus)
                    console.log('login failed');
                }
            }else{
                loginStatus=false
                resolve(loginStatus)
                console.log("user not found");
            }
        })
    }
}