var express = require('express');
const { request } = require('../app');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();


router.get('/', (req, res)=> {
  if(req.session.logged){
    res.redirect('/admin/adminHome')
  }else{
    if(req.session.attempt){
      res.header("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
      res.render('adminLogin',{error:"Invalid user"})
      req.session.attempt=false
    }else{
      res.header("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
      res.render('adminLogin');
    }
    
  }
  
});

router.get('/adminHome',(req,res)=>{
  if(req.session.logged){
    userHelpers.getAllUsers().then((users)=>{
    res.header("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
    res.render('adminHome',{users})
    })
    
  }else{
    res.redirect('/admin')
  }
})


router.post('/adLogin',(req,res)=>{
  if(req.body.email==Email && req.body.password==Password){
    req.session.logged=true
    res.redirect("/admin/adminHome")
  }else{
    req.session.attempt=true;
    res.redirect('/admin')

  }
})


router.get('/adminLogout',(req,res)=>{
  console.log();
  delete req.session.logged
  res.redirect('/admin')
});



router.get('/addUser',(req,res)=>{
  res.render('add-user')
})

router.post('/createUSer',(req,res)=>{
  console.log("koooooooooooooo");
  userHelpers.addUser(req.body,()=>{
    res.redirect('/admin/adminHome')
  })  
})





router.get("/deleteUser/:id",(req,res)=>{
  let userId=req.params.id
  userHelpers.deleteUser(userId).then(()=>{
    res.redirect('/admin/adminHome')
  })
})

router.get("/editUser/:id",async(req,res)=>{

  let user=await userHelpers.getUserDetails(req.params.id)
  console.log(user);
  res.render('edit-user',{user})
})

router.post("/editedUser/:id",(req,res)=>{ 

  userHelpers.updateUser(req.params.id,req.body).then(()=>{
    
    res.redirect('/admin')
  })  
})








var Email = "sha@gmail.com";
var Password = "7070";

module.exports = router;
