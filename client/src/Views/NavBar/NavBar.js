import React from "react";
import Nav from "../../imgs/nav-bar";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Gallery from "../Gallery";
import Login from "../Login/Login";
import { ArtMap } from "../Map/Map";
import Form from "../Form/Form";

import HOC from "../../Services/HOC";
import { Circle } from "../../Styles/ShapesContour";
import { Container, IconBackground, Icon } from "./NavBarStyle";
import NavButton from "./NavButton";

const {
  Navbar: { withNavState }
} = HOC;

export default withNavState(({ navState, navDispatch }) => {
  const { map, gallery, form, login } = navState;
  return (
    <Router>
      <Container className="the container">
        <Nav />
        <Link to="/">
          <NavButton
            className="fas fa-map-signs nav-btn"
            active={map}
            positionTop={"135px"}
            positionLeft={"23px"}
            onClick={() => navDispatch({ method: "navigate", field: "map" })}
          />
        </Link>
        <Link to="/gallery/">
          <NavButton
            className="fas fa-images nav-btn"
            positionTop={"85px"}
            positionLeft={"30px"}
            active={gallery}
            onClick={() =>
              navDispatch({ method: "navigate", field: "gallery" })
            }
          />
        </Link>
        <Link to="/form/">
          <NavButton
            className="fas fa-plus-circle nav-btn"
            positionTop={"115px"}
            positionLeft={"70px"}
            active={form}
            onClick={() => navDispatch({ method: "navigate", field: "form" })}
          />
        </Link>
      </Container>
      <Switch>
        <Route exact path="/" component={ArtMap} />
        <Route path="/gallery/" component={Gallery} />
        <Route path="/form/" component={Form} />
      </Switch>
    </Router>
  );
});
