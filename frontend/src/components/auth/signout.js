import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignOut extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }
  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-content">
            <span className="card-title">Session Finished!</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(SignOut);
