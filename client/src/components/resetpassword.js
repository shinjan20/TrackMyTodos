import { Button, Card,Grid, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { errordissolve, resetpass } from '../actions/useractions';
import {useHistory} from 'react-router-dom';
import '../App.css';

const Resetpasspage = (props) => {
    const [data,setData]=useState({password:"",confirmpassword:"",email:""});
    const user=useSelector(state=>state.users);
    const dispatch=useDispatch();
    const history=useHistory();
    const validity=data.confirmpassword!=="" && data.password!=="";
    const clear=()=>{
        setData({password:'',confirmpassword:'',email:''});
    }
    useEffect(()=>{
        setTimeout(()=>{
          dispatch(errordissolve());
        },5000)
    },[dispatch])
    const handlesubmit=(e)=>{
         e.preventDefault();
         clear();
         if(user.email)dispatch(resetpass(data,history));
         else 
         {
             dispatch({type:'signinfail',payload:'invalid account details,please try again later !!'});
             history.push('/reset');
         }
    }
    return (
      <div style={{margin:'15px'}}>
        <Grid container justifyContent='center'>
          <Grid item xs={12} sm={7} lg={6}>
            <Card>
                <div className="resetcard">
                  <h2>Change Password</h2>
                  <span>Enter a new password for your account</span>
                  <form className="resetform" onSubmit={handlesubmit}>
                     <TextField fullWidth variant="outlined" name="email" value={data.email} label="enter email" onChange={(e)=>{setData({...data,email:e.target.value})}} style={{margin:'15px auto'}}/>
                     <TextField fullWidth variant="outlined" name="password" type="password" value={data.password} label="enter new password" onChange={(e)=>{setData({...data,password:e.target.value})}} style={{margin:'15px auto'}}/>
                     <TextField fullWidth variant="outlined" name="confirmpassword" value={data.confirmpassword} label="confirm password" onChange={(e)=>{setData({...data,confirmpassword:e.target.value})}} style={{margin:'15px auto'}}/>
                     {
                       validity ? 
                       <Button variant="contained" color="primary" type="submit">Submit</Button>:
                       <Button variant="contained" color="primary" type="submit" disabled>Submit</Button>
                     }
                  </form>
                  <Button color="primary" variant="contained" onClick={(e)=>{props.history.push('/signup')}}>Create  new account</Button>
                  <Link to='/signin'><h4>Back to Signin</h4></Link>
                </div>
            </Card>
            </Grid>
          </Grid>
          </div>
    )
}

export default Resetpasspage