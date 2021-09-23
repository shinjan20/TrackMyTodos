import { Button, Card,Grid,TextField} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory} from 'react-router'
import { Link } from 'react-router-dom'
import { errordissolve, signin } from '../actions/useractions'
import { GoogleLogin } from 'react-google-login';

const Signinpage = () => {
    const User=useSelector(state=>state.users);
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')));
    const history=useHistory();
    const[formdata,setFormdata]=useState({email:'',password:''});
    const dispatch = useDispatch();
    const validity=formdata.email!=="" && formdata.password!=="";
    if(user)history.push('/');
    const clear=()=>{
        setFormdata({email:'',password:''});
    }
    useEffect(()=>{
        setTimeout(()=>{
          dispatch(errordissolve());
        },5000)
    },[dispatch,User])
    const handleSubmit=async(e)=>{
         e.preventDefault();
         clear();
         dispatch(signin(formdata,history));
    }
    const googleSuccess=async(res)=>{
        const result= res?res.profileObj:null;
        const token=res?res.tokenId:null;
        try {
            dispatch({type:'signin',payload:{result,token}});
            history.push('/');
        } catch (error) {
            dispatch({type:'signinfail',payload:'Could not sign in with Google,please try again later!!!'});
        }
    }
    const googleError=(err)=>{
        console.log(err);
    }
    return (
      <Grid container justifyContent="center">
       <Grid item xs={10} md={8} lg={6}>
        <div className="authBody">
            {
                  (User.error)?
                  <div className="authToast">
                      <h4>{User.error}</h4>
                  </div>:
                  <></>
            }
            <div className="authIcon">
                <h2>SignIn</h2>
                <img src="sign-in.png" alt="loading..." className="auth-avatar"/>
            </div>
               <Card elevation={3}>
                <form onSubmit={handleSubmit} className="auth-form">
                    <TextField fullWidth variant="outlined" name="email" value={formdata.email} label="enter email" onChange={(e)=>{setFormdata({...formdata,email:e.target.value})}} style={{margin:'15px auto'}}/>
                    <TextField fullWidth variant="outlined" type="password" name="password" value={formdata.password} label="enter password" onChange={(e)=>{setFormdata({...formdata,password:e.target.value})}} style={{margin:'15px auto'}}/>
                    <div style={{marginBottom:'10px',width:'200px'}}>
                    {
                     validity ? 
                       <Button variant="contained" color="primary" type="submit">Submit</Button>:
                       <Button variant="contained" color="primary" type="submit" disabled size="large">Submit</Button>
                    }
                    </div>
                    <GoogleLogin clientId= {`${process.env.REACT_APP_clientId}`} render={(renderProps) => (
                    <Button style={{marginBottom:'10px', padding:'10px 0',width:'200px',boxShadow:'0 2px 2px rgba(127,127,127,0.5)',backgroundColor:'white',
                    cursor:'pointer',borderRadius:'3px'}} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      <div style={{width:'100%',display:'flex',justifyContent:'space-evenly'}}>
                        <img src="google.png" alt="loading..." style={{width:'25px'}}/>
                        <h4>SIGN IN WITH GOOGLE</h4>
                      </div>
                    </Button>
                    )} onSuccess={googleSuccess} onFailure={googleError} cookiePolicy="single_host_origin"/>
                    <Link to="/reset" style={{color:'red',textDecoration:'none'}}><h4>Forgot Password?</h4></Link>
                    <span className="authLink">Don't have an account?<Link to="/signup" className="auth-link">SignUp</Link></span>
                </form>
               </Card>
        </div>
      </Grid>
     </Grid>
    )
}

export default Signinpage
