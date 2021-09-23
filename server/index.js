const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');
const user=require('./routes/user');
const post=require('./routes/post');
const app=express();
app.get('/',(req,res)=>{res.send('hello')})
dotenv.config();
app.use(express.json({limit:'30mb',extended:true}));
app.use(express.urlencoded({limit:'30mb',extended:true}));
app.use(cors());
app.use('/user',user);
app.use('/posts',post);
let PORT = process.env.PORT || 5000;
const db=process.env.db;
mongoose.connect(db).then(()=>{app.listen(PORT,()=>{console.log(`app running at port ${PORT}`)})}).catch(err=>{console.log('failed to connect to db')});
