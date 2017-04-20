import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ListTodos extends Component {
  constructor(props){
    super(props);
    this.state = {todos: []};
  }
  componentDidMount() {
    this.props.getTodosByUser();
    const todos = localStorage.getItem('todos');
    this.setState({ todos });
  }
  render() {
    return (
      <div>
        {this.state.todos.map(todo =>
          <li key={todo.id}>{todo.title}</li>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { todoErrorMessage: state.todo.save_error };
}

export default ListTodos;
