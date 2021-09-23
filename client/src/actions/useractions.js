import Axios from 'axios';
export const signup=(userdata,history)=>async(dispatch)=>{
    try {
        const {data}=await Axios.post('https://trackmytodos.herokuapp.com/user/signup',userdata);
        if(data.success===false)dispatch({type:'signupfail',payload:data.message});
        else{
            dispatch({type:'signup',payload:data});
            history.push('/');
        }
    } catch (error) {
        console.log(error);
    }
}

export const signin=(userdata,history)=>async(dispatch)=>{
    try {
        const {data}=await Axios.post('https://trackmytodos.herokuapp.com/user/signin',userdata);
        if(data.success===false)dispatch({type:'signinfail',payload:data.message});
        else
        {
            dispatch({type:'signin',payload:data});
            history.push('/');
        }
    } catch (error) {
        console.log(error);
    }
}

export const resetemailsend=(userdata,history)=>async(dispatch)=>{
    console.log(userdata);
    try {
        const {data}=await Axios.post('https://trackmytodos.herokuapp.com/user/resetemailsend',{email:userdata.email,resend:userdata.resend});
        if(data.success===false)dispatch({type:'signinfail',payload:data.message});
        else 
        {
            dispatch({type:'resetemailsend',payload:{email:userdata,message:data.message}});
            history.push('/otp-submit');
        }
    } catch (error) {
        console.log(error);
    }
}

export const otpsend=(userdata,history)=>async(dispatch)=>{
    try {
        const {data}=await Axios.post('https://trackmytodos.herokuapp.com/user/otpsend',userdata);
        if(data.success===false)dispatch({type:'signinfail',payload:data.message});
        else
        {
            history.push('/reset-password');
        }
    } catch (error) {
        console.log(error);
    }
}

export const resetpass=(userdata,history)=>async(dispatch)=>{
    try {
        const {data}=await Axios.post('https://trackmytodos.herokuapp.com/user/resetpassword',userdata);
        if(data.success===false)
        {
            history.push('/reset');
            dispatch({type:'signinfail',payload:data.message});
        }
        else
        {
            dispatch({type:'signin',payload:data});
            history.push('/');
        }
    } catch (error) {
        console.log(error);
        history.push('/reset');
    }
}

export const signout=()=>async(dispatch)=>{
    try {
        dispatch({type:'signout'});
    } catch (error) {
        console.log(error);
    }
}

export const errordissolve=()=>{
    return{type:'error_dissolve'};
}