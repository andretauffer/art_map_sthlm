import React, { useReducer } from "react";

const initialState = {
  name: "",
  longitude: null,
  latitude: null,
  images: [],
  description: "",
  preview: []
};

function uploadReducer(state, action) {
  const { field, method, value } = action;

  const methods = {
    input: () => {
      return {
        ...state,
        [field]: value
      };
    },
    addImage: () => {
      return {
        ...state,
        images: [...state.images, action.value],
        reader: 0
      };
    },
    removeImage: () => {
      state.images.splice(value, 1);
      return {
        ...state,
        images: [...state.images]
      };
    }
  };

  return method ? methods[method]() : new Error("Specify method");
}

export default Component => {
  const StateContainer = ({ ...props }) => {
    const [state, dispatch] = useReducer(uploadReducer, initialState);
    return <Component uploadState={state} uploadUpdate={dispatch} {...props} />;
  };
  return StateContainer;
};
