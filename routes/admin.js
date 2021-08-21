var express = require('express');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();
const adminHelpers  = require('../helpers/user-helpers')


router.get('/', (req, res)=> {
  if(req.session.logged){
    res.redirect('/admin/adminHome')
  }else{
    if(req.session.attempt){
      res.header("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
      res.render('adminLogin')
      req.session.attempt=false
    }else{
      res.header("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
      res.render('adminLogin');
    }
    
  }
  
});

router.get('/adminHome',(req,res)=>{
  if(req.session.logged){
    // userHelpers.getUsers().then((users)=>{
    res.header("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
    res.render('adminHome')
    // })
    
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









var Email = "sha@gmail.com";
var Password = "7070";

module.exports = router;
