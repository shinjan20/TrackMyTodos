import React, { useEffect, useState } from 'react'
import { Avatar,Grid} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import decode from 'jwt-decode';
import { signout } from '../actions/useractions'
import '../App.css'
import '../responsive.css'
const Navbar = () => {
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')));
    const dispatch = useDispatch();
    const history=useHistory();
    const location = useLocation();
    const logout=()=>{
        setUser(null);
        dispatch(signout());
        history.push('/signin');
    }
    useEffect(()=>{
        let token=user ? user.token : null;
        if (token) {
           const decodedToken = decode(token);
           if (decodedToken.exp * 1000  < new Date().getTime()) 
           {
               logout();
           }
        }
        setUser(JSON.parse(localStorage.getItem('user')));
    },[location])
    return (
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10}>
            <div className="Navbar">
                <Link to="/" className="link">
                <div className="nav-brand">
                <h2>TrackMyTodos</h2>
                <img className="icon" src="to-do-list.png" alt="loading"/>
                </div>
                </Link>
                {
                   !user?
                   <div className="nav-link">
                      <Link to="/signup" className="link"><h3>SignUp</h3></Link>
                      <Link to="/signin" className="link"><h3>SignIn</h3></Link>
                   </div>
                   :
                   <div className="nav-link">
                   <Avatar style={{backgroundColor:'orangered',color:'white'}}>{user.result.name[0]}</Avatar>
                   <h3 className="logout" onClick={logout}>SignOut</h3>
                   </div>
                }
            </div>
         </Grid> 
        </Grid>
    )
}

export default Navbar
