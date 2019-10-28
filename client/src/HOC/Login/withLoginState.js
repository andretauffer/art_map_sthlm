import React, { useReducer } from "react";

const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  showForm: false
};

function loginReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    case "logout":
      return {
        ...state,
        isLoading: false,
        username: "",
        password: ""
      };
    case "field":
      return {
        ...state,
        [action.field]: action.value
      };
    case "error":
      return {
        ...state,
        error: "Incorrect login information",
        isLoading: false,
        username: "",
        password: ""
      };
    case "no spaces":
      return {
        ...state,
        error: "No empty spaces"
      };
    case "show":
      return {
        ...state,
        showForm: !state.showForm
      };

    default:
      break;
  }
  return state;
}

export default Component => {
  const StateContainer = ({ ...props }) => {
    const [state, dispatch] = useReducer(loginReducer, initialState);
    return <Component loginState={state} loginUpdate={dispatch} {...props} />;
  };
  return StateContainer;
};
