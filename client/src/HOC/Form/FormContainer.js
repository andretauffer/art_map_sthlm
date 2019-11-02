import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

let user = "";

export default Component => {
  const Container = ({ loginState, loginUpdate, ...props }) => {
    const { username, password } = loginState;
    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
      if (/\s/gm.test(username)) {
        loginUpdate({ type: "no spaces" });
      }
    }, [username, password]);

    useEffect(() => {
      user = localStorage.getItem("user");
      // console.log(user);
    }, [cookies]);

    const submitLogin = async () => {
      loginUpdate({ type: "login" });
      try {
        const validated = await validation(username, password);
        localStorage.setItem("user", validated.name);
        console.log("validated", validated);
        setCookie("user", validated.id);
        if (validated) {
        }
      } catch (error) {
        loginUpdate({ type: "error" });
      }
    };

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
    return (
      <Component
        loginState={loginState}
        loginUpdate={loginUpdate}
        submitLogin={submitLogin}
        {...props}
      />
    );
  };

  return Container;
};
