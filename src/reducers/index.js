import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './authReducer';
import facultyReducer from './facultyReducer';
import departReducer from './departReducer';

const rootReducer = combineReducers({
    form,
    auth: authReducer,
    facultys: facultyReducer,
    departs: departReducer
});

export default rootReducer;