import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const formReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case types.LOAD_FORMS:
      newState.forms = action.forms.data.data;
      return newState;
    default:
      return newState;
  }
};

export default formReducer;
