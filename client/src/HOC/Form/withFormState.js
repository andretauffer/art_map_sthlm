import React, { useReducer } from "react";

const initialState = {
  name: "",
  longitude: 0,
  latitude: 0,
  images: [],
  description: "",
  preview: []
};

function uploadReducer(state, action) {
  switch (action.type) {
    case "input":
      return {
        ...state,
        [action.field]: action.value
      };
    case "add-image":
      return {
        ...state,
        images: [...state.images, action.value]
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
