import axios from 'axios';
import {SET_TABLE} from "./functional_actions";

export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const SET_SIGN_IN = "SET_SIGN_IN";
export const SET_MESSAGE = 'SET_MESSAGE';


export function logout() {

    return dispatch => {
        localStorage.removeItem("User_Person");
        axios.get("http://localhost:16000/logout", {
            withCredentials: true,
        })
            .then(result => {
                console.log(result)
            })
            .catch(result => console.log(result));
        dispatch({
            type: LOGOUT,
            payload: false,
        });
        dispatch({
            type: SET_TABLE,
            payload: [],
        });
    }
}

export function login(data) {
    return dispatch => {
        let header = 'Basic ' + btoa(data.username + ':' + data.password);
        axios({
            url: 'http://localhost:16000/login',
            method: 'post',
            headers: {
                Authorization: header
            },
        })
            .then(result => {
                console.log(result);
                if (result.status == 200) {
                    localStorage.setItem("User_Person", header);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: "Welcome!",
                    });
                    dispatch({
                        type: SET_SIGN_IN,
                        payload: true,
                    });
                } else {
                    dispatch({
                        type: LOGIN_FAIL,
                        payload: "Incorrect login or password",
                    })
                }
            })
            .catch(result => {
                console.log(result);
                dispatch({
                    type: LOGIN_FAIL,
                    payload: "Incorrect login or password",
                })
            });
    }
}

export function registration(data) {
    return dispatch => {
        let header = 'Basic ' + btoa(data.username + ':' + data.password);
        axios({
            method: "post",
            url: 'http://localhost:16000/register',
            data: data,
        })
            .then(result => {
                console.log(result);
                if (Number(result.status) === 201) {
                    localStorage.setItem("User_Person", header);
                    dispatch({
                        type: REGISTER,
                        payload: "You was successfully registered"
                    })
                    dispatch({
                        type: SET_SIGN_IN,
                        payload: true,
                    });
                } else {
                    dispatch({
                        type: REGISTER,
                        payload: "Such user has already existed, enter another login for registration.",
                    });
                }
            })
            .catch(result => {
                console.log(result);
                dispatch({
                    type: REGISTER,
                    payload: "Such user has already existed, enter another login for registration.",
                });
            })
        ;
    }
}


export function setMessage(message) {
    return{
        type: SET_MESSAGE,
        payload: message
    }
}

export function setLogin(login) {
    return{
        type: SET_SIGN_IN,
        payload: login
    }
}