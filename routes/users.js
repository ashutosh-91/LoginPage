//all the user or index page routes go here
//all the user or index page routes go here


const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


const User=require('../models/User')


router.get('/login',(req,res)=>{
    res.render("login")
});

router.get('/register',(req,res)=>{
    res.render("register")
});

//register handle when we submit
router.post('/register',(req,res)=>{
    const {name,email,password,password2}=req.body;
    let errors=[]

    if(!name || !email || !password || !password2){
        errors.push({msg:'Please fill in the feilds'})
    }
     if(password!=password2){
        errors.push({msg:'Password Do Not Match'})

    }
     if(password.length<6){
        errors.push({msg:'Password Should be of more than 6 length'})
    }

    if(errors.length>0){
        res.render('register',{
            errors,name,email,password,password2
        })
    }
    else{
      //validate the passport
      //finds one record  and return a promise
      User.findOne({email:email})
      .then(user=>{
        if(user){
            //user exists
            errors.push({msg:'Email already exists'})
            res.render('register',{
                errors,name,email,password,password2
            })
        }
        else{
               const newUser=new User({
                name,
                email,
                password
               });
         
               //hashpassword
               bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        //save the hash
                        //when we redirect we want to show aflash message that is why we are using adifferent message 
                       newUser.password=hash
                       newUser
                        .save()
                        .then(user=>{
                         
                            req.flash(
                            "success_msg",
                            'You are now Resgistered'
                            ); 
                            res.redirect('/users/login')

                            console.log("called"); 
                        })
                       .catch(err=>console.log(err));
             

                })
               })
        }
      });

    }
})

//post req to user.login
// router.post('/login/password',(req,res,next)=>{

//     passport.authenticate('local', {
//        successRedirect:'/dashboard',
//        failureRedirect:'/users/login',
//        failureFlash:true  
//     });

// });

router.post('/login',
 (req,res,next)=>{
    passport.authenticate('local',
     {
         successRedirect:'/dashboard',
         failureRedirect: '/users/login',
         failureFlash: true 
    })(req, res,next); 
 });
 

//logout
router.get('/logout',(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success_msg','You are logged out');
    res.redirect('/users/login')
      });



    
})

 module.exports=router;