import React, { useEffect } from "react";
import styled from "styled-components";
import { CookiesProvider } from "react-cookie";
import "./App.css";
import "./Views/Gallery.css";
import "./Views/Form/Form.css";
import "./Views/Map/Map.css";
import "./Views/Login/Login.css";
import backgroundGradFx from "./FX/LightToggle";
import { lightSet } from "./FX/LightToggle";
import toggleOn from "./imgs/switch.svg";
import Nav from "./Views/NavBar/NavBar";
import ViewWrapper from "./Styles/ViewWrapper";

const ViewContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

function App() {
  return (
    <CookiesProvider>
      <ViewContainer>
        <ViewWrapper>
          <Nav />
        </ViewWrapper>
      </ViewContainer>
    </CookiesProvider>
  );
}

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
