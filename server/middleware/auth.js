const jwt=require('jsonwebtoken');
const auth=async(req,res,next)=>{
     try {
         if(req.headers.authorization)
         {
            const token=req.headers.authorization.split(" ")[1];
            const customAuth=token.length<500;
            let decodeddata;
            if(customAuth)
            {
              decodeddata=jwt.verify(token,process.env.secret);
              if(decodeddata)
              {
                req.user=decodeddata;
              }
              else req.user=null;
            }
            else 
            {
              decodeddata=jwt.decode(token);
              if(decodeddata)
              {
                req.user=decodeddata;
              }
              else req.user=null;
            }
        }
        next();
     } catch (error) {
         console.log(error);
     }
}
module.exports=auth;