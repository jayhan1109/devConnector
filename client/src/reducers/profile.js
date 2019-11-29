import axios from 'axios';
import {setAlert} from './alert';

export const GET_PROFILE='profile/GET_PROFILE';
export const PROFILE_ERROR='profile/PROFILE_ERROR';
export const CLEAR_PROFILE='profile/CLEAR_PROFILE';

// Get current user profile
export const getCurrentProfile=()=>async dispatch=>{
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{
                msg:err.response.statusText,
                status:err.response.status
            }
        })
    }
}


const initialState={
    profile:null,
    profiles:[],
    repos:[],
    loading:true,
    error:{}
}

export default function profile(state=initialState,action){
    const {type,payload} = action;

    switch(type){
        case GET_PROFILE:
            return {
                ...state,
                profile:payload,
                loading:false
            }
        case PROFILE_ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            }
        case CLEAR_PROFILE:
            return{
                ...state,
                profile:null,
                repos:[],
                loading:false
            }
        default:
            return state;
    }
}