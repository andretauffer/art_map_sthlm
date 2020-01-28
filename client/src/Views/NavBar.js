import React from "react";
import styled from "styled-components";
import Nav from "../imgs/nav-bar";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Gallery from "./Gallery";
import Login from "./Login/Login";
import { ArtMap } from "./Map/Map";
import Form from "./Form/Form";

const Container = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
`;

const Icon = styled.i`
  position: absolute;
  top: ${props => (props.positionTop ? props.positionTop : "65px")};
  left: ${props => (props.positionLeft ? props.positionLeft : "170px")};
  background-color: var(--global-blue-color);
  padding: 8px;
  border-radius: 50%;
  text-align: center;
  font-size: ${props => (props.active ? "2.2rem" : "1.6rem")};
`;

const positions = {};

export default () => {
  return (
    <Router>
      <Container>
        <Nav />
        <Link to="/">
          <Icon className="fas fa-map-signs nav-btn" active={true}></Icon>
        </Link>
        <Link to="/gallery/">
          <Icon
            className="fas fa-images nav-btn"
            positionTop={"90px"}
            positionLeft={"115px"}
            active={false}
          ></Icon>
        </Link>
        {/* <Icon className="fas fa-plus-circle nav-btn"></Icon> */}
      </Container>
      <Switch>
        <Route exact path="/" component={ArtMap} />
        <Route path="/gallery/" component={Gallery} />
        <Route path="/form/" component={Form} />
      </Switch>
    </Router>
  );
};
