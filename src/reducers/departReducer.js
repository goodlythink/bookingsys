import {
    LOAD_DEPARTS, LOAD_DEPARTS_SUCCESS, LOAD_DEPARTS_FAILURE,
    SAVE_DEPART, SAVE_DEPART_SUCCESS, SAVE_DEPART_FAILURE,
    DELETE_DEPART, DELETE_DEPART_SUCCESS, DELETE_DEPART_FAILURE,
    LOAD_DEPART, LOAD_DEPART_SUCCESS, LOAD_DEPART_FAILURE,
    RESET_DEPART
} from '../actions/departAction';

const initialState = {
    departList: { departs: [], loading: false, error: false },
    departSave: { depart: null, loading: false, error: false },
    departDelete: { loading: false, error: false },
    departShow: { depart: [], loading: false, error: false }
}

export default (state = initialState, action) => {
    let error;
    switch (action.type) {
        //Load Departs
        case LOAD_DEPARTS:
            return { ...state, departList: { departs: [], loading: true, error: false } }
        case LOAD_DEPARTS_SUCCESS:
            return { ...state, departList: { departs: action.payload, loading: false, error: false } }
        case LOAD_DEPARTS_FAILURE:
            error = action.payload || { message: action.payload.message };
            return { ...state, departList: { departs: [], loading: false, error: error } }

        //Save Depart
        case SAVE_DEPART:
            return { ...state, departSave: { depart: null, loading: true, error: true } }
        case SAVE_DEPART_SUCCESS:
            return { ...state, departSave: { depart: null, loading: false, error: false } }
        case SAVE_DEPART_FAILURE:
            error = action.payload || { message: action.payload.message }
            return { ...state, departSave: { depart: null, loading: false, error: error } }
            
            ///Delete Depart
        case DELETE_DEPART:
            return { ...state, departDelete: { loading: true, error: false } }
        case DELETE_DEPART_SUCCESS:
            return { ...state, departDelete: { loading: false, error: false } }
        case DELETE_DEPART_FAILURE:
            error = action.payload || { message: action.payload.message }
            return { ...state, departDelete: { loading: false, error: error } }
            
            //Detail Depart
        case LOAD_DEPART:
            return { ...state, departShow: { depart: [], loading: true, error: false } }
        case LOAD_DEPART_SUCCESS:
            return { ...state, departShow: { depart: action.payload, loading: false, error: false } }
        case LOAD_DEPART_FAILURE:
            error = action.payload || { message: action.payload.message }
            return { ...state, departShow: { depart: [], loading: false, error: error } }
        
            //Reset Value
        case RESET_DEPART:
            return {
                ...state,
                departShow: {
                    depart: [], loading: true, error: false,
                    departSave: {
                        error: false
                    }
                }
            }
        default:
            return state;
    }
}