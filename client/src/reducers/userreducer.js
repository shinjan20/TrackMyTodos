import {SIGN_UP,SIGN_IN,SIGN_OUT, SIGN_UP_FAIL, SIGN_IN_FAIL,RESET_EMAIL_SEND, ERROR_DISSOLVE} from '../constants/types';
export default (state={authData:null,error:null,email:null},action)=>{
   switch(action.type)
   {
      case SIGN_UP:
      case SIGN_IN:
          localStorage.setItem('user',JSON.stringify(action.payload));
          return {...state,authData:action.payload,error:null};
      case SIGN_OUT:
          localStorage.clear();
          return {...state,email:null,authData:null,error:null};
      case SIGN_UP_FAIL:
      case SIGN_IN_FAIL:
          return {...state,authData:null,error:action.payload,email:null};
      case RESET_EMAIL_SEND:
          return {...state,authData:null,error:null,email:action.payload.email,success:action.payload.message};
      case ERROR_DISSOLVE:
          return {...state,authData:null,error:null}
      default:
          return state;
   }
}