import axios from 'axios';

export const CANVAS_WIDTH = 'CANVAS_WIDTH';
export const CLOCK_SIZE = 'CLOCK_SIZE';
export const DEVICE_TYPE = 'DEVICE_TYPE';
export const CANVAS_COF = 'CANVAS_COF';
export const PAGE_WIDTH = 'PAGE_WIDTH';
export const SET_TABLE = 'SET_TABLE';
export const SET_X = 'SET_X';
export const SET_Y = 'SET_Y';
export const SET_R = 'SET_R';
export const SET_MESSAGE_X = 'SET_MESSAGE_X';
export const SET_MESSAGE_Y = 'SET_MESSAGE_Y';
export const MARGIN_LEFT = 'MARGIN_LEFT';
export const MARGIN_TOP = 'MARGIN_TOP';
export const SET_MESSAGE_R = 'SET_MESSAGE_R';
export const ADD_DOT = "ADD_DOT";

export function setPageWidth(width) {
    return {
        type: PAGE_WIDTH,
        payload: width
    }
}

export function setMarginLeft(margin) {
    return{
        type: MARGIN_LEFT,
        payload: margin
    }
}

export function setMarginTop(margin) {
    return{
        type: MARGIN_TOP,
        payload: margin
    }
}

export function getTable() {
    return dispatch => {
        let header = localStorage.getItem('User_Person');
        axios({
            url: 'http://localhost:16000/result',
            method: 'post',
            headers: { Authorization: header,}
        }).then(data =>{
            dispatch({
                type: SET_TABLE,
                payload: data.data
            })
        }).catch(data => console.log(data));
    }

}

export function setCof(cof) {
    return{
        type: CANVAS_COF,
        payload: cof
    }

}

export function setClockSize(size) {
    return{
        type: CLOCK_SIZE,
        payload: size
    }
}

export function sendPoint(butch){
    return dispatch => {
        let header = localStorage.getItem("User_Person");
        axios({
            url: 'http://localhost:16000/table',
            data: butch,
            method: 'post',
            headers: {
                Authorization: header,
            },
        })
            .then(data => {
                console.log(data);
                dispatch({
                    type: ADD_DOT,
                    payload: data.data,
                })
            })
            .catch(data => console.log(data));
        dispatch({
            type: SET_X,
            payload: null,
        });
        dispatch({
            type: SET_Y,
            payload: null,
        });
        document.getElementById("yInput").value = "";
    }
}

export function setWidth(width) {
    console.log("Canvas width: " + width);
    return{
        type: CANVAS_WIDTH,
        payload: width
    }
}

export function setDevice(device) {
    return{
        type: DEVICE_TYPE,
        payload: device
    }
}

export function setR(R) {
    return{
        type: SET_R,
        payload: R
    }
}

export function setX(X) {
    return{
        type: SET_X,
        payload: X
    }
}

export function setY(Y) {
    return{
        type: SET_Y,
        payload: Y
    }
}

export function setMessageR(message) {
    return{
        type: SET_MESSAGE_R,
        payload: message
    }
}

export function setMessageX(message) {
    return{
        type: SET_MESSAGE_X,
        payload: message
    }
}

export function setMessageY(message) {
    return{
        type: SET_MESSAGE_Y,
        payload: message
    }
}