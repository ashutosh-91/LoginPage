//stratergy-> which it does through an extensible set of plugins known as strategies to authenticate the pass

const LocalStrategy=require('passport-local')

const bcrypt=require('bcryptjs')

const User=require('../models/User')

//this part is confusing read the documentation again 
//some things are different from the documentation
module.exports=function(passport){
  passport.use(
    new LocalStrategy({ usernameField : 'email',},(email,password,done)=>{
      //Match user just like mongoose
      User.findOne({email:email})
       .then(user=>{
          if(!user){
            return done(null,false,{message:"The email is not registered"})
          }

          bcrypt.compare(password,user.password,(err,isMatch)=>{
            if(err)throw err;

            if(isMatch){
                return done(null,user)
            }
            else{
                return done(null,false,{message:'Password Incorrect'})
            }
          })
       })

})
);

passport.serializeUser(((user, done)=> {
    
      return done(null,user.id);
    }));
  
  passport.deserializeUser((id, done)=> {
    User.findById(id,(err,user)=>{
      return  done(err,user);
    })
  });




}
