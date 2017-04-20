import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <li key={1}>
          <Link to="/dashboard">Dashboard</Link>
        </li>,
        <li key={2}>
          <Link to="/signout">Sign out</Link>
        </li>
      ];
    } else {
      return [
        <li key={1}>
          <Link to="/signin">Sign in</Link>
        </li>,
        <li key={2}>
          <Link to="/signup">Sign up</Link>
        </li>
      ];
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">ToDo List</Link>
          <ul className="right">
            {this.renderLinks()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
