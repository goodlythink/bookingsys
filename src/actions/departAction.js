import axios from 'axios';
import config from '../config';
import * as types from './departType';

export const loadDeparts = (term = '') => {
  return (dispatch) => {
    dispatch({ type: types.LOAD_DEPARTS })
    axios.get(`${config.ROOT_URL}/departs?term=${term}`, {
      headers: { authorization: localStorage.getItem('token') }
    }).then(response => {
      if (response.data.invalidToken) {
        throw Error(config.ErrorInvalidTokenText);
      }

      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      dispatch(departSuccess(types.LOAD_DEPARTS_SUCCESS, response.data));
    }).catch(err => {
      dispatch(departFailure(types.LOAD_DEPARTS_FAILURE, err))
    })
  }
}

//============ SAVE (NEW, UPDATE) ==============//
export const saveDepart = (values, callback) => {
  return (dispatch) => {
    dispatch({
      type: types.SAVE_DEPART
    }); //Show Loading
    axios.post(`${config.ROOT_URL}/depart`, values, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    }).then(response => {
      if (response.status !== 200) {
        throw Error(response.statusText)
      }
      if (response.data.invalidToken) {
        throw Error(config.ErrorInvalidTokenText)
      }
      if (response.data.status === 421) {
        throw Error("รหัสซ้ำ!! กรุณาเปลี่ยนรหัสใหม่");
      }
      dispatch({ type: types.SAVE_DEPART_SUCCESS });
      callback();
    }).catch(err => {
      dispatch(departFailure(types.SAVE_DEPART_FAILURE, err));
    })
  }
}

//======== DELETE =============//
export const deleteDepart = (id, callback) => {
  return (dispatch) => {
    dispatch({
      type: types.DELETE_DEPART
    }) //Show Loading
    axios.get(`${config.ROOT_URL}/faculty/delete${id}`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    }).then(response => {
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      if (response.data.invalidToken) {
        throw Error(config.ErrorInvalidTokenText);
      }

      dispatch({ type: types.DELETE_DEPART_SUCCESS});
      callback()
    }).catch(err => {
      dispatch(departFailure(types.DELETE_DEPART_FAILURE, err))
    })
  }
}

//======== GET ONE ROW =============//
export const loadDepart = (id, callback) => {
  return (dispatch) => {
    dispatch(resetDepart());
    dispatch({
      type: types.LOAD_DEPART
    });
    axios.get(`${config.ROOT_URL}/depart/${id}`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    }).then(response => {
      if (response.status !== 200) {
        throw Error(response.statusText);
      }

      if (response.data.invalidToken) {
        throw Error(config.ErrorInvalidTokenText);
      }
      dispatch(departSuccess(types.LOAD_DEPART_SUCCESS, response.data));
      callback();
    }).catch(err => {
      dispatch(departFailure(types.LOAD_DEPART_FAILURE, err))
    })
  }
}

export const resetDepart = () => {
  return {
    type: types.RESET_DEPART
  }
}

const departSuccess = (type, payload) => {
  return {
    type,
    payload
  }
}

const departFailure = (type, payload) => {
  return {
    type,
    payload
  }
}
