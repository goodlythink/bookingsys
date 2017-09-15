import _ from 'lodash';

import * as types from '../actions/facultyType';

const initialState = {
    facultyList: { facultys: [], loading: false, error: false },
    facultySave: { faculty: null, loading: false, error: false },
    facultyDelete: { loading: false, error: false },
    facultyShow: { faculty: [], loading: false, error: false }
}
export default (state = initialState, action) => {
    let error;
    switch (action.type) {
        //Load Facultys
        case types.LOAD_FACULTYS:
            return { ...state, facultyList: { facultys: [], loading: true, error: false } }
        case types.LOAD_FACULTYS_SUCCESS:
            return { ...state, facultyList: { facultys: action.payload, loading: false, error: false } }
        case types.LOAD_FACULTYS_FAILURE:  
            error = action.payload || { message: action.payload.message };
            return { ...state, facultyList: { facultys: [], loading: false, error: error } }

        //Save Facultys
        case types.SAVE_FACULTY:
            return { ...state, facultySave: { faculty: null, loading: true, error: false } }
        case types.SAVE_FACULTY_SUCCESS:
            return { ...state, facultySave: { faculty: null, loading: false, error: false } }
        case types.SAVE_FACULTY_FAILURE:
            error = action.payload || { message: action.payload.message };
            return { ...state, facultySave: { faculty: null, loading: false, error: error } }

        //Delete
        case types.DELETE_FACULTY:
            return { ...state, facultyDelete: { loading: true, error: false } }
        case types.DELETE_FACULTY_SUCCESS:
            return { ...state, facultyDelete: { loading: false, error: false } }
        case types.DELETE_FACULTY_FAILURE:
            error = action.payload || { message: action.payload.message };
            return { ...state, facultyDelete: { loading: false, error: error } }

        //Show
        case types.LOAD_FACULTY:
            return { ...state, facultyShow: { faculty: [], loading: true, error: false } }
        case types.LOAD_FACULTY_SUCCESS:
            return { ...state, facultyShow: { faculty: action.payload, loading: false, error: false } }
        case types.LOAD_FACULTY_FAILURE:
            error = action.payload || { message: action.payload.message }
            return { ...state, facultyShow: { faculty: [], loading: true, error: error } }
        case types.RESET_FACULTY:
            return {
                ...state,
                facultyShow: {
                    faculty: [], loading: true, error: false
                },
                facultySave: {
                    error: false
                }
            }
        default:
            return state;

    }
}