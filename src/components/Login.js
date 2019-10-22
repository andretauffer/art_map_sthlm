import React, { useEffect, useReducer, useRef } from "react";
import { useCookies } from "react-cookie";
import Blank from "./Blank";

const login = require("../imgs/login.png");

let user;

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

function Login() {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const [cookies, setCookie, removeCookie] = useCookies();
  const { username, password, isLoading, error, showForm } = state;

  useEffect(() => {
    if (/\s/gm.test(username)) {
      dispatch({ type: "no spaces" });
    }
  }, [username, password]);

  useEffect(() => {
    user = localStorage.getItem("user");
    console.log(user);
  }, [cookies]);

  const submitLogin = async e => {
    e.preventDefault();
    dispatch({ type: "login" });
    try {
      const validated = await validation(username, password);
      localStorage.setItem("user", validated.name);
      setCookie("user", validated.id);
      if (validated) {
      }
    } catch (error) {
      dispatch({ type: "error" });
    }
  };

  return (
    <>
      <div
        className="login-background"
        onClick={() => dispatch({ type: "show" })}
      >
        <img className="nav-btn login" src={login} />
      </div>
      {showForm ? (
        <div id="login-page" className="login-page">
          <div>
            {cookies.user ? (
              <div>
                <h1> Hello {username}</h1>
                <button
                  onClick={() => {
                    removeCookie("user");
                    localStorage.removeItem("user");
                    dispatch({ type: "logout" });
                  }}
                >
                  Log out
                </button>
              </div>
            ) : (
              <form id="login-form">
                {<p className="error">{error}</p>}
                <label htmlFor="username-input">Insert username</label>
                <input
                  className="username-input"
                  id="username-input"
                  placeholder="Username..."
                  value={username}
                  onChange={e =>
                    dispatch({
                      type: "field",
                      field: "username",
                      value: e.currentTarget.value
                    })
                  }
                />
                <label htmlFor="password-input">Insert password</label>
                <input
                  className="password-input"
                  type="password"
                  id="password-input"
                  placeholder="Password..."
                  value={password}
                  onChange={e =>
                    dispatch({
                      type: "field",
                      field: "password",
                      value: e.currentTarget.value
                    })
                  }
                />
                <button
                  className="login-btn"
                  type="submit"
                  onClick={e => submitLogin(e)}
                  disabled={isLoading}
                >
                  {isLoading ? "Loggin in..." : "Login"}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        <Blank />
      )}
    </>
  );
}

async function validation(username, password) {
  let userData;
  await fetch("/api/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(data => (userData = data));
  return userData;
}

export default Login;
