const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt= require('jsonwebtoken')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'user'
    },
    profile:{
        type:String
    },
    phone:{
        type:String
    },
    address:{
        type:String

    },
    status:{
        type:String,
        default:'active'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
},
{
    timestamps:true
})



userSchema.pre('save',   async function(next){
    if(!(this.isModified('password'))){
        next()

    }
    else{
        this.password = await bcrypt.hash(this.password, 10)
        next()
    } 
})

userSchema.methods.checkPass=async function(userPass){
    return await bcrypt.compare(userPass,this.password)
}


userSchema.methods.genAcessToken=  function(){
    const token = jwt.sign({
        id:this._id,
        email:this.email,
        role:this.role
    },process.env.Access_Token_Secret,{expiresIn:"1h"})
   
    return token
}







const User=mongoose.model("User",userSchema)

module.exports={
    User
}