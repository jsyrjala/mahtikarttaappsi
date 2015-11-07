import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

/* component styles */
import styles from './styles';

import * as actionCreators from 'actions/auth';

@connect(state => {
  return state.auth
})
export class Header extends Component {
  constructor(props) {
    super(props);
    this.actions = bindActionCreators(actionCreators, this.props.dispatch);
  }
  login() {
    this.actions.executeLogin(this.refs.username.value, this.refs.password.value)
  }
  logout() {
    this.actions.logout()
  }
  loginInput() {
    if(this.props.auth.status == 'pending') {
      return (<li className="auth">Logging in</li>)
    }
    if(this.props.auth.status === 'logged-in') {
      return (<li>
        <button onClick={() => this.logout()}>Logout</button>
      </li>)
    }
    return (<li>
      <input ref="username"/>
      <input type="password" ref="password"/>
      <button onClick={() => this.login()}>Login</button>
    </li>)
  }
  render() {

    return (
      <nav className={`${styles} navbar navbar-default`}>
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                    aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <span className="navbar-brand">Mahtikarttappsi</span>
          </div>
          <div id="navbar" className="header__navbar navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/home" activeClassName="active">Home</Link>
              </li>
              <li>
                <Link to="/list" activeClassName="active">List</Link>
              </li>
              <li>
                <Link to="/map" activeClassName="active">Map</Link>
              </li>
              {this.loginInput()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
