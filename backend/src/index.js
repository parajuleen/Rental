const app=require('./app')
const connectDb=require('./dbconnection/connectdb')
const dotenv=require('dotenv')

dotenv.config({
    path:'./.env'
})



connectDb()
.then(()=>{
    app.listen(3535,()=>{
        console.log('server is running on port 3535')
        })
})
.catch((error)=>{
    console.log('Something went wrong in ',error)
})
