import { Button, Card, TextField} from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { uploadpost } from '../actions/postactions';

const Todoform = () => {
    const dispatch = useDispatch();
    const [postData, setpostData] = useState({title:"",description:""});
    const validity=postData.title!=="" && postData.description!=="";
    const clear=()=>{
        setpostData({title:"",description:""});
    }
    const handleSubmit=async(e)=>{
         e.preventDefault();
         if(postData.title!=="" && postData.description!=="")
         {
             dispatch(uploadpost(postData));
         }
         clear();
    }
    return (
        <div className="todo_backbone">
            <Card elevation={3}>
            <form className="todoform" onSubmit={handleSubmit}>
               <h3>Create a new Todo</h3>
               <TextField style={{width:'80%',margin:'15px auto'}} name="Title" label="Enter new Todo" variant="outlined" autoFocus value={postData.title} onChange={(e)=>{setpostData({...postData,title:e.target.value})}}/>
               <TextField style={{width:'80%',margin:'15px auto'}} name="Description" label="Add proper description" variant="outlined" value={postData.description} onChange={(e)=>{setpostData({...postData,description:e.target.value})}}/>
               <div className="todoform-btn">
               {
                   validity ? 
                   <>
                   <Button variant="contained" color="secondary" onClick={clear}>CLEAR</Button>
                   <Button variant="contained" color="primary" type="submit">Submit</Button>
                   </> :
                   <>
                   <Button variant="contained" color="secondary" onClick={clear} disabled>CLEAR</Button>
                   <Button variant="contained" color="primary" type="submit" disabled>Submit</Button>
                   </>
               }
               </div>
            </form>
            </Card>
        </div>
    )
}

export default Todoform
