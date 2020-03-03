import {
    CANVAS_WIDTH,
    DEVICE_TYPE,
    SET_R,
    PAGE_WIDTH,
    CANVAS_COF,
    SET_TABLE,
    SET_MESSAGE_R,
    SET_MESSAGE_X,
    SET_MESSAGE_Y,
    MARGIN_LEFT,
    MARGIN_TOP,
    ADD_DOT,
    SET_X,
    SET_Y, CLOCK_SIZE,
} from "../actions/functional_actions";

const  initialState = {
    x: 0,
    y: null,
    r:0,
    cof: 0.5,
    table: [
    ],
    mT: 10,
    mL:10,
    messageX: "",
    messageY: "",
    messageR: "",
    pageWidth: 1440,
    clockSize: 300,
    clockSizeAction:200,
    canvasWidth: 0,
    deviceType: null
}

export function functionalReducer(state  = initialState,action) {
    switch (action.type) {
        case CLOCK_SIZE:
            return {...state,clockSize: action.payload}
        case CANVAS_COF:
            return{...state,cof: action.payload};
        case ADD_DOT:
            return {...state, table: [...state.table, action.payload]};
        case SET_MESSAGE_Y:
            return{...state,messageY: action.payload};
        case SET_TABLE:
            return {...state,table: action.payload};
        case PAGE_WIDTH:
            return{...state,pageWidth: action.payload};
        case SET_MESSAGE_R:
            return{...state,messageR: action.payload};
        case  MARGIN_LEFT:
            return{...state,mL: action.payload};
        case  MARGIN_TOP:
            return{...state,mT: action.payload};
        case SET_MESSAGE_X:
            return{...state,messageX: action.payload};
        case DEVICE_TYPE:
            return{...state,deviceType: action.payload};
        case CANVAS_WIDTH:
            return {...state,canvasWidth: action.payload};
        case SET_X:
            return {...state,x: action.payload};
        case SET_Y:
            return {...state,y: action.payload};
        case SET_R:
            return {...state,r: action.payload};
    }
    return state;
}