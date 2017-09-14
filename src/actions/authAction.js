import axios from 'axios';
import config from '../config';

export const AUTH_PROCESS = 'AUTH_PROCESS';
export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

/*
export const loadDeparts = (term = '') => {
    return (dispatch) => {
        dispatch({ type: LOAD_DEPARTS })
        axios.get(`${config.ROOT_URL}/departs?term=${term}`)
            .then(response => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(loadDepartsSuccess(response.data));
            })
            .catch(err => {
                dispatch(loadDepartsFailure(err))
            })
    }
}
*/

export function signinUser({ username, password }) {
    return function (dispatch) {
        dispatch({ type: AUTH_PROCESS });
        axios.post(`${config.ROOT_URL}/signin`, { username, password })
            .then(response => {
                // If request is good..
                // - Update state to indicate user is authenticated

                if (response.data.invalid) {
                    dispatch(authError('ชื่อเข้าใช้งาน หรือ รหัสผ่านไม่ถูกต้อง !!'))
                } else {
                    dispatch({ type: AUTH_USER })

                    // - Save the JWT token
                    localStorage.setItem('token', response.data.token);

                    // -- redirect to the route '/feature
                    //browserHistory.push('/feature');
                }    
            })
            .catch((err) => {
                // If request is bad...
                // - Show an error to the user
                //dispatch(authError('Bad Login Info'));

                dispatch(authError(`Bad Login Info ${err.message}`))
            })
    }

}

export function signinUser_({ username, password }) {
    return function (dispatch) {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', username);
    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    return { type: UNAUTH_USER }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}