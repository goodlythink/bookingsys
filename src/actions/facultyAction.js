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

        dispatch(loadFacultysSuccess(response.data))
    } catch (err) {
        dispatch(loadFacultysFailure(err));
    }

}

export const loadFacultysSuccess = (facultys) => {
    return {
        type: types.LOAD_FACULTYS_SUCCESS,
        payload: facultys
    }
}

export const loadFacultysFailure = (err) => {
    return {
        type: types.LOAD_FACULTYS_FAILURE,
        payload: err
    }
}

//============ SAVE (NEW, UPDATE) ==============//
export const saveFaculty = (values) => async (dispatch) => {
    try {
        dispatch({ type: types.SAVE_FACULTY });   //Show Loading
        let response = await axios.post(`${config.ROOT_URL}/faculty`, values, {
            headers: { authorization: localStorage.getItem('token') }
        })

        if (response.status !== 200) {
            throw Error(response.statusText);
        }
        if (response.data.invalidToken) {
            throw Error(config.ErrorInvalidTokenText);
        }

        if (response.data.status === 421) {
            throw Error("รหัสซ้ำ!! กรุณาเปลี่ยนรหัสใหม่");
        }
        dispatch(saveFacultySuccess())
    } catch (err) {
        dispatch(saveFacultyFailure(err));
    }
}

export const saveFacultyFailure = (err) => {
    return {
        type: types.SAVE_FACULTY_FAILURE,
        payload: err
    }
}

export const saveFacultySuccess = () => {
    return {
        type: types.SAVE_FACULTY_SUCCESS
    }
}

//======== DELETE =============//
export const deleteFaculty = (id) => async (dispatch) => {
    try {
        dispatch({ type: types.DELETE_FACULTY })    //Show Loading
        let response = await axios.get(`${config.ROOT_URL}/faculty/delete/${id}`,
            { headers: { authorization: localStorage.getItem('token') } })

        if (response.status !== 200) {
            throw Error(response.statusText);
        }
        if (response.data.invalidToken) {
            throw Error(config.ErrorInvalidTokenText);
        }

        dispatch(deleteFacultySuccess());
    } catch (err) {
        dispatch(deleteFacultyFailure(err));
    }
}
export const deleteFacultySuccess = () => {
    return {
        type: types.DELETE_FACULTY_SUCCESS
    }
}

export const deleteFacultyFailure = (err) => {
    return {
        type: types.DELETE_FACULTY_FAILURE,
        payload: err
    }
}

export const loadFaculty = (id) => async (dispatch) => {
    try {
        dispatch(resetFaculty());
        dispatch({ type: types.LOAD_FACULTY }) //Show Loading

        let response = await axios.get(`${config.ROOT_URL}/faculty/${id}`,
            { headers: { authorization: localStorage.getItem('token') } })

        if (response.status !== 200) {
            throw Error(response.statusText);
        }

        if (response.data.invalidToken) {
            throw Error(config.ErrorInvalidTokenText);
        }

        dispatch(loadFacultySuccess(response.data));
    } catch (err) {
        dispatch(loadFacultyFailure(err))
    }
}

export const loadFacultySuccess = (faculty) => {
    return {
        type: types.LOAD_FACULTY_SUCCESS,
        payload: faculty
    }
}

export const loadFacultyFailure = (err) => {
    return {
        type: types.LOAD_FACULTY_FAILURE,
        payload: err
    }
}

export const resetFaculty = () => {
    return {
        type: types.RESET_FACULTY
    }
}