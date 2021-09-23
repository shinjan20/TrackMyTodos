import { Button, Card,Grid, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { errordissolve, otpsend, resetemailsend } from '../actions/useractions';
import '../App.css';
import '../responsive.css';
const OTPsubmit = () => {
    const [OTP,setOTP]=useState();
    const dispatch=useDispatch();
    const user=useSelector(state=>state.users);
    const history=useHistory();
    const validity=OTP!=="";
    const clear=()=>{
        setOTP('');
    }
    const handlesubmit=(e)=>{
         e.preventDefault();
         if(user.email)
         {
             const email=user.email;
             const data={email:email.email,OTP};
             dispatch(otpsend(data,history));
         }
         else dispatch({type:'signinfail',payload:'invalid account details,please try again later !!'});
         clear();
    }
    const handleclick=()=>{
      dispatch(resetemailsend({email:user.email.email,resend:true},history));
      history.push('/otp-submit');
    }
    useEffect(()=>{
        setTimeout(()=>{
          dispatch(errordissolve());
        },5000)
    },[dispatch])
    return (
        <div style={{margin:'15px'}}>
             <Grid container justifyContent='center' spacing={2}>
             {
                (user.error)?
                <Grid item xs={10} sm={7} lg={6}>
               {
                  <div className="authToast">
                      <h4>{user.error}</h4>
                  </div>
               }
               </Grid>
               :<></>
            }
            </Grid>
            <Grid container justifyContent='center'>
              <Grid item xs={12} sm={7} lg={6}>
              <Card>
                <div className="otp-card">
                  <h2>Submit OTP</h2>
                  {
                   (user.success)?
                     <div className="authSuccess">
                      <h4>{user.success}</h4>
                     </div>:<></>
                  }
                  <span>Enter the OTP sent to your email address to follow the further process</span>
                  <form className="otpform" onSubmit={handlesubmit}>
                    <Grid container spacing={1} justifyContent='center' alignItems="center" style={{margin:'10px auto'}}>
                      <Grid item xs={12} lg={9}>
                       <TextField fullWidth variant="outlined" name="OTP" value={OTP} label="enter OTP" onChange={(e)=>{setOTP(e.target.value)}}/>
                      </Grid>
                      <Grid item xs={12} lg={3}>
                         <div style={{textAlign:'center'}}>
                          <span style={{color:'orange',cursor:'pointer'}} onClick={handleclick}>Resend OTP?</span>
                         </div>
                      </Grid>
                    </Grid>
                    <div style={{marginBottom:'10px'}}>
                    {
                       validity ? 
                       <Button size="large" color="primary" variant="contained" type="submit">submit OTP</Button>:
                       <Button size="large" color="primary" variant="contained" type="submit" disabled>submit OTP</Button>
                     }
                     </div>
                    <Link to="/reset">
                      <span style={{color:'black'}}>Go back to previous page</span>
                    </Link>
                  </form>
                </div>
            </Card>
              </Grid>
            </Grid>
        </div>
    )
}

export default OTPsubmit