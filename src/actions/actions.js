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
  return async dispatch => {
    dispatch({
      type: types.CREATE_TODO,
      payload: await api.createTodo(todo)
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
  return async dispatch => {
    dispatch({
      type: types.DELETE_TODO,
      payload: await api.deleteTodo(id)
    });
  };
}
