import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
// import List from './List'
import "./App.css";
import "./Views/Gallery.css";
import "./Views/Form/Form.css";
import "./Views/Map/Map.css";
import "./Views/Login/Login.css";
import Gallery from "./Views/Gallery";
import Login from "./Views/Login/Login";
import { ArtMap } from "./Views/Map/Map";
import Form from "./Views/Form/Form";
import backgroundGradFx from "./FX/LightToggle";
import { lightSet } from "./FX/LightToggle";
import toggleOn from "./imgs/switch.svg";
import Nav from "./Views/NavBar";

function App() {
  return (
    <CookiesProvider>
      <Nav />
      {/* <Router>
        <div className="App">
          <div className="nav-links">
            <header className="App-header">
              <Link to="/">
                <i className="fas fa-map-signs nav-btn"></i>
              </Link>
              <Link to="/gallery/">
                <i className="fas fa-images nav-btn"></i>
              </Link>
              <Link to="/form/">
                <i className="fas fa-plus-circle nav-btn"></i>
              </Link>
              <img
                src={toggleOn}
                className="toggle-light-btn"
                onClick={toggleLight}
              />
            </header>
            <Login />
          </div>
        </div>
        <Switch>
          <Route exact path="/" component={ArtMap} />
          <Route path="/gallery/" component={Gallery} />
          <Route path="/form/" component={Form} />
        </Switch>
      </Router> */}
    </CookiesProvider>
  );
}

// function toggleHide(prop) {
//   unhide(prop);
//   localStorage.setItem('show', prop);
// }

function toggleLight() {
  let light = localStorage.getItem("light");
  let btnImage = document.querySelector(".toggle-light-btn");
  light === "light"
    ? (btnImage.src = "./imgs/switch (1).svg")
    : (btnImage.src = "./imgs/switch.svg");
  btnImage === "./imgs/switch.svg"
    ? (btnImage = "./imgs/switch (1).svg")
    : (btnImage = "./imgs/switch.svg");
  light === "light" ? backgroundGradFx(1, 18) : backgroundGradFx(17, 0);
  light === "light" ? (light = "dark") : (light = "light");
  localStorage.setItem("light", light);
}

// function updateState() {
//   setTimeout(() => {
//     const btnImage = document.querySelector('.toggle-light-btn');
//     let light = localStorage.getItem('light');
//     let show = localStorage.getItem('show');
//     light === 'dark' ? btnImage.src = toggleOff : btnImage.src = toggleOn;
//     light === 'dark' ? lightSet(9) : lightSet(0);
//     show === null ? unhide('map') : unhide(show);
//   }, 1000)
// }
// updateState();

export default App;
