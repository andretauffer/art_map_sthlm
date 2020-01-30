import React from "react";
import styled from "styled-components";
import Nav from "../imgs/nav-bar";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Gallery from "./Gallery";
import Login from "./Login/Login";
import { ArtMap } from "./Map/Map";
import Form from "./Form/Form";

import HOC from '../HOC/HOC'
import { Circle } from "../Styles/ShapesContour";
const {
  Navbar: { withNavState }
} = HOC

const Container = styled.div`
  position: fixed;
  z-index: 100;
  top: 20px;
  left: 20px;
  fill: var(--global-white-color);
  @media only screen and (max-width: 700px) { 
    top: -50px;
    left: -80px;
    transform: scale(0.7);
  }
`;

const IconBackground = styled.svg`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: -1;
fill: var(--global-light-blue);
height: ${props => props.active ? '100px' : '50px'};
width: ${props => props.active ? '100px' : '50px'};
`;

const Icon = styled.i`
  position: absolute;
  top: ${props => (props.active ? props.positionTop : props.positionTop)};
  left: ${props => (props.active ? props.positionLeft : props.positionLeft)};
  z-index: 10;
  padding: 8px;
  border-radius: 50%;
  text-align: center;
  font-size: ${props => (props.active ? "2.2rem" : "1.6rem")};
  animation: ${props => props.active ? 'move-to-active 1s ease forwards' : ''};
  @keyframes move-to-active {
    0% {
      top: ${props => (props.positionTop)};
      left: ${props => (props.positionLeft)};
      transform: scale(0);
    }
    100%{
      top: 65px;
      left: 170px;
      transform: scale(1.2);
    }
  }
  :hover{
    color: var(--global-dark-color);
  }
  
  @media only screen and (max-width: 700px) {
    color: ${props => props.active ? 'var(--global-dark-color)' : ''};
  }
`;

export default withNavState(({ navState, navDispatch }) => {
  const { map, gallery, form, login } = navState;
  return (
    <Router>
      <Container>
        <Nav />
        <Link to="/">
          <Icon
            className="fas fa-map-signs nav-btn"
            active={map}
            positionTop={"135px"}
            positionLeft={"23px"}
            onClick={() => navDispatch({ method: 'navigate', field: 'map' })}
          >
            <IconBackground active={map} >
              <Circle active={map} />
            </IconBackground>

          </Icon>
        </Link>
        <Link to="/gallery/">
          <Icon
            className="fas fa-images nav-btn"
            positionTop={"85px"}
            positionLeft={"30px"}
            active={gallery}
            onClick={() => navDispatch({ method: 'navigate', field: 'gallery' })}
          >

            <IconBackground active={gallery}>
              <Circle active={gallery} />
            </IconBackground>
          </Icon>
        </Link>
        <Link to="/form/">
          <Icon
            className="fas fa-plus-circle nav-btn"
            positionTop={'115px'}
            positionLeft={'70px'}
            active={form}
            onClick={() => navDispatch({ method: 'navigate', field: 'form' })}
          >
            <IconBackground active={form}>
              <Circle active={form} />
            </IconBackground>

          </Icon>
        </Link>
      </Container>
      <Switch>
        <Route exact path="/" component={ArtMap} />
        <Route path="/gallery/" component={Gallery} />
        <Route path="/form/" component={Form} />
      </Switch>
    </Router>
  );
})
