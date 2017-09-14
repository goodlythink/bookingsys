import axios from 'axios';
import config from '../config';

//Depart List
export const LOAD_DEPARTS = 'LOAD_DEPARTS';
export const LOAD_DEPARTS_SUCCESS = 'LOAD_DEPARTS_SUCCESS';
export const LOAD_DEPARTS_FAILURE = 'LOAD_DEPARTs_FAILURE';

//Depart New, Save, Update
export const SAVE_DEPART = 'SAVE_DEPART';
export const SAVE_DEPART_SUCCESS = 'SAVE_DEPARTS_SUCCESS';
export const SAVE_DEPART_FAILURE = 'SAVE_DEPART_FAILURE';

//Depart Delete
export const DELETE_DEPART = 'DELETE_DEPART';
export const DELETE_DEPART_SUCCESS = 'DELETE_DEPART_SUCCESS';
export const DELETE_DEPART_FAILURE = 'DELETE_FACULTY_FAILURE';

//Get 1 Row
export const LOAD_DEPART = 'LOAD_DEPART';
export const LOAD_DEPART_SUCCESS = 'LOAD_DEPART_SUCCESS';
export const LOAD_DEPART_FAILURE = 'LOAD_DEPART_FAILURE';
export const RESET_DEPART = 'RESET_DEPART';

export const loadDeparts = (term = '') => {
  return (dispatch) => {
    dispatch({
      type: LOAD_DEPARTS
    })
    axios.get(`${config.ROOT_URL}/departs?term=${term}`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    }).then(response => {
      if (response.data.invalidToken) {
        throw Error(config.ErrorInvalidTokenText);
      }

      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      dispatch(departSuccess(LOAD_DEPARTS_SUCCESS, response.data));
    })
      .catch(err => {
        dispatch(departFailure(LOAD_DEPARTS_FAILURE, err))
      })
  }
}

//============ SAVE (NEW, UPDATE) ==============//
export const saveDepart = (values, callback) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_DEPART
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
      dispatch({
        type: SAVE_DEPART_SUCCESS
      });
      callback();
    }).catch(err => {
      dispatch(departFailure(SAVE_DEPART_FAILURE, err));
    })
  }
}

//======== DELETE =============//
export const deleteABC = (id, callback)=>{
  return (dispatch)=>{
    dispatch({type: DELETE_DEPART})
  }
}
export const deleteDepart = (id, callback) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_DEPART
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

      dispatch({
        type: DELETE_DEPART_SUCCESS
      });
      callback()
    }).catch(err => {
      dispatch(departFailure(DELETE_DEPART_FAILURE, err))
    })
  }
}

//======== GET ONE ROW =============//
export const loadDepart = (id, callback) => {
  return (dispatch) => {
    dispatch(resetDepart());
    dispatch({
      type: LOAD_DEPART
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
      dispatch(departSuccess(LOAD_DEPART_SUCCESS, response.data));
      callback();
    }).catch(err => {
      dispatch(departFailure(LOAD_DEPART_FAILURE, err))
    })
  }
}

export const resetDepart = () => {
  return {
    type: RESET_DEPART
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
