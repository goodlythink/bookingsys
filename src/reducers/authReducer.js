import { AUTH_PROCESS, AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/authAction';

const initialState = {
    
}
export default function (state = {}, action) {
    switch (action.type) {
        case AUTH_PROCESS:
            return {...state, error: '', loading: true}    
        case AUTH_USER:
            return { ...state, error: '', authenticated: true, loading: false };
        case UNAUTH_USER:
            return { ...state, authenticated: false };
        case AUTH_ERROR:    
            return { ...state, error: action.payload, loading: false }
    }

    return state;
}