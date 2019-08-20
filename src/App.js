import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';
// import List from './List'
import './App.css';
import './components/Gallery.css';
import './components/Form.css';
import './components/Map.css';
import './components/Login.css';
import Gallery from './components/Gallery';
import Login from './components/Login'
import { ArtMap } from './components/Map';
import backgroundGradFx from './FX/LightToggle';
import { lightSet } from './FX/LightToggle'

const toggleOn = require('./imgs/switch.svg');
const toggleOff = require('./imgs/switch (1).svg');

function App() {
  return (
    <CookiesProvider>
      <Router>
        <div className="App" >
          <div>
            <header className="App-header" >
              <Link to="/"> <h3> Art Map</h3> </Link>
              <Link to="/gallery/"> <p> Gallery</p> </Link>
              <Link to="/login/"> <p> Login</p> </Link>
              <img src={toggleOn} className="toggle-light-btn" onClick={toggleLight} />
            </header>
          </div>
        </div>
        <Switch>
          <Route exact path="/" component={ArtMap} />
          <Route path="/gallery/" component={Gallery} />
          <Route path="/login/" component={Login} />
        </Switch>
      </Router>
    </CookiesProvider>
  );
}


// function toggleHide(prop) {
//   unhide(prop);
//   localStorage.setItem('show', prop);
// }

function toggleLight() {
  let light = localStorage.getItem('light');
  let btnImage = document.querySelector('.toggle-light-btn');
  light === 'light' ? btnImage.src = toggleOff : btnImage.src = toggleOn;
  btnImage === toggleOn ? btnImage = toggleOff : btnImage = toggleOn;
  light === 'light' ? backgroundGradFx(1, 18) : backgroundGradFx(17, 0);
  light === 'light' ? light = 'dark' : light = 'light';
  localStorage.setItem('light', light);
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