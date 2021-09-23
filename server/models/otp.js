const mongoose=require('mongoose');
const postSchema=mongoose.Schema({
      code:Number,
      email:String,
      creationTime:
      {
          type:Number,
          default:new Date().getTime()
      }
},{timestamps:true});
const Otp=mongoose.model('otp',postSchema,'otp');
module.exports=Otp;