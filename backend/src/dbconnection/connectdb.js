const mongoose=require('mongoose')

const connectDb=async()=>{
    try {
        await mongoose.connect(`${process.env.DB_URI}${process.env.DB_Name}`)
        console.log('Database connected')
        
    } catch (error) {
        console.log('error in connection database',error)
        
    }
}
module.exports=connectDb;