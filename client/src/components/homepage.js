import React,{useEffect, useState} from 'react'
import { Button,Grid } from '@material-ui/core'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Todoform from './todoform';
import Todolist from './todolist';
import { fetchposts } from '../actions/postactions';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router';

const Homepage = () => {
    const [open,setOpen]=useState(false);
    const dispatch = useDispatch();
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')));
    const history=useHistory();
    useEffect(() => {
         dispatch(fetchposts());
    }, [dispatch])
    const handleClick=()=>{
        if(user==null)
        {
           history.push('/signin');
        }
        else setOpen(!open);
    }
    return (
            <Grid container justifyContent="center">
             <Grid item xs={10} md={8} lg={6}>
             <div>
              <Button variant="contained" color="primary" onClick={handleClick}><span style={{padding:'0 5px'}}>Add new todo</span><PlaylistAddIcon/></Button>
              {
                open && <Todoform/>
              }
              {user && <Todolist/>}  
              </div>
             </Grid>
            </Grid>   
          )
}

export default Homepage
