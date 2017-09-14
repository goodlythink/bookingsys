import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Header, Sidebar, Breadcrumb } from '../components/layouts';
import RequireAuth from '../components/auth/require_auth';

import Dashboard from '../components/Dashboard'
import { CalendarRoom, BookingRoom } from '../containers/queryroom';
import Faculty from '../containers/faculty/faculty';
import Depart from '../containers/depart/depart';

import SignOut from '../components/auth/signout';
class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar />
          <main className="main">
            <Breadcrumb />
            <div className="container-fluid">
              <Switch>
                <Route path='/dashboard' name="" component={RequireAuth(Dashboard)} />
                <Route path='/queryroom/calendar' name="" component={RequireAuth(CalendarRoom)} />
                <Route path='/queryroom/booking' name="" component={RequireAuth(BookingRoom)} />
                <Route path='/basic/faculty' name="" component={RequireAuth(Faculty)} />
                <Route path='/basic/depart' name="" component={RequireAuth(Depart)} />
                <Route path="/signout" name="SignOut" component={RequireAuth(SignOut)} />
                <Redirect from="/" to="/dashboard" name="ภาพรวม" />
              </Switch>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
