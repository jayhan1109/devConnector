import axios from "axios";
import {setAlert} from './alert';
import setAuthToken from "../utils/setAuthToken";
import { CLEAR_PROFILE } from "./profile";

const REGISTER_SUCCESS = "auth/REGISTER_SUCCESS";
const REGISTER_FAIL = "auth/REGISTER_FAIL";
const USER_LOADED = "auth/USER_LOADED";
const AUTH_ERROR = "auth/AUTH_ERROR";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGIN_FAIL = "auth/LOGIN_FAIL";
const LOGOUT = "auth/LOGOUT";

// Load User
export const loadUser=()=>async dispatch=>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type:USER_LOADED,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type:AUTH_ERROR
        })
    }
}

// Register User
export const register =({name,email,password})=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json',
        }
    }

    const body =JSON.stringify({name,email,password});
    try {
        
        const res = await axios.post("/api/users",body,config);

        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })

        dispatch(loadUser());

    } catch (err) {
        
        const errors = err.response.data.errors;
        
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger',3000)))
        }

        dispatch({
            type:REGISTER_FAIL
        })
    }
}

// Login User
export const login =({email,password})=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json',
        }
    }

    const body =JSON.stringify({email,password});
    try {
        
        const res = await axios.post("/api/auth",body,config);

        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })

        dispatch(loadUser());
    } catch (err) {
        
        const errors = err.response.data.errors;
        
        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger',3000)))
        }

        dispatch({
            type:LOGIN_FAIL
        })
    }
}

// Logout / Clear Profile
export const logout=()=>dispatch=>{
    dispatch({type:CLEAR_PROFILE})
    dispatch({type:LOGOUT});
}



const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null
}

export default function auth(state=initialState,action){
    const {type,payload} = action;

    switch (type) {
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);
            return{...state,...payload,isAuthenticated:true,loading:false}
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return{...state,token:null,isAuthenticated:false,loading:false}
            
        default:
            return state;
    }
}