import { combineReducers } from 'redux'
import { functionalReducer } from './functional_reducer'
import { userReducer } from './user_reducer'
import { headerReducer} from "./header_reducer";

export const rootReducer = combineReducers({
    functional: functionalReducer,
    user: userReducer,
    header: headerReducer
})