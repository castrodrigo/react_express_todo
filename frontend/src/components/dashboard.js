import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';

import ListTodos from './todo/list_todos';

class Dashboard extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="card">
            <div className="card-content">
              <span className="card-title">{this.props.message} {localStorage.getItem('user_email')}</span>
            </div>
          </div>
        </div>
        <div className="fixed-action-btn">
          <Link to="/todo" className="btn-floating btn-large red" title="Add ToDo">
            <i className="large material-icons">add</i>
          </Link>
        </div>
        <ListTodos {...this.props}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state', state);
  return {
    message: state.auth.message
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
