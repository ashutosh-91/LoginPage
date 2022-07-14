/*
Mongo db is database whereas mongoose is a orm object relation mapping which helps us handle mongodb with ease

*/

const express=require('express');
const expressLayouts=require('express-ejs-layouts')
const mongoose=require('mongoose')
const passport=require('passport')
//flash and seesion
const flash=require('connect-flash')
const session=require('express-session')


//express server
const app = express();

require('./config/passport')(passport)
//DB configuration
const db=require('./config/keys').MongoURI;


//connect to mongo
mongoose.connect(db,{useNewUrlParser:true})
 .then( ()=>console.log('Mongo Db connected'))
 .catch(err=>console.log(err));

// Ejs 
app.use(expressLayouts)
//veiw engine changes express code to html
app.set('view engine','ejs')

//body parser express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. 
app.use(express.urlencoded({extended:true}))


//middleware for session 
app.use(session({
    secret: 'Dosent matter',
    resave: true,
    saveUninitialized: true
  }))

  //for sessions
  app.use(passport.initialize());
  app.use(passport.session());


  //middle ware for flash
  app.use(flash());

  //global variables
app.use((req,res,next)=>{ 
  //imlementing global var
     res.locals.success_msg=req.flash("success_msg")
     res.locals.error_msg=req.flash("error_msg")
     res.locals.error=req.flash("error")
 
   next();
 })
 



  //Routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))




const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('Sever started on port 3000')
});