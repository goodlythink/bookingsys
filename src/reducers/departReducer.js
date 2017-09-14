import * as types from '../actions/departType';

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
        case types.LOAD_DEPARTS:
            return { ...state, departList: { departs: [], loading: true, error: false } }
        case types.LOAD_DEPARTS_SUCCESS:
            return { ...state, departList: { departs: action.payload, loading: false, error: false } }
        case types.LOAD_DEPARTS_FAILURE:
            error = action.payload || { message: action.payload.message };
            return { ...state, departList: { departs: [], loading: false, error: error } }

        //Save Depart
        case types.SAVE_DEPART:
            return { ...state, departSave: { depart: null, loading: true, error: true } }
        case types.SAVE_DEPART_SUCCESS:
            return { ...state, departSave: { depart: null, loading: false, error: false } }
        case types.SAVE_DEPART_FAILURE:
            error = action.payload || { message: action.payload.message }
            return { ...state, departSave: { depart: null, loading: false, error: error } }
            
            ///Delete Depart
        case types.DELETE_DEPART:
            return { ...state, departDelete: { loading: true, error: false } }
        case types.DELETE_DEPART_SUCCESS:
            return { ...state, departDelete: { loading: false, error: false } }
        case types.DELETE_DEPART_FAILURE:
            error = action.payload || { message: action.payload.message }
            return { ...state, departDelete: { loading: false, error: error } }
            
            //Detail Depart
        case types.LOAD_DEPART:
            return { ...state, departShow: { depart: [], loading: true, error: false } }
        case types.LOAD_DEPART_SUCCESS:
            return { ...state, departShow: { depart: action.payload, loading: false, error: false } }
        case types.LOAD_DEPART_FAILURE:
            error = action.payload || { message: action.payload.message }
            return { ...state, departShow: { depart: [], loading: false, error: error } }
        
            //Reset Value
        case types.RESET_DEPART:
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