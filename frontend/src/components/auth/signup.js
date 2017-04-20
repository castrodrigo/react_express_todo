import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
  return (
      <div>
        <label>{label}</label>
        <input {...input} type={type} className="form-control" />
        {touched && ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
  );
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {submit: false};
  }
  handleFormSubmit({ email, password }) {
    this.setState({submit: true});
    this.props.signupUser({ email, password });
  }
  renderAlert() {
    if (this.props.registerErrorMessage && this.state.submit) {
      return (
        <div className="alert alert-danger">
          <strong>Error!</strong> {this.props.registerErrorMessage}
        </div>
      );
      this.setState({submit: false});
    }
  }
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div>
        <div className="row"></div>
        <div className="row">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="col s6 offset-s3">
            <div class="row">
              <div class="input-field col s6">
                <Field name="email" label="Email" component={renderField} type="email" />
                <Field name="password" label="Password" component={renderField} type="password" />
                <Field name="passwordConfirm" label="Confirm Password" component={renderField} type="password" />
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an valid email';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  if (!formProps.password) {
    errors.password = 'Please enter an password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please confirm the password';
  }

  console.log(errors);
  return errors;
}

Signup = reduxForm({
  form: "signup",
  validate
})(Signup);

function mapStateToProps(state) {
  return { registerErrorMessage: state.auth.signup_error };
}

export default connect(mapStateToProps, actions)(Signup);
