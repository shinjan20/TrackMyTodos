import Axios from 'axios';
const API=Axios.create({baseURL:'https://trackmytodos.herokuapp.com/posts'});

API.interceptors.request.use((req)=>{
      if(localStorage.getItem('user'))
      {
        req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
      }
      return req;
})

export const fetchposts=()=>async(dispatch)=>{
      try {
        const {data}=await API.get('/');
        if(data && data.posts)dispatch({type:'fetch_posts',payload:data.posts});   
      } catch (error) {
        console.log(error.message);
      }
}

export const uploadpost=(postdata)=>async(dispatch)=>{
      try {
        const {data}=await API.post('/post',postdata);
        dispatch({type:'upload_post',payload:data}); 
      } catch (error) {
        console.log(error.message);
      }
}

export const updatepost=(postdata)=>async(dispatch)=>{
  try {
    const {data}=await API.post(`/${postdata._id}/update`,postdata);
    dispatch({type:'upload_post',payload:data}); 
  } catch (error) {
    console.log(error.message);
  }
}

export const finishtask=(id)=>async(dispatch)=>{
  console.log(id);
  try {
    const {data}=await API.patch(`/finish/${id}`);
    dispatch({type:'finish_task',payload:data}); 
  } catch (error) {
    console.log(error.message);
  }
}

export const deletepost=(id)=>async(dispatch)=>{
  try {
    await API.patch(`/${id}`);
    dispatch({type:'delete_post',payload:id}); 
  } catch (error) {
    console.log(error.message);
  }
}