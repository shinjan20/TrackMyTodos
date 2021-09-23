const { Mongoose } = require('mongoose');
const Post=require('../models/post');
const getposts=async(req,res)=>{
    if(!req.user)return res.json({message:"unauthorized"});
    try {
        const {id}=req.user;
        const posts=await Post.find({creator:id});
        res.status(200).json({posts});
    } catch (error) {
        console.log(error);
        return res.status(400).json({sucess:false,message:'something wrong occurred!!'});
    }
}
const uploadpost=async(req,res)=>{
    if(!req.user)return res.json({message:"unauthorized"});
    const {id}=req.user;
    try {
        const newpost=new Post({...req.body,creator:id});
        await newpost.save();
        return res.status(201).json(newpost);
    } catch (error) {
        console.log(error);
        return res.status(400).json({sucess:false,message:'something wrong occurred!!'});
    }
}
const updatepost=async(req,res)=>{
    if(!req.user)return res.status(401).json({message:"unauthorized"});
    const {id}=req.user;
    try {
        const newpost=new Post({...req.body,_id:req.params.id,creator:id});
        const updatedpost=await Post.findByIdAndUpdate(id,newpost,{new:true});
        return res.json(updatedpost);
    } catch (error) {
        console.log(error);
        return res.status(400).json({sucess:false,message:'something wrong occurred!!'});
    }
}
const finishtask=async(req,res)=>{
    if(!req.user)return res.status(401).json({message:"unauthorized"});
    const {id}=req.params;
    try {
        let newpost=await Post.findById(id);
        newpost.isFinished=true;
        const updatedpost=await Post.findByIdAndUpdate(id,newpost,{new:true});
        return res.json(updatedpost);
    } catch (error) {
        return res.json({sucess:false,message:'something wrong occurred!!'});
    }
}
const deletepost=async(req,res)=>{
    if(!req.user)return res.status(401).json({message:"unauthorized"});
    const { id } = req.params;
    try {
        await Post.findByIdAndRemove(id);
        res.json({ success:true, message: "Post deleted successfully." });
    } catch (error) {
        return res.json({sucess:false,message:'something wrong occurred!!'});
    }
}

module.exports={getposts,uploadpost,deletepost,updatepost,finishtask};