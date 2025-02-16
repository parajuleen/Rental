const jwt=require('jsonwebtoken')

const authUser= async(req,res,next)=>{
    try {

        const token=req.cookies.accessToken
        if(!token){
            return res.status(401).json({msg:'Access Denied.Please login first'})
        }

        const verifyUser= await jwt.verify(token,process.env.Access_Token_Secret)
        if(!verifyUser){
            return res.status(401).json({msg:'Invalid Token'})
        }
        req.user=verifyUser
        next()
        
    } catch (error) {
        console.error(error)
    }
}

module.exports=authUser


