import {FETCH_POSTS,UPLOAD_POST,DELETE_POST,UPDATE_POST, FINISH_TASK} from '../constants/types';
export default (state=[],action)=>{
    switch(action.type)
    {
        case FETCH_POSTS:
            return action.payload;
        case UPLOAD_POST:
            return [...state,action.payload];
        case UPDATE_POST:
            return state.map(post=>(post._id === action.payload._id ? action.payload : post));
        case FINISH_TASK:
            return state.map(post=>(post._id === action.payload._id ? action.payload : post));
        case DELETE_POST:
            return state.filter((post) => post._id !== action.payload);
        default:
            return state;
    }
}
