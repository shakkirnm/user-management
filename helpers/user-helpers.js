var db=require('../config/connection')
const { response } = require('../app')
const { resolve, reject } = require('promise')
var objectId = require('mongodb').ObjectId

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
    },
    getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            let users= await db.get().collection("users").find().toArray();
            resolve(users)
        })
    },

    deleteUser:(userId) =>{
        return new Promise ((resolve,reject)=>{
            db.get().collection("users").deleteOne({_id:objectId(userId)})
            resolve()
        })
    },

    getUserDetails:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection("users").findOne({_id:objectId(userId)}).then((user)=>{
                resolve(user)
            })
        })
    },
    updateUser:(userId,userDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection("users").updateOne({_id:objectId(userId)},{
                $set:{
                    name :userDetails.name,
                    email :userDetails.email
                }
            }).then((response)=>{
                
                resolve()
            })
        })
    },
    addUser:(userData,callback) =>{
              db.get().collection('users').insertOne(userData).then((data) =>{
                 callback(data);      
             })

}
}


