import * as types from "../actions/types";

const initialState = {
  tasks: []
};

export default function reduce(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case `${types.GET_TASKS}`:
      return {
        ...state,
        tasks: payload
      };
    case `${types.CREATE_TASK}`:
      return {
        ...state,
        tasks: payload
      };
    case `${types.COMPLETE_TASK}`:
      return {
        ...state,
        tasks: payload
      };
    case `${types.UPDATE_TASK}`:
      return {
        ...state,
        tasks: payload
      };
    case `${types.DELETE_TASK}`:
      return {
        ...state,
        tasks: payload
      };
    default:
      return state;
  }
}
