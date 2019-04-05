import * as types from "../actions/types";

const initialState = {
  todos: []
};

export default function reduce(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case `${types.GET_TODOS}`:
      return {
        ...state,
        todos: payload
      };
    case `${types.CREATE_TODO}`:
      return {
        ...state,
        todos: payload
      };
    case `${types.UPDATE_TODO}`:
      return {
        ...state,
        todos: payload
      };
    case `${types.DELETE_TODO}`:
      return {
        ...state,
        todos: payload
      };
    default:
      return state;
  }
}
