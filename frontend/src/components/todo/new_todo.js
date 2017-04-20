import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class NewTodo extends Component {
  handleFormSubmit({ title, description }) {
    console.log(title, description);
    this.props.postTodo({ title, description});
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
                <label for="title">Title:</label>
                <Field name="title" component="input" id="title" type="title"/>
                <label for="description">Description:</label>
                <Field name="description" component="input" type="description" id="description"/>
              </div>
            </div>
            <button action="submit" className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    );
  }
}

NewTodo = reduxForm({
  form: 'newtodo'
})(NewTodo);

function mapStateToProps(state) {
  return { todoErrorMessage: state.todo.save_error };
}

export default connect(mapStateToProps, actions)(NewTodo);
