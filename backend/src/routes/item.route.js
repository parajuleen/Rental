const express=require('express')
const authUser = require('../middlewares/authware')
const verifyRole=require('../middlewares/verifyrole')
const   router=express.Router()
const { listProduct,getapprovedProducts, approveItem, rejectItem,fetchProducts } = require('../controllers/item.controller')
const {upload}=require('../middlewares/multer')
const{uploadMultiple}=require('../middlewares/uploadmultiple')

///for users//
router.route('/getApproved').get(authUser,getapprovedProducts)
router.route('/listItem').post(authUser,upload.array('productImages'),uploadMultiple,listProduct)






//for admin//(Protected route )
router.route('/approveItem/:id').put(authUser,verifyRole('admin','superadmin'),approveItem)
router.route('/rejectItem/:id').put(authUser,verifyRole('admin','superadmin'),rejectItem)
router.route('/fetchItem/:status').get(authUser,verifyRole('admin','superadmin'),fetchProducts)



module.exports=router
