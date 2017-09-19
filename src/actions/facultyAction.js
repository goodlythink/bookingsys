import axios from 'axios';
import config from '../config';
import * as types from './facultyType';


export const loadFacultys = (term = '') => async (dispatch) => {
    try {
        dispatch({ type: types.LOAD_FACULTYS })   //Show Loading
        let response = await axios.get(`${config.ROOT_URL}/facultys?term=${term}`, {
            headers: { authorization: localStorage.getItem('token') }
        })

        if (response.status !== 200) {
            throw Error(response.statusText)
        }
        if (response.data.invalidToken) {
            throw Error(config.ErrorInvalidTokenText)
        }

        dispatch(facultySuccess(types.LOAD_FACULTYS_SUCCESS, response.data));
    } catch (err) {
        dispatch(facultyFailure(types.LOAD_FACULTYS_FAILURE, err));
    }
}

//============ SAVE (NEW, UPDATE) ==============//
export const saveFaculty = (values, callback) => {
    return (dispatch) => {
        dispatch({ type: types.SAVE_FACULTY });   //Show Loading
        axios.post(`${config.ROOT_URL}/faculty`, values, {
            headers: { authorization: localStorage.getItem('token') }
        }).then(response => {
            if (response.status !== 200) {
                throw Error(response.statusText);
            }
            if (response.data.invalidToken) {
                throw Error(config.ErrorInvalidTokenText);
            }

            if (response.data.status === 421) {
                throw Error("รหัสซ้ำ!! กรุณาเปลี่ยนรหัสใหม่");
            }
            dispatch(facultySuccess(types.SAVE_FACULTY_SUCCESS));
            callback();
        }).catch(err => {
            dispatch(facultyFailure(types.SAVE_FACULTY_FAILURE, err));
        })
    }
}

//======== DELETE =============//
export const deleteFaculty = (id, callback) => {
    return (dispatch) => {
        dispatch({ type: types.DELETE_FACULTY })    //Show Loading

        axios.get(`${config.ROOT_URL}/faculty/delete/${id}`, {
            headers: { authorization: localStorage.getItem('token') }
        }).then(response => {
            if (response.status !== 200) {
                throw Error(response.statusText);
            }
            if (response.data.invalidToken) {
                throw Error(config.ErrorInvalidTokenText);
            }

            dispatch({ type: types.DELETE_FACULTY_SUCCESS });
            callback();
        }).catch(err => {
            dispatch(facultyFailure(types.SAVE_FACULTY_FAILURE, err));
        })
    }
}


//======== get Faculty =============//
export const loadFaculty = (id, callback) => {
    return (dispatch) => {
        dispatch(resetFaculty());
        dispatch({ type: types.LOAD_FACULTY }) //Show Loading
        axios.get(`${config.ROOT_URL}/faculty/${id}`, {
            headers: { authorization: localStorage.getItem('token') }
        }).then(response => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }

            if (response.data.invalidToken) {
                throw new Error(config.ErrorInvalidTokenText);
            }

            dispatch(facultySuccess(types.LOAD_FACULTY_SUCCESS, response.data));
            callback();
        }).catch(err => {
            dispatch(facultyFailure(types.LOAD_FACULTY_FAILURE, err))
        })
    }
}

const facultySuccess = (type, payload) => {
    return {
        type,
        payload
    }
}
const facultyFailure = (type, payload) => {
    return {
        type,
        payload
    }
}
export const resetFaculty = () => {
    return {
        type: types.RESET_FACULTY
    }
}