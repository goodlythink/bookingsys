import React, { Component } from 'react';
import { withRouter, Link, NavLink } from 'react-router-dom';

class Sidebar extends Component {
    handleClick = (e) => {
        e.preventDefault();
        e.target.parentElement.classList.toggle('open');
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
        //console.log('location', this.props);
        //return 'nav-item nav-dropdown open';
    }

    render() {
        return (
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <ul className="nav">
                        <li className="nav-item">
                            <NavLink to={'/login'} className="nav-link" activeClassName="active">
                                <i className="icon-login"></i> Login
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/dashboard'} className="nav-link" activeClassName="active">
                                <i className="icon-speedometer"></i> Dashboard
                            </NavLink>
                        </li>
                        <li className={this.activeRoute("/queryroom")}>
                            <Link to="" className="nav-link nav-dropdown-toggle" onClick={this.handleClick}><i className="fa fa-building-o"></i> สอบถามห้อง</Link>
                            <ul className="nav-dropdown-item">
                                <li className="nav-item">
                                    <NavLink to={'/queryroom/calendar'} className="nav-link" activeClassName="active"><i className="fa fa-circle-o"></i>ปฏิทินการใช้ห้อง</NavLink>
                                    <NavLink to={'/queryroom/booking'} className="nav-link" activeClassName="active"><i className="fa fa-circle-o"></i>สอบถามรายการจอง</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className={this.activeRoute("/basic")}>
                            <Link to="" className="nav-link nav-dropdown-toggle" onClick={this.handleClick}><i className="fa fa-briefcase"></i>ข้อมูลพื้นฐาน</Link>
                            <ul className="nav-dropdown-item">
                                <li className="nav-item">
                                    <NavLink to={'/basic/faculty'} className="nav-link" activeClassName="active"><i className="fa fa-circle-o"></i>หน่วยงาน</NavLink>
                                    <NavLink to={'/basic/depart'} className="nav-link" activeClassName="active"><i className="fa fa-circle-o"></i>แผนก</NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default withRouter(Sidebar);