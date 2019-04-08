import * as types from "./types";
import api from "./api";

export function getTasksUser(user) {
  return async dispatch => {
    dispatch({
      type: types.GET_TASKS,
      payload: await api.getTasksUser(user)
    });
  };
}

export function createTask(todo) {
  return async (dispatch, getState) => {
    const res = await api.createTask(todo);
    const tasks = getState().todoReducer.tasks;

    dispatch({
      type: types.CREATE_TASK,
      payload: res.length === 0 ? [...tasks] : [res, ...tasks]
    });
  };
}

export function completeTask(task) {
  return async (dispatch, getState) => {
    const item = {
      _id: task._id,
      completed: !task.completed
    };

    const res = await api.updateTask(item);
    const tasks = getState().todoReducer.tasks.map(todo => {
      return todo._id === res._id ? res : todo;
    });

    dispatch({
      type: types.COMPLETE_TASK,
      payload: tasks
    });
  };
}

export function updateTask(task) {
  return async (dispatch, getState) => {
    const res = await api.updateTask(task);
    const tasks = getState().todoReducer.tasks.map(todo => {
      return todo._id === res._id ? res : todo;
    });

    dispatch({
      type: types.UPDATE_TASK,
      payload: tasks
    });
  };
}

export function deleteTask(id) {
  return async (dispatch, getState) => {
    const res = await api.deleteTask(id);
    const tasks = getState().todoReducer.tasks.filter(
      todo => todo._id !== res._id
    );

    dispatch({
      type: types.DELETE_TASK,
      payload: tasks
    });
  };
}
