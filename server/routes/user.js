const router=require('express').Router();
const {signin,signup, resetemailsend, resetpassword, otpsend}=require('../controllers/user');
router.post('/signin',signin);
router.post('/signup',signup);
router.post('/resetemailsend',resetemailsend);
router.post('/otpsend',otpsend);
router.post('/resetpassword',resetpassword);
module.exports=router;