import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {submit: false};
  }
  handleFormSubmit({ email, password }) {
    this.setState({submit: true});
    console.log(email, password);
    this.props.signinUser({ email, password });
  }
  renderAlert() {
    if (this.state.submit && this.props.loginErrorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Error!</strong> {this.props.loginErrorMessage}
        </div>
      );
      this.setState({submit: false});
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <div className="row"></div>
        <div className="row">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="col s6 offset-s3">
            <div class="row">
              <div class="input-field col s6">
                <label for="email">Email:</label>
                <Field name="email" component="input" className="form-control" id="email" type="email"/>
                <label for="password">Password:</label>
                <Field name="password" component="input" type="password" className="form-control" id="password"/>
              </div>
            </div>
            {this.renderAlert()}
            <button action="submit" className="btn btn-primary">Sign in</button>
          </form>
        </div>
      </div>
    );
  }
}

Signin = reduxForm({
  form: 'signin'
})(Signin);

function mapStateToProps(state) {
  return { loginErrorMessage: state.auth.signin_error };
}

export default connect(mapStateToProps, actions)(Signin);
