const {uploadonCloud}=require('../utility/cloudinary')
const fs=require('fs')


const uploadMultiple=async(req,res,next)=>{
    try {
        const images=req.files
        const imagesURL=[]
        
        for (const img of images) {
            const result=await uploadonCloud(img.path)
            imagesURL.push(result.secure_url)
            fs.unlinkSync(img.path)

        }
    
        req.images=imagesURL
        next()

        
    } catch (error) {
        console.log(error)
    }




}


module.exports={
    uploadMultiple
}