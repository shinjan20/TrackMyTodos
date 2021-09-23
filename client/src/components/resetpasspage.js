import { Button, Card,Grid, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import {errordissolve, resetemailsend} from '../actions/useractions';
import {useHistory} from 'react-router';
import '../App.css';

const Resetpasspage = (props) => {
    const [email, setEmail] = useState("");
    const dispatch=useDispatch();
    const validity=email!=="";
    const user=useSelector(state=>state.users);
    const clear=()=>{
        setEmail("");
    }
    const history=useHistory();
    const handlesubmit=(e)=>{
         e.preventDefault();
         clear();
         dispatch(resetemailsend({email,resend:false},history));
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
                <Grid item xs={11} sm={7} lg={6}>
               {
                  <div className="authToast">
                      <h3>{user.error}</h3>
                  </div>
               }
               </Grid>
               :<></>
            }
            </Grid>
            <Grid container justifyContent='center'>
              <Grid item xs={12} sm={7} lg={6}>
               <Card>
                <div className="resetcard">
                  <h2>Forgot Password?</h2>
                  <span>Provide us your email address to recover your account</span>
                  <form className="resetform" onSubmit={handlesubmit}>
                     <TextField fullWidth variant="outlined" name="email" value={email} label="enter your email address" onChange={(e)=>{setEmail(e.target.value)}} style={{margin:'15px auto'}}/>
                     {
                       validity ? 
                       <Button color="primary" variant="contained" type="submit">Send new login link</Button>:
                       <Button color="primary" variant="contained" type="submit" disabled>Send new login link</Button>
                     }
                  </form>
                  <Button  color="primary" variant="contained" onClick={(e)=>{props.history.push('/signup')}}>Create  new account</Button>
                  <Link to='/signin'><h4>Back to Signin</h4></Link>
                </div>
               </Card>
              </Grid>
            </Grid>
        </div>
    )
}

export default Resetpasspage
