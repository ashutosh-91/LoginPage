//all the user or index page routes go here
const express=require('express');

//express router
const router = express.Router();
const {ensureAuthenticated}=require('../config/auth')
//welcome
router.get('/',(req,res)=>{
    res.render('welcome')
})


router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    res.render('dashboard',{
        name:req.user.name
    })
})

module.exports=router;