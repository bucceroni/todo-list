import * as types from "./types";
import api from "./api";

export function getUserTodos(user) {
  return async dispatch => {
    dispatch({
      type: types.GET_TODOS,
      payload: await api.getUserTodos(user)
    });
  };
}

export function createTodo(todo) {
  return async (dispatch, getState) => {
    const res = await api.createTodo(todo);
    const todos = getState().todoReducer.todos;

    dispatch({
      type: types.CREATE_TODO,
      payload: [...todos, res]
    });
  };
}

export function completeTask(task) {
  return async (dispatch, getState) => {
    const item = {
      _id: task._id,
      completed: !task.completed
    };

    const res = await api.updateTodo(item);
    const todos = getState().todoReducer.todos.map(todo => {
      return todo._id === res._id ? res : todo;
    });

    dispatch({
      type: types.UPDATE_TODO,
      payload: todos
    });
  };
}

export function updateTodo(id) {
  return async dispatch => {
    dispatch({
      type: types.UPDATE_TODO,
      payload: await api.updateTodo(id)
    });
  };
}

export function deleteTodo(id) {
  return async (dispatch, getState) => {
    const res = await api.deleteTodo(id);
    const todos = getState().todoReducer.todos.filter(
      todo => todo._id !== res._id
    );

    dispatch({
      type: types.DELETE_TODO,
      payload: todos
    });
  };
}
