const express=require('express')
const router= express.Router()
const {upload}=require('../middlewares/multer')
const {registerUser,loginUser,logoutUser,createNewAdmin,getAlladmins,getUserinfo,updateProfile,getAllUsers}=require('../controllers/user.controller')
const authUser= require('../middlewares/authware')
const verifyRole=require('../middlewares/verifyrole')

router.route('/register').post(registerUser),
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)



//Protected Route//
router.route('/getuserinfo').get(authUser,getUserinfo)
router.route('/editProfile').post(authUser,upload.single("profile"),updateProfile)
router.route('/createadmin').post(authUser,verifyRole('superadmin'),createNewAdmin)
router.route('/getadmins').get(authUser,verifyRole('superadmin'),getAlladmins)
router.route('/getAlluser').get(authUser,verifyRole('admin','superadmin'),getAllUsers)




module.exports=router