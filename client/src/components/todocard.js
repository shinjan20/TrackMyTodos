import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Accordion,AccordionDetails, AccordionSummary, Button, Chip, Modal} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { deletepost, finishtask } from '../actions/postactions';

const Todocard = ({post}) => {
         const dispatch=useDispatch();
         const [open, setOpen] = useState(false);
         const handleOpen = () => setOpen(true);
         const handleClose = () => setOpen(false);
         const handleclick= () =>dispatch(finishtask(post._id));
         return(
             <div className="accordion" key={post._id}>
             <Accordion>
             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div className="accordion-first">
               <div className="accordion-second">
               <h4 className="postTitle">{post.title}</h4>
               {
                 post.isFinished?<Chip color="primary" label="Task Finished"/>:<Chip color="secondary" label="Task yet to finish"/>
               }
               </div>
               <DeleteIcon onClick={handleOpen} style={{cursor:'pointer'}}/>
               <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                   <div className="modal">
                     <div className="modal-body">
                      <span>Are you sure you want to delete?</span>
                       <div style={{margin:'5px'}}>
                      <Button variant="contained" color="secondary" onClick={()=>{dispatch(deletepost(post._id));setOpen(!open)}}>Yes</Button> <Button variant="contained" color="primary" onClick={handleClose}>No</Button>
                      </div>
                     </div>
                   </div>
               </Modal>
              </div>
             </AccordionSummary>
             <AccordionDetails>
               <div className="accordiondetails">
                 <h2>{post.description}</h2>
                 <br/><span>Have to finish within :&nbsp;&nbsp;<span style={{fontWeight:'bolder'}}>{post.completionDate}</span></span>
                 <br/>
                 {!post.isFinished && ((new Date().getTime()-24*60*60*1000)<=post.createdAt) &&
                 <div style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}><h4 style={{flexGrow:1}}>Have you finished this task? </h4><Button variant="contained" color="primary" onClick={handleclick}>Yes</Button> <Button variant="contained" color="secondary">No</Button></div>}
               </div>
             </AccordionDetails>
           </Accordion>
           </div>
          )
}

export default Todocard
