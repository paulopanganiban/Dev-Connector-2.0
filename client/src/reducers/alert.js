import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [

];

export default function (state = initialState, action) {
    // destructure id and 
    const { payload, type} = action;
    // action has type
    // action.payload has the data
    // evaluate action.type
    switch (type) {
        case SET_ALERT:
            return [...state, payload];
        // action.payload holds ze DATA
        // always remember the immutable states so we add using spread operator
        case REMOVE_ALERT:
            // remove alert by id
            // filter alerts tanggalin yung not equal sa payload.
            // kasi pag filter === id yun lang 
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}