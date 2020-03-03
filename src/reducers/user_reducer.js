import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER,
    SET_SIGN_IN,
    SET_MESSAGE
} from "../actions/user_actions";

const initialState = {
    login: '',
    isLogined: false,
    message: "",
    redir: false,
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MESSAGE:
            return {...state, message: action.payload};
        case REGISTER:
            return {...state, message: action.payload};
        case LOGIN_FAIL:
            return {...state, message: action.payload};
        case LOGIN_SUCCESS:
            return {...state, message: action.payload};
        case LOGOUT:
            return {...state, isLogined: action.payload,};
        case SET_SIGN_IN:
            return {...state, isLogined: action.payload};
        default:
            return state;
    }
}