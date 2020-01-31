import React, { useReducer, useEffect } from "react";

const initialState = {
  map: true,
  form: false,
  gallery: false,
  login: false
};

function navReducer(state, action) {
  const { field, method } = action;

  const methods = {
    navigate: () => {
      let filtered = {};
      const unactive = Object.keys(state).filter(el => el !== field);
      unactive.forEach(i => (filtered = { ...filtered, [i]: false }));
      return {
        ...filtered,
        [field]: true
      };
    }
  };
  return methods[method]();
}

export default Component => {
  const StateContainer = ({ ...props }) => {
    const [state, dispatch] = useReducer(navReducer, initialState);

    useEffect(() => {
      const path =
        window.location.pathname === "/"
          ? "map"
          : window.location.pathname.replace(/\//g, "");

      dispatch({
        method: "navigate",
        field: path
      });
    }, []);
    return <Component navState={state} navDispatch={dispatch} {...props} />;
  };
  return StateContainer;
};
