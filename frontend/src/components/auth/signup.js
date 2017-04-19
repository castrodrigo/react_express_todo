import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
  return (
      <div>
        <label>{label}</label>
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
  );
};

class Signup extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signupUser({ email, password });
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
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
                <button action="submit" className="btn btn-primary">Sign up</button>
                {this.renderAlert()}
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

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
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
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(Signup);
