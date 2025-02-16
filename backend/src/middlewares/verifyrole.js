const verifyRole=(...allowedRoles)=>{
 return (
        async(req,res,next)=>{
        const role= req.user.role
        if( !allowedRoles.includes(role)){
            return res.status(403).json({message: 'Access denied. You do not have permission'})
        }
        next()
    })
}




module.exports=verifyRole