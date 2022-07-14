const mongoose=require('mongoose')
//Creating the structure of database 
const UserSchema=new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
          },
          email: {
            type: String,
            required: true
          },
          password: {
            type: String,
            required: true
          },
          date: {
            type: Date,
            default: Date.now
          }
    }
);
// To use our schema definition, we need to convert our blogSchema into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema):
//Why we write this line i.e below
const User=mongoose.model('User',UserSchema);
module.exports=User;