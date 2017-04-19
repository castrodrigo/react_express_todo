import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    console.log('our props', this.props);
    return (
      <div className="container">
        <div className="card">
          <div className="card-content">
            <span className="card-title">{this.props.message} {localStorage.getItem('user_email')}</span>
          </div>
        </div>
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

export default connect(mapStateToProps, actions)(Feature);
