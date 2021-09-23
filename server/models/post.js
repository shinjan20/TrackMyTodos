const moment=require('moment');
const mongoose=require('mongoose');
const postSchema=mongoose.Schema({
      title:String,
      description:String,
      creator:String,
      completionDate:
      {
            type:String,
            default:moment(Date.now()).format('l')
      },
      isFinished:
      {
            type:Boolean,
            default:false
      },
      createdAt:
      {
           type:Number,
           default:Date.now()
      }
});
const post=mongoose.model('post',postSchema);
module.exports=post;