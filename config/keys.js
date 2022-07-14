require('dotenv').config()

module.exports={
    MongoURI:`mongodb+srv://as:${process.env.value}@cluster0.lp8xo6p.mongodb.net/?retryWrites=true&w=majority`
}