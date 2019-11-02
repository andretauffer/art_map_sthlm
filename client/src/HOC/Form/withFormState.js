import React, { useReducer } from "react";

const initialState = {
  title: "",
  longitude: "",
  latitude: "",
  images: ""
};

function uploadReducer(state, action) {
  switch (action.type) {
    case "input":
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
    const [state, dispatch] = useReducer(uploadReducer, initialState);
    return <Component uploadState={state} uploadUpdate={dispatch} {...props} />;
  };
  return StateContainer;
};
