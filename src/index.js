import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AUTH_USER } from './actions/authAction';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import Login from './components/auth/signin';

const store = configureStore();
const token = localStorage.getItem('token');
if (token) {
    store.dispatch({ type: AUTH_USER });
}
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/login" name="Login Page" component={Login} />
                <Route path="/" name="Home" component={App} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
