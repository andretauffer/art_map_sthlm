import React, { useEffect, useReducer, useRef } from "react";
import { useCookies } from "react-cookie";
import Blank from "./Blank";
import HOC from "../HOC/HOC";
const login = require("../imgs/login.png");
const { Composer, LoginContainer, withLoginState } = HOC;

function Login({ loginState, loginUpdate, submitLogin, ...props }) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const { username, password, isLoading, error, showForm } = loginState;
  return (
    <>
      <div
        className="login-background"
        onClick={() => loginUpdate({ type: "show" })}
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
                    loginUpdate({ type: "logout" });
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
                    loginUpdate({
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
                    loginUpdate({
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
console.log(Composer(LoginContainer, withLoginState)(Login));

export default Composer(LoginContainer, withLoginState)(Login);
