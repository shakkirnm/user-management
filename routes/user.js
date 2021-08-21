var express = require('express');

var router = express.Router();
var MongoClient = require('mongodb').MongoClient
const userHelpers  = require('../helpers/user-helpers')



function userCheck(req,res,next){
    if(req.session.isLogged){
        next()
    }else{
        res.redirect("/")
    }
}

router.get("/", (req, res) => {
    if(req.session.isLogged){
        res.redirect("/home")
    }else{
        if(req.session.attempt){
            res.header("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
            res.render("login");
            req.session.attempt = false;
        }else{
            res.header("Cache-Control","no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
            res.render("login")
        }
    }
});

router.post("/signup",(req,res)=>{
    userHelpers.doSignup(req.body).then((response)=>{
        if(response){
            req.session.isLogged = true;
            // res.header("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
            res.redirect('/home')
        }else{
            req.session.attempt = true;
            res.redirect("/");
        } 
    })
})

router.post("/login", (req,res)=>{
    userHelpers.doLogin(req.body).then((response)=>{
        if(response){
            req.session.isLogged = true;
            res.redirect("/home");
        }else{
            req.session.attempt =true;
            res.redirect("/")
        }
    })
})

router.get("/home", userCheck, (req,res)=>{
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.render("home",{products})
})

router.get("/logout",(req,res)=>{
    delete req.session.isLogged
    res.redirect("/")
})






let products = [
  {
      name: "Mini Cooper s",
      about: "Smallest Premium car, 3 door sports car",
      image: "https://images.unsplash.com/photo-1619861312543-2464f524b382?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  },
  {
      name: "Porsche Carrera s",
      about: "Smallest Premium car, 3 door sports car",
      image: "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80",
  },
  {
      name: "Ninja Zx10r",
      about: "Smallest Premium car, 3 door sports car",
      image: "https://images.unsplash.com/flagged/photo-1578240358966-610647316c40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  },
  {
      name: "Ninja H2",
      about: "Smallest Premium car, 3 door sports car",
      image: "https://images.unsplash.com/photo-1623160850020-e98174120203?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=636&q=80",
  },
  {
      name: "BMW 5 Series",
      about: "Smallest Premium car, 3 door sports car",
      image: "https://images.unsplash.com/photo-1583356322882-85559b472f56?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  },
  {
      name: "Lamborghini Huracan",
      about: "Smallest Premium car, 3 door sports car",
      image: "https://images.unsplash.com/photo-1615893550524-49b4ae503f3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fGxhbWJvcmdoaW5pfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
      name: "Lamborghini Urus",
      about: "Smallest Premium car, 3 door sports car",
      image: "https://images.unsplash.com/photo-1619097763751-2881df85ed25?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAwfHxsYW1ib3JnaGluaXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
      name: "Jeep Wrangler",
      about: "Smallest Premium car, 3 door sports car",
      image: "https://images.unsplash.com/photo-1595392004747-3d9b64a4b013?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHdyYW5nbGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
      name: "Mini Cooper s",
      about: "Smallest Premium car, 3 door sports car",
      image: "https://images.unsplash.com/photo-1555596899-e7b9da3a2505?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YmVudGxleXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
      name: "Porsche Carrera s",
      about: "Smallest Premium car, 3 door sports car",
      image: "https://images.unsplash.com/photo-1559038465-e0ca2910a5b1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZyUyMHdhZ29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
      name: "Ninja Zx10r",
      about: "Smallest Premium car, 3 door sports car",
      image: "https://images.unsplash.com/photo-1623756005234-9cfaafc647dd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c3VwZXJiaWtlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
      name: "Ninja H2",
      about: "Smallest Premium car, 3 door sports car",
      image: "https://images.unsplash.com/photo-1610399214658-52b9fdea4627?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGNhcnN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  }
];


module.exports = router;
