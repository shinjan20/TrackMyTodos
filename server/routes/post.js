const router=require('express').Router();
const {getposts,uploadpost,deletepost,updatepost,finishtask}=require('../controllers/post');
const auth = require('../middleware/auth');
router.get('/',auth,getposts);
router.post('/post',auth,uploadpost);
router.patch('/:id',auth,deletepost);
router.patch('/finish/:id',auth,finishtask);
router.post('/:id/update',auth,updatepost);
module.exports=router;