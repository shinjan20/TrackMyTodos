import { Button, Card, TextField, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory} from 'react-router'
import { Link } from 'react-router-dom'
import { errordissolve, signup } from '../actions/useractions'

const Signuppage = () => {
    const User=useSelector(state=>state.users);
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')));
    const history=useHistory();
    if(user)history.push('/');
    const[formdata,setFormdata]=useState({firstname:'',secondname:'',email:'',password:'',confirmpassword:''});
    const dispatch = useDispatch();
    const validity=formdata.firstname!=="" && formdata.secondname!=="" && formdata.email!=="" && formdata.password!=="" && formdata.confirmpassword!=="";
    const clear=()=>{
        setFormdata({firstname:'',secondname:'',email:'',password:'',confirmpassword:''});
    }
    useEffect(()=>{
        setTimeout(()=>{
          dispatch(errordissolve());
        },5000)
    },[dispatch,User])
    const handleSubmit=(e)=>{
         e.preventDefault();
         dispatch(signup(formdata,history));
         clear();
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
                <h2>SignUp</h2>
                <img src="new-user.png" alt="loading..." className="auth-avatar"/>
            </div>
              <Card elevation={3}>
                <form onSubmit={handleSubmit} className="auth-form">
                    <TextField fullWidth variant="outlined" name="firstname" value={formdata.firstname} label="enter firstname" onChange={(e)=>{setFormdata({...formdata,firstname:e.target.value})}} style={{margin:'15px auto'}}/>
                    <TextField fullWidth variant="outlined" name="secondname" value={formdata.secondname} label="enter secondname" onChange={(e)=>{setFormdata({...formdata,secondname:e.target.value})}} style={{margin:'15px auto'}}/>
                    <TextField fullWidth variant="outlined" name="email" value={formdata.email} label="enter email" onChange={(e)=>{setFormdata({...formdata,email:e.target.value})}} style={{margin:'15px auto'}}/>
                    <TextField fullWidth variant="outlined" name="password" value={formdata.password} type="password" label="enter password" onChange={(e)=>{setFormdata({...formdata,password:e.target.value})}} style={{margin:'15px auto'}}/>
                    <TextField fullWidth variant="outlined" name="confirmpassword" value={formdata.confirmpassword} type="text" label="confirm password" onChange={(e)=>{setFormdata({...formdata,confirmpassword:e.target.value})}} style={{margin:'15px auto'}}/>
                    <span className="authLink">Have an account?<Link to="/signin" className="auth-link">SignIn</Link></span>
                    {
                     validity ? 
                       <Button variant="contained" color="primary" type="submit">Submit</Button>:
                       <Button variant="contained" color="primary" type="submit" disabled>Submit</Button>
                    }
                </form>
              </Card>
          </div>
         </Grid>
        </Grid>
    )
}

export default Signuppage