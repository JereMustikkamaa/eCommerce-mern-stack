import Axios from "axios"
import Cookie from 'js-cookie'

export const signIn = (email, password) => async (dispatch)=> {
    dispatch({type: 'USER_SIGNIN_REQUEST', payload: { email, password}})
    try {
        const {data} = await Axios.post("/api/users/signin", {email, password})
        dispatch({type: 'USER_SIGNIN_SUCCESS', payload: data})
        Cookie.set('userInfo', JSON.stringify(data))
    } catch (e) {
        dispatch({type: 'USER_SIGNIN_FAIL', payload: e.message})
    }   
}

export const signOut = () => {
    return {
        type: 'USER_SIGNOUT'
    }  
}

export const register = (name, email, password) => async (dispatch)=> {
    dispatch({type: 'USER_REGISTER_REQUEST', payload: {name, email, password}})
    try {
        const {data} = await Axios.post("/api/users/register", {name, email, password})
        dispatch({type: 'USER_REGISTER_SUCCESS', payload: data})
        Cookie.set('userInfo', JSON.stringify(data))
    } catch (e) {
        dispatch({type: 'USER_REGISTER_FAIL', payload: e.message})
    }   
}
