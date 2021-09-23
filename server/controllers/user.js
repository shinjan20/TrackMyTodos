const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/user');
const nodemailer = require("nodemailer");
const Otp=require('../models/otp');
const signup=async(req,res)=>{
    const {firstname,secondname,email,password,confirmpassword}=req.body;
    try {
        if(password!==confirmpassword)return res.json({success:false,message:"Passwords don't match,type carefully !!"});
        const existingUser=await User.findOne({email});
        if(existingUser)return res.json({success:false,message:"user already exists!!!"});
        const hashedpassword=await bcrypt.hash(password,12);
        const result=await User.create({name:`${firstname} ${secondname}`,email,password:hashedpassword});
        const token=jwt.sign({ email: result.email, id: result._id },process.env.secret, { expiresIn: "1d" } );
        return res.status(201).json({result,token});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"something wrong ocurred"});
    }
}

const signin=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const existingUser=await User.findOne({email});
        if(!existingUser)return res.json({success:false,message:"user doesn't exist!!!"});
        const passwordmatch=await bcrypt.compare(password,existingUser.password);
        if(!passwordmatch)return res.json({success:false,message:"password doesn't match!!!"});
        const token=jwt.sign({ email: existingUser.email, id: existingUser._id },process.env.secret, { expiresIn: "1d" } );
        return res.status(201).json({result:existingUser,token});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"something wrong ocurred"});
    }
}

const resetemailsend=async(req,res)=>{
    const {email,resend}=req.body;
    const user=await User.findOne({email});
    if(!user)
    {
        return res.json({success:false,message:"user doesn't exist,check your email address carefully !!"});
    }
    else
    {
        await Otp.findOneAndDelete({email});
        const code=Math.round(Math.random()*89999 +10000);
        const OTP=await Otp.create([{email,code,creationTime:Date.now()}]);
        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
               user: `${process.env.user}`,
               pass: `${process.env.pass}`, 
            }
        })
        let mailoptions={
            from:`${process.env.user}`,
            to:email,
            subject: 'RESET YOUR PASSWORD',
            text: `your OTP to reset password is ${code}.Enter this code to complete the reset.`
        }
        transporter.sendMail(mailoptions,(err,info)=>{
            if(err)
            {
               console.log(err);
               return res.json({sucess:false,message:'something wrong happened !!'})
            }
            else
            {
               if(resend)return res.json({success:true,message:`A new otp has been generated and sent to the email address ${email},check your spam too.Remember this otp will become invalid after 3 minutes !!`});
               else return res.json({success:true,message:`An otp has been sent to the email address ${email},check your spam too.Remember this otp will become invalid after 3 minutes !!`});
            }
        })
    }
}

const otpsend=async(req,res)=>{
     const {email,OTP}=req.body;
     try {
        const existingUser=await User.findOne({email});
        if(!existingUser)return res.json({success:false,message:'Account does not exist'});
        const exist=Otp.find({email,code:OTP});
        if(!exist)return res.json({success:false,message:'invalid OTP !!'});
        if(exist.creationTime+4*1000*60<new Date().getTime())return res.json({success:false,message:'validity of OTP has been finished!!'});
        return res.status(201).json({success:true});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"something wrong ocurred"});  
    }
}

const resetpassword=async(req,res)=>{
    const {password,confirmpassword,email}=req.body;
    try {
        if(password!==confirmpassword)return res.json({success:false,message:"Passwords don't match,type carefully !!"}); 
        const existingUser=await User.findOne({email});
        if(!existingUser)return res.json({success:true,message:'Account does not exist'});
        const otp=await Otp.findOne({email});
        if(otp===null)
        {
            return res.json({success:false,message:'request cannot be processed !!'});
        }
        else if(otp.creationTime+4*1000*60<new Date().getTime())
        {
            return res.json({success:false,message:'validity of OTP has been finished !!'});
        }
        const hashedpassword=await bcrypt.hash(password,12);
        existingUser.password=hashedpassword;
        const result=await User.findOneAndUpdate({email},existingUser,{new:true});
        const token=jwt.sign({ email: result.email, id: result._id },process.env.secret, { expiresIn: "1d" } );
        return res.status(201).json({result,token});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"something wrong ocurred"});  
    }
}

module.exports={signup,signin,resetemailsend,resetpassword,otpsend};